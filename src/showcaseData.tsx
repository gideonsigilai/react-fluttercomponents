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
import { Sidebar, SidebarHeader, SidebarBody } from "./components/ui/sidebar";
import { SmartDrawer, SmartDrawerTile } from "./components/ui/smart-drawer";

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
import { Border, EdgeInsets as EdgeInsetsUtil } from "./components/ui/flutter-style";

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
        alignment="center"
        className="shadow-lg transition-all"
      >
        <Text variant="bodyLarge" style={{ color: "white", fontWeight: "bold", letterSpacing: "0.05em", textAlign: "center" }}>
          Container Box
        </Text>
        <Text variant="bodySmall" style={{ color: "white", opacity: 0.85 }}>
          {states.width}x{states.height}px
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
  alignment="center"
  className="shadow-lg transition-all"
>
  <Text variant="bodyLarge" style={{ color: "white", fontWeight: "bold", letterSpacing: "0.05em", textAlign: "center" }}>
    Container Box
  </Text>
  <Text variant="bodySmall" style={{ color: "white", opacity: 0.85 }}>
    {${states.width}}x{${states.height}}px
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
        width={320}
        padding={24}
        color="hsl(var(--card))"
        style={{ border: "1px solid hsl(var(--border))" }}
      >
        <Column crossAxisAlignment={CrossAxisAlignment.start} gap={12}>
          <Row mainAxisAlignment={MainAxisAlignment.spaceBetween}>
            <Badge style={{ fontSize: 10, color: "white", backgroundColor: "#3b82f6" }}>Flutter style</Badge>
            <Text variant="bodySmall" style={{ color: "hsl(var(--muted-foreground))" }}>Elevated Card</Text>
          </Row>
          <Text variant="titleLarge" style={{ fontFamily: "Outfit", fontWeight: 600 }}>
            Tactile Depth Card
          </Text>
          <Text variant="bodyMedium" style={{ color: "hsl(var(--muted-foreground))", lineHeight: 1.6 }}>
            Cards mimic physical sheets of paper with an elevation class determining drop shadow sizes.
          </Text>
        </Column>
      </Card>
    ),
    generateCode: (states) => `import { Card } from "@/components/ui/card";
import { Column } from "@/components/ui/column";
import { Row } from "@/components/ui/row";
import { Badge } from "@/components/ui/badge";
import { Text } from "@/components/ui/text";
import { MainAxisAlignment, CrossAxisAlignment } from "@/components/ui/layout-types";

<Card
  elevation={${states.elevation}}
  margin={${states.margin}}
  width={320}
  padding={24}
  color="hsl(var(--card))"
  style={{ border: "1px solid hsl(var(--border))" }}
>
  <Column crossAxisAlignment={CrossAxisAlignment.start} gap={12}>
    <Row mainAxisAlignment={MainAxisAlignment.spaceBetween}>
      <Badge style={{ fontSize: 10, color: "white", backgroundColor: "#3b82f6" }}>Flutter style</Badge>
      <Text variant="bodySmall" style={{ color: "hsl(var(--muted-foreground))" }}>Elevated Card</Text>
    </Row>
    <Text variant="titleLarge" style={{ fontFamily: "Outfit", fontWeight: 600 }}>
      Tactile Depth Card
    </Text>
    <Text variant="bodyMedium" style={{ color: "hsl(var(--muted-foreground))", lineHeight: 1.6 }}>
      Cards mimic physical sheets of paper with an elevation class determining drop shadow sizes.
    </Text>
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
      <Container
        border={{
          top: { color: "hsl(var(--border) / 0.8)", width: 1, style: "dashed" },
          bottom: { color: "hsl(var(--border) / 0.8)", width: 1, style: "dashed" },
          left: { color: "hsl(var(--border) / 0.8)", width: 1, style: "dashed" },
          right: { color: "hsl(var(--border) / 0.8)", width: 1, style: "dashed" }
        }}
        borderRadius={12}
        color="hsl(var(--card) / 0.2)"
      >
        <Padding padding={{ top: states.top, bottom: states.bottom, left: states.left, right: states.right }}>
          <Container
            color="hsl(var(--primary) / 0.2)"
            border={{
              top: { color: "hsl(var(--primary) / 0.3)", width: 1 },
              bottom: { color: "hsl(var(--primary) / 0.3)", width: 1 },
              left: { color: "hsl(var(--primary) / 0.3)", width: 1 },
              right: { color: "hsl(var(--primary) / 0.3)", width: 1 }
            }}
            padding={16}
            borderRadius={8}
            alignment="center"
          >
            <Text variant="bodySmall" style={{ color: "hsl(var(--primary))", fontFamily: "monospace", fontWeight: "bold" }}>
              Padded Box (T:{states.top} R:{states.right} B:{states.bottom} L:{states.left})
            </Text>
          </Container>
        </Padding>
      </Container>
    ),
    generateCode: (states) => `import { Padding } from "@/components/ui/padding";
import { Container } from "@/components/ui/container";
import { Text } from "@/components/ui/text";

<Container
  border={{
    top: { color: "hsl(var(--border) / 0.8)", width: 1, style: "dashed" },
    bottom: { color: "hsl(var(--border) / 0.8)", width: 1, style: "dashed" },
    left: { color: "hsl(var(--border) / 0.8)", width: 1, style: "dashed" },
    right: { color: "hsl(var(--border) / 0.8)", width: 1, style: "dashed" }
  }}
  borderRadius={12}
  color="hsl(var(--card) / 0.2)"
>
  <Padding padding={{ top: ${states.top}, bottom: ${states.bottom}, left: ${states.left}, right: ${states.right} }}>
    <Container
      color="hsl(var(--primary) / 0.2)"
      border={{
        top: { color: "hsl(var(--primary) / 0.3)", width: 1 },
        bottom: { color: "hsl(var(--primary) / 0.3)", width: 1 },
        left: { color: "hsl(var(--primary) / 0.3)", width: 1 },
        right: { color: "hsl(var(--primary) / 0.3)", width: 1 }
      }}
      padding={16}
      borderRadius={8}
      alignment="center"
    >
      <Text variant="bodySmall" style={{ color: "hsl(var(--primary))", fontFamily: "monospace", fontWeight: "bold" }}>
        Padded Box (T:${states.top} R:${states.right} B:${states.bottom} L:${states.left})
      </Text>
    </Container>
  </Padding>
</Container>`
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
      <Container
        width={320}
        height={176}
        border={{
          top: { color: "hsl(var(--border) / 0.8)", width: 1, style: "dashed" },
          bottom: { color: "hsl(var(--border) / 0.8)", width: 1, style: "dashed" },
          left: { color: "hsl(var(--border) / 0.8)", width: 1, style: "dashed" },
          right: { color: "hsl(var(--border) / 0.8)", width: 1, style: "dashed" }
        }}
        borderRadius={12}
        color="hsl(var(--card) / 0.1)"
        padding={6}
        className="relative"
      >
        <Align alignment={states.alignment}>
          <Container
            width={48}
            height={48}
            color="#ec4899"
            borderRadius={8}
            alignment="center"
            style={{ boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}
          >
            <Text variant="titleLarge" style={{ color: "white" }}>🎯</Text>
          </Container>
        </Align>
      </Container>
    ),
    generateCode: (states) => `import { Align } from "@/components/ui/align";
import { Container } from "@/components/ui/container";
import { Text } from "@/components/ui/text";
import { Alignment } from "@/components/ui/layout-types";

<Container
  width={320}
  height={176}
  border={{
    top: { color: "hsl(var(--border) / 0.8)", width: 1, style: "dashed" },
    bottom: { color: "hsl(var(--border) / 0.8)", width: 1, style: "dashed" },
    left: { color: "hsl(var(--border) / 0.8)", width: 1, style: "dashed" },
    right: { color: "hsl(var(--border) / 0.8)", width: 1, style: "dashed" }
  }}
  borderRadius={12}
  color="hsl(var(--card) / 0.1)"
  padding={6}
  style={{ position: "relative" }}
>
  <Align alignment={Alignment.${Object.keys(Alignment).find(k => Alignment[k] === states.alignment)}}>
    <Container
      width={48}
      height={48}
      color="#ec4899"
      borderRadius={8}
      alignment="center"
      style={{ boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}
    >
      <Text variant="titleLarge" style={{ color: "white" }}>🎯</Text>
    </Container>
  </Align>
</Container>`
  },
  {
    id: "center",
    name: "Center",
    description: "A convenience layout widget that automatically centers its child within itself.",
    category: "layout",
    controls: [],
    renderPreview: () => (
      <Container
        width={320}
        height={160}
        border={{
          top: { color: "hsl(var(--border) / 0.8)", width: 1, style: "dashed" },
          bottom: { color: "hsl(var(--border) / 0.8)", width: 1, style: "dashed" },
          left: { color: "hsl(var(--border) / 0.8)", width: 1, style: "dashed" },
          right: { color: "hsl(var(--border) / 0.8)", width: 1, style: "dashed" }
        }}
        borderRadius={12}
        color="hsl(var(--card) / 0.1)"
      >
        <Center>
          <Container
            color="#6366f1"
            padding={20}
            borderRadius={12}
            elevation={4}
          >
            <Text variant="bodyMedium" style={{ color: "white", fontWeight: "bold" }}>
              Perfect Center Widget
            </Text>
          </Container>
        </Center>
      </Container>
    ),
    generateCode: () => `import { Center } from "@/components/ui/center";
import { Container } from "@/components/ui/container";
import { Text } from "@/components/ui/text";

<Container
  width={320}
  height={160}
  border={{
    top: { color: "hsl(var(--border) / 0.8)", width: 1, style: "dashed" },
    bottom: { color: "hsl(var(--border) / 0.8)", width: 1, style: "dashed" },
    left: { color: "hsl(var(--border) / 0.8)", width: 1, style: "dashed" },
    right: { color: "hsl(var(--border) / 0.8)", width: 1, style: "dashed" }
  }}
  borderRadius={12}
  color="hsl(var(--card) / 0.1)"
>
  <Center>
    <Container
      color="#6366f1"
      padding={20}
      borderRadius={12}
      style={{ boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}
    >
      <Text variant="bodyMedium" style={{ color: "white", fontWeight: "bold" }}>
        Perfect Center Widget
      </Text>
    </Container>
  </Center>
</Container>`
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
      <Container
        padding={16}
        border={{
          top: { color: "hsl(var(--border) / 0.8)", width: 1, style: "dashed" },
          bottom: { color: "hsl(var(--border) / 0.8)", width: 1, style: "dashed" },
          left: { color: "hsl(var(--border) / 0.8)", width: 1, style: "dashed" },
          right: { color: "hsl(var(--border) / 0.8)", width: 1, style: "dashed" }
        }}
        borderRadius={12}
        color="hsl(var(--card) / 0.1)"
      >
        <SizedBox width={states.width} height={states.height}>
          <Container
            color="hsl(var(--primary) / 0.25)"
            border={{
              top: { color: "hsl(var(--primary) / 0.5)", width: 1 },
              bottom: { color: "hsl(var(--primary) / 0.5)", width: 1 },
              left: { color: "hsl(var(--primary) / 0.5)", width: 1 },
              right: { color: "hsl(var(--primary) / 0.5)", width: 1 }
            }}
            borderRadius={8}
            alignment="center"
            style={{ width: "100%", height: "100%" }}
          >
            <Text variant="bodySmall" style={{ color: "hsl(var(--primary))", fontFamily: "monospace", fontWeight: "bold" }}>
              {states.width}x{states.height}
            </Text>
          </Container>
        </SizedBox>
      </Container>
    ),
    generateCode: (states) => `import { SizedBox } from "@/components/ui/sized-box";
import { Container } from "@/components/ui/container";
import { Text } from "@/components/ui/text";

<Container
  padding={16}
  border={{
    top: { color: "hsl(var(--border) / 0.8)", width: 1, style: "dashed" },
    bottom: { color: "hsl(var(--border) / 0.8)", width: 1, style: "dashed" },
    left: { color: "hsl(var(--border) / 0.8)", width: 1, style: "dashed" },
    right: { color: "hsl(var(--border) / 0.8)", width: 1, style: "dashed" }
  }}
  borderRadius={12}
  color="hsl(var(--card) / 0.1)"
>
  <SizedBox width={${states.width}} height={${states.height}}>
    <Container
      color="hsl(var(--primary) / 0.25)"
      border={{
        top: { color: "hsl(var(--primary) / 0.5)", width: 1 },
        bottom: { color: "hsl(var(--primary) / 0.5)", width: 1 },
        left: { color: "hsl(var(--primary) / 0.5)", width: 1 },
        right: { color: "hsl(var(--primary) / 0.5)", width: 1 }
      }}
      borderRadius={8}
      alignment="center"
      style={{ width: "100%", height: "100%" }}
    >
      <Text variant="bodySmall" style={{ color: "hsl(var(--primary))", fontFamily: "monospace", fontWeight: "bold" }}>
        ${states.width}x${states.height}
      </Text>
    </Container>
  </SizedBox>
</Container>`
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
      <Container
        width={320}
        height={128}
        borderRadius={12}
        border={{
          top: { color: "hsl(var(--border))", width: 1 },
          bottom: { color: "hsl(var(--border))", width: 1 },
          left: { color: "hsl(var(--border))", width: 1 },
          right: { color: "hsl(var(--border))", width: 1 }
        }}
        style={{ overflow: "hidden" }}
      >
        <ColoredBox color={states.color} style={{ width: "100%", height: "100%" }}>
          <Center>
            <Container
              color="rgba(0, 0, 0, 0.35)"
              padding={{ top: 8, bottom: 8, left: 16, right: 16 }}
              borderRadius={9999}
              style={{ backdropFilter: "blur(4px)" }}
            >
              <Text variant="bodySmall" style={{ color: "white", fontWeight: "bold" }}>
                ColoredBox: {states.color}
              </Text>
            </Container>
          </Center>
        </ColoredBox>
      </Container>
    ),
    generateCode: (states) => `import { ColoredBox } from "@/components/ui/colored-box";
import { Center } from "@/components/ui/center";
import { Container } from "@/components/ui/container";
import { Text } from "@/components/ui/text";

<Container
  width={320}
  height={128}
  borderRadius={12}
  border={{
    top: { color: "hsl(var(--border))", width: 1 },
    bottom: { color: "hsl(var(--border))", width: 1 },
    left: { color: "hsl(var(--border))", width: 1 },
    right: { color: "hsl(var(--border))", width: 1 }
  }}
  style={{ overflow: "hidden" }}
>
  <ColoredBox color="${states.color}" style={{ width: "100%", height: "100%" }}>
    <Center>
      <Container
        color="rgba(0, 0, 0, 0.35)"
        padding={{ top: 8, bottom: 8, left: 16, right: 16 }}
        borderRadius={9999}
        style={{ backdropFilter: "blur(4px)" }}
      >
        <Text variant="bodySmall" style={{ color: "white", fontWeight: "bold" }}>
          ColoredBox: ${states.color}
        </Text>
      </Container>
    </Center>
  </ColoredBox>
</Container>`
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
      <Container
        width={256}
        border={{
          top: { color: "hsl(var(--border) / 0.8)", width: 1, style: "dashed" },
          bottom: { color: "hsl(var(--border) / 0.8)", width: 1, style: "dashed" },
          left: { color: "hsl(var(--border) / 0.8)", width: 1, style: "dashed" },
          right: { color: "hsl(var(--border) / 0.8)", width: 1, style: "dashed" }
        }}
        padding={8}
        borderRadius={12}
        color="hsl(var(--card) / 0.1)"
      >
        <AspectRatio ratio={states.ratio}>
          <Container
            color="linear-gradient(to top right, #f59e0b, #ef4444)"
            borderRadius={8}
            alignment="center"
            style={{ width: "100%", height: "100%", background: "linear-gradient(to top right, #f59e0b, #f43f5e)" }}
          >
            <Text variant="bodyMedium" style={{ color: "white", fontWeight: "bold" }}>
              Aspect Ratio ({states.ratio === 1.77 ? "16:9" : states.ratio === 1.33 ? "4:3" : states.ratio === 1.0 ? "1:1" : "2:3"})
            </Text>
          </Container>
        </AspectRatio>
      </Container>
    ),
    generateCode: (states) => `import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Container } from "@/components/ui/container";
import { Text } from "@/components/ui/text";

<Container
  width={256}
  border={{
    top: { color: "hsl(var(--border) / 0.8)", width: 1, style: "dashed" },
    bottom: { color: "hsl(var(--border) / 0.8)", width: 1, style: "dashed" },
    left: { color: "hsl(var(--border) / 0.8)", width: 1, style: "dashed" },
    right: { color: "hsl(var(--border) / 0.8)", width: 1, style: "dashed" }
  }}
  padding={8}
  borderRadius={12}
  color="hsl(var(--card) / 0.1)"
>
  <AspectRatio ratio={${states.ratio}}>
    <Container
      alignment="center"
      style={{ width: "100%", height: "100%", background: "linear-gradient(to top right, #f59e0b, #f43f5e)" }}
    >
      <Text variant="bodyMedium" style={{ color: "white", fontWeight: "bold" }}>
        Aspect Ratio (${states.ratio === 1.77 ? "16:9" : states.ratio === 1.33 ? "4:3" : states.ratio === 1.0 ? "1:1" : "2:3"})
      </Text>
    </Container>
  </AspectRatio>
</Container>`
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
      <ClipRRect borderRadius={states.radius} style={{ boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
        <Container
          width={256}
          height={144}
          alignment="center"
          style={{ background: "linear-gradient(to top right, #2563eb, #6366f1, #9333ea)" }}
        >
          <Column crossAxisAlignment={CrossAxisAlignment.center} gap={4}>
            <Text variant="bodyMedium" style={{ color: "white", fontWeight: "bold", textAlign: "center" }}>
              Clipped Rounded Corner Box
            </Text>
            <Text variant="bodySmall" style={{ color: "white", opacity: 0.8, fontFamily: "monospace" }}>
              Radius: {states.radius}px
            </Text>
          </Column>
        </Container>
      </ClipRRect>
    ),
    generateCode: (states) => `import { ClipRRect } from "@/components/ui/clip-r-rect";
import { Container } from "@/components/ui/container";
import { Column } from "@/components/ui/column";
import { Text } from "@/components/ui/text";
import { CrossAxisAlignment } from "@/components/ui/layout-types";

<ClipRRect borderRadius={${states.radius}} style={{ boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
  <Container
    width={256}
    height={144}
    alignment="center"
    style={{ background: "linear-gradient(to top right, #2563eb, #6366f1, #9333ea)" }}
  >
    <Column crossAxisAlignment={CrossAxisAlignment.center} gap={4}>
      <Text variant="bodyMedium" style={{ color: "white", fontWeight: "bold", textAlign: "center" }}>
        Clipped Rounded Corner Box
      </Text>
      <Text variant="bodySmall" style={{ color: "white", opacity: 0.8, fontFamily: "monospace" }}>
        Radius: ${states.radius}px
      </Text>
    </Column>
  </Container>
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
      <Container 
        width="100%"
        maxWidth={448}
        padding={{ top: 12, bottom: 12, left: 12, right: 12 }}
        border={{
          top: { color: "hsl(var(--border) / 0.6)", width: 1, style: "dashed" },
          bottom: { color: "hsl(var(--border) / 0.6)", width: 1, style: "dashed" },
          left: { color: "hsl(var(--border) / 0.6)", width: 1, style: "dashed" },
          right: { color: "hsl(var(--border) / 0.6)", width: 1, style: "dashed" }
        }}
        borderRadius={8}
        color="hsl(var(--card) / 0.1)"
      >
        <Row 
          mainAxisAlignment={states.main} 
          crossAxisAlignment={states.cross}
          gap={12}
        >
          <Container width={50} height={50} color="#ec4899" borderRadius={8} alignment="center">
            <Text variant="bodyMedium" style={{ color: "white", fontWeight: "bold" }}>1</Text>
          </Container>
          <Container width={50} height={70} color="#3b82f6" borderRadius={8} alignment="center">
            <Text variant="bodyMedium" style={{ color: "white", fontWeight: "bold" }}>2</Text>
          </Container>
          <Container width={50} height={40} color="#10b981" borderRadius={8} alignment="center">
            <Text variant="bodyMedium" style={{ color: "white", fontWeight: "bold" }}>3</Text>
          </Container>
        </Row>
      </Container>
    ),
    generateCode: (states) => `import { Row } from "@/components/ui/row";
import { Container } from "@/components/ui/container";
import { Text } from "@/components/ui/text";
import { MainAxisAlignment, CrossAxisAlignment } from "@/components/ui/layout-types";

<Container 
  width="100%"
  maxWidth={448}
  padding={12}
  border={{
    top: { color: "hsl(var(--border) / 0.6)", width: 1, style: "dashed" },
    bottom: { color: "hsl(var(--border) / 0.6)", width: 1, style: "dashed" },
    left: { color: "hsl(var(--border) / 0.6)", width: 1, style: "dashed" },
    right: { color: "hsl(var(--border) / 0.6)", width: 1, style: "dashed" }
  }}
  borderRadius={8}
  color="hsl(var(--card) / 0.1)"
>
  <Row 
    mainAxisAlignment={MainAxisAlignment.${Object.keys(MainAxisAlignment).find(k => MainAxisAlignment[k] === states.main)}} 
    crossAxisAlignment={CrossAxisAlignment.${Object.keys(CrossAxisAlignment).find(k => CrossAxisAlignment[k] === states.cross)}}
    gap={12}
  >
    <Container width={50} height={50} color="#ec4899" borderRadius={8} alignment="center">
      <Text variant="bodyMedium" style={{ color: "white", fontWeight: "bold" }}>1</Text>
    </Container>
    <Container width={50} height={70} color="#3b82f6" borderRadius={8} alignment="center">
      <Text variant="bodyMedium" style={{ color: "white", fontWeight: "bold" }}>2</Text>
    </Container>
    <Container width={50} height={40} color="#10b981" borderRadius={8} alignment="center">
      <Text variant="bodyMedium" style={{ color: "white", fontWeight: "bold" }}>3</Text>
    </Container>
  </Row>
</Container>`
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
      <Container 
        width="100%"
        maxWidth={384}
        padding={{ top: 12, bottom: 12, left: 12, right: 12 }}
        border={{
          top: { color: "hsl(var(--border) / 0.6)", width: 1, style: "dashed" },
          bottom: { color: "hsl(var(--border) / 0.6)", width: 1, style: "dashed" },
          left: { color: "hsl(var(--border) / 0.6)", width: 1, style: "dashed" },
          right: { color: "hsl(var(--border) / 0.6)", width: 1, style: "dashed" }
        }}
        borderRadius={8}
        color="hsl(var(--card) / 0.1)"
      >
        <Column 
          mainAxisAlignment={states.main} 
          crossAxisAlignment={states.cross}
          gap={12}
        >
          <Container width={80} height={40} color="#ec4899" borderRadius={8} alignment="center">
            <Text variant="bodySmall" style={{ color: "white", fontWeight: "bold" }}>Box A</Text>
          </Container>
          <Container width={100} height={40} color="#3b82f6" borderRadius={8} alignment="center">
            <Text variant="bodySmall" style={{ color: "white", fontWeight: "bold" }}>Box B</Text>
          </Container>
          <Container width={70} height={40} color="#10b981" borderRadius={8} alignment="center">
            <Text variant="bodySmall" style={{ color: "white", fontWeight: "bold" }}>Box C</Text>
          </Container>
        </Column>
      </Container>
    ),
    generateCode: (states) => `import { Column } from "@/components/ui/column";
import { Container } from "@/components/ui/container";
import { Text } from "@/components/ui/text";
import { MainAxisAlignment, CrossAxisAlignment } from "@/components/ui/layout-types";

<Container 
  width="100%"
  maxWidth={384}
  padding={12}
  border={{
    top: { color: "hsl(var(--border) / 0.6)", width: 1, style: "dashed" },
    bottom: { color: "hsl(var(--border) / 0.6)", width: 1, style: "dashed" },
    left: { color: "hsl(var(--border) / 0.6)", width: 1, style: "dashed" },
    right: { color: "hsl(var(--border) / 0.6)", width: 1, style: "dashed" }
  }}
  borderRadius={8}
  color="hsl(var(--card) / 0.1)"
>
  <Column 
    mainAxisAlignment={MainAxisAlignment.${Object.keys(MainAxisAlignment).find(k => MainAxisAlignment[k] === states.main)}} 
    crossAxisAlignment={CrossAxisAlignment.${Object.keys(CrossAxisAlignment).find(k => CrossAxisAlignment[k] === states.cross)}}
    gap={12}
  >
    <Container width={80} height={40} color="#ec4899" borderRadius={8} alignment="center">
      <Text variant="bodySmall" style={{ color: "white", fontWeight: "bold" }}>Box A</Text>
    </Container>
    <Container width={100} height={40} color="#3b82f6" borderRadius={8} alignment="center">
      <Text variant="bodySmall" style={{ color: "white", fontWeight: "bold" }}>Box B</Text>
    </Container>
    <Container width={70} height={40} color="#10b981" borderRadius={8} alignment="center">
      <Text variant="bodySmall" style={{ color: "white", fontWeight: "bold" }}>Box C</Text>
    </Container>
  </Column>
</Container>`
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
      <Container
        width={256}
        height={256}
        padding={{ top: 16, bottom: 16, left: 16, right: 16 }}
        border={{
          top: { color: "hsl(var(--border))", width: 1 },
          bottom: { color: "hsl(var(--border))", width: 1 },
          left: { color: "hsl(var(--border))", width: 1 },
          right: { color: "hsl(var(--border))", width: 1 }
        }}
        borderRadius={12}
        color="hsl(var(--card))"
      >
        <Stack clipBehavior="visible">
          <Container 
            width={180} 
            height={180} 
            color="#3b82f6" 
            borderRadius={16} 
            alignment="center"
          >
            <Text variant="bodyMedium" style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>
              Base Stack Canvas
            </Text>
          </Container>

          <Positioned top={states.badgeTop} right={states.badgeRight}>
            <Container
              width={48}
              height={48}
              color="#ec4899"
              borderRadius={24}
              alignment="center"
              border={{
                top: { color: "hsl(var(--card))", width: 2 },
                bottom: { color: "hsl(var(--card))", width: 2 },
                left: { color: "hsl(var(--card))", width: 2 },
                right: { color: "hsl(var(--card))", width: 2 }
              }}
            >
              <Text variant="bodySmall" style={{ color: "white", fontWeight: "bold" }}>New</Text>
            </Container>
          </Positioned>

          <Positioned bottom={12} left={12}>
            <Container
              color="rgba(0, 0, 0, 0.75)"
              padding={{ top: 4, bottom: 4, left: 12, right: 12 }}
              borderRadius={9999}
              border={{
                top: { color: "rgba(255, 255, 255, 0.1)", width: 1 },
                bottom: { color: "rgba(255, 255, 255, 0.1)", width: 1 },
                left: { color: "rgba(255, 255, 255, 0.1)", width: 1 },
                right: { color: "rgba(255, 255, 255, 0.1)", width: 1 }
              }}
            >
              <Text variant="bodySmall" style={{ color: "white", fontWeight: 600 }}>Overlaid Badge</Text>
            </Container>
          </Positioned>
        </Stack>
      </Container>
    ),
    generateCode: (states) => `import { Stack } from "@/components/ui/stack";
import { Positioned } from "@/components/ui/positioned";
import { Container } from "@/components/ui/container";
import { Text } from "@/components/ui/text";

<Container
  width={256}
  height={256}
  padding={16}
  border={{
    top: { color: "hsl(var(--border))", width: 1 },
    bottom: { color: "hsl(var(--border))", width: 1 },
    left: { color: "hsl(var(--border))", width: 1 },
    right: { color: "hsl(var(--border))", width: 1 }
  }}
  borderRadius={12}
  color="hsl(var(--card))"
>
  <Stack clipBehavior="visible">
    <Container 
      width={180} 
      height={180} 
      color="#3b82f6" 
      borderRadius={16} 
      alignment="center"
    >
      <Text variant="bodyMedium" style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>
        Base Stack Canvas
      </Text>
    </Container>

    <Positioned top={${states.badgeTop}} right={${states.badgeRight}}>
      <Container
        width={48}
        height={48}
        color="#ec4899"
        borderRadius={24}
        alignment="center"
        border={{
          top: { color: "hsl(var(--card))", width: 2 },
          bottom: { color: "hsl(var(--card))", width: 2 },
          left: { color: "hsl(var(--card))", width: 2 },
          right: { color: "hsl(var(--card))", width: 2 }
        }}
      >
        <Text variant="bodySmall" style={{ color: "white", fontWeight: "bold" }}>New</Text>
      </Container>
    </Positioned>

    <Positioned bottom={12} left={12}>
      <Container
        color="rgba(0, 0, 0, 0.75)"
        padding={{ top: 4, bottom: 4, left: 12, right: 12 }}
        borderRadius={9999}
        border={{
          top: { color: "rgba(255, 255, 255, 0.1)", width: 1 },
          bottom: { color: "rgba(255, 255, 255, 0.1)", width: 1 },
          left: { color: "rgba(255, 255, 255, 0.1)", width: 1 },
          right: { color: "rgba(255, 255, 255, 0.1)", width: 1 }
        }}
      >
        <Text variant="bodySmall" style={{ color: "white", fontWeight: 600 }}>Overlaid Badge</Text>
      </Container>
    </Positioned>
  </Stack>
</Container>`
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
      <Container
        width={288}
        padding={{ top: 16, bottom: 16, left: 16, right: 16 }}
        border={{
          top: { color: "hsl(var(--border) / 0.8)", width: 1, style: "dashed" },
          bottom: { color: "hsl(var(--border) / 0.8)", width: 1, style: "dashed" },
          left: { color: "hsl(var(--border) / 0.8)", width: 1, style: "dashed" },
          right: { color: "hsl(var(--border) / 0.8)", width: 1, style: "dashed" }
        }}
        borderRadius={12}
        color="hsl(var(--card) / 0.2)"
      >
        <Wrap spacing={states.spacing} runSpacing={states.runSpacing}>
          {["React", "Flutter", "Tailwind", "GetX", "TypeScript", "Vite", "Zustand", "HTML"].map((tag, i) => (
            <Chip key={i} label={tag} />
          ))}
        </Wrap>
      </Container>
    ),
    generateCode: (states) => `import { Wrap } from "@/components/ui/wrap";
import { Container } from "@/components/ui/container";
import { Chip } from "@/components/ui/chip";

<Container
  width={288}
  padding={16}
  border={{
    top: { color: "hsl(var(--border) / 0.8)", width: 1, style: "dashed" },
    bottom: { color: "hsl(var(--border) / 0.8)", width: 1, style: "dashed" },
    left: { color: "hsl(var(--border) / 0.8)", width: 1, style: "dashed" },
    right: { color: "hsl(var(--border) / 0.8)", width: 1, style: "dashed" }
  }}
  borderRadius={12}
  color="hsl(var(--card) / 0.2)"
>
  <Wrap spacing={${states.spacing}} runSpacing={${states.runSpacing}}>
    {["React", "Flutter", "Tailwind"].map(tag => (
      <Chip key={tag} label={tag} />
    ))}
  </Wrap>
</Container>`
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
      <Container
        width="100%"
        maxWidth={384}
        padding={{ top: 16, bottom: 16, left: 16, right: 16 }}
        border={{
          top: { color: "hsl(var(--border) / 0.85)", width: 1, style: "dashed" },
          bottom: { color: "hsl(var(--border) / 0.85)", width: 1, style: "dashed" },
          left: { color: "hsl(var(--border) / 0.85)", width: 1, style: "dashed" },
          right: { color: "hsl(var(--border) / 0.85)", width: 1, style: "dashed" }
        }}
        borderRadius={12}
        color="hsl(var(--card) / 0.2)"
      >
        <Column gap={16}>
          <Column crossAxisAlignment={CrossAxisAlignment.start} gap={8}>
            <Text variant="bodySmall" style={{ fontFamily: "monospace", color: "hsl(var(--muted-foreground))" }}>
              Row showing Gap({states.gapValue}px):
            </Text>
            <Container
              padding={{ top: 10, bottom: 10, left: 10, right: 10 }}
              borderRadius={8}
              border={{
                top: { color: "hsl(var(--border))", width: 1 },
                bottom: { color: "hsl(var(--border))", width: 1 },
                left: { color: "hsl(var(--border))", width: 1 },
                right: { color: "hsl(var(--border))", width: 1 }
              }}
              color="hsl(var(--card) / 0.4)"
              width="100%"
            >
              <Row crossAxisAlignment={CrossAxisAlignment.center}>
                <Container color="#ec4899" borderRadius={4} padding={{ top: 8, bottom: 8, left: 12, right: 12 }} alignment="center">
                  <Text variant="bodySmall" style={{ color: "white", fontWeight: "bold" }}>Left Box</Text>
                </Container>
                
                <Gap size={states.gapValue} />
                
                <Container color="#3b82f6" borderRadius={4} padding={{ top: 8, bottom: 8, left: 12, right: 12 }} alignment="center">
                  <Text variant="bodySmall" style={{ color: "white", fontWeight: "bold" }}>Right Box</Text>
                </Container>
              </Row>
            </Container>
          </Column>

          <Column crossAxisAlignment={CrossAxisAlignment.start} gap={8} padding={{ top: 12, bottom: 0, left: 0, right: 0 }} border={{ top: { color: "hsl(var(--border) / 0.8)", width: 1 } }}>
            <Text variant="bodySmall" style={{ fontFamily: "monospace", color: "hsl(var(--muted-foreground))" }}>
              Row showing Spacer() & Expanded(flex: {states.expandedFlex}):
            </Text>
            <Container
              padding={{ top: 10, bottom: 10, left: 10, right: 10 }}
              borderRadius={8}
              border={{
                top: { color: "hsl(var(--border))", width: 1 },
                bottom: { color: "hsl(var(--border))", width: 1 },
                left: { color: "hsl(var(--border))", width: 1 },
                right: { color: "hsl(var(--border))", width: 1 }
              }}
              color="hsl(var(--card) / 0.4)"
              width="100%"
            >
              <Row crossAxisAlignment={CrossAxisAlignment.center}>
                <Container color="#f59e0b" borderRadius={4} padding={{ top: 8, bottom: 8, left: 12, right: 12 }} alignment="center">
                  <Text variant="bodySmall" style={{ color: "white", fontWeight: "bold" }}>A</Text>
                </Container>

                <Spacer />

                <Container color="#8b5cf6" borderRadius={4} padding={{ top: 8, bottom: 8, left: 12, right: 12 }} alignment="center">
                  <Text variant="bodySmall" style={{ color: "white", fontWeight: "bold" }}>B</Text>
                </Container>

                <Expanded flex={states.expandedFlex}>
                  <Container color="#10b981" borderRadius={4} height={32} alignment="center" margin={{ left: 8 }}>
                    <Text variant="bodySmall" style={{ color: "white", fontWeight: "bold", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", paddingLeft: "8px", paddingRight: "8px" }}>
                      Flex={states.expandedFlex}
                    </Text>
                  </Container>
                </Expanded>
              </Row>
            </Container>
          </Column>
        </Column>
      </Container>
    ),
    generateCode: (states) => `import { Row } from "@/components/ui/row";
import { Column } from "@/components/ui/column";
import { Container } from "@/components/ui/container";
import { Text } from "@/components/ui/text";
import { Gap } from "@/components/ui/gap";
import { Spacer } from "@/components/ui/spacer";
import { Expanded } from "@/components/ui/expanded";
import { CrossAxisAlignment } from "@/components/ui/layout-types";

<Row crossAxisAlignment={CrossAxisAlignment.center}>
  <Container color="#ec4899" borderRadius={4} padding={8}>
    <Text variant="bodySmall" style={{ color: "white", fontWeight: "bold" }}>Left Box</Text>
  </Container>
  <Gap size={${states.gapValue}} />
  <Container color="#3b82f6" borderRadius={4} padding={8}>
    <Text variant="bodySmall" style={{ color: "white", fontWeight: "bold" }}>Right Box</Text>
  </Container>
</Row>

<Row crossAxisAlignment={CrossAxisAlignment.center}>
  <Container color="#f59e0b" borderRadius={4} padding={8}>
    <Text variant="bodySmall" style={{ color: "white", fontWeight: "bold" }}>A</Text>
  </Container>
  <Spacer />
  <Container color="#8b5cf6" borderRadius={4} padding={8}>
    <Text variant="bodySmall" style={{ color: "white", fontWeight: "bold" }}>B</Text>
  </Container>
  <Expanded flex={${states.expandedFlex}}>
    <Container color="#10b981" borderRadius={4} height={32} alignment="center" margin={{ left: 8 }}>
      <Text variant="bodySmall" style={{ color: "white", fontWeight: "bold" }}>
        Flex=${states.expandedFlex}
      </Text>
    </Container>
  </Expanded>
</Row>`
  },
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
      <Container
        width="100%"
        maxWidth={384}
        height={384}
        border={{
          top: { color: "hsl(var(--border))", width: 1 },
          bottom: { color: "hsl(var(--border))", width: 1 },
          left: { color: "hsl(var(--border))", width: 1 },
          right: { color: "hsl(var(--border))", width: 1 }
        }}
        borderRadius={12}
        color="hsl(var(--card))"
        className="overflow-hidden shadow-xl relative flex"
      >
        {states.showDrawer && (
          <Container
            color="rgba(0,0,0,0.6)"
            className="absolute inset-0 z-30 flex"
          >
            <Container
              width="66.6%"
              height="100%"
              color="hsl(var(--card))"
              border={{ right: { color: "hsl(var(--border))", width: 1 } }}
              padding={{ top: 20, bottom: 20, left: 20, right: 20 }}
              className="shadow-2xl flex flex-col justify-between"
            >
              <Column gap={16}>
                <Text variant="bodyMedium" style={{ fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.05em", color: "hsl(var(--primary))" }}>
                  Main Drawer
                </Text>
                <Column gap={8}>
                  <Container color="hsl(var(--accent) / 0.4)" borderRadius={4} padding={8}>
                    <Text variant="bodySmall" style={{ fontWeight: 600 }}>🏠 Home Dashboard</Text>
                  </Container>
                  <Container color="transparent" padding={8} borderRadius={4}>
                    <Text variant="bodySmall">👤 Profile Settings</Text>
                  </Container>
                  <Container color="transparent" padding={8} borderRadius={4}>
                    <Text variant="bodySmall">🔔 Alerts</Text>
                  </Container>
                </Column>
              </Column>
              
              <ElevatedButton
                onPressed={() => setStates({ ...states, showDrawer: false })}
                backgroundColor="hsl(var(--primary))"
                padding={{ top: 8, bottom: 8, left: 16, right: 16 }}
                child={
                  <Text variant="bodySmall" style={{ color: "white", fontWeight: "bold", width: "100%", textAlign: "center" }}>
                    Close Drawer
                  </Text>
                }
              />
            </Container>
            <Container style={{ flex: 1, cursor: "pointer" }} onClick={() => setStates({ ...states, showDrawer: false })} />
          </Container>
        )}

        <Scaffold
          appBar={
            <AppBar 
              title={<Text variant="bodyMedium" style={{ fontWeight: "bold" }}>Scaffold Sandbox</Text>}
              leading={
                <button 
                  onClick={() => setStates({ ...states, showDrawer: true })}
                  style={{ padding: "4px", borderRadius: "4px" }}
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
              icon={<Text variant="bodyLarge" style={{ color: "white" }}>+</Text>}
            />
          ) : undefined}
          bottomNavigationBar={
            <Container
              height={48}
              border={{ top: { color: "hsl(var(--border))", width: 1 } }}
              color="hsl(var(--card))"
            >
              <Row mainAxisAlignment={MainAxisAlignment.spaceAround} crossAxisAlignment={CrossAxisAlignment.center} height="100%">
                <Text variant="bodySmall" style={{ color: "hsl(var(--primary))", fontWeight: "bold" }}>● Feed</Text>
                <Text variant="bodySmall" style={{ color: "hsl(var(--muted-foreground))" }}>💬 Chats</Text>
                <Text variant="bodySmall" style={{ color: "hsl(var(--muted-foreground))" }}>⚙️ Config</Text>
              </Row>
            </Container>
          }
          body={
            <Container padding={20} color="hsl(var(--accent) / 0.1)" height="100%">
              <Column gap={16}>
                <Text variant="bodySmall" style={{ fontWeight: 600, color: "hsl(var(--muted-foreground))" }}>
                  SCAFFOLD BODY
                </Text>
                <Container
                  padding={16}
                  color="hsl(var(--card))"
                  borderRadius={12}
                  border={{
                    top: { color: "hsl(var(--border))", width: 1 },
                    bottom: { color: "hsl(var(--border))", width: 1 },
                    left: { color: "hsl(var(--border))", width: 1 },
                    right: { color: "hsl(var(--border))", width: 1 }
                  }}
                >
                  <Text variant="bodySmall" style={{ textAlign: "center", fontWeight: 500, lineHeight: 1.6 }}>
                    Standard structured page shell mapping header, body, FAB, drawer, and bottom navigation anchors securely.
                  </Text>
                </Container>
              </Column>
            </Container>
          }
        />
      </Container>
    ),
    generateCode: (states) => `import { Scaffold } from "@/components/ui/scaffold";
import { AppBar } from "@/components/ui/app-bar";
import { Container } from "@/components/ui/container";
import { Column } from "@/components/ui/column";
import { Row } from "@/components/ui/row";
import { Text } from "@/components/ui/text";
import { FloatingActionButton } from "@/components/ui/floating-action-button";
import { MainAxisAlignment, CrossAxisAlignment } from "@/components/ui/layout-types";

<Scaffold
  appBar={
    <AppBar 
      title={<Text variant="bodyMedium" style={{ fontWeight: "bold" }}>Scaffold Title</Text>} 
      leading={<button>☰</button>} 
    />
  }
  floatingActionButton={
    ${states.showFab ? `<FloatingActionButton onPressed={() => {}} backgroundColor="#8b5cf6" icon={<Text style={{ color: "white" }}>+</Text>} />` : "undefined"}
  }
  bottomNavigationBar={
    <Container
      height={48}
      border={{ top: { color: "hsl(var(--border))", width: 1 } }}
      color="hsl(var(--card))"
    >
      <Row mainAxisAlignment={MainAxisAlignment.spaceAround} crossAxisAlignment={CrossAxisAlignment.center} height="100%">
        <Text variant="bodySmall">Feed</Text>
        <Text variant="bodySmall">Settings</Text>
      </Row>
    </Container>
  }
  body={
    <Container padding={20} color="hsl(var(--accent) / 0.1)">
      <Text variant="bodyMedium">Main body content</Text>
    </Container>
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
      <Container
        width={320}
        height={112}
        border={{
          top: { color: "hsl(var(--border))", width: 1 },
          bottom: { color: "hsl(var(--border))", width: 1 },
          left: { color: "hsl(var(--border))", width: 1 },
          right: { color: "hsl(var(--border))", width: 1 }
        }}
        borderRadius={12}
        color="hsl(var(--card) / 0.25)"
      >
        <AppBar
          title={
            <Text variant="bodySmall" style={{ fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Main Navigation
            </Text>
          }
          centerTitle={states.centerTitle}
          backgroundColor={states.bgColor}
          elevation={states.elevation}
          leading={
            <Text variant="bodyMedium" style={{ paddingLeft: "10px", paddingRight: "10px" }}>🏠</Text>
          }
          actions={[
            <Text key="a1" variant="bodyMedium" style={{ paddingLeft: "8px", paddingRight: "8px" }} onClick={() => alert("Notify tapped")}>🔔</Text>,
            <Text key="a2" variant="bodyMedium" style={{ paddingLeft: "10px", paddingRight: "10px" }} onClick={() => alert("Search tapped")}>🔍</Text>
          ]}
        />
      </Container>
    ),
    generateCode: (states) => `import { AppBar } from "@/components/ui/app-bar";
import { Text } from "@/components/ui/text";

<AppBar
  title={<Text variant="bodyMedium" style={{ fontWeight: "bold" }}>Main Navigation</Text>}
  centerTitle={${states.centerTitle}}
  backgroundColor="${states.bgColor}"
  elevation={${states.elevation}}
  leading={<Text>🏠</Text>}
  actions={[
    <Text key="a1">🔔</Text>,
    <Text key="a2">🔍</Text>
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
        <Container
          width="100%"
          maxWidth={384}
          height={288}
          border={{
            top: { color: "hsl(var(--border))", width: 1 },
            bottom: { color: "hsl(var(--border))", width: 1 },
            left: { color: "hsl(var(--border))", width: 1 },
            right: { color: "hsl(var(--border))", width: 1 }
          }}
          borderRadius={12}
          color="hsl(var(--card))"
          className="overflow-hidden flex items-center justify-center relative shadow-sm"
        >
          <ElevatedButton
            onPressed={() => setIsOpen(true)}
            backgroundColor="hsl(var(--primary))"
            padding={{ top: 8, bottom: 8, left: 16, right: 16 }}
            child={
              <Text variant="bodySmall" style={{ color: "white", fontWeight: "bold" }}>
                Trigger Edge Sidebar Overlay
              </Text>
            }
          />
          
          <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} position="left">
            <SidebarHeader>
              <Row crossAxisAlignment={CrossAxisAlignment.center} gap={12}>
                <Container width={32} height={32} color="hsl(var(--primary) / 0.2)" borderRadius={8} alignment="center">
                  <Text variant="bodyMedium" style={{ color: "hsl(var(--primary))", fontWeight: "bold" }}>⚡</Text>
                </Container>
                <Text variant="bodyMedium" style={{ fontWeight: "bold" }}>Sidebar Navigation</Text>
              </Row>
            </SidebarHeader>
            <SidebarBody>
              <Column gap={8}>
                <ListTile
                  leading={<Text variant="bodyMedium">📊</Text>}
                  title="Dashboard"
                  onTap={() => alert("Dashboard Tapped")}
                />
                <ListTile
                  leading={<Text variant="bodyMedium">⚙️</Text>}
                  title="Settings"
                  onTap={() => alert("Settings Tapped")}
                />
                <ListTile
                  leading={<Text variant="bodyMedium">🚪</Text>}
                  title="Log out"
                  onTap={() => setIsOpen(false)}
                />
              </Column>
            </SidebarBody>
          </Sidebar>
        </Container>
      );
    },
    generateCode: () => `import { Sidebar, SidebarHeader, SidebarBody } from "@/components/ui/sidebar";
import { Row } from "@/components/ui/row";
import { Column } from "@/components/ui/column";
import { Container } from "@/components/ui/container";
import { Text } from "@/components/ui/text";
import { ListTile } from "@/components/ui/list-tile";
import { CrossAxisAlignment } from "@/components/ui/layout-types";

// Control open/close state:
<Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} position="left">
  <SidebarHeader>
    <Row crossAxisAlignment={CrossAxisAlignment.center} gap={12}>
      <Container width={32} height={32} color="hsl(var(--primary) / 0.2)" borderRadius={8} alignment="center">
        <Text style={{ color: "hsl(var(--primary))" }}>⚡</Text>
      </Container>
      <Text variant="bodyMedium" style={{ fontWeight: "bold" }}>Sidebar Navigation</Text>
    </Row>
  </SidebarHeader>
  <SidebarBody>
    <Column gap={8}>
      <ListTile leading={<Text>📊</Text>} title="Dashboard" onTap={() => {}} />
      <ListTile leading={<Text>⚙️</Text>} title="Settings" onTap={() => {}} />
    </Column>
  </SidebarBody>
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
        <Container
          width="100%"
          maxWidth={384}
          height={320}
          border={{
            top: { color: "hsl(var(--border))", width: 1 },
            bottom: { color: "hsl(var(--border))", width: 1 },
            left: { color: "hsl(var(--border))", width: 1 },
            right: { color: "hsl(var(--border))", width: 1}
          }}
          borderRadius={12}
          color="hsl(var(--card))"
          className="overflow-hidden relative shadow-md flex items-center justify-center"
        >
          {isOpen && (
            <Container
              className="absolute inset-0 bg-black/60 z-40"
              onClick={() => setIsOpen(false)}
            >
              <SmartDrawer 
                drawerWidth={states.drawerWidth}
                elevation={states.elevation}
                header={
                  <Container
                    height={56}
                    color="hsl(var(--primary))"
                    borderRadius={8}
                    alignment="center"
                  >
                    <Text variant="bodySmall" style={{ color: "white", fontWeight: "bold" }}>
                      SmartDrawer Header
                    </Text>
                  </Container>
                }
                footer={
                  <ElevatedButton
                    onPressed={() => setIsOpen(false)}
                    backgroundColor="hsl(var(--primary))"
                    padding={{ top: 8, bottom: 8, left: 16, right: 16 }}
                    child={
                      <Text variant="bodySmall" style={{ color: "white", fontWeight: "bold", width: "100%", textAlign: "center" }}>
                        Dismiss
                      </Text>
                    }
                  />
                }
              >
                <SmartDrawerTile icon={<Text>💼</Text>} title="Work Projects" subtitle="Custom team projects" onTap={() => alert("Projects tapped")} />
                <SmartDrawerTile icon={<Text>📁</Text>} title="Document Storage" subtitle="Sync with cloud storage" onTap={() => alert("Storage tapped")} />
                <SmartDrawerTile icon={<Text>🔔</Text>} title="System Alerts" badgeCount={3} onTap={() => alert("Alerts tapped")} />
              </SmartDrawer>
            </Container>
          )}

          <Column gap={8} crossAxisAlignment={CrossAxisAlignment.center}>
            <ElevatedButton 
              onPressed={() => setIsOpen(true)}
              backgroundColor="hsl(var(--primary))"
              padding={{ top: 8, bottom: 8, left: 16, right: 16 }}
              child={
                <Text variant="bodySmall" style={{ color: "white", fontWeight: "bold" }}>
                  Open SmartDrawer
                </Text>
              }
            />
            <Text variant="bodySmall" style={{ color: "hsl(var(--muted-foreground))" }}>
              Drawer width: {states.drawerWidth}px | elevation: {states.elevation}dp
            </Text>
          </Column>
        </Container>
      );
    },
    generateCode: (states) => `import { SmartDrawer, SmartDrawerTile } from "@/components/ui/smart-drawer";
import { Container } from "@/components/ui/container";
import { Text } from "@/components/ui/text";

<SmartDrawer
  drawerWidth={${states.drawerWidth}}
  elevation={${states.elevation}}
  header={
    <Container height={56} color="hsl(var(--primary))" borderRadius={8} alignment="center">
      <Text variant="bodySmall" style={{ color: "white", fontWeight: "bold" }}>
        SmartDrawer Header
      </Text>
    </Container>
  }
>
  <SmartDrawerTile 
    icon={<Text>💼</Text>} 
    title="Work Projects" 
    subtitle="Custom team projects" 
    onTap={() => {}} 
  />
  <SmartDrawerTile 
    icon={<Text>📁</Text>} 
    title="Document Storage" 
    subtitle="Sync with cloud storage" 
    onTap={() => {}} 
  />
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
      <Container
        width={320}
        height={256}
        border={{
          top: { color: "hsl(var(--border))", width: 1 },
          bottom: { color: "hsl(var(--border))", width: 1 },
          left: { color: "hsl(var(--border))", width: 1 },
          right: { color: "hsl(var(--border))", width: 1 }
        }}
        borderRadius={12}
        color="hsl(var(--card))"
        padding={4}
        className="overflow-hidden shadow-inner"
      >
        <ListView>
          {Array.from({ length: states.itemsCount }).map((_, i) => (
            <ListTile
              key={i}
              leading={
                <Container
                  width={32}
                  height={32}
                  borderRadius={999}
                  color="hsl(var(--primary) / 0.1)"
                  alignment="center"
                >
                  <Text variant="bodySmall" style={{ color: "hsl(var(--primary))", fontWeight: "bold" }}>
                    #{i+1}
                  </Text>
                </Container>
              }
              title={`Scroll Item Title #${i + 1}`}
              subtitle="Dynamic list rows mapping description lines"
              dense={states.dense}
              border={{ bottom: { color: "hsl(var(--border) / 0.4)", width: 1 } }}
            />
          ))}
        </ListView>
      </Container>
    ),
    generateCode: (states) => `import { ListView } from "@/components/ui/list-view";
import { ListTile } from "@/components/ui/list-tile";
import { Container } from "@/components/ui/container";
import { Text } from "@/components/ui/text";

<ListView>
  {items.map((item, i) => (
    <ListTile
      key={i}
      leading={
        <Container width={32} height={32} borderRadius={999} color="hsl(var(--primary) / 0.1)" alignment="center">
          <Text variant="bodySmall" style={{ color: "hsl(var(--primary))", fontWeight: "bold" }}>
            #{i+1}
          </Text>
        </Container>
      }
      title="List Item Title"
      dense={${states.dense}}
      border={{ bottom: { color: "hsl(var(--border) / 0.4)", width: 1 } }}
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
      <Container
        width={320}
        border={{
          top: { color: "hsl(var(--border))", width: 1 },
          bottom: { color: "hsl(var(--border))", width: 1 },
          left: { color: "hsl(var(--border))", width: 1 },
          right: { color: "hsl(var(--border))", width: 1 }
        }}
        borderRadius={12}
        color="hsl(var(--card))"
        className="shadow-md overflow-hidden"
      >
        <ListTile
          leading={<Text variant="titleLarge">💳</Text>}
          title="Personal Billing Account"
          subtitle="Visa ending in *4221 - active"
          trailing={
            <Text variant="bodySmall" style={{ color: "#10b981", fontWeight: "bold", fontFamily: "monospace" }}>
              ACTIVE
            </Text>
          }
          dense={states.dense}
          enabled={states.enabled}
          onTap={() => alert("Primary ListTile tapped!")}
          border={{ bottom: { color: "hsl(var(--border) / 0.4)", width: 1 } }}
        />
        <ListTile
          leading={<Text variant="titleLarge">🔒</Text>}
          title="Change Account Password"
          subtitle="Last updated 12 days ago"
          trailing={<Text variant="bodySmall" style={{ color: "hsl(var(--muted-foreground))" }}>▶</Text>}
          dense={states.dense}
          enabled={states.enabled}
          onTap={() => alert("Secondary ListTile tapped!")}
        />
      </Container>
    ),
    generateCode: (states) => `import { ListTile } from "@/components/ui/list-tile";
import { Text } from "@/components/ui/text";

<ListTile
  leading={<Text variant="titleLarge">💳</Text>}
  title="Personal Billing Account"
  subtitle="Visa ending in *4221"
  trailing={
    <Text variant="bodySmall" style={{ color: "#10b981", fontWeight: "bold" }}>
      ACTIVE
    </Text>
  }
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
      <Container
        width={320}
        height={256}
        border={{
          top: { color: "hsl(var(--border))", width: 1 },
          bottom: { color: "hsl(var(--border))", width: 1 },
          left: { color: "hsl(var(--border))", width: 1 },
          right: { color: "hsl(var(--border))", width: 1 }
        }}
        borderRadius={12}
        color="hsl(var(--card))"
        padding={12}
        className="overflow-hidden shadow-inner"
      >
        <GridView 
          crossAxisCount={states.cols}
          mainAxisSpacing={states.spacing}
          crossAxisSpacing={states.spacing}
          className="h-full overflow-y-auto"
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <GridTile
              key={i}
              className="bg-accent/20 border-border/80"
              header={
                <Container padding={6} color="hsl(var(--primary) / 0.1)" width="100%">
                  <Text variant="bodySmall" style={{ textTransform: "uppercase", letterSpacing: "0.05em", color: "hsl(var(--primary))", fontWeight: "bold", fontSize: "8px" }}>
                    GRID TILE {i+1}
                  </Text>
                </Container>
              }
              child={
                <Center height={80}>
                  <Text variant="bodySmall" style={{ fontWeight: "bold", color: "hsl(var(--foreground))" }}>
                    Card #{i + 1}
                  </Text>
                </Center>
              }
            />
          ))}
        </GridView>
      </Container>
    ),
    generateCode: (states) => `import { GridView } from "@/components/ui/grid-view";
import { GridTile } from "@/components/ui/grid-tile";
import { Container } from "@/components/ui/container";
import { Center } from "@/components/ui/center";

<GridView 
  crossAxisCount={${states.cols}}
  mainAxisSpacing={${states.spacing}}
  crossAxisSpacing={${states.spacing}}
>
  {items.map((item, i) => (
    <GridTile
      key={i}
      className="bg-accent/20"
      header={
        <Container padding={6} color="hsl(var(--primary) / 0.1)" width="100%">
          <Text variant="bodySmall" style={{ textTransform: "uppercase", color: "hsl(var(--primary))", fontWeight: "bold" }}>
            TILE {i+1}
          </Text>
        </Container>
      }
      child={
        <Center height={80}>
          <Text variant="bodySmall">Card {i+1}</Text>
        </Center>
      }
    />
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
      <Container
        width={288}
        height={176}
        border={{
          top: { color: "hsl(var(--border))", width: 1 },
          bottom: { color: "hsl(var(--border))", width: 1 },
          left: { color: "hsl(var(--border))", width: 1 },
          right: { color: "hsl(var(--border))", width: 1 }
        }}
        borderRadius={12}
        className="overflow-hidden bg-card relative shadow-md"
      >
        <PageView 
          scrollDirection={states.scrollDir} 
          className="w-full h-full"
        >
          {[
            { title: "Slide 1", desc: "Swipe to navigate panels", color: "#1e3a8a" },
            { title: "Slide 2", desc: "Interactive carousel replication", color: "#4c1d95" },
            { title: "Slide 3", desc: "PageView supports gestures!", color: "#065f46" }
          ].map((slide, i) => (
            <Container
              key={i}
              color={slide.color}
              padding={20}
              alignment="center"
              width="100%"
              height="100%"
            >
              <Column crossAxisAlignment={CrossAxisAlignment.center} gap={4}>
                <Text variant="bodySmall" style={{ textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 800, color: "rgba(255, 255, 255, 0.7)" }}>
                  PAGE VIEW
                </Text>
                <Text variant="titleLarge" style={{ fontWeight: "bold", color: "white" }}>
                  {slide.title}
                </Text>
                <Text variant="bodySmall" style={{ color: "rgba(255, 255, 255, 0.9)" }}>
                  {slide.desc}
                </Text>
              </Column>
            </Container>
          ))}
        </PageView>
      </Container>
    ),
    generateCode: (states) => `import { PageView } from "@/components/ui/page-view";
import { Container } from "@/components/ui/container";
import { Text } from "@/components/ui/text";

<PageView scrollDirection="${states.scrollDir}">
  <Container color="#1e3a8a" alignment="center">
    <Text style={{ color: "white" }}>Slide 1</Text>
  </Container>
  <Container color="#4c1d95" alignment="center">
    <Text style={{ color: "white" }}>Slide 2</Text>
  </Container>
  <Container color="#065f46" alignment="center">
    <Text style={{ color: "white" }}>Slide 3</Text>
  </Container>
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
      <Container
        width={320}
        height={384}
        border={{
          top: { color: "hsl(var(--border))", width: 1 },
          bottom: { color: "hsl(var(--border))", width: 1 },
          left: { color: "hsl(var(--border))", width: 1 },
          right: { color: "hsl(var(--border))", width: 1 }
        }}
        borderRadius={12}
        color="hsl(var(--card))"
        className="overflow-hidden shadow-xl relative"
      >
        <CustomScrollView scrollDirection="vertical">
          <SliverAppBar
            title={
              <Text variant="bodySmall" style={{ fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.05em", color: "white" }}>
                Collapsible Header
              </Text>
            }
            expandedHeight={130}
            collapsedHeight={48}
            pinned={states.pinned}
            backgroundColor="#4338ca"
            elevation={4}
            automaticallyImplyLeading={false}
          />
          
          <SliverToBoxAdapter>
            <Container
              padding={16}
              color="hsl(var(--accent) / 0.25)"
              border={{ bottom: { color: "hsl(var(--border))", width: 1 } }}
            >
              <Text variant="bodySmall" style={{ fontWeight: 600, color: "hsl(var(--muted-foreground))", fontSize: "11px" }}>
                SLIVER TO BOX ADAPTER CONTENT
              </Text>
            </Container>
          </SliverToBoxAdapter>

          <SliverList itemCount={8} itemBuilder={(i) => (
            <ListTile
              key={i}
              title={`Sliver row element list #${i+1}`}
              trailing={
                <Container
                  padding={{ left: 8, right: 8, top: 2, bottom: 2 }}
                  color="hsl(var(--primary) / 0.1)"
                  borderRadius={4}
                >
                  <Text variant="bodySmall" style={{ color: "hsl(var(--primary))", fontFamily: "monospace", fontWeight: "bold", fontSize: "10px" }}>
                    Row {i+1}
                  </Text>
                </Container>
              }
              border={{ bottom: { color: "hsl(var(--border) / 0.4)", width: 1 } }}
            />
          )} />
        </CustomScrollView>
      </Container>
    ),
    generateCode: (states) => `import { CustomScrollView, SliverAppBar, SliverList, SliverToBoxAdapter } from "@/components/ui/CustomScrollView";
import { Container } from "@/components/ui/container";
import { Text } from "@/components/ui/text";
import { ListTile } from "@/components/ui/list-tile";

<CustomScrollView>
  <SliverAppBar
    title={
      <Text variant="bodySmall" style={{ fontWeight: "bold", color: "white" }}>
        Parallax Collapsing Title
      </Text>
    }
    expandedHeight={130}
    pinned={${states.pinned}}
    backgroundColor="#4338ca"
  />
  <SliverToBoxAdapter>
    <Container padding={16} color="hsl(var(--accent) / 0.25)">
      <Text variant="bodySmall">Adapter Content</Text>
    </Container>
  </SliverToBoxAdapter>
  <SliverList 
    itemCount={8} 
    itemBuilder={(i) => (
      <ListTile key={i} title={\`Row element \${i+1}\`} />
    )} 
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
      <Column width={320} gap={16} padding={20}>
        <Text variant="bodySmall" style={{ fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.05em", color: "hsl(var(--muted-foreground))" }}>
          Material style buttons
        </Text>
        
        <ElevatedButton 
          onPressed={states.disabled ? undefined : () => alert("ElevatedButton Tapped!")}
          backgroundColor="#8b5cf6"
          elevation={4}
          borderRadius={8}
          fullWidth={true}
          padding={{ top: 8, bottom: 8, left: 16, right: 16 }}
          child={
            <Text variant="bodySmall" style={{ color: "white", fontWeight: "bold" }}>
              Elevated Button
            </Text>
          }
        />

        <OutlinedButton 
          onPressed={states.disabled ? undefined : () => alert("OutlinedButton Tapped!")}
          borderRadius={8}
          borderColor="#8b5cf6"
          fullWidth={true}
          padding={{ top: 8, bottom: 8, left: 16, right: 16 }}
          child={
            <Text variant="bodySmall" style={{ color: "hsl(var(--primary))", fontWeight: "bold" }}>
              Outlined Button
            </Text>
          }
        />

        <Row mainAxisAlignment={MainAxisAlignment.spaceBetween} width="100%" crossAxisAlignment={CrossAxisAlignment.center}>
          <IconButton 
            onPressed={states.disabled ? undefined : () => alert("IconButton Tapped!")}
            icon={<Text variant="titleMedium">🔥</Text>}
            title="System is fire!"
          />
          <IconButton 
            onPressed={states.disabled ? undefined : () => alert("Like Tapped!")}
            icon={<Text variant="titleMedium">❤️</Text>}
            title="Appreciate work"
          />
          
          <FloatingActionButton
            onPressed={states.disabled ? undefined : () => alert("FAB Tapped!")}
            backgroundColor="#10b981"
            icon={
              <Text variant="bodyMedium" style={{ color: "white", fontWeight: "bold" }}>
                +
              </Text>
            }
          />
        </Row>
      </Column>
    ),
    generateCode: (states) => `import { ElevatedButton } from "@/components/ui/elevated-button";
import { OutlinedButton } from "@/components/ui/outlined-button";
import { IconButton } from "@/components/ui/icon-button";
import { FloatingActionButton } from "@/components/ui/floating-action-button";
import { Text } from "@/components/ui/text";

// ElevatedButton
<ElevatedButton 
  onPressed={${states.disabled ? "undefined" : "() => {}"}} 
  backgroundColor="#8b5cf6"
  child={
    <Text variant="bodySmall" style={{ color: "white", fontWeight: "bold" }}>
      Elevated Button
    </Text>
  }
/>

// FloatingActionButton
<FloatingActionButton 
  onPressed={() => {}} 
  backgroundColor="#10b981" 
  icon={<Text style={{ color: "white" }}>+</Text>} 
/>`
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
        <Container width={320} padding={20} borderRadius={12} border={{ top: { color: "hsl(var(--border))", width: 1 }, bottom: { color: "hsl(var(--border))", width: 1 }, left: { color: "hsl(var(--border))", width: 1 }, right: { color: "hsl(var(--border))", width: 1 } }}>
          <Column gap={8}>
            <Text variant="bodySmall" style={{ fontWeight: 600, color: "hsl(var(--muted-foreground))" }}>
              SELECT FAVORITE FRUIT:
            </Text>
            <DropdownButton
              value={val}
              onChanged={(newVal) => setVal(newVal)}
              filled={states.filled}
              preferUp={states.preferUp}
              borderRadius={8}
              items={[
                <DropdownMenuItem key="a" value="apple" child={<Text variant="bodySmall">🍎 Red Crisp Apple</Text>} />,
                <DropdownMenuItem key="b" value="banana" child={<Text variant="bodySmall">🍌 Creamy Ripe Banana</Text>} />,
                <DropdownMenuItem key="o" value="orange" child={<Text variant="bodySmall">🍊 Juicy Sweet Orange</Text>} />,
                <DropdownMenuItem key="g" value="grape" child={<Text variant="bodySmall">🍇 Purple Table Grape</Text>} />
              ]}
            />
            <Container padding={{ top: 16 }}>
              <Text variant="bodySmall" style={{ fontFamily: "monospace", textAlign: "center", color: "hsl(var(--primary))", fontWeight: "bold" }}>
                Selected value: {val.toUpperCase()}
              </Text>
            </Container>
          </Column>
        </Container>
      );
    },
    generateCode: (states) => `import { DropdownButton, DropdownMenuItem } from "@/components/ui/dropdown-button";
import { Text } from "@/components/ui/text";

const [fruit, setFruit] = useState("apple");

<DropdownButton
  value={fruit}
  onChanged={setFruit}
  filled={${states.filled}}
  preferUp={${states.preferUp}}
  items={[
    <DropdownMenuItem key="1" value="apple" child={<Text>🍎 Apple</Text>} />,
    <DropdownMenuItem key="2" value="banana" child={<Text>🍌 Banana</Text>} />
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
        <Column width={320} gap={20} padding={20}>
          <Text variant="bodySmall" style={{ fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.05em", color: "hsl(var(--muted-foreground))" }}>
            Ripple & Gesture bounds
          </Text>
          
          {/* InkWell */}
          <InkWell 
            onTap={() => setGestureLog("InkWell Tap (Material Ripple!)")}
          >
            <Container
              width="100%"
              height={64}
              border={{ top: { color: "hsl(var(--primary) / 0.25)", width: 1 }, bottom: { color: "hsl(var(--primary) / 0.25)", width: 1 }, left: { color: "hsl(var(--primary) / 0.25)", width: 1 }, right: { color: "hsl(var(--primary) / 0.25)", width: 1 } }}
              color="hsl(var(--primary) / 0.05)"
              borderRadius={12}
              alignment="center"
            >
              <Text variant="bodySmall" style={{ fontWeight: "bold", color: "hsl(var(--primary))" }}>
                InkWell (Ripple Splash!)
              </Text>
            </Container>
          </InkWell>

          {/* GestureDetector */}
          <GestureDetector 
            onTap={() => setGestureLog("GestureDetector: Single Tap")}
            onDoubleTap={() => setGestureLog("GestureDetector: Double Tap 🚀")}
            onLongPress={() => setGestureLog("GestureDetector: Long Press 🔒")}
          >
            <Container
              width="100%"
              height={64}
              border={{ top: { color: "hsl(var(--border))", width: 1 }, bottom: { color: "hsl(var(--border))", width: 1 }, left: { color: "hsl(var(--border))", width: 1 }, right: { color: "hsl(var(--border))", width: 1 } }}
              color="hsl(var(--accent) / 0.25)"
              borderRadius={12}
              alignment="center"
            >
              <Column crossAxisAlignment={CrossAxisAlignment.center} gap={4}>
                <Text variant="bodySmall" style={{ fontWeight: 600 }}>
                  GestureDetector Box
                </Text>
                <Text variant="bodySmall" style={{ color: "hsl(var(--muted-foreground))", fontSize: "10px" }}>
                  (Tap, DoubleTap, LongPress)
                </Text>
              </Column>
            </Container>
          </GestureDetector>

          <Container padding={10} color="rgba(0, 0, 0, 0.45)" borderRadius={8} border={{ top: { color: "hsl(var(--border) / 0.8)", width: 1 }, bottom: { color: "hsl(var(--border) / 0.8)", width: 1 }, left: { color: "hsl(var(--border) / 0.8)", width: 1 }, right: { color: "hsl(var(--border) / 0.8)", width: 1 } }}>
            <Text variant="bodySmall" style={{ fontFamily: "monospace", textAlign: "center", color: "#10b981", fontSize: "10px" }}>
              LOG: {gestureLog}
            </Text>
          </Container>
        </Column>
      );
    },
    generateCode: () => `import { InkWell } from "@/components/ui/ink-well";
import { GestureDetector } from "@/components/ui/gesture-detector";
import { Container } from "@/components/ui/container";
import { Text } from "@/components/ui/text";

// InkWell
<InkWell onTap={() => console.log("Tapped!")}>
  <Container borderRadius={12}>
    <Text>Ripple Box</Text>
  </Container>
</InkWell>

// GestureDetector
<GestureDetector 
  onTap={() => {}}
  onDoubleTap={() => {}}
  onLongPress={() => {}}
>
  <Container>
    <Text>Gesture Target</Text>
  </Container>
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
      <Container width={320} padding={20} borderRadius={12} border={{ top: { color: "hsl(var(--border))", width: 1 }, bottom: { color: "hsl(var(--border))", width: 1 }, left: { color: "hsl(var(--border))", width: 1 }, right: { color: "hsl(var(--border))", width: 1 } }}>
        <TextField
          label={states.label}
          hintText="Enter your valid email address..."
          errorText={states.error || undefined}
          filled={states.filled}
          borderRadius={8}
          prefixIcon={<Text variant="bodySmall" style={{ paddingLeft: "8px", paddingRight: "8px", color: "hsl(var(--muted-foreground))" }}>✉️</Text>}
          suffixIcon={<Text variant="bodySmall" style={{ paddingLeft: "8px", paddingRight: "8px", color: "hsl(var(--primary))", fontWeight: "bold" }}>Verify</Text>}
        />
      </Container>
    ),
    generateCode: (states) => `import { TextField } from "@/components/ui/text-field";
import { Text } from "@/components/ui/text";

<TextField
  label="${states.label}"
  hintText="Enter your valid email address..."
  errorText={${states.error ? `"${states.error}"` : "undefined"}}
  filled={${states.filled}}
  borderRadius={8}
  prefixIcon={<Text>✉️</Text>}
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
        <Container width={320} borderRadius={12} border={{ top: { color: "hsl(var(--border))", width: 1 }, bottom: { color: "hsl(var(--border))", width: 1 }, left: { color: "hsl(var(--border))", width: 1 }, right: { color: "hsl(var(--border))", width: 1 } }}>
          <Column gap={0}>
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
            <Container padding={16} color="hsl(var(--accent) / 0.25)">
              <Row mainAxisAlignment={MainAxisAlignment.spaceBetween} crossAxisAlignment={CrossAxisAlignment.center}>
                <Row gap={8} crossAxisAlignment={CrossAxisAlignment.center}>
                  <Checkbox value={cb1} onChanged={setCb1} />
                  <Text variant="bodySmall" style={{ color: "hsl(var(--muted-foreground))" }}>
                    Standard Checkbox
                  </Text>
                </Row>
                <Text variant="bodySmall" style={{ fontFamily: "monospace", fontWeight: "bold", color: "hsl(var(--primary))" }}>
                  C1: {cb1 ? "YES" : "NO"} | C2: {cb2 ? "YES" : "NO"}
                </Text>
              </Row>
            </Container>
          </Column>
        </Container>
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
        <Container width={320} padding={20} borderRadius={12} border={{ top: { color: "hsl(var(--border))", width: 1 }, bottom: { color: "hsl(var(--border))", width: 1 }, left: { color: "hsl(var(--border))", width: 1 }, right: { color: "hsl(var(--border))", width: 1 } }}>
          <Row mainAxisAlignment={MainAxisAlignment.spaceBetween} crossAxisAlignment={CrossAxisAlignment.center}>
            <Column gap={2}>
              <Text variant="bodySmall" style={{ fontWeight: "bold", color: "hsl(var(--foreground))" }}>
                Sandbox Live reload
              </Text>
              <Text variant="bodySmall" style={{ color: "hsl(var(--muted-foreground))", fontSize: "10px" }}>
                Enables hot refresh signals
              </Text>
            </Column>
            
            <Switch 
              value={sw} 
              onChanged={setSw}
              activeColor={states.activeColor} 
            />
          </Row>
        </Container>
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
        <Container width={320} padding={20} borderRadius={12} border={{ top: { color: "hsl(var(--border))", width: 1 }, bottom: { color: "hsl(var(--border))", width: 1 }, left: { color: "hsl(var(--border))", width: 1 }, right: { color: "hsl(var(--border))", width: 1 } }}>
          <Column gap={12}>
            <Row mainAxisAlignment={MainAxisAlignment.spaceBetween} width="100%">
              <Text variant="bodySmall" style={{ fontFamily: "monospace", color: "hsl(var(--muted-foreground))" }}>
                Dynamic Slider
              </Text>
              <Text variant="bodySmall" style={{ color: "hsl(var(--primary))", fontWeight: "bold", fontFamily: "monospace" }}>
                {Math.round(val)}
              </Text>
            </Row>
            <Slider 
              value={val} 
              onChanged={setVal} 
              min={states.min} 
              max={states.max}
              activeColor={states.activeColor}
            />
            <Text variant="bodySmall" style={{ textAlign: "center", color: "hsl(var(--muted-foreground))", fontFamily: "monospace", fontSize: "10px" }}>
              Range: [{states.min} - {states.max}]
            </Text>
          </Column>
        </Container>
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
      <Container
        width={340} 
        padding={20}
        border={Border.all({ color: "hsl(var(--border))", width: 1 })}
        color="hsl(var(--card))"
        borderRadius={12}
        elevation={1}
      >
        <Row mainAxisAlignment={MainAxisAlignment.center} crossAxisAlignment={CrossAxisAlignment.center} gap={24}>
          {/* Count Overlap Badge */}
          <Container width={48} height={48} alignment="center">
            <Container 
              width={48} 
              height={48} 
              color="hsl(var(--accent) / 0.4)"
              border={Border.all({ color: "hsl(var(--border))", width: 1 })}
              borderRadius={12}
              alignment="center"
              elevation={0}
              style={{ position: "relative" }}
            >
              <Text variant="headlineMedium">✉️</Text>
              <BadgeCount 
                count={states.badgeText} 
                style={{ 
                  position: "absolute", 
                  top: -8, 
                  right: -8,
                  fontFamily: "monospace",
                  fontSize: 9,
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  border: "2px solid hsl(var(--card))",
                  backgroundColor: states.badgeColor
                }}
              />
            </Container>
          </Container>

          {/* Inline Badge */}
          <Row gap={10} crossAxisAlignment={CrossAxisAlignment.center}>
            <Badge 
              style={{ 
                backgroundColor: states.badgeColor,
                color: "white",
                fontSize: 10,
                fontWeight: "bold",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 2,
                paddingBottom: 2,
                borderRadius: 9999
              }}
            >
              {states.badgeText}
            </Badge>
            <Text variant="bodySmall" style={{ color: "hsl(var(--muted-foreground))", fontWeight: 500 }}>
              Standard badge status
            </Text>
          </Row>
        </Row>
      </Container>
    ),
    generateCode: (states) => `import { Badge } from "@/components/ui/badge";
import { BadgeCount } from "@/components/ui/badge-count";
import { Container } from "@/components/ui/container";
import { Row } from "@/components/ui/row";
import { Text } from "@/components/ui/text";

// BadgeCount Notification Overlay
<Container width={48} height={48} alignment="center">
  <Container 
    width={48} 
    height={48} 
    color="hsl(var(--accent) / 0.4)"
    border={Border.all({ color: "hsl(var(--border))", width: 1 })}
    borderRadius={12}
    alignment="center"
    style={{ position: "relative" }}
  >
    <Text variant="headlineMedium">✉️</Text>
    <BadgeCount 
      count="${states.badgeText}" 
      style={{ 
        position: "absolute", 
        top: -8, 
        right: -8,
        backgroundColor: "${states.badgeColor}"
      }}
    />
  </Container>
</Container>

// Inline Badge Label
<Row gap={10} crossAxisAlignment={CrossAxisAlignment.center}>
  <Badge 
    style={{ 
      backgroundColor: "${states.badgeColor}",
      color: "white",
      fontSize: 10,
      fontWeight: "bold",
      textTransform: "uppercase"
    }}
  >
    ${states.badgeText}
  </Badge>
  <Text variant="bodySmall" style={{ color: "hsl(var(--muted-foreground))" }}>
    Standard badge status
  </Text>
</Row>`
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
      <Container 
        padding={16}
        border={Border.all({ color: "hsl(var(--border) / 0.8)", width: 1, style: "dashed" })}
        borderRadius={12}
        color="hsl(var(--card) / 0.25)"
      >
        <Chip
          label={states.label}
          selected={states.selected}
          onDeleted={states.showDelete ? () => alert("Delete chip tapped!") : undefined}
          avatar={<CircularAvatar initials={states.label[0]} radius={10} backgroundColor="#a78bfa" />}
          elevation={1}
        />
      </Container>
    ),
    generateCode: (states) => `import { Chip } from "@/components/ui/chip";
import { CircularAvatar } from "@/components/ui/circular-avatar";
import { Container } from "@/components/ui/container";

<Container 
  padding={16}
  border={Border.all({ color: "hsl(var(--border) / 0.8)", width: 1, style: "dashed" })}
  borderRadius={12}
  backgroundColor="hsl(var(--card) / 0.25)"
>
  <Chip
    label="${states.label}"
    selected={${states.selected}}
    onDeleted={${states.showDelete ? "() => {}" : "undefined"}}
    avatar={<CircularAvatar initials="${states.label[0]}" radius={10} backgroundColor="#a78bfa" />}
    elevation={1}
  />
</Container>`
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
      <Card
        width={320} 
        padding={20}
        color="hsl(var(--card))"
        borderRadius={12}
        elevation={1}
      >
        <Column crossAxisAlignment={CrossAxisAlignment.center} gap={16}>
          <CircularAvatar
            radius={states.radius}
            initials={states.text}
            backgroundImage={states.image || undefined}
            backgroundColor="#3b82f6"
            ringColor="hsl(var(--primary) / 0.2)"
            ringWidth={2}
            style={{ boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}
          />
          <Text variant="bodySmall" style={{ fontFamily: "monospace", color: "hsl(var(--muted-foreground))" }}>
            Radius specified: {states.radius}px
          </Text>
        </Column>
      </Card>
    ),
    generateCode: (states) => `import { CircularAvatar } from "@/components/ui/circular-avatar";
import { Card } from "@/components/ui/card";
import { Column } from "@/components/ui/column";
import { Text } from "@/components/ui/text";
import { CrossAxisAlignment } from "@/components/ui/types";

<Card
  width={320} 
  padding={20}
  color="hsl(var(--card))"
  borderRadius={12}
  elevation={1}
>
  <Column crossAxisAlignment={CrossAxisAlignment.center} gap={16}>
    <CircularAvatar
      radius={${states.radius}}
      initials="${states.text}"
      backgroundImage="${states.image}"
      backgroundColor="#3b82f6"
      ringColor="hsl(var(--primary) / 0.2)"
      ringWidth={2}
    />
    <Text variant="bodySmall" style={{ fontFamily: "monospace", color: "hsl(var(--muted-foreground))" }}>
      Radius specified: ${states.radius}px
    </Text>
  </Column>
</Container>`
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
      <Column 
        width={320} 
        gap={24} 
        padding={20}
        border={Border.all({ color: "hsl(var(--border))", width: 1 })}
        borderRadius={12}
        color="hsl(var(--card))"
        elevation={2}
      >
        <Row mainAxisAlignment={MainAxisAlignment.spaceAround} crossAxisAlignment={CrossAxisAlignment.center}>
          <CircularProgressIndicator
            size={48}
            strokeWidth={states.strokeWidth}
            color="#ec4899"
          />
          <Column gap={4} crossAxisAlignment={CrossAxisAlignment.center}>
            <Text variant="bodySmall" style={{ fontFamily: "monospace", color: "hsl(var(--muted-foreground))" }}>
              Circular Progress
            </Text>
            <Text variant="bodySmall" style={{ fontFamily: "monospace", fontWeight: "bold", color: "#ec4899" }}>
              SPINNING...
            </Text>
          </Column>
        </Row>

        <Container 
          padding={{ top: 16 }} 
          border={{ top: { color: "hsl(var(--border) / 0.8)", width: 1 } }}
        >
          <Column gap={8}>
            <Text variant="bodySmall" style={{ fontFamily: "monospace", color: "hsl(var(--muted-foreground))" }}>
              Linear Progress Bar:
            </Text>
            <ProgressBar 
              value={states.indeterminate ? undefined : states.value / 100} 
              color="#3b82f6"
              backgroundColor="hsl(var(--accent))"
              minHeight={6}
              borderRadius={999}
            />
          </Column>
        </Container>
      </Column>
    ),
    generateCode: (states) => `import { CircularProgressIndicator } from "@/components/ui/circular-progress-indicator";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Column } from "@/components/ui/column";
import { Row } from "@/components/ui/row";
import { Container } from "@/components/ui/container";
import { Text } from "@/components/ui/text";

// Circular Loader
<Row mainAxisAlignment={MainAxisAlignment.spaceAround}>
  <CircularProgressIndicator
    size={48}
    strokeWidth={${states.strokeWidth}}
    color="#ec4899"
  />
  <Column gap={4}>
    <Text variant="bodySmall">Circular Progress</Text>
    <Text variant="bodySmall" style={{ fontWeight: "bold", color: "#ec4899" }}>
      SPINNING...
    </Text>
  </Column>
</Row>

// Linear Progress Bar
<Column gap={8}>
  <Text variant="bodySmall">Linear Progress Bar:</Text>
  <ProgressBar
    value={${states.indeterminate ? "undefined" : states.value / 100}}
    color="#3b82f6"
    minHeight={6}
    borderRadius={999}
  />
</Column>`
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
      <Card
        width={320} 
        padding={20}
        color="hsl(var(--card))"
        borderRadius={12}
        elevation={2}
      >
        <Row gap={14} crossAxisAlignment={CrossAxisAlignment.center}>
          <Skeleton 
            width={48} 
            height={48} 
            borderRadius={9999} 
            isActive={states.active}
          />
          <Column gap={8} style={{ flex: 1 }}>
            <Skeleton 
              width="80%" 
              height={12} 
              isActive={states.active}
            />
            <Skeleton 
              width="50%" 
              height={8} 
              isActive={states.active}
            />
          </Column>
        </Row>
      </Card>
    ),
    generateCode: (states) => `import { Skeleton } from "@/components/ui/skeleton";
import { Row } from "@/components/ui/row";
import { Column } from "@/components/ui/column";
import { Card } from "@/components/ui/card";

<Card
  width={320} 
  padding={20}
  color="hsl(var(--card))"
  borderRadius={12}
  elevation={2}
>
  <Row gap={14} crossAxisAlignment={CrossAxisAlignment.center}>
    <Skeleton 
      width={48} 
      height={48} 
      borderRadius={9999} 
      isActive={${states.active}}
    />
    <Column gap={8} style={{ flex: 1 }}>
      <Skeleton width="80%" height={12} isActive={${states.active}} />
      <Skeleton width="50%" height={8} isActive={${states.active}} />
    </Column>
  </Row>
</Container>`
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
      <Container 
        width={320} 
        height={128} 
        border={Border.all({ color: "hsl(var(--border))", width: 1 })}
        color="hsl(var(--card))"
        borderRadius={12}
        elevation={1}
        alignment="center"
      >
        <Tooltip message={states.message} side="top">
          <Container
            padding={EdgeInsetsUtil.symmetric({ horizontal: 20, vertical: 10 })}
            color="hsl(var(--primary))"
            borderRadius={8}
            elevation={1}
            style={{ cursor: "pointer" }}
          >
            <Text 
              variant="bodySmall" 
              style={{ 
                color: "hsl(var(--primary-foreground))", 
                fontWeight: "bold" 
              }}
            >
              Hover Mouse Cursor Here
            </Text>
          </Container>
        </Tooltip>
      </Container>
    ),
    generateCode: (states) => `import { Tooltip } from "@/components/ui/tooltip";
import { Container } from "@/components/ui/container";
import { Text } from "@/components/ui/text";

<Tooltip message="${states.message}" side="top">
  <Container
    padding={EdgeInsetsUtil.symmetric({ horizontal: 20, vertical: 10 })}
    color="hsl(var(--primary))"
    borderRadius={8}
  >
    <Text 
      variant="bodySmall" 
      style={{ color: "hsl(var(--primary-foreground))", fontWeight: "bold" }}
    >
      Hover Mouse Cursor Here
    </Text>
  </Container>
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
        <Container 
          width={320} 
          height={144} 
          border={Border.all({ color: "hsl(var(--border) / 0.8)", width: 1, style: "dashed" })}
          borderRadius={12}
          color="hsl(var(--card) / 0.1)"
          alignment="center"
        >
          <Container
            padding={EdgeInsetsUtil.symmetric({ horizontal: 20, vertical: 10 })}
            color="#f43f5e"
            borderRadius={8}
            elevation={1}
            style={{ cursor: "pointer" }}
            onClick={() => setShow(true)}
          >
            <Text 
              variant="bodySmall" 
              style={{ color: "white", fontWeight: "bold" }}
            >
              Launch System Alert Dialog
            </Text>
          </Container>

          {show && (
            <Container 
              style={{ 
                position: "absolute", 
                inset: 0, 
                backgroundColor: "rgba(0,0,0,0.6)", 
                zIndex: 50,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 20
              }}
            >
              <AlertDialog
                isOpen={show}
                onClose={() => setShow(false)}
                title={
                  <Row gap={8} crossAxisAlignment={CrossAxisAlignment.center} style={{ color: "#f43f5e" }}>
                    <AlertTriangle size={18} />
                    <Text variant="titleMedium" style={{ fontFamily: "Outfit", fontWeight: "bold" }}>
                      Destructive Action Alert
                    </Text>
                  </Row>
                }
                content={
                  <Text 
                    variant="bodyMedium" 
                    style={{ 
                      color: "hsl(var(--muted-foreground))", 
                      lineHeight: 1.6,
                      marginTop: 10
                    }}
                  >
                    Are you absolutely sure you want to completely drop these records tables? This operation is permanent.
                  </Text>
                }
                actions={[
                  <Container 
                    key="c" 
                    padding={EdgeInsetsUtil.symmetric({ horizontal: 14, vertical: 6 })}
                    border={Border.all({ color: "hsl(var(--border))", width: 1 })}
                    borderRadius={6}
                    style={{ cursor: "pointer" }}
                    onClick={() => setShow(false)}
                  >
                    <Text variant="bodySmall" style={{ fontWeight: 600 }}>
                      Cancel Action
                    </Text>
                  </Container>,
                  <Container 
                    key="o" 
                    padding={EdgeInsetsUtil.symmetric({ horizontal: 16, vertical: 6 })}
                    color="#f43f5e"
                    borderRadius={6}
                    elevation={1}
                    style={{ cursor: "pointer" }}
                    onClick={() => { setShow(false); alert("Action Verified!"); }}
                  >
                    <Text variant="bodySmall" style={{ color: "white", fontWeight: "bold" }}>
                      Verify Delete
                    </Text>
                  </Container>
                ]}
              />
            </Container>
          )}
        </Container>
      );
    },
    generateCode: () => `import { AlertDialog } from "@/components/ui/dialog";
import { Container } from "@/components/ui/container";
import { Row } from "@/components/ui/row";
import { Text } from "@/components/ui/text";

// Call AlertDialog under portals or state gates:
<AlertDialog
  isOpen={show}
  onClose={close}
  title={
    <Row gap={8}>
      <AlertTriangle size={18} />
      <Text variant="titleMedium" style={{ fontWeight: "bold" }}>
        Verify Action
      </Text>
    </Row>
  }
  content={
    <Text variant="bodyMedium" style={{ color: "hsl(var(--muted-foreground))" }}>
      Are you sure you want to drop these tables?
    </Text>
  }
  actions={[
    <Container 
      padding={{ horizontal: 14, vertical: 6 }}
      border={Border.all({ color: "hsl(var(--border))", width: 1 })}
      borderRadius={6}
      onClick={close}
    >
      <Text variant="bodySmall">Cancel</Text>
    </Container>,
    <Container 
      padding={{ horizontal: 16, vertical: 6 }}
      backgroundColor="#f43f5e"
      borderRadius={6}
      onClick={confirm}
    >
      <Text variant="bodySmall" style={{ color: "white", fontWeight: "bold" }}>
        Proceed
      </Text>
    </Container>
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
      <Container 
        width={320} 
        padding={EdgeInsetsUtil.all(20)} 
        color="hsl(var(--card))"
        border={Border.all({ color: "hsl(var(--border))", width: 1 })}
        borderRadius={12}
        elevation={2}
      >
        <Column crossAxisAlignment={CrossAxisAlignment.center} gap={8}>
          <OverlayProvider />
          <Text 
            variant="bodySmall" 
            style={{ 
              color: "hsl(var(--primary))", 
              fontWeight: 600 
            }}
          >
            Portal Overlay System Active
          </Text>
          <Container 
            padding={14}
            color="hsl(var(--accent) / 0.4)"
            borderRadius={8}
            border={Border.all({ color: "hsl(var(--border))", width: 1 })}
          >
            <Text 
              variant="bodySmall" 
              style={{ 
                color: "hsl(var(--muted-foreground))", 
                lineHeight: 1.6,
                fontSize: 11
              }}
            >
              Standard overlay context provider powering portal menus, alerts, and custom float lists outside normal DOM hierarchies.
            </Text>
          </Container>
        </Column>
      </Container>
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
      <Column 
        width={320} 
        gap={16} 
        padding={EdgeInsetsUtil.all(20)} 
        border={Border.all({ color: "hsl(var(--border))", width: 1 })}
        color="hsl(var(--card))"
        borderRadius={12}
        elevation={2}
      >
        {/* Dynamic Text */}
        <Column gap={4}>
          <Text variant="bodySmall" style={{ fontFamily: "monospace", color: "hsl(var(--muted-foreground))", fontSize: 10 }}>
            Typography Widget:
          </Text>
          <Text variant={states.variant} style={{ color: "hsl(var(--primary))", fontWeight: "bold" }}>
            Typography Variant: {states.variant}
          </Text>
        </Column>

        {/* Image fit */}
        <Container 
          padding={{ top: 12 }} 
          border={{ top: { color: "hsl(var(--border) / 0.8)", width: 1 } }}
        >
          <Column gap={8}>
            <Text variant="bodySmall" style={{ fontFamily: "monospace", color: "hsl(var(--muted-foreground))", fontSize: 10 }}>
              Image Fit ({states.imageFit}):
            </Text>
            <Container 
              height={96} 
              borderRadius={8}
              border={Border.all({ color: "hsl(var(--border))", width: 1 })}
              color="hsl(var(--accent) / 0.25)"
              style={{ overflow: "hidden" }}
            >
              <Image 
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80" 
                alt="Unsplash Showcase"
                fit={states.imageFit}
                style={{ width: "100%", height: "100%" }}
              />
            </Container>
          </Column>
        </Container>
      </Column>
    ),
    generateCode: (states) => `import { Text } from "@/components/ui/text";
import { Image } from "@/components/ui/image";
import { Column } from "@/components/ui/column";
import { Container } from "@/components/ui/container";

// Text Styling
<Column gap={4}>
  <Text variant="bodySmall" style={{ fontFamily: "monospace", color: "hsl(var(--muted-foreground))" }}>
    Typography Widget:
  </Text>
  <Text variant="${states.variant}" style={{ color: "hsl(var(--primary))", fontWeight: "bold" }}>
    Typography Variant: ${states.variant}
  </Text>
</Column>

// Image Fits
<Container 
  height={96} 
  borderRadius={8}
  style={{ overflow: "hidden" }}
>
  <Image 
    src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe"
    fit="${states.imageFit}" 
    style={{ width: "100%", height: "100%" }}
  />
</Container>`
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
      <Column 
        width={320} 
        gap={16} 
        padding={EdgeInsetsUtil.all(20)} 
        border={Border.all({ color: "hsl(var(--border))", width: 1 })}
        color="hsl(var(--card))"
        borderRadius={12}
        elevation={2}
        mainAxisAlignment={MainAxisAlignment.center}
      >
        <Column gap={8}>
          <Text variant="bodySmall" style={{ fontFamily: "monospace", color: "hsl(var(--muted-foreground))", fontSize: 10 }}>
            Horizontal Divider (t={states.thickness}px):
          </Text>
          <Container 
            padding={EdgeInsetsUtil.all(8)} 
            color="hsl(var(--accent) / 0.25)"
            borderRadius={6}
          >
            <Column gap={8}>
              <Text variant="bodyMedium">Upper Content Block</Text>
              <Divider thickness={states.thickness} color="#8b5cf6" />
              <Text variant="bodyMedium">Lower Content Block</Text>
            </Column>
          </Container>
        </Column>

        <Column gap={8}>
          <Text variant="bodySmall" style={{ fontFamily: "monospace", color: "hsl(var(--muted-foreground))", fontSize: 10 }}>
            Dashed Separator:
          </Text>
          <Container 
            padding={EdgeInsetsUtil.all(8)} 
            color="hsl(var(--accent) / 0.25)"
            borderRadius={6}
          >
            <Column gap={8}>
              <Text variant="bodyMedium">Dashed Segment A</Text>
              <Separator orientation="horizontal" style={{ backgroundColor: "#e2e8f0" }} />
              <Text variant="bodyMedium">Dashed Segment B</Text>
            </Column>
          </Container>
        </Column>

        <Container 
          height={80} 
          color="hsl(var(--accent) / 0.25)"
          borderRadius={6}
          padding={8}
        >
          <Column gap={4}>
            <Text variant="bodySmall" style={{ fontFamily: "monospace", color: "hsl(var(--muted-foreground))", fontSize: 10 }}>
              VerticalDivider:
            </Text>
            <Row 
              height={40} 
              crossAxisAlignment={CrossAxisAlignment.center} 
              mainAxisAlignment={MainAxisAlignment.spaceAround}
            >
              <Text variant="bodySmall">Col A</Text>
              <VerticalDivider thickness={states.thickness} color="#ec4899" />
              <Text variant="bodySmall">Col B</Text>
            </Row>
          </Column>
        </Container>
      </Column>
    ),
    generateCode: (states) => `import { Divider } from "@/components/ui/divider";
import { Separator } from "@/components/ui/separator";
import { VerticalDivider } from "@/components/ui/vertical-divider";
import { Column } from "@/components/ui/column";
import { Row } from "@/components/ui/row";
import { Container } from "@/components/ui/container";
import { Text } from "@/components/ui/text";

// Horizontal Divider
<Column gap={8}>
  <Text variant="bodyMedium">Upper Content Block</Text>
  <Divider thickness={${states.thickness}} color="#8b5cf6" />
  <Text variant="bodyMedium">Lower Content Block</Text>
</Column>

// Dashed Separator
<Column gap={8}>
  <Text variant="bodyMedium">Dashed Segment A</Text>
  <Separator orientation="horizontal" />
  <Text variant="bodyMedium">Dashed Segment B</Text>
</Column>

// Vertical Divider
<Row height={40} mainAxisAlignment={MainAxisAlignment.spaceAround}>
  <Text variant="bodySmall">Col A</Text>
  <VerticalDivider thickness={${states.thickness}} color="#ec4899" />
  <Text variant="bodySmall">Col B</Text>
</Row>`
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
        <Column 
          width={320} 
          gap={12} 
          padding={20}
          border={Border.all({ color: "hsl(var(--border))", width: 1 })}
          color="hsl(var(--card))"
          borderRadius={12}
          elevation={2}
        >
          <Text 
            variant="bodySmall" 
            style={{ 
              fontWeight: "bold", 
              textTransform: "uppercase", 
              letterSpacing: "0.1em", 
              color: "hsl(var(--muted-foreground))" 
            }}
          >
            Flutter Color Tokens
          </Text>
          <Container padding={{ top: 4 }}>
            <Row 
              gap={8} 
              style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(4, 1fr)" 
              }}
            >
              {colorSamples.map((samp, i) => {
                const hexVal = samp.color.toHex();
                return (
                  <Column 
                    key={i} 
                    gap={4}
                    crossAxisAlignment={CrossAxisAlignment.center}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      navigator.clipboard.writeText(hexVal);
                      alert(`Copied ${samp.name} hex code: ${hexVal}`);
                    }}
                  >
                    <Container 
                      width={40} 
                      height={40} 
                      borderRadius={9999}
                      border={Border.all({ color: "hsl(var(--border))", width: 1 })}
                      elevation={2}
                      style={{ 
                        backgroundColor: hexVal,
                        transition: "transform 0.2s"
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
                      onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                    />
                    <Text 
                      variant="bodySmall" 
                      style={{ 
                        fontSize: 8, 
                        fontWeight: 600, 
                        color: "hsl(var(--muted-foreground))",
                        textAlign: "center",
                        maxWidth: "100%",
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                      }}
                    >
                      {samp.name.split(".")[1]}
                    </Text>
                  </Column>
                );
              })}
            </Row>
          </Container>
          <Text 
            variant="bodySmall" 
            style={{ 
              fontSize: 9, 
              textAlign: "center", 
              color: "hsl(var(--muted-foreground) / 0.8)",
              fontFamily: "monospace",
              marginTop: 8
            }}
          >
            Click color circles to copy hex code values instantly!
          </Text>
        </Column>
      );
    },
    generateCode: () => `import { Colors } from "@/components/ui/Colors";

// Access hex value or ARGB details anywhere:
const primaryHex = Colors.blue.toHex(); // "#2196f3"
const semiTransRed = Colors.red.withOpacity(0.5).toRgba(); // "rgba(244, 67, 54, 0.5)"`
  }
];
