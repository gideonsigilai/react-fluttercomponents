import React, { useState, useEffect } from "react";
import { 
  SHOWCASE_CATEGORIES, 
  SHOWCASE_COMPONENTS, 
  ShowcaseComponent 
} from "./showcaseData";
import { 
  Sun, 
  Moon, 
  Search, 
  ChevronDown, 
  ChevronRight, 
  Copy, 
  Check, 
  Sliders, 
  Code, 
  Sparkles,
  Info,
  ExternalLink,
  Laptop
} from "lucide-react";

import { Row } from "./components/ui/row";
import { Column } from "./components/ui/column";
import { Text } from "./components/ui/text";
import { MainAxisAlignment, CrossAxisAlignment } from "./components/ui/layout-types";

const ActivePreview = React.memo(({ 
  component, 
  states, 
  setStates 
}: { 
  component: ShowcaseComponent; 
  states: Record<string, any>; 
  setStates: React.Dispatch<React.SetStateAction<Record<string, any>>>;
}) => {
  return <>{component.renderPreview(states, setStates)}</>;
});
ActivePreview.displayName = "ActivePreview";

export default function App() {
  const [activeComponentId, setActiveComponentId] = useState("container");
  const [isDark, setIsDark] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const [showCliModal, setShowCliModal] = useState(false);
  const [copiedText, setCopiedText] = useState("");

  // Toggle Theme
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
  }, [isDark]);

  // Find active component configuration
  const activeComponent = SHOWCASE_COMPONENTS.find(c => c.id === activeComponentId) || SHOWCASE_COMPONENTS[0];

  // Component controller states
  const [widgetStates, setWidgetStates] = useState<Record<string, any>>({});

  // Initialize control states when active component changes
  useEffect(() => {
    if (activeComponent) {
      const defaults: Record<string, any> = {};
      activeComponent.controls.forEach(ctrl => {
        defaults[ctrl.name] = ctrl.defaultValue;
      });
      setWidgetStates(defaults);
    }
    setCopied(false);
  }, [activeComponentId]);

  // Handle control inputs mutations
  const handleControlChange = (name: string, value: any) => {
    setWidgetStates(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Expandable category folders state
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    layout: true,
    flex: true
  });

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  // Filter components in category matching search
  const getFilteredComponents = (categoryId: string) => {
    return SHOWCASE_COMPONENTS.filter(comp => 
      comp.category === categoryId && 
      (comp.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
       comp.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };

  // Auto-expand folder groups when search query matches elements inside
  useEffect(() => {
    if (searchQuery.trim() !== "") {
      const autoExpand: Record<string, boolean> = {};
      SHOWCASE_CATEGORIES.forEach(cat => {
        const matches = getFilteredComponents(cat.id);
        if (matches.length > 0) {
          autoExpand[cat.id] = true;
        }
      });
      setExpandedCategories(prev => ({ ...prev, ...autoExpand }));
    }
  }, [searchQuery]);

  // Copy react code implementation
  const handleCopyCode = () => {
    if (!activeComponent) return;
    const code = activeComponent.generateCode(widgetStates);
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-background text-foreground transition-colors duration-200">
      
      {/* HEADER */}
      <header className="border-b border-border bg-card/50 backdrop-blur-md px-6 py-3.5 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="bg-primary/20 text-primary p-2 rounded-xl font-bold text-xl flex items-center justify-center shadow-inner hover:scale-105 transition-all">
            ⚡
          </div>
          <div>
            <h1 className="font-outfit font-extrabold text-lg tracking-tight flex items-center gap-2 leading-none">
              React-Flutter <span className="text-primary text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-primary/10 tracking-wider">Tailwind Sandbox</span>
            </h1>
            <p className="text-[10px] text-muted-foreground mt-1">High-fidelity replication of Flutter widgets and layout APIs in React</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowCliModal(true)}
            className="px-3 py-1.5 rounded-lg border border-primary/20 bg-primary/10 hover:bg-primary/20 text-primary text-xs font-bold transition-all duration-150 flex items-center gap-1.5 shadow-sm"
            title="View CLI setup & installation guide"
          >
            <Laptop size={14} />
            <span>CLI Installation</span>
          </button>

          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-lg border border-border bg-card hover:bg-accent text-foreground transition-all duration-150"
            title="Toggle Dark/Light Theme"
          >
            {isDark ? <Sun size={16} className="text-yellow-400" /> : <Moon size={16} className="text-indigo-600" />}
          </button>

          <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-md bg-accent text-accent-foreground border border-border">
            v1.0.0 Stable
          </span>
        </div>
      </header>

      {/* BODY CONTENT */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* SIDEBAR NAVIGATION */}
        <aside className="w-80 border-r border-border bg-card/10 flex flex-col overflow-hidden">
          
          {/* SEARCH BAR */}
          <div className="p-4 border-b border-border bg-card/5 select-none">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                <Search size={14} />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search widgets (e.g. Scaffold, Column)..."
                className="w-full pl-9 pr-4 py-2 border border-border rounded-lg bg-card text-xs focus:ring-1 focus:ring-primary focus:border-primary outline-none placeholder-muted-foreground/60 transition-all"
              />
            </div>
          </div>

          {/* ACCORDION CATEGORY NAVIGATION */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-3 custom-scroll-bar select-none">
            {SHOWCASE_CATEGORIES.map(category => {
              const matchedComponents = getFilteredComponents(category.id);
              const isExpanded = !!expandedCategories[category.id];

              if (matchedComponents.length === 0) return null;

              return (
                <div key={category.id} className="border border-border/60 bg-card/30 rounded-xl overflow-hidden transition-all duration-200">
                  {/* Category Header */}
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="w-full px-3.5 py-3 flex items-center justify-between text-left hover:bg-accent/40 transition-colors"
                  >
                    <Row className="items-center gap-2.5">
                      <span className="text-primary/80">{category.icon}</span>
                      <span className="text-xs font-bold tracking-tight text-foreground/90">{category.name}</span>
                    </Row>
                    
                    <Row className="items-center gap-2">
                      <span className="text-[9px] font-mono px-2 py-0.5 bg-accent rounded-full border border-border/80 font-bold opacity-75">
                        {matchedComponents.length}
                      </span>
                      {isExpanded ? <ChevronDown size={14} className="opacity-60" /> : <ChevronRight size={14} className="opacity-60" />}
                    </Row>
                  </button>

                  {/* Collapsible widgets list */}
                  {isExpanded && (
                    <div className="border-t border-border/40 p-1.5 space-y-0.5 bg-card/10">
                      {matchedComponents.map(comp => {
                        const isActive = comp.id === activeComponentId;
                        return (
                          <button
                            key={comp.id}
                            onClick={() => setActiveComponentId(comp.id)}
                            className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all flex items-center justify-between ${
                              isActive 
                                ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 font-semibold" 
                                : "hover:bg-accent text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            <span>{comp.name}</span>
                            <span className={`text-[8px] uppercase tracking-wide px-1.5 py-0.5 rounded font-bold ${
                              isActive 
                                ? "bg-white/20 text-white" 
                                : "bg-accent text-muted-foreground/80 border border-border"
                            }`}>
                              WIDGET
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* SIDEBAR FOOTER */}
          <div className="p-4 border-t border-border bg-card/25 select-none">
            <div className="bg-primary/5 rounded-xl p-3 border border-primary/10 flex flex-col gap-2">
              <h4 className="text-[11px] font-bold text-primary flex items-center gap-1.5">
                💡 Local CLI Available
              </h4>
              <p className="text-[10px] text-muted-foreground leading-relaxed">
                Add widgets recursively straight into your project:
              </p>
              <code className="block bg-card p-1.5 rounded text-[9px] font-mono border border-border text-foreground select-all text-center font-bold">
                npx flutter-components add {activeComponent.id}
              </code>
              <button
                onClick={() => setShowCliModal(true)}
                className="w-full py-1 text-[10px] font-bold text-center border border-primary/20 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition"
              >
                View Full CLI Setup Guide &rarr;
              </button>
            </div>
          </div>
        </aside>

        {/* WORKSPACE PREVIEW & CONTROLS */}
        <main className="flex-1 flex flex-col lg:flex-row overflow-hidden bg-card/5">
          
          {/* PREVIEW SPACE */}
          <section className="flex-1 p-6 lg:p-8 flex flex-col gap-6 overflow-y-auto border-b lg:border-b-0 lg:border-r border-border">
            
            <div className="flex items-start justify-between">
              <div>
                <h2 className="font-outfit font-extrabold text-2xl tracking-tight flex items-center gap-2">
                  {activeComponent.name} Showcase
                </h2>
                <p className="text-xs text-muted-foreground mt-1 max-w-2xl leading-relaxed">
                  {activeComponent.description}
                </p>
              </div>
            </div>

            {/* LIVE PREVIEW BOX */}
            <div className="flex-1 min-h-[350px] border border-border rounded-2xl bg-card/45 relative flex items-center justify-center p-8 overflow-hidden shadow-sm backdrop-blur-sm">
              {/* Subtle Grid Background */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-40 pointer-events-none" />
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

              {/* RENDER ACTIVE PREVIEW */}
              <div className="z-10 w-full flex justify-center items-center">
                {activeComponent && (activeComponent.controls.length === 0 || Object.keys(widgetStates).length > 0) ? (
                  <ActivePreview 
                    key={activeComponent.id}
                    component={activeComponent} 
                    states={widgetStates} 
                    setStates={setWidgetStates} 
                  />
                ) : (
                  <div className="text-center text-xs text-muted-foreground flex flex-col items-center gap-2">
                    <Sparkles className="animate-spin text-primary" size={24} />
                    Initializing widget canvas...
                  </div>
                )}
              </div>
            </div>

            {/* REAL-TIME GENERATED JSX INVOKER CODE */}
            <div className="border border-border bg-card/30 p-5 rounded-2xl overflow-hidden relative">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2 select-none">
                  <Code size={14} className="text-primary" /> React-Flutter Code Invocation
                </h3>
                
                <button
                  onClick={handleCopyCode}
                  className="px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-accent text-xs font-semibold flex items-center gap-1.5 hover:text-foreground transition-all"
                  title="Copy JSX implementation code to clipboard"
                >
                  {copied ? (
                    <>
                      <Check size={13} className="text-emerald-500" />
                      <span className="text-emerald-500 font-bold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>

              <div className="relative">
                <pre className="bg-card/70 border border-border p-4 rounded-xl text-xs font-mono overflow-x-auto text-primary-foreground/90 max-h-[180px] custom-scroll-bar select-all">
                  {activeComponent ? activeComponent.generateCode(widgetStates) : ""}
                </pre>
              </div>
            </div>

          </section>

          {/* DYNAMIC INTERACTIVE CONTROLS PANE */}
          <section className="w-full lg:w-96 p-6 lg:p-8 flex flex-col gap-6 overflow-y-auto bg-card/10 select-none">
            <div className="border-b border-border/80 pb-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2 mb-1.5">
                <Sliders size={14} className="text-primary" /> Widget Attributes
              </h3>
              <p className="text-[10px] text-muted-foreground leading-relaxed">
                Adjust controller variables dynamically to update the component properties in real-time.
              </p>
            </div>

            <div className="flex-1 flex flex-col gap-5">
              {activeComponent && activeComponent.controls.length > 0 ? (
                activeComponent.controls.map((control) => {
                  const currentValue = widgetStates[control.name] !== undefined ? widgetStates[control.name] : control.defaultValue;

                  return (
                    <div key={control.name} className="space-y-2 border-b border-border/30 pb-3 last:border-b-0">
                      
                      {/* Control Label */}
                      <label className="text-xs font-semibold text-muted-foreground flex justify-between">
                        <span>{control.label}:</span> 
                        {control.type !== "color" && control.type !== "toggle" && (
                          <span className="font-mono text-foreground font-bold px-1.5 py-0.5 rounded bg-accent text-[10px] border border-border">
                            {typeof currentValue === "boolean" ? (currentValue ? "TRUE" : "FALSE") : String(currentValue)}
                          </span>
                        )}
                      </label>

                      {/* Control Range Slider */}
                      {control.type === "range" && (
                        <input
                          type="range"
                          min={control.min ?? 0}
                          max={control.max ?? 100}
                          step={control.step ?? 1}
                          value={currentValue}
                          onChange={(e) => handleControlChange(control.name, Number(e.target.value))}
                          className="w-full accent-primary bg-accent/40 rounded-lg cursor-pointer h-1.5 outline-none"
                        />
                      )}

                      {/* Control Select Box */}
                      {control.type === "select" && (
                        <select
                          value={currentValue}
                          onChange={(e) => {
                            const val = e.target.value;
                            // Check if option value should be a number or string
                            const opt = control.options?.find(o => typeof o === "object" ? String(o.value) === val : String(o) === val);
                            const parsedVal = opt && typeof opt === "object" ? opt.value : (isNaN(Number(val)) ? val : Number(val));
                            handleControlChange(control.name, parsedVal);
                          }}
                          className="w-full px-2.5 py-2 border border-border rounded-lg bg-card text-xs outline-none focus:ring-1 focus:ring-primary"
                        >
                          {control.options?.map((opt, oIdx) => {
                            const isObj = typeof opt === "object";
                            const label = isObj ? opt.label : String(opt);
                            const value = isObj ? opt.value : String(opt);
                            return (
                              <option key={oIdx} value={String(value)}>
                                {label}
                              </option>
                            );
                          })}
                        </select>
                      )}

                      {/* Control Switch / Toggle */}
                      {control.type === "toggle" && (
                        <button
                          type="button"
                          onClick={() => handleControlChange(control.name, !currentValue)}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-semibold w-full justify-between transition ${
                            currentValue 
                              ? "bg-primary/10 border-primary text-primary" 
                              : "bg-card border-border hover:bg-accent text-muted-foreground"
                          }`}
                        >
                          <span>{currentValue ? "Enabled (ON)" : "Disabled (OFF)"}</span>
                          <span className={`w-2 h-2 rounded-full ${currentValue ? "bg-primary animate-pulse" : "bg-muted"}`} />
                        </button>
                      )}

                      {/* Control Color Picker */}
                      {control.type === "color" && (
                        <div className="space-y-2 pt-1">
                          {/* Selected Color Text Input */}
                          <div className="flex gap-2 items-center">
                            <input 
                              type="color" 
                              value={currentValue} 
                              onChange={(e) => handleControlChange(control.name, e.target.value)}
                              className="w-8 h-8 rounded border border-border cursor-pointer flex-shrink-0"
                            />
                            <input 
                              type="text" 
                              value={currentValue} 
                              onChange={(e) => handleControlChange(control.name, e.target.value)}
                              placeholder="#000000"
                              className="flex-1 px-2.5 py-1.5 border border-border rounded-lg bg-card text-xs font-mono outline-none focus:ring-1 focus:ring-primary"
                            />
                          </div>
                          
                          {/* Palette Presets */}
                          <div className="flex gap-1.5 flex-wrap pt-0.5">
                            {["#8b5cf6", "#3b82f6", "#10b981", "#ef4444", "#f59e0b", "#ec4899", "#1e3a8a", "#111827"].map((color) => (
                              <button
                                key={color}
                                type="button"
                                onClick={() => handleControlChange(control.name, color)}
                                className={`w-6 h-6 rounded-full border transition-all ${
                                  currentValue === color ? "border-foreground ring-2 ring-primary/45 scale-110 shadow" : "border-transparent hover:scale-105"
                                }`}
                                style={{ backgroundColor: color }}
                                title={color}
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Control Textbox Input */}
                      {control.type === "text" && (
                        <input
                          type="text"
                          value={currentValue}
                          onChange={(e) => handleControlChange(control.name, e.target.value)}
                          className="w-full px-2.5 py-2 border border-border rounded-lg bg-card text-xs outline-none focus:ring-1 focus:ring-primary"
                          placeholder={`Enter custom ${control.name}...`}
                        />
                      )}

                    </div>
                  );
                })
              ) : (
                <div className="h-44 border border-dashed border-border/80 rounded-xl bg-card/20 flex flex-col items-center justify-center text-center p-5 text-muted-foreground text-xs">
                  <Info size={20} className="mb-2 text-muted-foreground/60" />
                  This component has no configurable inputs. It renders as a static visualizer standard.
                </div>
              )}
            </div>
          </section>

        </main>

      </div>

      {/* CLI INSTALLATION GUIDE MODAL */}
      {showCliModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md transition-all animate-in fade-in duration-200">
          <div className="bg-card border border-border w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-border bg-card/50 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="bg-primary/10 text-primary p-2 rounded-xl">
                  <Laptop size={18} />
                </div>
                <div>
                  <h3 className="font-outfit font-extrabold text-base tracking-tight">React-Flutter CLI Setup</h3>
                  <p className="text-[10px] text-muted-foreground">Supercharge your workflow by installing components directly from your terminal</p>
                </div>
              </div>
              <button 
                onClick={() => setShowCliModal(false)}
                className="text-muted-foreground hover:text-foreground p-1.5 rounded-lg hover:bg-accent transition"
                aria-label="Close modal"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 custom-scroll-bar text-xs leading-relaxed">
              
              {/* Option 1: Local NPM Link */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-foreground flex items-center gap-2">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/20 text-primary text-[10px] font-bold">1</span>
                    Local NPM Link (Best for Dev / Pairing)
                  </h4>
                  <span className="text-[9px] uppercase font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/25">Recommended</span>
                </div>
                <p className="text-muted-foreground pl-7 text-[11px]">
                  If you are using this package locally on your machine, link it globally so it's callable in any project:
                </p>
                <div className="bg-muted border border-border p-3.5 rounded-xl font-mono text-[11px] relative pl-7 flex items-center justify-between group">
                  <code className="text-foreground select-all">npm link</code>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText("npm link");
                      setCopiedText("link");
                      setTimeout(() => setCopiedText(""), 2000);
                    }}
                    className="p-1.5 rounded-md hover:bg-accent opacity-0 group-hover:opacity-100 transition duration-150 text-muted-foreground hover:text-foreground"
                    title="Copy to clipboard"
                  >
                    {copiedText === "link" ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                  </button>
                </div>
              </div>

              {/* Option 2: Project Initialization */}
              <div className="space-y-3">
                <h4 className="font-bold text-foreground flex items-center gap-2">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/20 text-primary text-[10px] font-bold">2</span>
                  Initialize Your React Project
                </h4>
                <p className="text-muted-foreground pl-7 text-[11px]">
                  Navigate to your consumer React project directory and run the initialization wizard:
                </p>
                <div className="bg-muted border border-border p-3.5 rounded-xl font-mono text-[11px] relative pl-7 flex items-center justify-between group">
                  <code className="text-foreground select-all">npx flutter-components init</code>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText("npx flutter-components init");
                      setCopiedText("init");
                      setTimeout(() => setCopiedText(""), 2000);
                    }}
                    className="p-1.5 rounded-md hover:bg-accent opacity-0 group-hover:opacity-100 transition duration-150 text-muted-foreground hover:text-foreground"
                    title="Copy to clipboard"
                  >
                    {copiedText === "init" ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                  </button>
                </div>
                <p className="text-[10px] text-muted-foreground pl-7 leading-normal">
                  💡 This creates a <code className="px-1 bg-accent border border-border rounded font-mono">flutter-components.json</code> config file and sets up the tailwind utility helper automatically!
                </p>
              </div>

              {/* Option 3: Add Components */}
              <div className="space-y-3">
                <h4 className="font-bold text-foreground flex items-center gap-2">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/20 text-primary text-[10px] font-bold">3</span>
                  Install Flutter-style Widgets
                </h4>
                <p className="text-muted-foreground pl-7 text-[11px]">
                  Pull any component along with its local & registry dependencies instantly:
                </p>
                <div className="bg-muted border border-border p-3.5 rounded-xl font-mono text-[11px] relative pl-7 flex items-center justify-between group">
                  <code className="text-foreground select-all">npx flutter-components add {activeComponent.id}</code>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(`npx flutter-components add ${activeComponent.id}`);
                      setCopiedText("add");
                      setTimeout(() => setCopiedText(""), 2000);
                    }}
                    className="p-1.5 rounded-md hover:bg-accent opacity-0 group-hover:opacity-100 transition duration-150 text-muted-foreground hover:text-foreground"
                    title="Copy to clipboard"
                  >
                    {copiedText === "add" ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                  </button>
                </div>
                <p className="text-[10px] text-muted-foreground pl-7 leading-normal">
                  💡 You can also install multiple components at once: <code className="px-1 bg-accent border border-border rounded font-mono">npx flutter-components add button card column</code>.
                </p>
              </div>

              {/* Diagnostic Help Tips */}
              <div className="bg-primary/5 border border-primary/10 rounded-2xl p-4 space-y-2">
                <h5 className="font-bold text-primary flex items-center gap-1.5 text-[11px]">
                  🚨 Facing any issues?
                </h5>
                <ul className="list-disc pl-4 text-[10px] text-muted-foreground space-y-1.5">
                  <li>To view all available widgets and helper components: <code className="font-mono text-foreground px-1 bg-card border rounded">npx flutter-components list</code></li>
                  <li>To get usage guidelines and help flags: <code className="font-mono text-foreground px-1 bg-card border rounded">npx flutter-components --help</code></li>
                  <li>Ensure your target project contains a <code className="font-mono text-foreground px-1 bg-card border rounded">package.json</code> and has tailwind CSS initialized.</li>
                </ul>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-border bg-card/30 flex justify-end">
              <button 
                onClick={() => setShowCliModal(false)}
                className="px-4 py-2 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/95 transition shadow"
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
