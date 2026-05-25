const fs = require('fs-extra');
const path = require('path');

const COMPONENTS_DIR = path.join(__dirname, '../src/components/ui');
const SRC_COMPONENTS_DIR = path.join(__dirname, '../src/components');
const REGISTRY_FILE = path.join(__dirname, '../registry.json');

// Base packages we don't need to auto-install because they are React prerequisites or core utils
const EXCLUDED_PACKAGES = new Set([
  'react',
  'react-dom',
  'lucide-react/dist/esm/icons'
]);

function getComponentId(filename) {
  // e.g. "button.tsx" -> "button", "CustomScrollView.jsx" -> "custom-scroll-view"
  const base = path.basename(filename, path.extname(filename));
  // Convert camelCase / PascalCase or spaces to kebab-case
  return base
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

async function buildRegistry() {
  console.log('Building component registry...');
  
  const components = {};
  
  // Helper to process a file and add it to the registry
  async function processFile(filePath) {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const fileName = path.basename(filePath);
    const id = getComponentId(fileName);
    
    // Parse imports using regex
    const importRegex = /import\s+?(?:(?:(?:[\w*\s{},]*)\s+from\s+?)|)(?:["'](.*?)["'])/g;
    let match;
    const dependencies = new Set();
    const registryDependencies = new Set();
    
    while ((match = importRegex.exec(fileContent)) !== null) {
      const source = match[1];
      
      if (source.startsWith('.')) {
        // Relative import
        // e.g., "./Colors" -> "colors", "./flutter-style" -> "flutter-style", "../date-format" -> "date-format"
        const importedBaseName = path.basename(source);
        const depId = getComponentId(importedBaseName);
        registryDependencies.add(depId);
      } else if (source.startsWith('@/')) {
        // Alias import
        if (source === '@/lib/utils') {
          // Standard cn helper, skip adding as dependency
          continue;
        }
        // e.g., "@/components/ui/button" -> "button"
        const parts = source.split('/');
        const lastPart = parts[parts.length - 1];
        const depId = getComponentId(lastPart);
        registryDependencies.add(depId);
      } else {
        // External package
        // e.g., "@radix-ui/react-slot" or "lucide-react" or "class-variance-authority"
        const parts = source.split('/');
        let pkgName = parts[0];
        if (pkgName.startsWith('@') && parts[1]) {
          pkgName = `${parts[0]}/${parts[1]}`;
        }
        
        if (!EXCLUDED_PACKAGES.has(pkgName)) {
          dependencies.add(pkgName);
        }
      }
    }
    
    // Check if any Lucide icon imports are used (e.g. from lucide-react)
    if (fileContent.includes('lucide-react')) {
      dependencies.add('lucide-react');
    }
    
    components[id] = {
      name: id,
      dependencies: Array.from(dependencies),
      registryDependencies: Array.from(registryDependencies),
      files: [
        {
          name: fileName,
          content: fileContent,
          type: filePath.includes('components\\ui') || filePath.includes('components/ui') ? 'ui' : 'components'
        }
      ]
    };
  }

  // Read src/components/ui/
  if (await fs.exists(COMPONENTS_DIR)) {
    const files = await fs.readdir(COMPONENTS_DIR);
    for (const file of files) {
      const fullPath = path.join(COMPONENTS_DIR, file);
      const stat = await fs.stat(fullPath);
      if (stat.isFile()) {
        await processFile(fullPath);
      }
    }
  }

  // Read specific core helpers in src/components (like date-format.ts)
  const dateFormatPath = path.join(SRC_COMPONENTS_DIR, 'date-format.ts');
  if (await fs.exists(dateFormatPath)) {
    await processFile(dateFormatPath);
  }

  const registry = {
    name: "react-flutter-components",
    components
  };

  await fs.writeJson(REGISTRY_FILE, registry, { spaces: 2 });
  console.log(`Registry built successfully with ${Object.keys(components).length} components at ${REGISTRY_FILE}`);
}

buildRegistry().catch(err => {
  console.error('Failed to build registry:', err);
  process.exit(1);
});
