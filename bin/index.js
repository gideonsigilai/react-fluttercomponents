#!/usr/bin/env node

const { program } = require('commander');
const inquirer = require('inquirer');
const chalk = require('chalk');
const ora = require('ora');
const fs = require('fs-extra');
const path = require('path');
const { exec } = require('child_process');

const registry = require('../registry.json');

const CONFIG_FILE = path.join(process.cwd(), 'flutter-components.json');

function installNpmPackages(packages, packageManager) {
  return new Promise((resolve) => {
    if (!packages || packages.length === 0) {
      return resolve();
    }
    
    let command = '';
    switch (packageManager) {
      case 'yarn':
        command = `yarn add ${packages.join(' ')}`;
        break;
      case 'pnpm':
        command = `pnpm add ${packages.join(' ')}`;
        break;
      case 'bun':
        command = `bun add ${packages.join(' ')}`;
        break;
      case 'npm':
      default:
        command = `npm install ${packages.join(' ')}`;
        break;
    }
    
    const installSpinner = ora(`Installing npm dependencies...`).start();
    
    exec(command, { cwd: process.cwd() }, (error, stdout, stderr) => {
      if (error) {
        installSpinner.fail(`Failed to install npm dependencies.`);
        console.error(chalk.red(stderr || error.message));
        return resolve();
      }
      installSpinner.succeed(`Dependencies installed successfully.`);
      resolve();
    });
  });
}

function chunkArray(array, size) {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

function printColumns(chunks) {
  for (const chunk of chunks) {
    const row = chunk.map(item => item.padEnd(28)).join('');
    console.log('  ' + row);
  }
}

// === COMMANDS ===

// 1. INIT
program
  .command('init')
  .description('Initialize project for React-Flutter components')
  .action(async () => {
    console.log(chalk.bold.cyan('\n=== Flutter-like Component CLI (shadcn-style) ===\n'));
    
    if (await fs.exists(CONFIG_FILE)) {
      const { overwrite } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'overwrite',
          message: 'flutter-components.json already exists. Overwrite configuration?',
          default: false
        }
      ]);
      if (!overwrite) {
        console.log(chalk.yellow('Initialization aborted.'));
        return;
      }
    }
    
    const answers = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'tsx',
        message: 'Are you using TypeScript?',
        default: true
      },
      {
        type: 'input',
        name: 'globalCss',
        message: 'Where is your global CSS file?',
        default: () => {
          if (fs.existsSync('src/index.css')) return 'src/index.css';
          if (fs.existsSync('src/app/globals.css')) return 'src/app/globals.css';
          return 'src/index.css';
        }
      },
      {
        type: 'input',
        name: 'componentsPath',
        message: 'Physical path to components directory:',
        default: 'src/components'
      },
      {
        type: 'input',
        name: 'componentsAlias',
        message: 'Import alias for components directory:',
        default: '@/components'
      },
      {
        type: 'input',
        name: 'utilsPath',
        message: 'Physical path to utils helper directory:',
        default: 'src/lib/utils'
      },
      {
        type: 'input',
        name: 'utilsAlias',
        message: 'Import alias for utils utility folder:',
        default: '@/lib/utils'
      },
      {
        type: 'list',
        name: 'packageManager',
        message: 'Which package manager are you using?',
        choices: ['npm', 'yarn', 'pnpm', 'bun'],
        default: 'npm'
      }
    ]);
    
    const spinner = ora('Setting up project configurations...').start();
    
    try {
      let utilsDirPath = answers.utilsPath;
      let utilsFilename = answers.tsx ? "utils.ts" : "utils.js";
      
      const isFile = answers.utilsPath.endsWith(".ts") || answers.utilsPath.endsWith(".js") || answers.utilsPath.endsWith(".tsx") || answers.utilsPath.endsWith(".jsx");
      if (isFile) {
        utilsDirPath = path.dirname(answers.utilsPath);
        utilsFilename = path.basename(answers.utilsPath);
      }

      let utilsAliasResolved = answers.utilsAlias;
      if (utilsAliasResolved.endsWith(".ts") || utilsAliasResolved.endsWith(".js") || utilsAliasResolved.endsWith(".tsx") || utilsAliasResolved.endsWith(".jsx")) {
        utilsAliasResolved = utilsAliasResolved.substring(0, utilsAliasResolved.lastIndexOf("."));
      }

      const config = {
        tsx: answers.tsx,
        style: 'tailwind',
        tailwind: {
          css: answers.globalCss
        },
        aliases: {
          components: answers.componentsAlias,
          ui: `${answers.componentsAlias}/ui`,
          utils: utilsAliasResolved
        },
        paths: {
          components: answers.componentsPath,
          ui: path.join(answers.componentsPath, 'ui'),
          utils: utilsDirPath
        }
      };
      
      await fs.writeJson(CONFIG_FILE, config, { spaces: 2 });
      
      await fs.ensureDir(config.paths.components);
      await fs.ensureDir(config.paths.ui);
      await fs.ensureDir(config.paths.utils);
      
      // Write cn utility file
      const utilsFilePath = path.join(utilsDirPath, utilsFilename);
      
      const cnHelperContent = answers.tsx 
        ? `import { clsx, type ClassValue } from "clsx";\nimport { twMerge } from "tailwind-merge";\n\nexport function cn(...inputs: ClassValue[]) {\n  return twMerge(clsx(inputs));\n}\n`
        : `import { clsx } from "clsx";\nimport { twMerge } from "tailwind-merge";\n\nexport function cn(...inputs) {\n  return twMerge(clsx(inputs));\n}\n`;
        
      await fs.writeFile(utilsFilePath, cnHelperContent, 'utf-8');
      
      spinner.succeed('Project initialized successfully!');
      
      console.log(chalk.cyan('\nInstalling base packages (clsx, tailwind-merge, class-variance-authority)...'));
      await installNpmPackages(
        ['clsx', 'tailwind-merge', 'class-variance-authority'],
        answers.packageManager
      );
      
      console.log(chalk.bold.green('\nInitialization complete! 🎉'));
      console.log(`- Configured: ${chalk.bold('flutter-components.json')}`);
      console.log(`- Created: ${chalk.bold(utilsFilePath)}`);
      console.log(`- Core utilities installed.`);
      console.log(`\nAdd your first widget using: ${chalk.bold('npx flutter-components add [widget-name]')}\n`);
      
    } catch (error) {
      spinner.fail('Initialization failed.');
      console.error(chalk.red(error.message));
    }
  });

// 2. LIST
program
  .command('list')
  .description('List all available React-Flutter components')
  .action(() => {
    console.log(chalk.bold.cyan('\n=== Available React-Flutter Components ===\n'));
    
    const componentKeys = Object.keys(registry.components).sort();
    
    const uiComponents = [];
    const helperComponents = [];
    
    for (const key of componentKeys) {
      const comp = registry.components[key];
      const isUi = comp.files.some(f => f.type === 'ui');
      if (isUi) {
        uiComponents.push(key);
      } else {
        helperComponents.push(key);
      }
    }
    
    console.log(chalk.bold.green('UI Widgets:'));
    const uiColumns = chunkArray(uiComponents, 3);
    printColumns(uiColumns);
    
    console.log(chalk.bold.yellow('\nHelper Modules:'));
    const helperColumns = chunkArray(helperComponents, 3);
    printColumns(helperColumns);
    
    console.log(chalk.cyan(`\nTotal components cataloged: ${componentKeys.length}`));
    console.log(`Install them using: ${chalk.bold('node bin/index.js add <component-name>')}\n`);
  });

// 3. ADD
program
  .command('add [components...]')
  .description('Add React-Flutter components to your project')
  .action(async (components) => {
    if (!await fs.exists(CONFIG_FILE)) {
      console.log(chalk.red('\nError: Configuration file flutter-components.json not found.'));
      console.log(`Please run ${chalk.bold('node bin/index.js init')} first to set up your project.\n`);
      return;
    }
    
    const config = await fs.readJson(CONFIG_FILE);
    
    let selectedComponents = components;
    if (!selectedComponents || selectedComponents.length === 0) {
      const componentChoices = Object.keys(registry.components).sort().map(key => {
        const comp = registry.components[key];
        const isUi = comp.files.some(f => f.type === 'ui');
        const typeStr = isUi ? chalk.green('widget') : chalk.yellow('helper');
        return {
          name: `${key.padEnd(28)} [${typeStr}]`,
          value: key
        };
      });
      
      const answers = await inquirer.prompt([
        {
          type: 'checkbox',
          name: 'selected',
          message: 'Select components to install:',
          choices: componentChoices,
          pageSize: 15
        }
      ]);
      
      selectedComponents = answers.selected;
      
      if (!selectedComponents || selectedComponents.length === 0) {
        console.log(chalk.yellow('No components selected.'));
        return;
      }
    }
    
    const installQueue = [...selectedComponents];
    const componentsToInstall = new Set();
    const allNpmDependencies = new Set();
    
    while (installQueue.length > 0) {
      const compId = installQueue.shift();
      if (componentsToInstall.has(compId)) continue;
      
      const registryComp = registry.components[compId];
      if (!registryComp) {
        console.log(chalk.red(`\nError: Component "${compId}" not found in registry.`));
        return;
      }
      
      componentsToInstall.add(compId);
      
      if (registryComp.registryDependencies) {
        for (const regDep of registryComp.registryDependencies) {
          if (!componentsToInstall.has(regDep)) {
            installQueue.push(regDep);
          }
        }
      }
      
      if (registryComp.dependencies) {
        for (const npmDep of registryComp.dependencies) {
          allNpmDependencies.add(npmDep);
        }
      }
    }
    
    console.log(chalk.cyan(`\nResolving dependencies...`));
    const finalComponentList = Array.from(componentsToInstall);
    
    const indirectDeps = finalComponentList.filter(c => !selectedComponents.includes(c));
    if (indirectDeps.length > 0) {
      console.log(chalk.dim(`The following recursive dependencies will also be installed:`));
      console.log(chalk.dim(`  ${indirectDeps.join(', ')}`));
    }
    
    console.log('');
    for (const compId of finalComponentList) {
      const registryComp = registry.components[compId];
      const compSpinner = ora(`Adding ${chalk.bold(compId)}...`).start();
      
      try {
        for (const file of registryComp.files) {
          const targetDir = file.type === 'ui' ? config.paths.ui : config.paths.components;
          await fs.ensureDir(targetDir);
          
          let targetFileName = file.name;
          if (!config.tsx) {
            targetFileName = targetFileName.replace(/\.tsx$/, '.jsx').replace(/\.ts$/, '.js');
          }
          
          const targetFilePath = path.join(targetDir, targetFileName);
          
          let content = file.content;
          // Rewrite `@/lib/utils` with the user's custom alias
          content = content.replace(/["']@\/lib\/utils["']/g, `"${config.aliases.utils}"`);
          
          await fs.writeFile(targetFilePath, content, 'utf-8');
        }
        compSpinner.succeed(`Added ${chalk.bold(compId)}`);
      } catch (error) {
        compSpinner.fail(`Failed to add ${compId}`);
        console.error(chalk.red(error.message));
      }
    }
    
    if (allNpmDependencies.size > 0) {
      const npmPackages = Array.from(allNpmDependencies);
      
      const targetPackageJsonPath = 'package.json';
      let pkgJson = {};
      if (await fs.exists(targetPackageJsonPath)) {
        pkgJson = await fs.readJson(targetPackageJsonPath);
      }
      const existingDeps = { ...pkgJson.dependencies, ...pkgJson.devDependencies };
      const packagesToInstall = npmPackages.filter(p => !existingDeps[p]);
      
      if (packagesToInstall.length > 0) {
        console.log(chalk.cyan(`\nInstalling missing npm packages: ${packagesToInstall.join(', ')}...`));
        await installNpmPackages(packagesToInstall, config.packageManager || 'npm');
      } else {
        console.log(chalk.green('\nAll npm dependencies are already satisfied!'));
      }
    }
    
    console.log(chalk.bold.green('\nComponents installation completed successfully! 🚀\n'));
  });

program.parse(process.argv);
