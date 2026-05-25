import React, { useState, useEffect } from "react";
import { Container } from "./components/ui/container";
import { Card } from "./components/ui/card";
import { Checkbox } from "./components/ui/checkbox";
import { CheckboxListTile } from "./components/ui/checkbox-list-tile";
import { Switch } from "./components/ui/switch";
import { Slider } from "./components/ui/slider";
import { CircularProgressIndicator } from "./components/ui/circular-progress-indicator";
import { Badge } from "./components/ui/badge";
import { Gap } from "./components/ui/gap";
import { Skeleton } from "./components/ui/skeleton";
import { Tooltip } from "./components/ui/tooltip";
import { Row } from "./components/ui/row";
import { Column } from "./components/ui/column";
import { Center } from "./components/ui/center";
import { Text } from "./components/ui/text";
import { MainAxisAlignment, CrossAxisAlignment } from "./components/ui/layout-types";
import { 
  Layout, 
  ToggleLeft, 
  Info, 
  Moon, 
  Sun, 
  ExternalLink,
  Code,
  Layers,
  Sparkles,
  HelpCircle,
  Sliders
} from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState("container");
  const [isDark, setIsDark] = useState(true);

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

  // Widget States for Controls
  // 1. Container controls
  const [containerColor, setContainerColor] = useState("#8b5cf6");
  const [containerWidth, setContainerWidth] = useState(250);
  const [containerHeight, setContainerHeight] = useState(150);
  const [containerRadius, setContainerRadius] = useState(12);
  const [containerPadding, setContainerPadding] = useState(16);

  // 2. Card controls
  const [cardElevation, setCardElevation] = useState(4);
  const [cardMargin, setCardMargin] = useState(12);

  // 3. Inputs & Toggles controls
  const [checkboxVal, setCheckboxVal] = useState(true);
  const [switchVal, setSwitchVal] = useState(false);
  const [sliderVal, setSliderVal] = useState(50);
  
  // 4. Progress indicator
  const [progressVal, setProgressVal] = useState(70);
  const [progressIndeterminate, setProgressIndeterminate] = useState(false);

  // 5. Layout Alignment controls
  const [rowAlignment, setRowAlignment] = useState(MainAxisAlignment.spaceEvenly);
  const [rowCrossAlignment, setRowCrossAlignment] = useState(CrossAxisAlignment.center);

  // 6. Tooltip controls
  const [tooltipMessage, setTooltipMessage] = useState("Flutter tooltips help users understand actions!");

  return (
    <div className="min-h-screen flex flex-col font-sans bg-background text-foreground transition-colors duration-200">
      
      {/* HEADER */}
      <header className="border-b border-border bg-card/50 backdrop-blur-md px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="bg-primary/20 text-primary p-2 rounded-lg font-bold text-xl flex items-center justify-center">
            ⚡
          </div>
          <div>
            <h1 className="font-outfit font-extrabold text-xl tracking-tight flex items-center gap-2">
              React-Flutter <span className="text-primary text-sm font-medium px-2 py-0.5 rounded-full bg-primary/10">Tailwind Sandbox</span>
            </h1>
            <p className="text-xs text-muted-foreground">Preview 64 High-fidelity Flutter Widgets Replicated in React</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2.5 rounded-lg border border-border bg-card hover:bg-accent text-foreground hover:text-accent-foreground transition-all duration-200"
            title="Toggle Theme"
          >
            {isDark ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-indigo-600" />}
          </button>

          <span className="text-xs font-semibold px-3 py-1.5 rounded-md bg-accent text-accent-foreground border border-border">
            v1.0.0 Stable
          </span>
        </div>
      </header>

      {/* BODY CONTENT */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* SIDEBAR NAVIGATION */}
        <aside className="w-80 border-r border-border bg-card/30 p-5 flex flex-col gap-6 overflow-y-auto">
          
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
              <Layers size={14} /> Widget categories
            </h3>
            
            <nav className="flex flex-col gap-1.5">
              <p className="text-xs font-medium text-muted-foreground/60 px-3 mt-3 mb-1">Structural & Layout</p>
              
              <button
                onClick={() => setActiveTab("container")}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all duration-150 ${
                  activeTab === "container" 
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 font-medium" 
                    : "hover:bg-accent text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="flex items-center gap-2.5"><Layout size={16} /> Container</span>
                <span className="text-[10px] uppercase font-bold tracking-tight opacity-75">Layout</span>
              </button>

              <button
                onClick={() => setActiveTab("card")}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all duration-150 ${
                  activeTab === "card" 
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 font-medium" 
                    : "hover:bg-accent text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="flex items-center gap-2.5"><Layers size={16} /> Card</span>
                <span className="text-[10px] uppercase font-bold tracking-tight opacity-75">Material</span>
              </button>

              <button
                onClick={() => setActiveTab("row-column")}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all duration-150 ${
                  activeTab === "row-column" 
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 font-medium" 
                    : "hover:bg-accent text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="flex items-center gap-2.5"><Sliders size={16} /> Row & Column</span>
                <span className="text-[10px] uppercase font-bold tracking-tight opacity-75">Flexbox</span>
              </button>

              <p className="text-xs font-medium text-muted-foreground/60 px-3 mt-4 mb-1">Inputs & Controls</p>

              <button
                onClick={() => setActiveTab("checkboxes")}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all duration-150 ${
                  activeTab === "checkboxes" 
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 font-medium" 
                    : "hover:bg-accent text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="flex items-center gap-2.5"><ToggleLeft size={16} /> Checkbox & ListTile</span>
                <span className="text-[10px] uppercase font-bold tracking-tight opacity-75">Form</span>
              </button>

              <button
                onClick={() => setActiveTab("switch-slider")}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all duration-150 ${
                  activeTab === "switch-slider" 
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 font-medium" 
                    : "hover:bg-accent text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="flex items-center gap-2.5"><Sliders size={16} /> Switch & Slider</span>
                <span className="text-[10px] uppercase font-bold tracking-tight opacity-75">Control</span>
              </button>

              <p className="text-xs font-medium text-muted-foreground/60 px-3 mt-4 mb-1">Information & Indicators</p>

              <button
                onClick={() => setActiveTab("progress-indicator")}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all duration-150 ${
                  activeTab === "progress-indicator" 
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 font-medium" 
                    : "hover:bg-accent text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="flex items-center gap-2.5"><Sparkles size={16} /> Progress & Skeleton</span>
                <span className="text-[10px] uppercase font-bold tracking-tight opacity-75">Status</span>
              </button>

              <button
                onClick={() => setActiveTab("tooltips")}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all duration-150 ${
                  activeTab === "tooltips" 
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 font-medium" 
                    : "hover:bg-accent text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="flex items-center gap-2.5"><HelpCircle size={16} /> Tooltip & Badge</span>
                <span className="text-[10px] uppercase font-bold tracking-tight opacity-75">Utility</span>
              </button>
            </nav>
          </div>

          <div className="mt-auto border-t border-border/80 pt-4 flex flex-col gap-2.5">
            <div className="bg-primary/5 rounded-xl p-3.5 border border-primary/10">
              <h4 className="text-xs font-bold text-primary mb-1 flex items-center gap-1.5">
                💡 Local CLI Available
              </h4>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Add any of these widgets straight to your codebase recursively using:
              </p>
              <code className="block mt-2 bg-card p-1.5 rounded text-[10px] font-mono border border-border text-foreground">
                npx flutter-components add
              </code>
            </div>
          </div>
        </aside>

        {/* WORKSPACE PREVIEW & CONTROLS */}
        <main className="flex-1 flex flex-col lg:flex-row overflow-hidden bg-card/10">
          
          {/* PREVIEW SPACE */}
          <section className="flex-1 p-6 lg:p-8 flex flex-col gap-6 overflow-y-auto border-b lg:border-b-0 lg:border-r border-border">
            
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-outfit font-bold text-2xl capitalize tracking-tight flex items-center gap-2">
                  {activeTab.replace("-", " ")} Showcase
                </h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {activeTab === "container" && "A versatile container box model mirroring Flutter's Container()."}
                  {activeTab === "card" && "A tactile card with shadow depth, padding, and corner radius settings."}
                  {activeTab === "row-column" && "Flex layouts aligning child items along main and cross axes."}
                  {activeTab === "checkboxes" && "Clean toggle forms with list tiles mapping tap actions to states."}
                  {activeTab === "switch-slider" && "A sliding thumb controller and toggle switches."}
                  {activeTab === "progress-indicator" && "Sleek loading widgets, customizable values, and skeletal visualizers."}
                  {activeTab === "tooltips" && "Informational descriptive hover bubbles and count overlays."}
                </p>
              </div>
            </div>

            {/* LIVE PREVIEW BOX */}
            <div className="flex-1 min-h-[350px] border border-border rounded-xl bg-card/45 relative flex items-center justify-center p-8 overflow-hidden shadow-sm backdrop-blur-sm">
              
              {/* Subtle Grid Background */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-40 pointer-events-none" />
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

              {/* RENDER ACTIVE PREVIEW */}
              <div className="z-10 w-full flex justify-center items-center">
                
                {activeTab === "container" && (
                  <Container
                    width={containerWidth}
                    height={containerHeight}
                    borderRadius={containerRadius}
                    padding={containerPadding}
                    color={containerColor}
                    className="flex items-center justify-center text-center shadow-lg shadow-purple-500/10"
                  >
                    <Text variant="bodyLarge" className="text-white font-bold tracking-wide">
                      Container Box<br/>
                      <span className="text-[10px] font-normal opacity-85">{containerWidth}x{containerHeight}px</span>
                    </Text>
                  </Container>
                )}

                {activeTab === "card" && (
                  <Card
                    elevation={cardElevation}
                    margin={cardMargin}
                    className="w-80 p-6 bg-card border border-border shadow-xl"
                  >
                    <Column crossAxisAlignment={CrossAxisAlignment.start} className="gap-3">
                      <Row mainAxisAlignment={MainAxisAlignment.spaceBetween} className="w-full">
                        <Badge color="#3b82f6" className="text-[10px] text-white">Flutter style</Badge>
                        <Text variant="bodySmall" className="text-muted-foreground">Elevated Card</Text>
                      </Row>
                      
                      <Text variant="titleLarge" className="font-outfit font-semibold">
                        tactile depth widgets
                      </Text>
                      
                      <Text variant="bodyMedium" className="text-muted-foreground leading-relaxed">
                        Cards mimic physical sheets of paper with an elevation class determining drop shadow sizes.
                      </Text>

                      <div className="w-full flex justify-end gap-2 mt-2">
                        <button className="px-3.5 py-1.5 text-xs font-semibold rounded bg-primary text-primary-foreground hover:bg-primary/95 transition">
                          Okay
                        </button>
                      </div>
                    </Column>
                  </Card>
                )}

                {activeTab === "row-column" && (
                  <div className="w-full max-w-md p-4 border border-border rounded-xl bg-card/60">
                    <Row 
                      mainAxisAlignment={rowAlignment} 
                      crossAxisAlignment={rowCrossAlignment}
                      className="min-h-[140px] border border-dashed border-border/80 rounded-lg p-3 bg-card/10 gap-3"
                    >
                      <Container width={50} height={50} color="#ec4899" className="flex items-center justify-center text-white font-bold rounded-lg shadow-md">1</Container>
                      <Container width={50} height={60} color="#3b82f6" className="flex items-center justify-center text-white font-bold rounded-lg shadow-md">2</Container>
                      <Container width={50} height={40} color="#10b981" className="flex items-center justify-center text-white font-bold rounded-lg shadow-md">3</Container>
                    </Row>
                    <p className="text-center text-xs text-muted-foreground mt-3 font-mono">
                      Row Flex Direction | alignment: {rowAlignment}
                    </p>
                  </div>
                )}

                {activeTab === "checkboxes" && (
                  <div className="w-80 bg-card rounded-xl border border-border shadow-md divide-y divide-border overflow-hidden">
                    <CheckboxListTile
                      title="Enable Push Notifications"
                      subtitle="Get live hot-reload triggers"
                      value={checkboxVal}
                      onChanged={setCheckboxVal}
                      dense={true}
                    />
                    <div className="p-4 flex items-center justify-between text-sm bg-accent/25">
                      <span className="text-muted-foreground flex items-center gap-2">
                        <Checkbox value={checkboxVal} onChanged={setCheckboxVal} /> Standard Checkbox
                      </span>
                      <span className="text-xs font-semibold font-mono">
                        {checkboxVal ? "CHECKED" : "UNCHECKED"}
                      </span>
                    </div>
                  </div>
                )}

                {activeTab === "switch-slider" && (
                  <Column className="w-80 gap-6 p-6 border border-border rounded-xl bg-card shadow-md">
                    <Row mainAxisAlignment={MainAxisAlignment.spaceBetween} className="w-full">
                      <span className="text-sm font-medium">Toggle Sandbox Features</span>
                      <Switch value={switchVal} onChanged={setSwitchVal} />
                    </Row>
                    
                    <div className="space-y-2.5">
                      <Row mainAxisAlignment={MainAxisAlignment.spaceBetween} className="w-full text-xs font-mono text-muted-foreground">
                        <span>Slider Widget</span>
                        <span>{Math.round(sliderVal)}%</span>
                      </Row>
                      <Slider 
                        value={sliderVal} 
                        onChanged={setSliderVal} 
                        min={0} 
                        max={100}
                        activeColor="#a78bfa"
                      />
                    </div>
                  </Column>
                )}

                {activeTab === "progress-indicator" && (
                  <Column className="w-80 gap-6 p-6 border border-border rounded-xl bg-card shadow-md">
                    <Row mainAxisAlignment={MainAxisAlignment.spaceAround} className="w-full items-center">
                      <CircularProgressIndicator 
                        size={52} 
                        strokeWidth={5}
                        color="#ef4444"
                      />
                      
                      <div className="space-y-1.5 flex flex-col items-center">
                        <span className="text-xs font-mono text-muted-foreground">Circular Loader</span>
                        <span className="text-xs font-semibold">{progressIndeterminate ? "Spinning..." : `${Math.round(progressVal)}%`}</span>
                      </div>
                    </Row>

                    <div className="space-y-3 pt-2 border-t border-border">
                      <span className="text-xs font-mono text-muted-foreground">Skeleton Placeholder:</span>
                      <Row className="gap-3 items-center">
                        <Skeleton borderRadius={9999} width={40} height={40} />
                        <Column className="flex-1 gap-2">
                          <Skeleton width="80%" height={10} />
                          <Skeleton width="50%" height={8} />
                        </Column>
                      </Row>
                    </div>
                  </Column>
                )}

                {activeTab === "tooltips" && (
                  <Column className="w-80 gap-5 items-center p-6 border border-border rounded-xl bg-card shadow-md">
                    
                    <Tooltip message={tooltipMessage} side="top">
                      <button className="px-5 py-2.5 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition shadow-md">
                        Hover Me!
                      </button>
                    </Tooltip>

                    <div className="flex items-center gap-4 mt-2">
                      <Row className="items-center gap-1.5">
                        <Badge color="#ec4899" className="text-[10px] text-white">active</Badge>
                        <span className="text-xs text-muted-foreground">Standard badge</span>
                      </Row>
                    </div>
                  </Column>
                )}

              </div>
            </div>

            {/* REAL-TIME GENERATED JSX INVOKER CODE */}
            <div className="border border-border rounded-xl bg-card/30 p-5 overflow-hidden">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3.5 flex items-center gap-2">
                <Code size={14} /> React-Flutter Code Invocation
              </h3>

              <div className="relative">
                <pre className="bg-card/70 border border-border p-4 rounded-lg text-xs font-mono overflow-x-auto text-primary-foreground/90 max-h-[160px] custom-scroll-bar">
{activeTab === "container" && `import { Container } from "@/components/ui/container";

<Container
  width={${containerWidth}}
  height={${containerHeight}}
  borderRadius={${containerRadius}}
  padding={${containerPadding}}
  color="${containerColor}"
  className="flex items-center justify-center"
>
  <span>Box Widget</span>
</Container>`}

{activeTab === "card" && `import { Card } from "@/components/ui/card";

<Card
  elevation={${cardElevation}}
  margin={${cardMargin}}
  className="p-6 bg-card"
>
  <h4>Material Tactile Card</h4>
</Card>`}

{activeTab === "row-column" && `import { Row } from "@/components/ui/row";
import { MainAxisAlignment, CrossAxisAlignment } from "@/components/ui/layout-types";

<Row 
  mainAxisAlignment={MainAxisAlignment.${Object.keys(MainAxisAlignment).find(k => MainAxisAlignment[k] === rowAlignment)}} 
  crossAxisAlignment={CrossAxisAlignment.${Object.keys(CrossAxisAlignment).find(k => CrossAxisAlignment[k] === rowCrossAlignment)}}
  className="gap-3"
>
  <div>1</div>
  <div>2</div>
</Row>`}

{activeTab === "checkboxes" && `import { CheckboxListTile } from "@/components/ui/checkbox-list-tile";

<CheckboxListTile
  title="Enable Notifications"
  subtitle="Get live alerts"
  value={${checkboxVal}}
  onChanged={(val) => setCheckboxVal(val)}
  dense={true}
/>`}

{activeTab === "switch-slider" && `import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";

// Switch
<Switch value={${switchVal}} onChanged={setSwitchVal} />

// Slider
<Slider 
  value={${sliderVal}} 
  onChanged={setSliderVal} 
  min={0} 
  max={100} 
/>`}

{activeTab === "progress-indicator" && `import { CircularProgressIndicator } from "@/components/ui/circular-progress-indicator";

<CircularProgressIndicator 
  value={${progressIndeterminate ? "undefined" : progressVal}} 
  size={52} 
  strokeWidth={5} 
/>`}

{activeTab === "tooltips" && `import { Tooltip } from "@/components/ui/tooltip";

<Tooltip message="${tooltipMessage}" position="top">
  <button>Hover Me!</button>
</Tooltip>`}
                </pre>
              </div>
            </div>

          </section>

          {/* DYNAMIC INTERACTIVE CONTROLS PANE */}
          <section className="w-full lg:w-96 p-6 lg:p-8 flex flex-col gap-6 overflow-y-auto bg-card/10">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2 mb-1.5">
                <Sliders size={14} className="text-primary" /> Widget Attributes
              </h3>
              <p className="text-xs text-muted-foreground">Adjust attributes dynamically to update the component styles in real-time.</p>
            </div>

            <div className="flex-1 flex flex-col gap-5">
              
              {/* CONTAINER CONTROLS */}
              {activeTab === "container" && (
                <>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-muted-foreground flex justify-between">
                      <span>Width:</span> <span className="font-mono text-foreground font-medium">{containerWidth}px</span>
                    </label>
                    <input
                      type="range" min="100" max="320" value={containerWidth}
                      onChange={(e) => setContainerWidth(Number(e.target.value))}
                      className="w-full accent-primary bg-accent/40 rounded-lg cursor-pointer h-1.5"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-muted-foreground flex justify-between">
                      <span>Height:</span> <span className="font-mono text-foreground font-medium">{containerHeight}px</span>
                    </label>
                    <input
                      type="range" min="80" max="220" value={containerHeight}
                      onChange={(e) => setContainerHeight(Number(e.target.value))}
                      className="w-full accent-primary bg-accent/40 rounded-lg cursor-pointer h-1.5"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-muted-foreground flex justify-between">
                      <span>Corner Radius:</span> <span className="font-mono text-foreground font-medium">{containerRadius}px</span>
                    </label>
                    <input
                      type="range" min="0" max="32" value={containerRadius}
                      onChange={(e) => setContainerRadius(Number(e.target.value))}
                      className="w-full accent-primary bg-accent/40 rounded-lg cursor-pointer h-1.5"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-muted-foreground flex justify-between">
                      <span>Padding:</span> <span className="font-mono text-foreground font-medium">{containerPadding}px</span>
                    </label>
                    <input
                      type="range" min="0" max="32" value={containerPadding}
                      onChange={(e) => setContainerPadding(Number(e.target.value))}
                      className="w-full accent-primary bg-accent/40 rounded-lg cursor-pointer h-1.5"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-muted-foreground">Background Color:</label>
                    <div className="flex gap-2.5 flex-wrap pt-1">
                      {["#8b5cf6", "#3b82f6", "#10b981", "#ef4444", "#f59e0b", "#ec4899"].map((color) => (
                        <button
                          key={color}
                          onClick={() => setContainerColor(color)}
                          className={`w-8 h-8 rounded-full border transition-all ${
                            containerColor === color ? "border-foreground ring-2 ring-primary/45 scale-110 shadow" : "border-transparent"
                          }`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* CARD CONTROLS */}
              {activeTab === "card" && (
                <>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-muted-foreground flex justify-between">
                      <span>Elevation Depth:</span> <span className="font-mono text-foreground font-medium">{cardElevation}dp</span>
                    </label>
                    <div className="flex gap-1.5">
                      {[1, 2, 4, 8, 12, 16].map((num) => (
                        <button
                          key={num}
                          onClick={() => setCardElevation(num)}
                          className={`flex-1 py-2 text-xs font-mono font-bold rounded-lg border transition ${
                            cardElevation === num 
                              ? "bg-primary text-primary-foreground border-primary" 
                              : "bg-card border-border hover:bg-accent"
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-muted-foreground flex justify-between">
                      <span>Outer Margin:</span> <span className="font-mono text-foreground font-medium">{cardMargin}px</span>
                    </label>
                    <input
                      type="range" min="0" max="24" value={cardMargin}
                      onChange={(e) => setCardMargin(Number(e.target.value))}
                      className="w-full accent-primary bg-accent/40 rounded-lg cursor-pointer h-1.5"
                    />
                  </div>
                </>
              )}

              {/* ROW / COLUMN LAYOUT ALIGNMENTS */}
              {activeTab === "row-column" && (
                <>
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-muted-foreground">Main Axis Alignment</label>
                    <div className="flex flex-col gap-1.5">
                      {[
                        { label: "start (Pack start)", val: MainAxisAlignment.start },
                        { label: "end (Pack end)", val: MainAxisAlignment.end },
                        { label: "center (Pack center)", val: MainAxisAlignment.center },
                        { label: "spaceAround", val: MainAxisAlignment.spaceAround },
                        { label: "spaceEvenly", val: MainAxisAlignment.spaceEvenly },
                        { label: "spaceBetween", val: MainAxisAlignment.spaceBetween },
                      ].map((item) => (
                        <button
                          key={item.label}
                          onClick={() => setRowAlignment(item.val)}
                          className={`w-full text-left px-3 py-2 text-xs rounded-lg border transition ${
                            rowAlignment === item.val
                              ? "bg-primary text-primary-foreground border-primary font-semibold"
                              : "bg-card border-border hover:bg-accent"
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3 border-t border-border pt-4">
                    <label className="text-xs font-bold text-muted-foreground">Cross Axis Alignment</label>
                    <div className="flex flex-col gap-1.5">
                      {[
                        { label: "start", val: CrossAxisAlignment.start },
                        { label: "center", val: CrossAxisAlignment.center },
                        { label: "end", val: CrossAxisAlignment.end },
                        { label: "stretch", val: CrossAxisAlignment.stretch },
                      ].map((item) => (
                        <button
                          key={item.label}
                          onClick={() => setRowCrossAlignment(item.val)}
                          className={`w-full text-left px-3 py-2 text-xs rounded-lg border transition ${
                            rowCrossAlignment === item.val
                              ? "bg-primary text-primary-foreground border-primary font-semibold"
                              : "bg-card border-border hover:bg-accent"
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* INPUT CONTROLS */}
              {activeTab === "checkboxes" && (
                <>
                  <div className="bg-card/50 p-4 border border-border rounded-xl space-y-3.5">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">Controller bindings</span>
                    
                    <Row mainAxisAlignment={MainAxisAlignment.spaceBetween} className="w-full">
                      <span className="text-xs font-semibold">Checkbox Checked:</span>
                      <Checkbox value={checkboxVal} onChanged={setCheckboxVal} />
                    </Row>
                  </div>
                </>
              )}

              {/* SWITCH & SLIDER CONTROLS */}
              {activeTab === "switch-slider" && (
                <>
                  <div className="space-y-3.5 bg-card/50 p-4 border border-border rounded-xl">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">Real-time binding:</span>
                    
                    <Row mainAxisAlignment={MainAxisAlignment.spaceBetween} className="w-full">
                      <span className="text-xs font-semibold">Toggle switch value:</span>
                      <Switch value={switchVal} onChanged={setSwitchVal} />
                    </Row>

                    <div className="space-y-1.5 pt-2 border-t border-border">
                      <label className="text-xs font-semibold text-muted-foreground">Adjust Slider Value:</label>
                      <input
                        type="range" min="0" max="100" value={sliderVal}
                        onChange={(e) => setSliderVal(Number(e.target.value))}
                        className="w-full accent-primary bg-accent/40 rounded-lg cursor-pointer h-1.5"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* PROGRESS & LOADING CONTROLS */}
              {activeTab === "progress-indicator" && (
                <>
                  <Row mainAxisAlignment={MainAxisAlignment.spaceBetween} className="w-full bg-accent/25 border border-border p-3 rounded-lg items-center">
                    <span className="text-xs font-semibold">Indeterminate Spinner:</span>
                    <Switch value={progressIndeterminate} onChanged={setProgressIndeterminate} />
                  </Row>

                  {!progressIndeterminate && (
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-muted-foreground flex justify-between">
                        <span>Progress Value:</span> <span className="font-mono text-foreground font-medium">{progressVal}%</span>
                      </label>
                      <input
                        type="range" min="0" max="100" value={progressVal}
                        onChange={(e) => setProgressVal(Number(e.target.value))}
                        className="w-full accent-primary bg-accent/40 rounded-lg cursor-pointer h-1.5"
                      />
                    </div>
                  )}
                </>
              )}

              {/* TOOLTIP & UTILITY CONTROLS */}
              {activeTab === "tooltips" && (
                <>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-muted-foreground">Tooltip Message:</label>
                    <textarea
                      value={tooltipMessage}
                      onChange={(e) => setTooltipMessage(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-border bg-card text-xs focus:ring-1 focus:ring-primary outline-none"
                      rows={3}
                    />
                  </div>
                </>
              )}

            </div>
          </section>

        </main>

      </div>

    </div>
  );
}
