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
  Laptop,
  Menu,
  X,
  Smartphone,
  Tablet,
  Monitor,
  ZoomIn,
  ZoomOut
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
  
  // Layout & Responsive States
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<"responsive" | "mobile" | "tablet">("responsive");
  const [previewScale, setPreviewScale] = useState(1.0);
  const [showCode, setShowCode] = useState(true); // Toggle for code visibility

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
      <header className="border-b border-border bg-background px-4 md:px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-accent rounded-md lg:hidden transition-smooth"
            title="Toggle Sidebar"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <div className="flex items-center gap-3">
            <div className="text-2xl">⚡</div>
            <div>
              <h1 className="font-semibold text-base md:text-lg">React-Flutter Components</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">Flutter-style widgets for React</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowCliModal(true)}
            className="px-3 py-1.5 text-xs font-medium border border-border hover:bg-accent rounded-md transition-smooth flex items-center gap-1.5"
          >
            <Laptop size={14} />
            <span className="hidden sm:inline">CLI</span>
          </button>

          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 hover:bg-accent rounded-md transition-smooth"
            title="Toggle theme"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </header>

      {/* BODY CONTENT */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        
        {/* Backdrop for Mobile Sidebar Drawer */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden transition-all animate-in fade-in duration-200"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* SIDEBAR NAVIGATION - INDEPENDENT SCROLL */}
        <aside 
          className={`fixed lg:static inset-y-0 left-0 z-40 lg:z-0 w-72 max-w-[85vw] lg:max-w-none border-r border-border bg-background flex flex-col overflow-hidden transition-transform duration-300 lg:transition-none lg:translate-x-0 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          
          {/* SEARCH BAR - FIXED */}
          <div className="p-4 border-b border-border flex-shrink-0">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search widgets..."
                className="w-full pl-9 pr-3 py-2 text-sm border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-smooth"
              />
            </div>
          </div>

          {/* ACCORDION CATEGORY NAVIGATION - SCROLLABLE */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-2 custom-scroll-bar">
            {SHOWCASE_CATEGORIES.map(category => {
              const matchedComponents = getFilteredComponents(category.id);
              const isExpanded = !!expandedCategories[category.id];

              if (matchedComponents.length === 0) return null;

              return (
                <div key={category.id} className="border border-border rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="w-full px-3 py-2.5 flex items-center justify-between text-left hover:bg-accent transition-smooth"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">{category.icon}</span>
                      <span className="text-sm font-medium">{category.name}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{matchedComponents.length}</span>
                      {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="border-t border-border bg-accent/30">
                      {matchedComponents.map(comp => {
                        const isActive = comp.id === activeComponentId;
                        return (
                          <button
                            key={comp.id}
                            onClick={() => {
                              setActiveComponentId(comp.id);
                              setIsSidebarOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2 text-sm transition-smooth ${
                              isActive 
                                ? "bg-primary text-primary-foreground font-medium" 
                                : "hover:bg-accent"
                            }`}
                          >
                            {comp.name}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* SIDEBAR FOOTER - FIXED */}
          <div className="p-4 border-t border-border flex-shrink-0">
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Add components via CLI:</p>
              <code className="block bg-accent px-3 py-2 rounded-md text-xs font-mono">
                npx flutter-components add {activeComponent.id}
              </code>
              <button
                onClick={() => setShowCliModal(true)}
                className="w-full py-2 text-xs font-medium border border-border hover:bg-accent rounded-md transition-smooth"
              >
                View CLI Guide
              </button>
            </div>
          </div>
        </aside>

        {/* WORKSPACE PREVIEW & CONTROLS */}
        <main className="flex-1 flex flex-col lg:flex-row overflow-hidden bg-card/5">
          
          {/* PREVIEW SPACE - INDEPENDENT SCROLL */}
          <section className="flex-1 flex flex-col overflow-hidden border-b lg:border-b-0 lg:border-r border-border">
            
            {/* HEADER - FIXED */}
            <div className="p-4 md:p-6 space-y-4 flex-shrink-0 border-b border-border">
              <div className="space-y-2">
                <h2 className="text-xl md:text-2xl font-semibold">{activeComponent.name}</h2>
                <p className="text-sm text-muted-foreground">{activeComponent.description}</p>
              </div>

              {/* PREVIEW FRAME / CANVAS HEADER CONTROLS */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-3 border border-border rounded-lg bg-accent/30">
              {/* Left: Device Selection */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => { setPreviewDevice("responsive"); setPreviewScale(1.0); }}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-smooth flex items-center gap-1.5 ${
                    previewDevice === "responsive"
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent"
                  }`}
                >
                  <Monitor size={14} />
                  <span className="hidden sm:inline">Responsive</span>
                </button>
                <button
                  onClick={() => { setPreviewDevice("mobile"); setPreviewScale(0.9); }}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-smooth flex items-center gap-1.5 ${
                    previewDevice === "mobile"
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent"
                  }`}
                >
                  <Smartphone size={14} />
                  <span className="hidden sm:inline">Mobile</span>
                </button>
                <button
                  onClick={() => { setPreviewDevice("tablet"); setPreviewScale(0.65); }}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-smooth flex items-center gap-1.5 ${
                    previewDevice === "tablet"
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent"
                  }`}
                >
                  <Tablet size={14} />
                  <span className="hidden sm:inline">Tablet</span>
                </button>
              </div>

              {/* Right: Zoom Controls + Code Toggle */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPreviewScale(prev => Math.max(0.25, Number((prev - 0.1).toFixed(2))))}
                    disabled={previewScale <= 0.25}
                    className="p-1.5 hover:bg-accent rounded-md disabled:opacity-30 transition-smooth"
                  >
                    <ZoomOut size={14} />
                  </button>
                  <span className="text-xs font-mono px-2 py-1 bg-background border border-border rounded-md min-w-[50px] text-center">
                    {Math.round(previewScale * 100)}%
                  </span>
                  <button
                    onClick={() => setPreviewScale(prev => Math.min(2.0, Number((prev + 0.1).toFixed(2))))}
                    disabled={previewScale >= 2.0}
                    className="p-1.5 hover:bg-accent rounded-md disabled:opacity-30 transition-smooth"
                  >
                    <ZoomIn size={14} />
                  </button>
                  <button
                    onClick={() => setPreviewScale(1.0)}
                    className="px-2 py-1.5 text-xs font-medium hover:bg-accent rounded-md transition-smooth"
                  >
                    Reset
                  </button>
                </div>

                {/* Code Toggle Button */}
                <button
                  onClick={() => setShowCode(!showCode)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-smooth flex items-center gap-1.5 border ${
                    showCode
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border hover:bg-accent"
                  }`}
                  title={showCode ? "Hide code" : "Show code"}
                >
                  <Code size={14} />
                  <span className="hidden md:inline">{showCode ? "Hide Code" : "Show Code"}</span>
                </button>
              </div>
            </div>
            </div>

            {/* SPLIT VIEW: PREVIEW AND CODE - SCROLLABLE */}
            <div className="flex-1 flex flex-col lg:flex-row gap-4 p-4 md:p-6 overflow-auto custom-scroll-bar">
              
              {/* LIVE PREVIEW BOX */}
              <div className="flex-1 border border-border rounded-lg bg-accent/20 relative flex items-start justify-center p-6 min-h-[400px]">
                {/* Simple grid background */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

                {/* RENDER ACTIVE PREVIEW */}
                <div className="z-10 w-full flex justify-center items-start pt-8">
                  
                  {/* Device Frame Wrapper */}
                  <div 
                    className={`transition-smooth flex items-center justify-center ${
                      previewDevice === "mobile" 
                        ? "w-[375px] h-[667px] border-4 border-foreground rounded-[32px] bg-background shadow-xl relative overflow-hidden" 
                        : previewDevice === "tablet" 
                        ? "w-[768px] h-[1024px] border-[6px] border-foreground rounded-[40px] bg-background shadow-xl relative overflow-hidden" 
                        : "w-full"
                    }`}
                    style={{
                      transform: `scale(${previewScale})`,
                      transformOrigin: "top center",
                    }}
                  >
                    
                    {/* Phone Notch */}
                    {previewDevice === "mobile" && (
                      <div className="absolute top-0 inset-x-0 h-6 bg-foreground flex justify-center items-center z-50">
                        <div className="w-24 h-3.5 bg-background rounded-b-xl" />
                      </div>
                    )}

                    {/* Tablet Camera */}
                    {previewDevice === "tablet" && (
                      <div className="absolute top-0 inset-x-0 h-8 bg-foreground flex justify-center items-center z-50">
                        <div className="w-3 h-3 rounded-full bg-background/30" />
                      </div>
                    )}

                    {/* Inner Container */}
                    <div 
                      className={`w-full h-full flex justify-center items-center ${
                        previewDevice === "mobile" ? "pt-6 pb-2 px-2" : previewDevice === "tablet" ? "pt-8 pb-4 px-4" : "p-2"
                      }`}
                    >
                      {activeComponent && (activeComponent.controls.length === 0 || Object.keys(widgetStates).length > 0) ? (
                        <ActivePreview 
                          key={activeComponent.id}
                          component={activeComponent} 
                          states={widgetStates} 
                          setStates={setWidgetStates} 
                        />
                      ) : (
                        <div className="text-center text-sm text-muted-foreground flex flex-col items-center gap-2">
                          <Sparkles className="animate-spin" size={24} />
                          <span>Loading...</span>
                        </div>
                      )}
                    </div>

                    {/* Home Bar */}
                    {previewDevice === "mobile" && (
                      <div className="absolute bottom-1 inset-x-0 flex justify-center z-50">
                        <div className="w-28 h-1 bg-foreground/60 rounded-full" />
                      </div>
                    )}

                    {previewDevice === "tablet" && (
                      <div className="absolute bottom-1.5 inset-x-0 flex justify-center z-50">
                        <div className="w-32 h-1 bg-foreground/50 rounded-full" />
                      </div>
                    )}

                  </div>
                </div>
              </div>

              {/* CODE DISPLAY - COLLAPSIBLE WITH INDEPENDENT SCROLL */}
              {showCode && (
                <div className="w-full lg:w-96 border border-border rounded-lg p-4 bg-accent/20 flex flex-col min-h-[400px] max-h-[600px]">
                  <div className="flex justify-between items-center mb-3 flex-shrink-0">
                    <h3 className="text-sm font-medium flex items-center gap-2">
                      <Code size={16} /> Generated Code
                    </h3>
                    
                    <button
                      onClick={handleCopyCode}
                      className="px-3 py-1.5 text-xs font-medium border border-border hover:bg-accent rounded-md transition-smooth flex items-center gap-1.5"
                    >
                      {copied ? (
                        <>
                          <Check size={14} className="text-green-500" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={14} />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <pre className="flex-1 bg-background border border-border p-4 rounded-md text-xs font-mono overflow-auto custom-scroll-bar">
                    {activeComponent ? activeComponent.generateCode(widgetStates) : ""}
                  </pre>
                </div>
              )}

            </div>

          </section>

          {/* DYNAMIC INTERACTIVE CONTROLS PANE - INDEPENDENT SCROLL */}
          <section className="w-full lg:w-80 flex flex-col overflow-hidden bg-accent/10 border-t lg:border-t-0 lg:border-l border-border">
            
            {/* HEADER - FIXED */}
            <div className="p-4 md:p-6 space-y-1 border-b border-border flex-shrink-0">
              <h3 className="text-sm font-medium flex items-center gap-2">
                <Sliders size={16} /> Controls
              </h3>
              <p className="text-xs text-muted-foreground">
                Adjust properties in real-time
              </p>
            </div>

            {/* CONTROLS - SCROLLABLE */}
            <div className="flex-1 p-4 md:p-6 space-y-4 overflow-y-auto custom-scroll-bar">
              {activeComponent && activeComponent.controls.length > 0 ? (
                activeComponent.controls.map((control) => {
                  const currentValue = widgetStates[control.name] !== undefined ? widgetStates[control.name] : control.defaultValue;

                  return (
                    <div key={control.name} className="space-y-2">
                      
                      {/* Control Label */}
                      <label className="text-xs font-medium flex justify-between items-center">
                        <span>{control.label}</span> 
                        {control.type !== "color" && control.type !== "toggle" && (
                          <span className="font-mono text-xs px-2 py-0.5 bg-accent border border-border rounded-md">
                            {typeof currentValue === "boolean" ? (currentValue ? "ON" : "OFF") : String(currentValue)}
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
                          className="w-full accent-primary h-1.5"
                        />
                      )}

                      {/* Control Select Box */}
                      {control.type === "select" && (
                        <select
                          value={currentValue}
                          onChange={(e) => {
                            const val = e.target.value;
                            const opt = control.options?.find(o => typeof o === "object" ? String(o.value) === val : String(o) === val);
                            const parsedVal = opt && typeof opt === "object" ? opt.value : (isNaN(Number(val)) ? val : Number(val));
                            handleControlChange(control.name, parsedVal);
                          }}
                          className="w-full px-3 py-2 text-sm border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
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
                          className={`flex items-center gap-2 px-3 py-2 text-sm font-medium w-full justify-between rounded-md border transition-smooth ${
                            currentValue 
                              ? "bg-primary/10 border-primary text-primary" 
                              : "border-border hover:bg-accent"
                          }`}
                        >
                          <span>{currentValue ? "Enabled" : "Disabled"}</span>
                          <div className={`w-2 h-2 rounded-full ${currentValue ? "bg-primary" : "bg-muted"}`} />
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
