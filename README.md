# React-Flutter Components CLI ⚡

A high-fidelity developer component toolkit and CLI replicating Flutter's visual widgets, material structure, and layout systems (like `Container`, `Card`, `Row`, `Column`, `Flexible`, `CircularProgressIndicator`, `Skeleton`) in React using Tailwind CSS. 

Inspired by the workflow of `shadcn/ui`, this CLI allows you to directly initialize your workspace and recursively add components to your source tree without bloating your `node_modules`.

---

## 🚀 Getting Started

### 1. Initialize your project
Navigate to your target React/Next.js/Vite project directory and initialize your Flutter component mapping config:
```bash
npx react-flutter-components init
```
This command starts an interactive CLI asking you:
* Whether you are using TypeScript or JavaScript.
* The directory path to your global CSS stylesheet (so it can map tailwind classes).
* Your physical paths and import aliases (like `@/components` or `@/lib/utils`) so it can resolve code dependencies cleanly.

---

## 📦 Using the CLI

### List all available widgets
View the entire catalog of Flutter UI replica widgets and helper modules:
```bash
npx react-flutter-components list
```

### Add components
Download components directly into your local folder tree:
```bash
# Add a single component
npx react-flutter-components add container

# Add multiple components
npx react-flutter-components add card checkbox-list-tile row
```

---

## ✨ Features

1. **Recursive Dependency Resolution:** Adding a widget (e.g. `checkbox-list-tile`) automatically resolves co-dependencies (e.g. `checkbox`) and writes them together!
2. **Peer Packages Autoinstall:** The CLI scans the widget profile and automatically installs required NPM dependencies (`framer-motion`, `lucide-react`, `@radix-ui/react-separator`, etc.) using your package manager (`npm`, `yarn`, `pnpm`, or `bun`).
3. **Import Alias Rewriting:** Written widgets automatically adapt their utility paths to match your project configuration (e.g. changing `@/lib/utils` imports to your customized helper aliases).

---

## 🛠️ Included UI Components

* **Layout & Flexbox:** `Container`, `Card`, `Row`, `Column`, `Gap`, `Spacer`, `Expanded`, `Flexible`, `Center`
* **Form Elements:** `Checkbox`, `CheckboxListTile`, `Switch`, `Slider`, `Button`
* **Loading & Utility:** `CircularProgressIndicator`, `Skeleton`, `Tooltip`, `Badge`, `BadgeCount`

---

## 📄 License
MIT
