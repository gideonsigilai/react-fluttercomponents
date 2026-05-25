import React from "react";
import { 
  Layout, 
  Layers, 
  Sliders, 
  ToggleLeft, 
  Sparkles, 
  HelpCircle, 
  Navigation, 
  Grid, 
  MousePointer, 
  Type, 
  Palette,
  CheckCircle,
  FileText,
  User,
  Activity,
  AlertTriangle
} from "lucide-react";

// Import all UI components
import { Container } from "./components/ui/container";
import { Card } from "./components/ui/card";
import { Padding } from "./components/ui/padding";
import { Align } from "./components/ui/align";
import { Center } from "./components/ui/center";
import { SizedBox } from "./components/ui/sized-box";
import { ColoredBox } from "./components/ui/colored-box";
import { AspectRatio } from "./components/ui/aspect-ratio";
import { ClipRRect } from "./components/ui/clip-r-rect";

import { Row } from "./components/ui/row";
import { Column } from "./components/ui/column";
import { Stack } from "./components/ui/stack";
import { Positioned } from "./components/ui/positioned";
import { Wrap } from "./components/ui/wrap";
import { Gap } from "./components/ui/gap";
import { Spacer } from "./components/ui/spacer";
import { Expanded } from "./components/ui/expanded";
import { Flexible } from "./components/ui/flexible";

import { Scaffold } from "./components/ui/scaffold";
import { AppBar } from "./components/ui/app-bar";
import { Sidebar } from "./components/ui/sidebar";
import { SmartDrawer } from "./components/ui/smart-drawer";

import { ListView } from "./components/ui/list-view";
import { ListTile } from "./components/ui/list-tile";
import { GridView } from "./components/ui/grid-view";
import { GridTile } from "./components/ui/grid-tile";
import { PageView } from "./components/ui/page-view";
import { 
  CustomScrollView, 
  SliverAppBar, 
  FlexibleSpaceBar, 
  SliverList, 
  SliverGrid, 
  SliverToBoxAdapter, 
  EdgeInsets 
} from "./components/ui/CustomScrollView";

import { Button } from "./components/ui/button";
import { ElevatedButton } from "./components/ui/elevated-button";
import { OutlinedButton } from "./components/ui/outlined-button";
import { IconButton } from "./components/ui/icon-button";
import { FloatingActionButton } from "./components/ui/floating-action-button";
import { InkWell } from "./components/ui/ink-well";
import { GestureDetector } from "./components/ui/gesture-detector";
import { DropdownButton, DropdownMenuItem } from "./components/ui/dropdown-button";

import { TextField } from "./components/ui/text-field";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Checkbox } from "./components/ui/checkbox";
import { CheckboxListTile } from "./components/ui/checkbox-list-tile";
import { Switch } from "./components/ui/switch";
import { Slider } from "./components/ui/slider";

import { Badge } from "./components/ui/badge";
import { BadgeCount } from "./components/ui/badge-count";
import { Chip } from "./components/ui/chip";
import { CircularAvatar } from "./components/ui/circular-avatar";

import { CircularProgressIndicator } from "./components/ui/circular-progress-indicator";
import { ProgressBar } from "./components/ui/progress-bar";
import { Skeleton } from "./components/ui/skeleton";

import { Tooltip } from "./components/ui/tooltip";
import { Dialog, AlertDialog } from "./components/ui/dialog";
import { OverlayProvider } from "./components/ui/overlay-provider";

import { Text } from "./components/ui/text";
import { Image } from "./components/ui/image";
import { Divider } from "./components/ui/divider";
import { Separator } from "./components/ui/separator";
import { VerticalDivider } from "./components/ui/vertical-divider";
import { Colors } from "./components/ui/Colors";

import { Alignment, MainAxisAlignment, CrossAxisAlignment } from "./components/ui/layout-types";

// Category definitions
export const SHOWCASE_CATEGORIES = [
  { id: "layout", name: "Layout & Box Model", icon: <Layout size={16} /> },
  { id: "flex", name: "Flex & Multi-Child", icon: <Sliders size={16} /> },
  { id: "scaffold", name: "App Layout & Scaffolding", icon: <Navigation size={16} /> },
  { id: "scroll", name: "Scrollable Lists & Views", icon: <Grid size={16} /> },
  { id: "interactive", name: "Interactive & Gestures", icon: <MousePointer size={16} /> },
  { id: "input", name: "Form Fields & Inputs", icon: <ToggleLeft size={16} /> },
  { id: "badge", name: "Badges, Chips & Avatars", icon: <Layers size={16} /> },
  { id: "progress", name: "Progress & Indicators", icon: <Sparkles size={16} /> },
  { id: "overlay", name: "Overlays & Dialogs", icon: <HelpCircle size={16} /> },
  { id: "utility", name: "Display & Utilities", icon: <Type size={16} /> }
];

export interface ControlConfig {
  name: string;
  label: string;
  type: "range" | "select" | "toggle" | "color" | "text" | "buttons";
  defaultValue: any;
  options?: any[];
  min?: number;
  max?: number;
  step?: number;
}

export interface ShowcaseComponent {
  id: string;
  name: string;
  description: string;
  category: string;
  controls: ControlConfig[];
  renderPreview: (states: Record<string, any>, setStates: (newStates: Record<string, any>) => void) => React.ReactNode;
  generateCode: (states: Record<string, any>) => string;
}

export const SHOWCASE_COMPONENTS: ShowcaseComponent[] = [
  // ─── 1. LAYOUT & BOX MODEL ──────────────────────────────────────────────────
  {
    id: "container",
    name: "Container",
    description: "A versatile box model layout mirroring Flutter's Container(). Combines alignment, padding, border-radius, background, and sizing.",
    category: "layout",
    controls: [
      { name: "width", label: "Width (px)", type: "range", defaultValue: 250, min: 100, max: 320 },
      { name: "height", label: "Height (px)", type: "range", defaultValue: 150, min: 80, max: 220 },
      { name: "borderRadius", label: "Border Radius (px)", type: "range", defaultValue: 12, min: 0, max: 40 },
      { name: "padding", label: "Padding (px)", type: "range", defaultValue: 16, min: 0, max: 32 },
      { name: "color", label: "Color", type: "color", defaultValue: "#8b5cf6" }
    ],
    renderPreview: (states) => (
      <Container
        width={states.width}
        height={states.height}
        borderRadius={states.borderRadius}
        padding={states.padding}
        color={states.color}
        className="flex items-center justify-center text-center shadow-lg transition-all"
      >
        <Text variant="bodyLarge" className="text-white font-bold tracking-wide">
          Container Box<br/>
          <span className="text-[10px] font-normal opacity-85">{states.width}x{states.height}px</span>
        </Text>
      </Container>
    ),
    generateCode: (states) => `import { Container } from "@/components/ui/container";
import { Text } from "@/components/ui/text";

<Container
  width={${states.width}}
  height={${states.height}}
  borderRadius={${states.borderRadius}}
  padding={${states.padding}}
  color="${states.color}"
  className="flex items-center justify-center text-center shadow-lg"
>
  <Text variant="bodyLarge" className="text-white font-bold">
    Container Box
  </Text>
</Container>`
  },
  {
    id: "card",
    name: "Card",
    description: "A material-like container featuring dynamic elevation drops (shadows), margins, and structural padding.",
    category: "layout",
    controls: [
      { name: "elevation", label: "Elevation Depth", type: "select", defaultValue: 4, options: [1, 2, 4, 8, 12, 16] },
      { name: "margin", label: "Outer Margin (px)", type: "range", defaultValue: 12, min: 0, max: 32 }
    ],
    renderPreview: (states) => (
      <Card
        elevation={states.elevation}
        margin={states.margin}
        className="w-80 p-6 bg-card border border-border shadow-xl transition-all"
      >
        <Column crossAxisAlignment={CrossAxisAlignment.start} className="gap-3">
          <Row mainAxisAlignment={MainAxisAlignment.spaceBetween} className="w-full">
            <Badge color="#3b82f6" className="text-[10px] text-white">Flutter style</Badge>
            <Text variant="bodySmall" className="text-muted-foreground">Elevated Card</Text>
          </Row>
          <Text variant="titleLarge" className="font-outfit font-semibold">
            Tactile Depth Card
          </Text>
          <Text variant="bodyMedium" className="text-muted-foreground leading-relaxed">
            Cards mimic physical sheets of paper with an elevation class determining drop shadow sizes.
          </Text>
        </Column>
      </Card>
    ),
    generateCode: (states) => `import { Card } from "@/components/ui/card";
import { Column } from "@/components/ui/column";
import { Text } from "@/components/ui/text";

<Card
  elevation={${states.elevation}}
  margin={${states.margin}}
  className="p-6 bg-card"
>
  <Column className="gap-2">
    <Text variant="titleLarge">Tactile Card</Text>
    <Text variant="bodyMedium">Elevation value is ${states.elevation}dp</Text>
  </Column>
</Card>`
  },
  {
    id: "padding",
    name: "Padding",
    description: "Injects structural spacing padding dynamically on child elements. Mirror of Flutter's Padding widget.",
    category: "layout",
    controls: [
      { name: "top", label: "Top Spacer", type: "range", defaultValue: 16, min: 0, max: 48 },
      { name: "bottom", label: "Bottom Spacer", type: "range", defaultValue: 16, min: 0, max: 48 },
      { name: "left", label: "Left Spacer", type: "range", defaultValue: 24, min: 0, max: 48 },
      { name: "right", label: "Right Spacer", type: "range", defaultValue: 24, min: 0, max: 48 }
    ],
    renderPreview: (states) => (
      <div className="border border-dashed border-border/80 rounded-xl bg-card/20">
        <Padding padding={{ top: states.top, bottom: states.bottom, left: states.left, right: states.right }}>
          <div className="bg-primary/20 text-primary border border-primary/30 p-4 rounded-lg font-mono text-xs text-center font-bold">
            Padded Box (T:{states.top} R:{states.right} B:{states.bottom} L:{states.left})
          </div>
        </Padding>
      </div>
    ),
    generateCode: (states) => `import { Padding } from "@/components/ui/padding";

<Padding
  padding={{ 
    top: ${states.top}, 
    bottom: ${states.bottom}, 
    left: ${states.left}, 
    right: ${states.right} 
  }}
>
  <div className="bg-primary/20 p-4 rounded">
    Content inside padding
  </div>
</Padding>`
  },
  {
    id: "align",
    name: "Align",
    description: "Positions a single child widget at specific locations within its container box.",
    category: "layout",
    controls: [
      { 
        name: "alignment", 
        label: "Alignment Position", 
        type: "select", 
        defaultValue: Alignment.center, 
        options: Object.values(Alignment) 
      }
    ],
    renderPreview: (states) => (
      <div className="w-80 h-44 border border-dashed border-border/80 rounded-xl bg-card/10 relative p-1.5">
        <Align alignment={states.alignment}>
          <div className="w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center text-white font-bold shadow-md">
            🎯
          </div>
        </Align>
      </div>
    ),
    generateCode: (states) => `import { Align } from "@/components/ui/align";
import { Alignment } from "@/components/ui/layout-types";

<div className="w-80 h-44 relative bg-card">
  <Align alignment={Alignment.${Object.keys(Alignment).find(k => Alignment[k] === states.alignment)}}>
    <div className="w-12 h-12 bg-pink-500 rounded" />
  </Align>
</div>`
  },
  {
    id: "center",
    name: "Center",
    description: "A convenience layout widget that automatically centers its child within itself.",
    category: "layout",
    controls: [],
    renderPreview: () => (
      <div className="w-80 h-40 border border-dashed border-border/80 rounded-xl bg-card/10">
        <Center>
          <div className="bg-indigo-500 text-white font-bold p-5 rounded-xl shadow-lg">
            Perfect Center Widget
          </div>
        </Center>
      </div>
    ),
    generateCode: () => `import { Center } from "@/components/ui/center";

<Center>
  <div className="bg-indigo-500 p-5 rounded">
    Perfect Center Widget
  </div>
</Center>`
  },
  {
    id: "sizedbox",
    name: "SizedBox",
    description: "Constrains a child widget to exact width and height specifications, or serves as an empty spacer block.",
    category: "layout",
    controls: [
      { name: "width", label: "Fixed Width (px)", type: "range", defaultValue: 140, min: 20, max: 200 },
      { name: "height", label: "Fixed Height (px)", type: "range", defaultValue: 90, min: 20, max: 200 }
    ],
    renderPreview: (states) => (
      <div className="p-4 border border-dashed border-border/80 rounded-xl bg-card/10">
        <SizedBox width={states.width} height={states.height}>
          <div className="w-full h-full bg-violet-600/25 border border-violet-500/50 rounded-lg flex items-center justify-center text-xs font-mono font-bold text-violet-400">
            {states.width}x{states.height}
          </div>
        </SizedBox>
      </div>
    ),
    generateCode: (states) => `import { SizedBox } from "@/components/ui/sized-box";

<SizedBox width={${states.width}} height={${states.height}}>
  <div className="w-full h-full bg-violet-500" />
</SizedBox>`
  },
  {
    id: "coloredbox",
    name: "ColoredBox",
    description: "Draws a background color layer behind its child. Differs from Container in that it introduces no additional padding or decoration bounds.",
    category: "layout",
    controls: [
      { name: "color", label: "Color Selection", type: "color", defaultValue: "#10b981" }
    ],
    renderPreview: (states) => (
      <div className="w-80 h-32 rounded-xl overflow-hidden border border-border">
        <ColoredBox color={states.color} className="w-full h-full flex items-center justify-center p-4">
          <span className="text-white font-bold bg-black/35 px-4 py-2 rounded-full backdrop-blur-sm text-sm">
            ColoredBox Color: {states.color}
          </span>
        </ColoredBox>
      </div>
    ),
    generateCode: (states) => `import { ColoredBox } from "@/components/ui/colored-box";

<ColoredBox color="${states.color}" className="w-full h-full p-4">
  <span>ColoredBox background</span>
</ColoredBox>`
  },
  {
    id: "aspectratio",
    name: "AspectRatio",
    description: "Forces its child to maintain a strict aspect ratio (e.g. 16:9, 4:3) based on dynamic outer widths.",
    category: "layout",
    controls: [
      { name: "ratio", label: "Aspect Ratio Type", type: "select", defaultValue: 1.77, options: [
        { label: "16:9 (1.77)", value: 1.77 },
        { label: "4:3 (1.33)", value: 1.33 },
        { label: "1:1 (1.00)", value: 1.0 },
        { label: "2:3 (0.66)", value: 0.66 }
      ]}
    ],
    renderPreview: (states) => (
      <div className="w-64 border border-dashed border-border/80 p-2 rounded-xl bg-card/10">
        <AspectRatio ratio={states.ratio}>
          <div className="w-full h-full bg-gradient-to-tr from-amber-500 to-rose-500 rounded-lg flex items-center justify-center text-white font-bold text-xs">
            Aspect Ratio ({states.ratio === 1.77 ? "16:9" : states.ratio === 1.33 ? "4:3" : states.ratio === 1.0 ? "1:1" : "2:3"})
          </div>
        </AspectRatio>
      </div>
    ),
    generateCode: (states) => `import { AspectRatio } from "@/components/ui/aspect-ratio";

<AspectRatio ratio={${states.ratio}}>
  <div className="bg-gradient-to-tr from-amber-500 to-rose-500" />
</AspectRatio>`
  },
  {
    id: "cliprrect",
    name: "ClipRRect",
    description: "Clips its child using a rounded rectangle (e.g. rounding images or gradient backgrounds). Mirror of Flutter's ClipRRect.",
    category: "layout",
    controls: [
      { name: "radius", label: "Clip Radius (px)", type: "range", defaultValue: 20, min: 0, max: 60 }
    ],
    renderPreview: (states) => (
      <ClipRRect borderRadius={states.radius} className="shadow-lg">
        <div className="w-64 h-36 bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-600 flex items-center justify-center p-4">
          <span className="text-white font-bold text-center leading-tight">
            Clipped Rounded Corner Box<br/>
            <span className="text-xs font-mono font-normal opacity-80">Radius: {states.radius}px</span>
          </span>
        </div>
      </ClipRRect>
    ),
    generateCode: (states) => `import { ClipRRect } from "@/components/ui/clip-r-rect";

<ClipRRect borderRadius={${states.radius}}>
  <div className="w-64 h-36 bg-gradient-to-tr from-blue-600 to-purple-600" />
</ClipRRect>`
  },

  // ─── 2. FLEX & MULTI-CHILD ─────────────────────────────────────────────────
  {
    id: "row",
    name: "Row",
    description: "Aligns child elements horizontally. Features detailed controls for main-axis and cross-axis layouts.",
    category: "flex",
    controls: [
      { name: "main", label: "Main Axis (Horizontal)", type: "select", defaultValue: MainAxisAlignment.spaceEvenly, options: Object.values(MainAxisAlignment) },
      { name: "cross", label: "Cross Axis (Vertical)", type: "select", defaultValue: CrossAxisAlignment.center, options: Object.values(CrossAxisAlignment) }
    ],
    renderPreview: (states) => (
      <div className="w-full max-w-md p-4 border border-dashed border-border/80 rounded-xl bg-card/30">
        <Row 
          mainAxisAlignment={states.main} 
          crossAxisAlignment={states.cross}
          className="min-h-[140px] border border-dashed border-border/60 rounded-lg p-3 bg-card/10 gap-3"
        >
          <Container width={50} height={50} color="#ec4899" className="flex items-center justify-center text-white font-bold rounded-lg shadow-md">1</Container>
          <Container width={50} height={70} color="#3b82f6" className="flex items-center justify-center text-white font-bold rounded-lg shadow-md">2</Container>
          <Container width={50} height={40} color="#10b981" className="flex items-center justify-center text-white font-bold rounded-lg shadow-md">3</Container>
        </Row>
      </div>
    ),
    generateCode: (states) => `import { Row } from "@/components/ui/row";
import { Container } from "@/components/ui/container";
import { MainAxisAlignment, CrossAxisAlignment } from "@/components/ui/layout-types";

<Row 
  mainAxisAlignment={MainAxisAlignment.${Object.keys(MainAxisAlignment).find(k => MainAxisAlignment[k] === states.main)}} 
  crossAxisAlignment={CrossAxisAlignment.${Object.keys(CrossAxisAlignment).find(k => CrossAxisAlignment[k] === states.cross)}}
  className="gap-3"
>
  <Container width={50} height={50} color="#ec4899" />
  <Container width={50} height={70} color="#3b82f6" />
  <Container width={50} height={40} color="#10b981" />
</Row>`
  },
  {
    id: "column",
    name: "Column",
    description: "Aligns child elements vertically. Configures vertical stack constraints.",
    category: "flex",
    controls: [
      { name: "main", label: "Main Axis (Vertical)", type: "select", defaultValue: MainAxisAlignment.center, options: Object.values(MainAxisAlignment) },
      { name: "cross", label: "Cross Axis (Horizontal)", type: "select", defaultValue: CrossAxisAlignment.center, options: Object.values(CrossAxisAlignment) }
    ],
    renderPreview: (states) => (
      <div className="w-full max-w-sm p-4 border border-dashed border-border/80 rounded-xl bg-card/30">
        <Column 
          mainAxisAlignment={states.main} 
          crossAxisAlignment={states.cross}
          className="min-h-[220px] border border-dashed border-border/60 rounded-lg p-3 bg-card/10 gap-3"
        >
          <Container width={80} height={40} color="#ec4899" className="flex items-center justify-center text-white font-bold rounded-lg shadow-md">Box A</Container>
          <Container width={100} height={40} color="#3b82f6" className="flex items-center justify-center text-white font-bold rounded-lg shadow-md">Box B</Container>
          <Container width={70} height={40} color="#10b981" className="flex items-center justify-center text-white font-bold rounded-lg shadow-md">Box C</Container>
        </Column>
      </div>
    ),
    generateCode: (states) => `import { Column } from "@/components/ui/column";
import { Container } from "@/components/ui/container";
import { MainAxisAlignment, CrossAxisAlignment } from "@/components/ui/layout-types";

<Column 
  mainAxisAlignment={MainAxisAlignment.${Object.keys(MainAxisAlignment).find(k => MainAxisAlignment[k] === states.main)}} 
  crossAxisAlignment={CrossAxisAlignment.${Object.keys(CrossAxisAlignment).find(k => CrossAxisAlignment[k] === states.cross)}}
  className="gap-3"
>
  <Container width={80} height={40} color="#ec4899" />
  <Container width={100} height={40} color="#3b82f6" />
  <Container width={70} height={40} color="#10b981" />
</Column>`
  },
  {
    id: "stack",
    name: "Stack & Positioned",
    description: "Overlays multiple widgets on top of each other. Allows precise edges offset using the Positioned widget.",
    category: "flex",
    controls: [
      { name: "badgeTop", label: "Badge Top Offset", type: "range", defaultValue: 10, min: -10, max: 80 },
      { name: "badgeRight", label: "Badge Right Offset", type: "range", defaultValue: 10, min: -10, max: 80 }
    ],
    renderPreview: (states) => (
      <Stack className="w-64 h-64 border border-border bg-card rounded-xl shadow-md p-4 overflow-visible">
        {/* Underlay base */}
        <Container 
          width={180} 
          height={180} 
          color="#3b82f6" 
          borderRadius={16} 
          className="flex items-center justify-center text-white text-center font-bold"
        >
          Base Stack Canvas
        </Container>

        {/* Positioned element */}
        <Positioned top={states.badgeTop} right={states.badgeRight}>
          <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg border-2 border-card animate-pulse">
            New
          </div>
        </Positioned>

        <Positioned bottom={12} left={12}>
          <span className="bg-black/75 px-3 py-1 rounded-full text-white text-xs font-semibold backdrop-blur-sm border border-white/10">
            Overlaid Badge
          </span>
        </Positioned>
      </Stack>
    ),
    generateCode: (states) => `import { Stack } from "@/components/ui/stack";
import { Positioned } from "@/components/ui/positioned";
import { Container } from "@/components/ui/container";

<Stack className="w-64 h-64 bg-card rounded-xl shadow-md">
  <Container width={180} height={180} color="#3b82f6" borderRadius={16} />
  
  <Positioned top={${states.badgeTop}} right={${states.badgeRight}}>
    <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-white">
      New
    </div>
  </Positioned>

  <Positioned bottom={12} left={12}>
    <span className="bg-black/75 px-3 py-1 rounded-full text-white text-xs">
      Overlaid Badge
    </span>
  </Positioned>
</Stack>`
  },
  {
    id: "wrap",
    name: "Wrap",
    description: "Flows list widgets horizontally or vertically and wraps across runs if there's no remaining space. Banish row overflow clip issues.",
    category: "flex",
    controls: [
      { name: "spacing", label: "Spacing Gap (px)", type: "range", defaultValue: 8, min: 0, max: 24 },
      { name: "runSpacing", label: "Run Spacing (px)", type: "range", defaultValue: 8, min: 0, max: 24 }
    ],
    renderPreview: (states) => (
      <div className="w-72 border border-dashed border-border/80 p-4 rounded-xl bg-card/20">
        <Wrap spacing={states.spacing} runSpacing={states.runSpacing}>
          {["React", "Flutter", "Tailwind", "GetX", "TypeScript", "Vite", "Zustand", "HTML"].map((tag, i) => (
            <span key={i} className="px-3.5 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-full text-xs font-semibold shadow-sm hover:scale-105 transition-all">
              {tag}
            </span>
          ))}
        </Wrap>
      </div>
    ),
    generateCode: (states) => `import { Wrap } from "@/components/ui/wrap";

<Wrap spacing={${states.spacing}} runSpacing={${states.runSpacing}}>
  {["React", "Flutter", "Tailwind"].map(tag => (
    <span className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-xs">
      {tag}
    </span>
  ))}
</Wrap>`
  },
  {
    id: "gap-spacer",
    name: "Gap & Flex Spaces",
    description: "Advanced flex adjustments featuring fixed Gap(), full-expansion Spacer(), and proportional Expanded() and Flexible() spacing.",
    category: "flex",
    controls: [
      { name: "gapValue", label: "Gap Spacing (px)", type: "range", defaultValue: 16, min: 0, max: 48 },
      { name: "expandedFlex", label: "Expanded Flex Weight", type: "range", defaultValue: 2, min: 1, max: 5 }
    ],
    renderPreview: (states) => (
      <Column className="w-full max-w-sm gap-4 p-4 border border-dashed border-border/85 rounded-xl bg-card/20">
        {/* Showcase 1: Gap Helper */}
        <div className="w-full">
          <span className="text-xs font-mono text-muted-foreground block mb-2">Row showing Gap({states.gapValue}px):</span>
          <Row className="bg-card/40 p-2.5 rounded-lg border border-border items-center">
            <div className="px-3 py-2 bg-pink-500 rounded text-white text-xs font-bold shadow-sm">Left Box</div>
            <Gap size={states.gapValue} />
            <div className="px-3 py-2 bg-blue-500 rounded text-white text-xs font-bold shadow-sm">Right Box</div>
          </Row>
        </div>

        {/* Showcase 2: Spacer & Expanded */}
        <div className="w-full border-t border-border/80 pt-3">
          <span className="text-xs font-mono text-muted-foreground block mb-2">Row showing Spacer() & Expanded(flex: {states.expandedFlex}):</span>
          <Row className="bg-card/40 p-2.5 rounded-lg border border-border items-center">
            <div className="px-3 py-2 bg-amber-500 rounded text-white text-xs font-bold shadow-sm">A</div>
            
            <Spacer /> {/* Fills remaining space */}
            
            <div className="px-3 py-2 bg-purple-500 rounded text-white text-xs font-bold shadow-sm">B (Spacer left)</div>
            
            <Expanded flex={states.expandedFlex}>
              <div className="h-9 bg-emerald-500 rounded text-white text-xs font-bold shadow-sm flex items-center justify-center px-2 truncate ml-2">
                Expanded flex={states.expandedFlex}
              </div>
            </Expanded>
          </Row>
        </div>
      </Column>
    ),
    generateCode: (states) => `import { Row } from "@/components/ui/row";
import { Gap } from "@/components/ui/gap";
import { Spacer } from "@/components/ui/spacer";
import { Expanded } from "@/components/ui/expanded";

<Row className="items-center">
  <div>A</div>
  <Gap size={${states.gapValue}} />
  <div>B</div>
  <Spacer />
  <Expanded flex={${states.expandedFlex}}>
    <div className="bg-emerald-500">Expanded Element</div>
  </Expanded>
</Row>`
  },

  // ─── 3. APP LAYOUT & SCAFFOLDING ───────────────────────────────────────────
  {
    id: "scaffold",
    name: "Scaffold & App Layout",
    description: "Implements standard material structural page shells including AppBar headers, SmartDrawers, floating action buttons, and bottom navigation blocks.",
    category: "scaffold",
    controls: [
      { name: "showDrawer", label: "Drawer Active state", type: "toggle", defaultValue: false },
      { name: "showFab", label: "Floating Action Button", type: "toggle", defaultValue: true }
    ],
    renderPreview: (states, setStates) => (
      <div className="w-full max-w-sm h-96 border border-border rounded-xl bg-card overflow-hidden shadow-xl flex relative">
        
        {/* Draw open/close portal overlay */}
        {states.showDrawer && (
          <div className="absolute inset-0 bg-black/60 z-30 transition-opacity flex">
            <div className="w-2/3 h-full bg-card border-r border-border p-5 flex flex-col gap-4 shadow-2xl relative">
              <span className="text-sm font-bold uppercase tracking-wider text-primary">Main Drawer menu</span>
              <Column className="gap-2 text-xs">
                <span className="p-2 bg-accent/40 rounded font-semibold cursor-pointer">🏠 Home Dashboard</span>
                <span className="p-2 hover:bg-accent/30 rounded cursor-pointer">👤 Profile Settings</span>
                <span className="p-2 hover:bg-accent/30 rounded cursor-pointer">🔔 Alerts</span>
              </Column>
              <button 
                onClick={() => setStates({ ...states, showDrawer: false })}
                className="mt-auto py-2 bg-primary text-white text-xs rounded-lg font-bold"
              >
                Close Drawer
              </button>
            </div>
            <div className="flex-1 cursor-pointer" onClick={() => setStates({ ...states, showDrawer: false })} />
          </div>
        )}

        <Scaffold
          appBar={
            <AppBar 
              title={<span className="text-sm font-bold">Scaffold Sandbox</span>}
              leading={
                <button 
                  onClick={() => setStates({ ...states, showDrawer: true })}
                  className="p-1 hover:bg-accent rounded text-foreground"
                >
                  ☰
                </button>
              }
              backgroundColor="hsl(var(--card))"
              elevation={2}
            />
          }
          floatingActionButton={states.showFab ? (
            <FloatingActionButton 
              onPressed={() => alert("FAB Tapped!")}
              backgroundColor="#8b5cf6"
              icon={<span>+</span>}
            />
          ) : undefined}
          bottomNavigationBar={
            <div className="h-12 border-t border-border flex justify-around items-center bg-card text-[10px] text-muted-foreground">
              <span className="text-primary font-bold">● Feed</span>
              <span>💬 Chats</span>
              <span>⚙️ Config</span>
            </div>
          }
          body={
            <div className="p-5 flex flex-col gap-4 h-full bg-accent/10">
              <span className="text-xs font-semibold text-muted-foreground">SCAFFOLD BODY</span>
              <div className="p-4 bg-card rounded-xl border border-border text-xs text-center font-medium leading-relaxed">
                Standard structured page shell mapping header, body, FAB, drawer, and bottom navigation anchors securely.
              </div>
            </div>
          }
        />
      </div>
    ),
    generateCode: (states) => `import { Scaffold } from "@/components/ui/scaffold";
import { AppBar } from "@/components/ui/app-bar";
import { FloatingActionButton } from "@/components/ui/floating-action-button";

<Scaffold
  appBar={
    <AppBar 
      title={<span>Scaffold Title</span>} 
      leading={<button>☰</button>} 
    />
  }
  floatingActionButton={
    ${states.showFab ? `<FloatingActionButton onPressed={() => {}} backgroundColor="#8b5cf6" icon={<span>+</span>} />` : "undefined"}
  }
  bottomNavigationBar={
    <div className="h-12 border-t flex justify-around items-center">
      <span>Feed</span>
      <span>Settings</span>
    </div>
  }
  body={
    <div className="p-5">
      Main body content
    </div>
  }
/>`
  },
  {
    id: "appbar",
    name: "AppBar",
    description: "An elegant header block equivalent to Flutter's AppBar. Controls titles centering, elevating offsets, and backgrounds.",
    category: "scaffold",
    controls: [
      { name: "centerTitle", label: "Center Header Title", type: "toggle", defaultValue: true },
      { name: "elevation", label: "Header Elevation Shadow", type: "select", defaultValue: 2, options: [0, 1, 2, 4, 8] },
      { name: "bgColor", label: "Background Color Selection", type: "color", defaultValue: "#1e3a8a" }
    ],
    renderPreview: (states) => (
      <div className="w-80 h-28 border border-border bg-card/25 rounded-xl overflow-hidden flex flex-col justify-start relative shadow-sm">
        <AppBar
          title={<span className="text-xs font-extrabold uppercase tracking-wide">Main Navigation</span>}
          centerTitle={states.centerTitle}
          backgroundColor={states.bgColor}
          elevation={states.elevation}
          leading={<span className="text-sm px-2.5 cursor-pointer hover:opacity-80">🏠</span>}
          actions={[
            <span key="a1" className="text-sm px-2 cursor-pointer hover:opacity-80" onClick={() => alert("Notify tapped")}>🔔</span>,
            <span key="a2" className="text-sm px-2.5 cursor-pointer hover:opacity-80" onClick={() => alert("Search tapped")}>🔍</span>
          ]}
        />
      </div>
    ),
    generateCode: (states) => `import { AppBar } from "@/components/ui/app-bar";

<AppBar
  title={<span>Main Navigation</span>}
  centerTitle={${states.centerTitle}}
  backgroundColor="${states.bgColor}"
  elevation={${states.elevation}}
  leading={<span>🏠</span>}
  actions={[
    <span key="a1">🔔</span>,
    <span key="a2">🔍</span>
  ]}
/>`
  },
  {
    id: "sidebar",
    name: "Sidebar",
    description: "A Flutter-style Drawer / Sidebar component sliding from screen edge coordinates.",
    category: "scaffold",
    controls: [],
    renderPreview: () => {
      const [isOpen, setIsOpen] = React.useState(false);
      return (
        <div className="w-full max-w-sm h-72 border border-border rounded-xl overflow-hidden bg-card flex items-center justify-center relative shadow-sm">
          <button
            onClick={() => setIsOpen(true)}
            className="px-4 py-2 bg-primary text-primary-foreground font-bold rounded-lg text-xs shadow hover:bg-primary/90 transition animate-bounce"
          >
            Trigger Edge Sidebar Overlay
          </button>
          
          <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} position="left" className="bg-card p-4">
            <div className="p-3 flex flex-col gap-5 items-center w-full h-full">
              <div className="w-9 h-9 bg-primary/20 text-primary font-bold rounded-lg flex items-center justify-center shadow-inner">
                ⚡
              </div>
              
              <Column className="gap-2.5 w-full mt-3">
                {[
                  { label: "Dashboard", icon: "📊" },
                  { label: "Settings", icon: "⚙️" },
                  { label: "Log out", icon: "🚪" }
                ].map((item, i) => (
                  <Row key={i} className="p-2.5 rounded-lg hover:bg-accent/40 cursor-pointer w-full items-center gap-3">
                    <span className="text-sm">{item.icon}</span>
                    <span className="text-xs font-semibold">{item.label}</span>
                  </Row>
                ))}
              </Column>

              <button 
                onClick={() => setIsOpen(false)}
                className="mt-auto py-2 w-full bg-primary text-white text-xs rounded-lg font-bold shadow hover:bg-primary/95 transition"
              >
                Close Sidebar
              </button>
            </div>
          </Sidebar>
        </div>
      );
    },
    generateCode: () => `import { Sidebar } from "@/components/ui/sidebar";

// Control open/close state through component controllers:
<Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} position="left" className="bg-card">
  <div className="p-5">
    <h3>Sidebar Header</h3>
  </div>
</Sidebar>`
  },
  {
    id: "smartdrawer",
    name: "SmartDrawer",
    description: "A material slider slide-out panel that slides from left or right edge boundaries under Scaffold anchors.",
    category: "scaffold",
    controls: [
      { name: "drawerWidth", label: "Drawer Width (px)", type: "range", defaultValue: 240, min: 160, max: 320 },
      { name: "elevation", label: "Drawer Elevation Shadow", type: "range", defaultValue: 16, min: 0, max: 24 }
    ],
    renderPreview: (states, setStates) => {
      const [isOpen, setIsOpen] = React.useState(false);
      return (
        <div className="w-full max-w-sm h-80 border border-border rounded-xl bg-card overflow-hidden relative shadow-md flex items-center justify-center">
          
          {isOpen && (
            <div className="absolute inset-0 bg-black/60 z-40 transition-opacity">
              <SmartDrawer 
                drawerWidth={states.drawerWidth}
                elevation={states.elevation}
                className="bg-card border-r border-border h-full flex flex-col justify-start relative shadow-2xl"
              >
                <div className="p-5 flex flex-col gap-4">
                  <div className="h-14 bg-gradient-to-tr from-primary to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xs shadow-md">
                    SmartDrawer Title
                  </div>
                  
                  <Column className="gap-2 text-xs">
                    <span className="p-2.5 bg-accent/40 rounded font-semibold cursor-pointer">💼 Work Projects</span>
                    <span className="p-2.5 hover:bg-accent/30 rounded cursor-pointer">📁 Document storage</span>
                    <span className="p-2.5 hover:bg-accent/30 rounded cursor-pointer">🔔 System alerts</span>
                  </Column>
                  
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="mt-6 py-2 bg-primary text-white text-xs rounded-lg font-bold shadow hover:bg-primary/95 transition"
                  >
                    Dismiss Drawer
                  </button>
                </div>
              </SmartDrawer>
            </div>
          )}

          <Column className="gap-2 items-center">
            <button 
              onClick={() => setIsOpen(true)}
              className="px-4 py-2 bg-primary text-primary-foreground font-bold rounded-lg text-xs shadow hover:bg-primary/90 transition"
            >
              Open SmartDrawer (Left)
            </button>
            <span className="text-[10px] text-muted-foreground">Drawer width: {states.drawerWidth}px | elevation: {states.elevation}dp</span>
          </Column>
        </div>
      );
    },
    generateCode: (states) => `import { SmartDrawer } from "@/components/ui/smart-drawer";

// Render within absolute overlay wrapper or Scaffold drawer triggers
<SmartDrawer
  drawerWidth={${states.drawerWidth}}
  elevation={${states.elevation}}
  className="bg-card"
>
  <div className="p-5">
    <h3>Drawer Header</h3>
  </div>
</SmartDrawer>`
  },

  // ─── 4. SCROLLABLE LISTS & VIEWS ───────────────────────────────────────────
  {
    id: "listview",
    name: "ListView",
    description: "A scrollable box mapping arrays to structured vertical lists. Parallel of Flutter's ListView.",
    category: "scroll",
    controls: [
      { name: "itemsCount", label: "Number of List Items", type: "range", defaultValue: 10, min: 2, max: 20 },
      { name: "dense", label: "Dense compact list", type: "toggle", defaultValue: false }
    ],
    renderPreview: (states) => (
      <div className="w-80 h-64 border border-border rounded-xl bg-card overflow-hidden shadow-inner p-1">
        <ListView className="h-full">
          {Array.from({ length: states.itemsCount }).map((_, i) => (
            <ListTile
              key={i}
              leading={<span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shadow-sm">#{i+1}</span>}
              title={`Scroll Item Title #${i + 1}`}
              subtitle="Dynamic list rows mapping description lines"
              dense={states.dense}
              className="border-b border-border/40 hover:bg-accent/20 cursor-pointer transition-colors"
            />
          ))}
        </ListView>
      </div>
    ),
    generateCode: (states) => `import { ListView } from "@/components/ui/list-view";
import { ListTile } from "@/components/ui/list-tile";

<ListView className="h-64">
  {items.map((item, i) => (
    <ListTile
      key={i}
      leading={<div className="avatar">#{i+1}</div>}
      title="List Item Title"
      dense={${states.dense}}
    />
  ))}
</ListView>`
  },
  {
    id: "listtile",
    name: "ListTile",
    description: "A standardized row containing leading, title, subtitle, and trailing blocks. Mirror of Flutter's ListTile.",
    category: "scroll",
    controls: [
      { name: "dense", label: "Compact Dense format", type: "toggle", defaultValue: false },
      { name: "enabled", label: "Enable Item status", type: "toggle", defaultValue: true }
    ],
    renderPreview: (states) => (
      <div className="w-80 bg-card rounded-xl border border-border shadow-md divide-y divide-border overflow-hidden">
        <ListTile
          leading={<span className="text-xl">💳</span>}
          title="Personal Billing Account"
          subtitle="Visa ending in *4221 - active"
          trailing={<span className="text-emerald-500 text-xs font-bold font-mono">ACTIVE</span>}
          dense={states.dense}
          enabled={states.enabled}
          onTap={() => alert("Primary ListTile tapped!")}
          className="hover:bg-accent/30 cursor-pointer"
        />
        <ListTile
          leading={<span className="text-xl">🔒</span>}
          title="Change Account Password"
          subtitle="Last updated 12 days ago"
          trailing={<span className="text-xs text-muted-foreground">▶</span>}
          dense={states.dense}
          enabled={states.enabled}
          onTap={() => alert("Secondary ListTile tapped!")}
          className="hover:bg-accent/30 cursor-pointer"
        />
      </div>
    ),
    generateCode: (states) => `import { ListTile } from "@/components/ui/list-tile";

<ListTile
  leading={<span>💳</span>}
  title="Personal Billing Account"
  subtitle="Visa ending in *4221"
  trailing={<span className="text-emerald-500">ACTIVE</span>}
  dense={${states.dense}}
  enabled={${states.enabled}}
  onTap={() => {}}
/>`
  },
  {
    id: "gridview",
    name: "GridView",
    description: "Renders elements inside structured dynamic multi-column count grids. Mirror of GridView.",
    category: "scroll",
    controls: [
      { name: "cols", label: "Grid Columns Count", type: "range", defaultValue: 2, min: 1, max: 4 },
      { name: "spacing", label: "Item spacing gap (px)", type: "range", defaultValue: 8, min: 0, max: 24 }
    ],
    renderPreview: (states) => (
      <div className="w-80 h-64 border border-border rounded-xl bg-card overflow-hidden shadow-inner p-3">
        <GridView 
          crossAxisCount={states.cols}
          mainAxisSpacing={states.spacing}
          crossAxisSpacing={states.spacing}
          className="h-full overflow-y-auto"
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <GridTile
              key={i}
              className="bg-gradient-to-br from-indigo-500/10 to-primary/10 border border-border rounded-lg p-3 flex flex-col justify-between shadow-sm"
              header={
                <span className="text-[9px] uppercase tracking-wider text-primary font-bold">GRID TILE {i+1}</span>
              }
              child={
                <div className="h-10 flex items-center justify-center text-sm font-bold text-foreground">
                  Card #{i + 1}
                </div>
              }
            />
          ))}
        </GridView>
      </div>
    ),
    generateCode: (states) => `import { GridView } from "@/components/ui/grid-view";
import { GridTile } from "@/components/ui/grid-tile";

<GridView
  crossAxisCount={${states.cols}}
  mainAxisSpacing={${states.spacing}}
  crossAxisSpacing={${states.spacing}}
  className="h-64"
>
  {items.map((item, i) => (
    <GridTile key={i} header={<span>Tile {i}</span>} child={<div>Content</div>} />
  ))}
</GridView>`
  },
  {
    id: "pageview",
    name: "PageView",
    description: "A swipeable slide panel carousel displaying pages sequentially. Standard mirror of PageView.",
    category: "scroll",
    controls: [
      { name: "scrollDir", label: "Scroll Direction", type: "select", defaultValue: "horizontal", options: ["horizontal", "vertical"] }
    ],
    renderPreview: (states) => (
      <div className="w-72 h-44 border border-border rounded-xl overflow-hidden bg-card relative shadow-md">
        <PageView 
          scrollDirection={states.scrollDir} 
          className="w-full h-full"
        >
          {[
            { title: "Slide 1", desc: "Swipe to navigate panels", bg: "from-blue-600 to-indigo-600" },
            { title: "Slide 2", desc: "Interactive carousel replication", bg: "from-purple-600 to-pink-600" },
            { title: "Slide 3", desc: "PageView supports gestures!", bg: "from-emerald-600 to-teal-600" }
          ].map((slide, i) => (
            <div key={i} className={`w-full h-full flex flex-col items-center justify-center text-center p-5 bg-gradient-to-br ${slide.bg} text-white flex-shrink-0`}>
              <span className="text-xs uppercase tracking-widest font-extrabold opacity-75">PAGE VIEW</span>
              <h4 className="text-xl font-bold mt-1">{slide.title}</h4>
              <p className="text-xs opacity-90 mt-1">{slide.desc}</p>
            </div>
          ))}
        </PageView>
      </div>
    ),
    generateCode: (states) => `import { PageView } from "@/components/ui/page-view";

<PageView scrollDirection="${states.scrollDir}" className="h-44 w-72">
  <div className="bg-blue-600">Slide 1</div>
  <div className="bg-purple-600">Slide 2</div>
  <div className="bg-emerald-600">Slide 3</div>
</PageView>`
  },
  {
    id: "customscrollview",
    name: "CustomScrollView (Slivers)",
    description: "Replicates high-fidelity sliver APIs allowing collapsible appbar parallax titles scrolling with nested lists/grids.",
    category: "scroll",
    controls: [
      { name: "pinned", label: "Pin AppBar Header", type: "toggle", defaultValue: true }
    ],
    renderPreview: (states) => (
      <div className="w-80 h-96 border border-border rounded-xl bg-card overflow-hidden shadow-xl relative">
        <CustomScrollView scrollDirection="vertical" className="h-full">
          <SliverAppBar
            title={<span className="text-xs font-bold uppercase tracking-wider text-white">Collapsible Header</span>}
            expandedHeight={130}
            collapsedHeight={48}
            pinned={states.pinned}
            backgroundColor="#4338ca"
            elevation={4}
            automaticallyImplyLeading={false}
          />
          
          <SliverToBoxAdapter>
            <div className="p-4 bg-accent/25 text-[11px] font-semibold text-muted-foreground border-b border-border">
              SLIVER TO BOX ADAPTER CONTENT
            </div>
          </SliverToBoxAdapter>

          <SliverList itemCount={8} itemBuilder={(i) => (
            <div key={i} className="p-3 border-b border-border text-xs flex items-center justify-between hover:bg-accent/15 transition-colors">
              <span>Sliver row element list #{i+1}</span>
              <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded font-mono">Row {i+1}</span>
            </div>
          )} />
        </CustomScrollView>
      </div>
    ),
    generateCode: (states) => `import { CustomScrollView, SliverAppBar, SliverList } from "@/components/ui/CustomScrollView";

<CustomScrollView className="h-96">
  <SliverAppBar
    title={<span>Parallax Collapsing Title</span>}
    expandedHeight={130}
    pinned={${states.pinned}}
    backgroundColor="#4338ca"
  />
  
  <SliverList 
    itemCount={8} 
    itemBuilder={(i) => <div key={i}>Sliver Row #{i}</div>} 
  />
</CustomScrollView>`
  },

  // ─── 5. INTERACTIVE & GESTURES ─────────────────────────────────────────────
  {
    id: "buttons",
    name: "Buttons Showcase",
    description: "Interactive button collection replication showcasing elevated buttons, outlines, icon controls, and standard button clicks.",
    category: "interactive",
    controls: [
      { name: "disabled", label: "Disable Buttons Action", type: "toggle", defaultValue: false }
    ],
    renderPreview: (states) => (
      <Column className="w-80 gap-4 p-5 border border-border rounded-xl bg-card shadow-md">
        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">Material style buttons</span>
        
        <ElevatedButton 
          onPressed={states.disabled ? undefined : () => alert("ElevatedButton Tapped!")}
          backgroundColor="#8b5cf6"
          elevation={4}
          borderRadius={8}
          className="w-full text-center py-2"
          child={<span className="text-white text-xs font-bold">Elevated Button</span>}
        />

        <OutlinedButton 
          onPressed={states.disabled ? undefined : () => alert("OutlinedButton Tapped!")}
          borderRadius={8}
          borderColor="#8b5cf6"
          className="w-full text-center py-2"
          child={<span className="text-primary text-xs font-bold">Outlined Button</span>}
        />

        <Row mainAxisAlignment={MainAxisAlignment.spaceBetween} className="w-full items-center">
          <IconButton 
            onPressed={states.disabled ? undefined : () => alert("IconButton Tapped!")}
            icon={<span className="text-lg">🔥</span>}
            title="System is fire!"
          />
          <IconButton 
            onPressed={states.disabled ? undefined : () => alert("Like Tapped!")}
            icon={<span className="text-lg">❤️</span>}
            title="Appreciate work"
          />
          
          <FloatingActionButton
            onPressed={states.disabled ? undefined : () => alert("FAB Tapped!")}
            backgroundColor="#10b981"
            icon={<span className="text-white font-bold text-sm">+</span>}
          />
        </Row>
      </Column>
    ),
    generateCode: (states) => `import { ElevatedButton } from "@/components/ui/elevated-button";
import { OutlinedButton } from "@/components/ui/outlined-button";
import { IconButton } from "@/components/ui/icon-button";
import { FloatingActionButton } from "@/components/ui/floating-action-button";

// ElevatedButton
<ElevatedButton 
  onPressed={${states.disabled ? "undefined" : "() => {}"}} 
  backgroundColor="#8b5cf6"
  child={<span>Elevated Button</span>}
/>

// FloatingActionButton
<FloatingActionButton onPressed={() => {}} backgroundColor="#10b981" icon={<span>+</span>} />`
  },
  {
    id: "dropdownbutton",
    name: "DropdownButton",
    description: "Standard material dropdown selector displaying a floating overlay menu mapping list options. Parallel of DropdownButton.",
    category: "interactive",
    controls: [
      { name: "preferUp", label: "Force Dropdown Upwards", type: "toggle", defaultValue: false },
      { name: "filled", label: "Filled background field", type: "toggle", defaultValue: false }
    ],
    renderPreview: (states) => {
      const [val, setVal] = React.useState("apple");
      return (
        <div className="w-80 p-5 bg-card border border-border rounded-xl shadow-md">
          <label className="text-xs font-semibold text-muted-foreground block mb-2">SELECT FAVORITE FRUIT:</label>
          <DropdownButton
            value={val}
            onChanged={(newVal) => setVal(newVal)}
            filled={states.filled}
            preferUp={states.preferUp}
            borderRadius={8}
            items={[
              <DropdownMenuItem key="a" value="apple" child={<span>🍎 Red Crisp Apple</span>} />,
              <DropdownMenuItem key="b" value="banana" child={<span>🍌 Creamy Ripe Banana</span>} />,
              <DropdownMenuItem key="o" value="orange" child={<span>🍊 Juicy Sweet Orange</span>} />,
              <DropdownMenuItem key="g" value="grape" child={<span>🍇 Purple Table Grape</span>} />
            ]}
          />
          <div className="mt-4 text-xs font-mono text-center text-primary font-bold">
            Selected value: {val.toUpperCase()}
          </div>
        </div>
      );
    },
    generateCode: (states) => `import { DropdownButton, DropdownMenuItem } from "@/components/ui/dropdown-button";

const [fruit, setFruit] = useState("apple");

<DropdownButton
  value={fruit}
  onChanged={setFruit}
  filled={${states.filled}}
  preferUp={${states.preferUp}}
  items={[
    <DropdownMenuItem key="1" value="apple" child={<span>🍎 Apple</span>} />,
    <DropdownMenuItem key="2" value="banana" child={<span>🍌 Banana</span>} />
  ]}
/>`
  },
  {
    id: "inkwell-gestures",
    name: "InkWell & GestureDetector",
    description: "Provides material ink splash ripple feedback (InkWell) or raw multi-gesture detections (clicks, double clicks, long clicks, hover triggers).",
    category: "interactive",
    controls: [],
    renderPreview: () => {
      const [gestureLog, setGestureLog] = React.useState("No gestured action yet");
      return (
        <Column className="w-80 gap-5 p-5 border border-border bg-card rounded-xl shadow-md">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">Ripple & Gesture bounds</span>
          
          {/* InkWell */}
          <InkWell 
            onTap={() => setGestureLog("InkWell Tap (Material Ripple!)")}
            className="w-full h-16 border border-primary/25 bg-primary/5 flex items-center justify-center cursor-pointer transition-all hover:bg-primary/10 rounded-xl"
          >
            <span className="text-xs font-bold text-primary">InkWell (Ripple Splash!)</span>
          </InkWell>

          {/* GestureDetector */}
          <GestureDetector 
            onTap={() => setGestureLog("GestureDetector: Single Tap")}
            onDoubleTap={() => setGestureLog("GestureDetector: Double Tap 🚀")}
            onLongPress={() => setGestureLog("GestureDetector: Long Press 🔒")}
          >
            <div className="w-full h-16 border border-border bg-accent/25 rounded-xl flex flex-col items-center justify-center cursor-pointer select-none text-xs font-semibold hover:border-foreground/45 transition">
              <span>GestureDetector Box</span>
              <span className="text-[10px] text-muted-foreground mt-0.5">(Tap, DoubleTap, LongPress)</span>
            </div>
          </GestureDetector>

          <div className="p-2.5 bg-black/45 rounded-lg text-[10px] font-mono text-center text-emerald-400 border border-border/80">
            LOG: {gestureLog}
          </div>
        </Column>
      );
    },
    generateCode: () => `import { InkWell } from "@/components/ui/ink-well";
import { GestureDetector } from "@/components/ui/gesture-detector";

// InkWell
<InkWell onTap={() => console.log("Tapped!")} className="rounded-xl">
  <div>Ripple Box</div>
</InkWell>

// GestureDetector
<GestureDetector 
  onTap={() => {}}
  onDoubleTap={() => {}}
  onLongPress={() => {}}
>
  <div>Gesture Target</div>
</GestureDetector>`
  },

  // ─── 6. FORM FIELDS & INPUTS ───────────────────────────────────────────────
  {
    id: "textfield",
    name: "TextField & Inputs",
    description: "Text input controllers with stylized labels, hints, prefixes, validator warning error blocks, and shapes.",
    category: "input",
    controls: [
      { name: "label", label: "Field Title Label", type: "text", defaultValue: "User Email Address" },
      { name: "error", label: "Validator Error Text", type: "text", defaultValue: "" },
      { name: "filled", label: "Filled background input", type: "toggle", defaultValue: false }
    ],
    renderPreview: (states) => (
      <div className="w-80 p-5 bg-card border border-border rounded-xl shadow-md">
        <TextField
          label={states.label}
          hintText="Enter your valid email address..."
          errorText={states.error || undefined}
          filled={states.filled}
          borderRadius={8}
          prefixIcon={<span className="text-xs px-2 text-muted-foreground">✉️</span>}
          suffixIcon={<span className="text-xs px-2 text-primary cursor-pointer font-bold">Verify</span>}
          className="text-xs"
        />
      </div>
    ),
    generateCode: (states) => `import { TextField } from "@/components/ui/text-field";

<TextField
  label="${states.label}"
  hintText="Enter your valid email address..."
  errorText={${states.error ? `"${states.error}"` : "undefined"}}
  filled={${states.filled}}
  borderRadius={8}
  prefixIcon={<span>✉️</span>}
/>`
  },
  {
    id: "checkbox",
    name: "Checkbox & ListTile",
    description: "Selection checkboxes and high-level CheckboxListTile selectors linking title/subtitles to dynamic boolean switches.",
    category: "input",
    controls: [
      { name: "dense", label: "Dense row padding", type: "toggle", defaultValue: true }
    ],
    renderPreview: (states) => {
      const [cb1, setCb1] = React.useState(true);
      const [cb2, setCb2] = React.useState(false);
      return (
        <div className="w-80 bg-card rounded-xl border border-border shadow-md divide-y divide-border overflow-hidden">
          <CheckboxListTile
            title="Enable Cloud Backups"
            subtitle="Sync records on save triggers"
            value={cb1}
            onChanged={setCb1}
            dense={states.dense}
            activeColor="#a78bfa"
          />
          <CheckboxListTile
            title="Biometric Fingerprint Lock"
            subtitle="Enforces security login auth"
            value={cb2}
            onChanged={setCb2}
            dense={states.dense}
            activeColor="#f472b6"
          />
          <div className="p-4 flex items-center justify-between text-xs bg-accent/25">
            <span className="text-muted-foreground flex items-center gap-2">
              <Checkbox value={cb1} onChanged={setCb1} /> Standard Checkbox
            </span>
            <span className="font-mono font-bold text-primary">
              C1: {cb1 ? "YES" : "NO"} | C2: {cb2 ? "YES" : "NO"}
            </span>
          </div>
        </div>
      );
    },
    generateCode: (states) => `import { CheckboxListTile } from "@/components/ui/checkbox-list-tile";
import { Checkbox } from "@/components/ui/checkbox";

// CheckboxListTile
<CheckboxListTile
  title="Enable Cloud Backups"
  subtitle="Sync records on save triggers"
  value={checkedState}
  onChanged={setCheckedState}
  dense={${states.dense}}
/>

// Checkbox
<Checkbox value={checkedState} onChanged={setCheckedState} />`
  },
  {
    id: "switch",
    name: "Switch",
    description: "Slide toggle switches mapping selection triggers. Replicates material switches.",
    category: "input",
    controls: [
      { name: "activeColor", label: "Active switch thumb color", type: "color", defaultValue: "#10b981" }
    ],
    renderPreview: (states) => {
      const [sw, setSw] = React.useState(true);
      return (
        <div className="w-80 p-5 bg-card border border-border rounded-xl shadow-md flex justify-between items-center">
          <Column className="gap-0.5">
            <span className="text-xs font-bold text-foreground">Sandbox Live reload</span>
            <span className="text-[10px] text-muted-foreground">Enables hot refresh signals</span>
          </Column>
          
          <Switch 
            value={sw} 
            onChanged={setSw}
            activeColor={states.activeColor} 
          />
        </div>
      );
    },
    generateCode: (states) => `import { Switch } from "@/components/ui/switch";

<Switch 
  value={switchState} 
  onChanged={setSwitchState}
  activeColor="${states.activeColor}" 
/>`
  },
  {
    id: "slider",
    name: "Slider",
    description: "Range slider controls displaying specific custom thumb progress positions and colors.",
    category: "input",
    controls: [
      { name: "activeColor", label: "Active track color", type: "color", defaultValue: "#8b5cf6" },
      { name: "min", label: "Range Minimum bounds", type: "range", defaultValue: 0, min: 0, max: 20 },
      { name: "max", label: "Range Maximum bounds", type: "range", defaultValue: 100, min: 50, max: 200 }
    ],
    renderPreview: (states) => {
      const [val, setVal] = React.useState(60);
      return (
        <div className="w-80 p-5 bg-card border border-border rounded-xl shadow-md space-y-3">
          <Row mainAxisAlignment={MainAxisAlignment.spaceBetween} className="w-full text-xs font-mono text-muted-foreground">
            <span>Dynamic Slider</span>
            <span className="text-primary font-bold">{Math.round(val)}</span>
          </Row>
          <Slider 
            value={val} 
            onChanged={setVal} 
            min={states.min} 
            max={states.max}
            activeColor={states.activeColor}
          />
          <div className="text-[10px] text-center text-muted-foreground font-mono">Range: [{states.min} - {states.max}]</div>
        </div>
      );
    },
    generateCode: (states) => `import { Slider } from "@/components/ui/slider";

<Slider 
  value={sliderValue} 
  onChanged={setSliderValue} 
  min={${states.min}} 
  max={${states.max}}
  activeColor="${states.activeColor}"
/>`
  },

  // ─── 7. BADGES, CHIPS & AVATARS ────────────────────────────────────────────
  {
    id: "badge",
    name: "Badges & Count Overlays",
    description: "Renders notification overlays or tiny status bubbles on parent child elements.",
    category: "badge",
    controls: [
      { name: "badgeText", label: "Badge Label string", type: "text", defaultValue: "99+" },
      { name: "badgeColor", label: "Badge color swatch", type: "color", defaultValue: "#ef4444" }
    ],
    renderPreview: (states) => (
      <div className="w-85 p-5 border border-border bg-card rounded-xl shadow flex items-center justify-center gap-6">
        {/* Count Overlap Badge */}
        <div className="relative">
          <div className="w-12 h-12 bg-accent/40 border border-border rounded-xl flex items-center justify-center text-xl shadow-inner">
            ✉️
          </div>
          <BadgeCount 
            count={states.badgeText} 
            color={states.badgeColor} 
            className="absolute -top-2 -right-2 font-mono text-[9px] shadow-md border-2 border-card"
          />
        </div>

        {/* Inline Badge */}
        <Row className="gap-2.5 items-center">
          <Badge color={states.badgeColor} className="text-white text-[10px] font-bold tracking-wide uppercase px-2.5 py-0.5 rounded-full">
            {states.badgeText}
          </Badge>
          <span className="text-xs text-muted-foreground font-medium">Standard badge status</span>
        </Row>
      </div>
    ),
    generateCode: (states) => `import { Badge } from "@/components/ui/badge";
import { BadgeCount } from "@/components/ui/badge-count";

// BadgeCount Notification Overlay
<div className="relative">
  <div className="mailbox">✉️</div>
  <BadgeCount count="${states.badgeText}" color="${states.badgeColor}" />
</div>

// Inline Badge Label
<Badge color="${states.badgeColor}">
  ${states.badgeText}
</Badge>`
  },
  {
    id: "chip",
    name: "Chip",
    description: "Compact pills representing tags, filters, and attributes. Supports dynamic avatar leadings and click-dismiss controls.",
    category: "badge",
    controls: [
      { name: "label", label: "Chip Text Label", type: "text", defaultValue: "Software Developer" },
      { name: "selected", label: "Selected Active status", type: "toggle", defaultValue: true },
      { name: "showDelete", label: "Show Delete Action Icon", type: "toggle", defaultValue: true }
    ],
    renderPreview: (states) => (
      <div className="p-4 border border-dashed border-border/80 rounded-xl bg-card/25">
        <Chip
          label={states.label}
          selected={states.selected}
          onDeleted={states.showDelete ? () => alert("Delete chip tapped!") : undefined}
          avatar={<CircularAvatar initials={states.label[0]} radius={10} backgroundColor="#a78bfa" />}
          className="shadow transition"
        />
      </div>
    ),
    generateCode: (states) => `import { Chip } from "@/components/ui/chip";
import { CircularAvatar } from "@/components/ui/circular-avatar";

<Chip
  label="${states.label}"
  selected={${states.selected}}
  onDeleted={${states.showDelete ? "() => {}" : "undefined"}}
  avatar={<CircularAvatar initials="${states.label[0]}" radius={10} />}
/>`
  },
  {
    id: "circularavatar",
    name: "CircularAvatar",
    description: "Circular avatar container displaying user letter initials, fallback colors, or high-fidelity user images.",
    category: "badge",
    controls: [
      { name: "radius", label: "Avatar Radius (px)", type: "range", defaultValue: 26, min: 12, max: 48 },
      { name: "text", label: "Initials letters fallback", type: "text", defaultValue: "GS" },
      { name: "image", label: "Custom profile image link", type: "text", defaultValue: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" }
    ],
    renderPreview: (states) => (
      <div className="w-80 p-5 bg-card border border-border rounded-xl shadow flex flex-col items-center gap-4">
        <CircularAvatar
          radius={states.radius}
          initials={states.text}
          backgroundImage={states.image || undefined}
          backgroundColor="#3b82f6"
          className="shadow-lg border-2 border-primary/20"
        />
        <span className="text-[10px] font-mono text-muted-foreground">Radius specified: {states.radius}px</span>
      </div>
    ),
    generateCode: (states) => `import { CircularAvatar } from "@/components/ui/circular-avatar";

<CircularAvatar
  radius={${states.radius}}
  initials="${states.text}"
  backgroundImage="${states.image}"
  backgroundColor="#3b82f6"
/>`
  },

  // ─── 8. PROGRESS & INDICATORS ──────────────────────────────────────────────
  {
    id: "progressindicators",
    name: "Progress Indicators",
    description: "Sleek circular spinners and linear load bars displaying loading progressions dynamically.",
    category: "progress",
    controls: [
      { name: "indeterminate", label: "Spin Indeterminate mode", type: "toggle", defaultValue: false },
      { name: "value", label: "Indicator percentage", type: "range", defaultValue: 70, min: 0, max: 100 },
      { name: "strokeWidth", label: "Circular Stroke Width", type: "range", defaultValue: 4, min: 2, max: 8 }
    ],
    renderPreview: (states) => (
      <Column className="w-80 gap-6 p-5 border border-border rounded-xl bg-card shadow-md">
        <Row mainAxisAlignment={MainAxisAlignment.spaceAround} className="w-full items-center">
          <CircularProgressIndicator
            size={48}
            strokeWidth={states.strokeWidth}
            color="#ec4899"
          />
          <div className="space-y-1 text-center">
            <span className="text-xs font-mono text-muted-foreground block">Circular Progress</span>
            <span className="text-xs font-bold font-mono text-pink-500">SPINNING...</span>
          </div>
        </Row>

        <div className="space-y-2 border-t border-border/80 pt-4">
          <span className="text-xs font-mono text-muted-foreground block">Linear Progress Bar:</span>
          <ProgressBar 
            value={states.indeterminate ? undefined : states.value / 100} 
            color="#3b82f6"
            backgroundColor="hsl(var(--accent))"
            minHeight={6}
            borderRadius={999}
          />
        </div>
      </Column>
    ),
    generateCode: (states) => `import { CircularProgressIndicator } from "@/components/ui/circular-progress-indicator";
import { ProgressBar } from "@/components/ui/progress-bar";

// Circular Loader
<CircularProgressIndicator
  size={48}
  strokeWidth={${states.strokeWidth}}
  color="#ec4899"
/>

// Linear Progress Bar
<ProgressBar
  value={${states.indeterminate ? "undefined" : states.value / 100}}
  color="#3b82f6"
  minHeight={6}
/>`
  },
  {
    id: "skeleton",
    name: "Skeleton Loader",
    description: "A placeholder loader representing bones structure mockup during loading states. Replicates skeleton loader arrays.",
    category: "progress",
    controls: [
      { name: "active", label: "Animate Pulsing glow", type: "toggle", defaultValue: true }
    ],
    renderPreview: (states) => (
      <div className="w-80 p-5 bg-card border border-border rounded-xl shadow-md">
        <Row className="gap-3.5 items-center w-full">
          <Skeleton 
            width={48} 
            height={48} 
            borderRadius={9999} 
            className={states.active ? "animate-pulse" : ""} 
          />
          <Column className="flex-1 gap-2">
            <Skeleton 
              width="80%" 
              height={12} 
              className={states.active ? "animate-pulse" : ""} 
            />
            <Skeleton 
              width="50%" 
              height={8} 
              className={states.active ? "animate-pulse" : ""} 
            />
          </Column>
        </Row>
      </div>
    ),
    generateCode: (states) => `import { Skeleton } from "@/components/ui/skeleton";
import { Row } from "@/components/ui/row";
import { Column } from "@/components/ui/column";

<Row className="gap-4">
  <Skeleton width={48} height={48} borderRadius={9999} />
  <Column className="flex-1 gap-2">
    <Skeleton width="80%" height={12} />
    <Skeleton width="50%" height={8} />
  </Column>
</Row>`
  },

  // ─── 9. OVERLAYS & DIALOGS ─────────────────────────────────────────────────
  {
    id: "tooltip",
    name: "Tooltip",
    description: "Injects floating contextual tip descriptions when a mouse hovers over targeted child elements.",
    category: "overlay",
    controls: [
      { name: "message", label: "Tooltip message tip text", type: "text", defaultValue: "Tapping triggers system save functions instantly!" }
    ],
    renderPreview: (states) => (
      <div className="w-80 h-32 border border-border bg-card rounded-xl shadow flex items-center justify-center">
        <Tooltip message={states.message} side="top">
          <button className="px-5 py-2.5 text-xs font-bold rounded-lg bg-primary text-primary-foreground shadow hover:bg-primary/95 transition">
            Hover Mouse Cursor Here
          </button>
        </Tooltip>
      </div>
    ),
    generateCode: (states) => `import { Tooltip } from "@/components/ui/tooltip";

<Tooltip message="${states.message}" side="top">
  <button>Hover Mouse Cursor</button>
</Tooltip>`
  },
  {
    id: "dialog",
    name: "Dialog Modals",
    description: "Standard material dialog overlays for system notifications, warnings, alerts, or details grids.",
    category: "overlay",
    controls: [],
    renderPreview: () => {
      const [show, setShow] = React.useState(false);
      return (
        <div className="w-80 h-36 border border-dashed border-border/80 rounded-xl bg-card/10 flex items-center justify-center">
          <button 
            onClick={() => setShow(true)}
            className="px-5 py-2.5 bg-rose-500 text-white font-bold rounded-lg text-xs shadow hover:bg-rose-600 transition"
          >
            Launch System Alert Dialog
          </button>

          {show && (
            <div className="absolute inset-0 bg-black/60 z-50 flex items-center justify-center p-5 animate-in fade-in duration-200">
              <AlertDialog
                isOpen={show}
                onClose={() => setShow(false)}
                title={
                  <Row className="gap-2 items-center text-rose-500">
                    <AlertTriangle size={18} />
                    <span className="font-outfit font-bold">Destructive Action Alert</span>
                  </Row>
                }
                content={
                  <Text variant="bodyMedium" className="text-muted-foreground leading-relaxed mt-2.5">
                    Are you absolutely sure you want to completely drop these records tables? This operation is permanent.
                  </Text>
                }
                actions={[
                  <button 
                    key="c" 
                    onClick={() => setShow(false)}
                    className="px-3.5 py-1.5 border border-border text-xs font-semibold rounded hover:bg-accent"
                  >
                    Cancel Action
                  </button>,
                  <button 
                    key="o" 
                    onClick={() => { setShow(false); alert("Action Verified!"); }}
                    className="px-4 py-1.5 bg-rose-500 text-white text-xs font-bold rounded hover:bg-rose-600 shadow"
                  >
                    Verify Delete
                  </button>
                ]}
              />
            </div>
          )}
        </div>
      );
    },
    generateCode: () => `import { AlertDialog } from "@/components/ui/dialog";

// Call AlertDialog under portals or state gates:
<AlertDialog
  isOpen={show}
  onClose={close}
  title={<span>Verify Action</span>}
  content={<span>Are you sure you want to drop these tables?</span>}
  actions={[
    <button onClick={close}>Cancel</button>,
    <button onClick={confirm}>Proceed</button>
  ]}
/>`
  },
  {
    id: "overlayprovider",
    name: "OverlayProvider",
    description: "Context overlay providers allowing portal injection displays of floating components (tooltips, dropdowns, alerts).",
    category: "overlay",
    controls: [],
    renderPreview: () => (
      <div className="w-80 p-5 bg-card border border-border rounded-xl shadow-md text-center">
        <OverlayProvider />
        <span className="text-xs font-semibold text-primary block mb-2">Portal Overlay System Active</span>
        <div className="p-3.5 bg-accent/40 rounded-lg border border-border text-[11px] text-muted-foreground leading-relaxed">
          Standard overlay context provider powering portal menus, alerts, and custom float lists outside normal DOM hierarchies.
        </div>
      </div>
    ),
    generateCode: () => `import { OverlayProvider } from "@/components/ui/overlay-provider";

// Wrap your main App.tsx layout to enable portal elements:
<OverlayProvider />`
  },

  // ─── 10. DISPLAY & UTILITIES ───────────────────────────────────────────────
  {
    id: "text-media",
    name: "Text & Media",
    description: "Typography display (using dynamic preset variants, maximum lines limit, and text overflows) and images fitting bounds.",
    category: "utility",
    controls: [
      { name: "variant", label: "Text Font Variant", type: "select", defaultValue: "titleLarge", options: ["headlineMedium", "titleLarge", "bodyLarge", "bodyMedium", "bodySmall"] },
      { name: "imageFit", label: "Image BoxFit Fit", type: "select", defaultValue: "cover", options: ["cover", "contain", "fill", "none"] }
    ],
    renderPreview: (states) => (
      <Column className="w-80 gap-4 p-5 border border-border bg-card rounded-xl shadow-md">
        {/* Dynamic Text */}
        <div className="space-y-1">
          <span className="text-[10px] font-mono text-muted-foreground block">Typography Widget:</span>
          <Text variant={states.variant} className="text-primary font-bold">
            Typography Variant: {states.variant}
          </Text>
        </div>

        {/* Image fit */}
        <div className="space-y-2 border-t border-border/80 pt-3">
          <span className="text-[10px] font-mono text-muted-foreground block">Image Fit ({states.imageFit}):</span>
          <div className="w-full h-24 rounded-lg overflow-hidden border border-border bg-accent/25">
            <Image 
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80" 
              alt="Unsplash Showcase"
              fit={states.imageFit}
              className="w-full h-full"
            />
          </div>
        </div>
      </Column>
    ),
    generateCode: (states) => `import { Text } from "@/components/ui/text";
import { Image } from "@/components/ui/image";

// Text Styling
<Text variant="${states.variant}" className="text-primary">
  Styled Text Block
</Text>

// Image Fits
<Image 
  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe"
  fit="${states.imageFit}" 
/>`
  },
  {
    id: "dividers",
    name: "Dividers & Separators",
    description: "Visual separations including horizontal Dividers, dashed Separators, and VerticalDividers.",
    category: "utility",
    controls: [
      { name: "thickness", label: "Divider Thickness (px)", type: "range", defaultValue: 2, min: 1, max: 8 }
    ],
    renderPreview: (states) => (
      <Column className="w-80 gap-4 p-5 border border-border bg-card rounded-xl shadow-md justify-center">
        <div>
          <span className="text-[10px] font-mono text-muted-foreground block mb-2">Horizontal Divider (t={states.thickness}px):</span>
          <div className="p-2 bg-accent/25 rounded">
            <span>Upper Content Block</span>
            <Divider thickness={states.thickness} color="#8b5cf6" className="my-2" />
            <span>Lower Content Block</span>
          </div>
        </div>

        <div>
          <span className="text-[10px] font-mono text-muted-foreground block mb-2">Dashed Separator:</span>
          <div className="p-2 bg-accent/25 rounded">
            <span>Dashed Segment A</span>
            <Separator orientation="horizontal" color="#e2e8f0" className="my-2" />
            <span>Dashed Segment B</span>
          </div>
        </div>

        <div className="h-20 bg-accent/25 rounded p-2">
          <span className="text-[10px] font-mono text-muted-foreground block mb-1">VerticalDivider:</span>
          <Row className="h-10 items-center justify-around">
            <span className="text-xs">Col A</span>
            <VerticalDivider thickness={states.thickness} color="#ec4899" className="mx-2" />
            <span className="text-xs">Col B</span>
          </Row>
        </div>
      </Column>
    ),
    generateCode: (states) => `import { Divider } from "@/components/ui/divider";
import { Separator } from "@/components/ui/separator";
import { VerticalDivider } from "@/components/ui/vertical-divider";

// Horizontal Divider
<Divider thickness={${states.thickness}} color="#8b5cf6" />

// Dashed Separator
<Separator orientation="horizontal" />

// Vertical Divider
<VerticalDivider thickness={${states.thickness}} color="#ec4899" />`
  },
  {
    id: "colors-palette",
    name: "Theme & Colors Palette",
    description: "Interactive display of Flutter ARGB color tokens. Tap standard colors to copy hex coordinates instantly.",
    category: "utility",
    controls: [],
    renderPreview: () => {
      const colorSamples = [
        { name: "Colors.red", color: Colors.red },
        { name: "Colors.blue", color: Colors.blue },
        { name: "Colors.green", color: Colors.green },
        { name: "Colors.orange", color: Colors.orange },
        { name: "Colors.purple", color: Colors.purple },
        { name: "Colors.indigo", color: Colors.indigo },
        { name: "Colors.teal", color: Colors.teal },
        { name: "Colors.amber", color: Colors.amber }
      ];
      return (
        <Column className="w-80 gap-3 p-5 border border-border bg-card rounded-xl shadow-md">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">Flutter Color Tokens</span>
          <div className="grid grid-cols-4 gap-2 pt-1">
            {colorSamples.map((samp, i) => {
              const hexVal = samp.color.toHex();
              return (
                <div 
                  key={i} 
                  title={`Copy ${samp.name} (${hexVal})`}
                  onClick={() => {
                    navigator.clipboard.writeText(hexVal);
                    alert(`Copied ${samp.name} hex code: ${hexVal}`);
                  }}
                  className="group cursor-pointer flex flex-col items-center gap-1 hover:scale-110 transition-transform"
                >
                  <div 
                    className="w-10 h-10 rounded-full border border-border shadow-md group-hover:ring-2 ring-primary/40"
                    style={{ backgroundColor: hexVal }}
                  />
                  <span className="text-[8px] font-semibold text-muted-foreground truncate max-w-full text-center">{samp.name.split(".")[1]}</span>
                </div>
              );
            })}
          </div>
          <div className="text-[9px] text-center text-muted-foreground/80 mt-2 font-mono">
            Click color circles to copy hex code values instantly!
          </div>
        </Column>
      );
    },
    generateCode: () => `import { Colors } from "@/components/ui/Colors";

// Access hex value or ARGB details anywhere:
const primaryHex = Colors.blue.toHex(); // "#2196f3"
const semiTransRed = Colors.red.withOpacity(0.5).toRgba(); // "rgba(244, 67, 54, 0.5)"`
  }
];
