# GEMINI PROJECT MASTER PROMPT

## Interactive 3D Developer Portfolio — Athallah Dzaki Anggoro Seputro

You are acting as a:

- Senior Frontend Engineer
- Creative Developer
- Three.js / WebGL Engineer
- UI/UX Engineer
- Technical Architect
- Accessibility Engineer
- Performance-focused Web Developer

Your task is to autonomously build a production-ready interactive developer portfolio for:

**Name:** Athallah Dzaki Anggoro Seputro  
**Role:** Creative Developer / Frontend Developer  
**Main Technology:** Three.js  
**Design Direction:** Futuristic, minimal, premium, immersive, editorial, modern  
**Development Strategy:** MOBILE FIRST  
**Execution Mode:** CONTINUOUS AUTONOMOUS MODE  
**Git Strategy:** Commit + Push every Phase to the currently active GitHub branch

---

# 1. MAIN OBJECTIVE

Build a developer portfolio that feels like an interactive digital experience rather than a traditional CV or resume website.

The website must communicate that:

> Athallah Dzaki Anggoro Seputro is capable of engineering modern, interactive, high-performance digital experiences.

Three.js must support storytelling, navigation, interaction, and visual identity.

Three.js must NOT exist only as decoration.

The final portfolio must be:

- Modern
- Premium
- Responsive
- MOBILE FIRST
- Touch friendly
- Accessible
- SEO friendly
- Fast
- Interactive
- High performance
- Maintainable
- Scalable
- Production ready
- WebGL optimized
- Gracefully degradable

---

# 2. EXECUTION MODE

This project runs in:

```txt
CONTINUOUS AUTONOMOUS MODE
```

Gemini must automatically continue from Phase 01 to the final Phase.

Do NOT stop after completing a Phase.

Do NOT ask for confirmation between Phases.

Do NOT ask:

```txt
Should I continue?
Can I start the next phase?
Would you like me to proceed?
Do you want me to continue?
```

Instead execute:

```txt
PHASE 01
↓
IMPLEMENT
↓
TEST MOBILE
↓
ENHANCE TABLET
↓
ENHANCE DESKTOP
↓
VALIDATE
↓
COMMIT
↓
PUSH
↓
VERIFY

PHASE 02
↓
IMPLEMENT
↓
VALIDATE
↓
COMMIT
↓
PUSH
↓
VERIFY

...

FINAL PHASE
↓
FINAL VALIDATION
↓
FINAL COMMIT IF REQUIRED
↓
FINAL PUSH
↓
FINAL REPORT
```

Each Phase must remain logically separated.

Each Phase must have its own Git commit whenever it introduces repository changes.

Each Phase must be pushed before continuing to the next Phase.

---

# 3. MOBILE-FIRST POLICY

This entire project MUST use a:

```txt
MOBILE FIRST
```

development strategy.

Mobile is NOT a reduced desktop version.

Mobile is the primary design target.

Implementation order:

```txt
MOBILE
↓
TABLET
↓
DESKTOP
↓
LARGE DESKTOP
```

Never build desktop first and attempt to make it responsive afterward.

Before implementing any visual or interactive feature, evaluate:

```txt
How does this behave at 320px width?

Can the user use it without hover?

Is it usable with touch?

Are touch targets large enough?

Does the content fit without horizontal overflow?

Does Three.js perform acceptably?

Does the modal fit the viewport?

Can it be operated with keyboard?

Does it work with reduced motion?

Can important content be accessed without WebGL?
```

---

# 4. TARGET VIEWPORTS

Primary mobile testing:

```txt
320px
360px
375px
390px
414px
```

Tablet:

```txt
640px
768px
834px
```

Desktop:

```txt
1024px
1280px
1440px
1920px
```

Recommended test viewports:

```txt
320 × 568
360 × 800
375 × 812
390 × 844
414 × 896
768 × 1024
1024 × 768
1280 × 800
1440 × 900
```

The website must not rely on a specific screen ratio.

---

# 5. MOBILE-FIRST BREAKPOINT STRATEGY

Base CSS targets mobile.

Preferred philosophy:

```css
.component {
  /* Mobile base */
}

@media (min-width: 640px) {
  /* Small tablet enhancement */
}

@media (min-width: 768px) {
  /* Tablet enhancement */
}

@media (min-width: 1024px) {
  /* Desktop enhancement */
}

@media (min-width: 1280px) {
  /* Large desktop enhancement */
}
```

Prefer `min-width` progressive enhancement.

Do not build a desktop layout and override everything using `max-width`.

---

# 6. TOUCH-FIRST INTERACTION POLICY

Core functionality must work without:

```txt
Hover
Mouse wheel
Precise cursor
Right click
Desktop pointer
```

Every hover-only interaction must have an equivalent:

```txt
Tap
Click
Focus
Scroll
Keyboard
```

Example:

```txt
Desktop:
Hover node → preview
Click node → modal

Mobile:
Tap node → modal
```

Do not hide important information behind hover.

---

# 7. TOUCH TARGET REQUIREMENTS

Interactive controls should generally provide at least approximately:

```txt
44 × 44px
```

touch area.

This applies to:

```txt
Navigation
Buttons
Skill nodes
Modal close buttons
Project controls
Social links
Playground controls
Terminal controls
Category filters
CTA controls
```

Three.js interactive objects must be easy to tap.

Do not create tiny 3D click targets.

---

# 8. TECHNOLOGY STACK

Use:

```txt
Next.js
React
TypeScript
Tailwind CSS

Three.js
@react-three/fiber
@react-three/drei

GSAP
GSAP ScrollTrigger

Framer Motion
```

Optional only when technically justified:

```txt
Lenis
Zustand
@react-three/postprocessing
GLSL
```

Do not install dependencies purely because they might be useful later.

Use the package manager already configured in the repository.

Possible:

```txt
npm
pnpm
yarn
bun
```

Never unnecessarily change package manager.

---

# 9. INSPECT BEFORE EDITING

Before changing anything:

1. Inspect the current repository.
2. Inspect the project tree.
3. Inspect `package.json`.
4. Detect package manager.
5. Inspect Next.js configuration.
6. Inspect TypeScript configuration.
7. Inspect Tailwind configuration.
8. Inspect existing styling.
9. Inspect existing components.
10. Inspect current Three.js code.
11. Inspect existing assets.
12. Inspect current Git status.
13. Detect active branch.
14. Detect Git remote.
15. Preserve unrelated existing work.

The existing repository is the source of truth.

Do not assume the repository is empty.

---

# 10. PRESERVE EXISTING CODE

Prefer:

```txt
INSPECT
↓
UNDERSTAND
↓
REUSE
↓
EXTEND
```

instead of:

```txt
DELETE
↓
REWRITE EVERYTHING
```

Do not refactor unrelated components without a concrete reason.

Do not rename unrelated files.

Do not move unrelated directories.

Do not replace existing working architecture unless necessary.

---

# 11. PROJECT ARCHITECTURE

Preferred structure:

```txt
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── work/
│       └── [slug]/
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Navigation.tsx
│   │
│   ├── sections/
│   │   ├── Hero/
│   │   ├── About/
│   │   ├── Skills/
│   │   ├── Projects/
│   │   ├── Experience/
│   │   ├── Playground/
│   │   └── Contact/
│   │
│   └── ui/
│       ├── Button.tsx
│       ├── SectionLabel.tsx
│       ├── RevealText.tsx
│       └── MagneticButton.tsx
│
├── three/
│   ├── ThreeCanvas.tsx
│   ├── Experience.tsx
│   ├── CameraRig.tsx
│   ├── Lights.tsx
│   ├── Environment.tsx
│   ├── hero/
│   ├── skills/
│   ├── projects/
│   ├── playground/
│   ├── materials/
│   ├── shaders/
│   └── effects/
│
├── data/
│   ├── projects.ts
│   ├── skills.ts
│   ├── experience.ts
│   └── socials.ts
│
├── hooks/
├── lib/
├── types/
└── utils/
```

Only create directories when required.

Do not create dozens of empty placeholder files.

---

# 12. TYPESCRIPT RULES

Use TypeScript strictly.

Avoid:

```ts
any
```

unless absolutely necessary.

Prefer:

```txt
Explicit interfaces
Typed props
Typed refs
Union types
Generics when useful
Typed data structures
```

Example:

```ts
export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  year: number;
  technologies: string[];
  image: string;
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}
```

---

# 13. REACT RULES

Avoid:

```txt
Huge components
Duplicated logic
Unnecessary Context
Unnecessary useEffect
Deep prop drilling
Per-frame React state
Inline data
Excessive state
Unnecessary rerenders
```

Prefer when appropriate:

```txt
useRef
useMemo
useCallback
custom hooks
component composition
data-driven rendering
```

Do not over-engineer simple UI.

---

# 14. THREE.JS RULES

Always consider:

```txt
FPS
Draw calls
Polygon count
Material count
Texture memory
Shader complexity
Transparency
Postprocessing
DPR
GPU memory
Mobile GPU
Battery usage
```

Never use React state for per-frame animation.

Bad:

```tsx
useFrame(() => {
  setRotation((value) => value + 0.01);
});
```

Preferred:

```tsx
const meshRef = useRef<THREE.Mesh>(null);

useFrame((_, delta) => {
  if (!meshRef.current) return;

  meshRef.current.rotation.y += delta * 0.15;
});
```

---

# 15. THREE.JS MOBILE POLICY

Mobile defaults should prefer:

```txt
DPR around 1
Lower geometry complexity
Fewer particles
Simpler shaders
Minimal transparency
Minimal postprocessing
Fewer lights
Reduced connections
Reduced animation intensity
```

Tablet can enhance some effects.

Desktop can enable richer effects.

Use:

```txt
MOBILE BASE
↓
TABLET ENHANCEMENT
↓
DESKTOP ENHANCEMENT
```

Not:

```txt
FULL DESKTOP SCENE
↓
TRY TO REMOVE FEATURES ON MOBILE
```

---

# 16. RESOURCE MANAGEMENT

Be careful with:

```txt
Geometry
Materials
Textures
GLTF resources
Render targets
Shaders
Postprocessing
```

Avoid recreating expensive objects every render.

Memoize when it provides measurable benefit.

Dispose manually created resources when necessary.

Do not dispose shared resources accidentally.

---

# 17. PERFORMANCE TARGET

Target approximately:

```txt
Desktop:
60 FPS

Modern Mobile:
30–60 FPS
```

Maintain smooth scrolling and touch interaction.

User input responsiveness is more important than maximum graphical complexity.

---

# 18. DESIGN DIRECTION

Visual language:

```txt
Minimalism
+
Editorial Typography
+
Creative Coding
+
Futuristic UI
+
Immersive 3D
```

Avoid:

```txt
Generic SaaS layout
Excessive gradients
Excessive neon
Random glowing components
Overused glassmorphism
Random motion
Unnecessary postprocessing
Template-like visuals
```

The site must feel intentional and cohesive.

---

# 19. COLOR SYSTEM

Suggested background:

```css
#050505
#080808
#0B0B0B
```

Text:

```css
#FFFFFF
#EDEDED
#A1A1A1
```

Border:

```css
rgba(255, 255, 255, 0.12)
```

Choose one main accent color.

Possible:

```txt
Electric Blue
Cyan
Purple
Lime
```

Do not mix several unrelated accent colors.

---

# 20. TYPOGRAPHY

Hero:

```txt
ATHALLAH DZAKI
ANGGORO SEPUTRO
```

Supporting:

```txt
CREATIVE DEVELOPER

Building immersive
digital experiences.
```

Use responsive typography with:

```css
clamp()
```

Example:

```css
font-size: clamp(2.75rem, 14vw, 8rem);
```

Always verify long text at 320px width.

---

# 21. MOBILE SAFE AREA

Fixed or fullscreen UI must consider:

```css
env(safe-area-inset-top)
env(safe-area-inset-right)
env(safe-area-inset-bottom)
env(safe-area-inset-left)
```

Especially:

```txt
Navigation
Modal
Bottom sheet
Fullscreen menu
Fixed actions
```

---

# 22. SITE STRUCTURE

```txt
01 Hero
02 About
03 Skills
04 Selected Work
05 Experience
06 Playground
07 Contact
08 Footer
```

---

# PHASE 01 — PROJECT FOUNDATION

## Goal

Create a clean production-ready base.

## Tasks

- Inspect repository
- Detect package manager
- Validate Next.js setup
- Validate TypeScript
- Validate Tailwind
- Configure global styles
- Configure fonts
- Configure root metadata
- Configure root layout
- Define design tokens
- Configure mobile-first spacing
- Configure body overflow behavior
- Configure safe-area handling

Suggested variables:

```css
:root {
  --background: #050505;
  --foreground: #ffffff;
  --muted: #999999;
  --border: rgba(255, 255, 255, 0.12);

  --page-padding: clamp(1rem, 4vw, 3rem);
  --section-space: clamp(5rem, 12vw, 12rem);
}
```

Do not create complex WebGL visuals yet.

---

# PHASE 02 — PROJECT ARCHITECTURE

Establish scalable architecture.

Create only required directories.

Keep:

```txt
UI
Sections
Data
Three.js
Hooks
Types
Utilities
```

separated.

Do not create empty placeholder components unnecessarily.

---

# PHASE 03 — GLOBAL THREE.JS CANVAS

Create React Three Fiber foundation.

Architecture:

```txt
Application
│
├── ThreeCanvas
│   └── Experience
│
└── HTML Content
    ├── Hero
    ├── About
    ├── Skills
    ├── Projects
    ├── Experience
    └── Contact
```

Requirements:

```txt
Fixed/global canvas
Responsive camera
Controlled DPR
Suspense
Mobile-safe dimensions
Performance-aware settings
Clean scene hierarchy
```

Suggested:

```tsx
<Canvas dpr={[1, 1.5]}>
```

Mobile should favor lower DPR.

Do not add expensive postprocessing yet.

---

# PHASE 04 — PRELOADER

Use actual asset loading progress.

Use:

```tsx
useProgress()
```

Example:

```txt
ATHALLAH DZAKI
ANGGORO SEPUTRO

INITIALIZING EXPERIENCE

████████████████░░░ 82%
```

Requirements:

- Real loading progress
- No fake timeout
- Smooth transition
- Mobile-safe layout
- No horizontal overflow
- Accessible text equivalent
- Prevent flashing content

---

# PHASE 05 — NAVIGATION

Create mobile-first navigation.

Mobile default:

```txt
ATHALLAH.                MENU
```

Opening menu may show:

```txt
ABOUT
WORK
SKILLS
EXPERIENCE
CONTACT

GITHUB
LINKEDIN
```

Desktop enhancement:

```txt
ATHALLAH.

ABOUT
WORK
SKILLS
CONTACT
```

Requirements:

- Touch-safe
- Keyboard accessible
- Fixed/sticky as appropriate
- Safe-area aware
- Accessible menu state
- Smooth navigation
- No hover dependency
- Active section indication

---

# PHASE 06 — HERO

Content:

```txt
ATHALLAH DZAKI
ANGGORO SEPUTRO

CREATIVE DEVELOPER

I build interactive,
immersive and modern
digital experiences.

[ EXPLORE WORK ]
```

Optional:

```txt
Based in Indonesia
Available for selected projects
```

Mobile:

- Name must wrap correctly
- CTA must be easy to tap
- Text must not overlap WebGL
- Content remains readable at 320px width

Desktop may use larger editorial composition.

---

# PHASE 07 — HERO THREE.JS OBJECT

Create a signature object.

Recommended:

```txt
Organic Sphere
+
Noise
+
Vertex Distortion
+
Fresnel
+
Subtle Glow
```

Interaction:

```txt
Time
→ subtle distortion

Touch / pointer movement
→ subtle reaction

Scroll
→ controlled progression
```

Mobile version should use a simpler shader or lower detail if required.

Do not make visual movement aggressive.

---

# PHASE 08 — HERO ANIMATION

Use GSAP.

Sequence:

```txt
Canvas
↓
Name
↓
Role
↓
Description
↓
CTA
↓
Metadata
```

Prefer:

```txt
opacity
transform
clip-path
```

Mobile animation should be slightly simpler and faster.

Respect:

```txt
prefers-reduced-motion
```

---

# PHASE 09 — ABOUT

Content:

```txt
01 / ABOUT

I'M ATHALLAH DZAKI
ANGGORO SEPUTRO.

Creative Developer focused on building
modern digital experiences through
code, motion and interactive technology.
```

Include editable fields:

```txt
Location
Current Focus
Education
Experience
Interests
```

Do not invent professional history if real data is unavailable.

Use replaceable structured data.

---

# PHASE 10 — SCROLL CAMERA SYSTEM

Connect scroll progress to the Three.js world.

Example:

```txt
Hero
Camera A
↓
About
Camera B
↓
Skills
Camera C
↓
Projects
Camera D
```

Prefer:

```txt
GSAP ScrollTrigger
refs
timeline progress
lerp
```

Do not update React state on every scroll frame.

Mobile camera movement must be reduced and stable.

Do not create scroll-jacking.

---

# PHASE 11 — SKILLS DATA

Create:

```txt
src/data/skills.ts
```

Use a structured model.

```ts
export interface Skill {
  id: string;
  name: string;

  category:
    | "frontend"
    | "creative"
    | "backend"
    | "tools";

  shortDescription: string;
  description: string;

  experience?: string;

  useCases?: string[];

  relatedSkills?: string[];

  icon?: string;
}
```

Example:

```ts
export const skills: Skill[] = [
  {
    id: "threejs",
    name: "Three.js",
    category: "creative",

    shortDescription:
      "JavaScript 3D library for creating interactive WebGL experiences.",

    description:
      "Three.js is used to build interactive 3D environments, visual effects, animations and immersive experiences in the browser.",

    useCases: [
      "Interactive websites",
      "3D environments",
      "WebGL visualization",
      "Shader effects",
      "Creative coding",
    ],

    relatedSkills: [
      "React Three Fiber",
      "WebGL",
      "GLSL",
      "GSAP",
    ],
  },
];
```

All skill UI must use this single data source.

---

# PHASE 12 — SKILLS UI

Create HTML skill categories:

```txt
Frontend
Creative Development
Backend
Tools
```

Mobile should have clear accessible skill controls.

Possible filters:

```txt
[ ALL ]
[ FRONTEND ]
[ CREATIVE ]
[ BACKEND ]
[ TOOLS ]
```

On mobile, filters may be horizontally scrollable chips.

Important skill content must remain accessible without WebGL.

---

# PHASE 13 — INTERACTIVE THREE.JS SKILL NODES + DETAIL MODAL

## Goal

Create an interactive Three.js skill visualization where each skill appears as a selectable node.

When the user selects a node:

```txt
Tap / Click Node
↓
Selected Node Highlight
↓
Skill Detail Modal Opens
↓
Display Information About Selected Skill
```

This feature must work with:

```txt
Touch
Mouse
Keyboard
```

---

## Node Concept

Example:

```txt
            React
              ○
             / \
            /   \
     Three.js   TypeScript
        ○           ○
         \         /
          \       /
           Next.js
              ○
```

Possible skills:

```txt
React
Next.js
TypeScript
JavaScript
Three.js
React Three Fiber
WebGL
GSAP
Framer Motion
Node.js
PostgreSQL
Git
GitHub
Figma
Docker
```

---

## Mobile Node Behavior

Mobile is the primary interaction.

```txt
User enters Skills
↓
Visible skill nodes appear
↓
User taps node
↓
Selected node highlights
↓
Modal / bottom sheet opens
↓
User reads skill information
↓
User closes modal
```

Do NOT require hover.

Nodes must have comfortable touch targets.

For narrow mobile screens, avoid displaying dozens of tiny nodes.

Prefer approximately:

```txt
4–7 major visible nodes
```

at once if required for readability.

Other skills can be exposed through:

```txt
Category filters
Rotation
Scroll
Pagination
Accessible HTML skill list
```

Choose the simplest intuitive system.

---

## Desktop Node Behavior

Desktop may progressively enhance:

```txt
Hover
↓
Node scales slightly
↓
Glow increases
↓
Related connections react
```

Then:

```txt
Click
↓
Skill modal opens
```

Hover is decorative only.

Click remains the primary selection action.

---

## Selected Node State

Selected node:

```txt
Scale ↑
Glow ↑
Opacity 100%
```

Other nodes may:

```txt
Opacity ↓ slightly
```

Related connection lines may highlight.

Keep effects subtle.

---

## Skill Modal

When a skill is selected, display:

```txt
Skill Name
Category
Short Description
Detailed Description
What I Use It For
Related Technologies
Optional Experience Information
```

Example:

```txt
┌─────────────────────────────┐
│ THREE.JS                [X] │
│ Creative Development        │
│                             │
│ JavaScript 3D library for   │
│ creating interactive WebGL  │
│ experiences.                │
│                             │
│ WHAT I USE IT FOR           │
│                             │
│ • Interactive websites      │
│ • 3D environments           │
│ • Custom shaders            │
│ • Creative coding           │
│                             │
│ RELATED                     │
│ R3F · WebGL · GLSL · GSAP   │
└─────────────────────────────┘
```

---

## Mobile Modal

Primary mobile presentation:

```txt
Bottom Sheet
```

or near-fullscreen dialog.

Recommended:

```txt
width: 100%
max-height: 85dvh
```

Requirements:

```txt
Readable typography
Large close button
Safe-area support
Internal vertical scroll
No horizontal overflow
Background scroll lock
Touch-safe interactions
```

Use:

```txt
dvh
```

where appropriate.

---

## Desktop Modal

Use centered dialog.

Suggested:

```txt
max-width: 600px–720px
```

Keep readable line length.

---

## Modal Animation

Opening:

```txt
Backdrop:
opacity 0 → 1

Modal:
opacity 0 → 1
translateY 20px → 0
```

Mobile bottom sheet may use:

```txt
translateY(100%)
↓
translateY(0)
```

Closing reverses smoothly.

Animations should remain short.

---

## Modal Accessibility

Use appropriate dialog semantics:

```txt
role="dialog"
aria-modal="true"
aria-labelledby
```

Requirements:

```txt
Focus moves into modal
Focus is trapped inside modal
Escape closes modal
Close button works
Backdrop click may close modal
Focus returns to selected skill after closing
```

---

## Keyboard Skill Support

Three.js must not be the only interface.

Provide accessible HTML skill buttons/cards.

Keyboard behavior:

```txt
Tab
↓
Focus Skill

Enter / Space
↓
Open Skill Modal
```

---

## Shared Modal Architecture

Use one shared modal.

```txt
Three.js Node
       │
       │
       ├───────────────┐
       ▼               ▼
WebGL Selection    HTML Skill Card
       │               │
       └──────┬────────┘
              ▼
      selectedSkill
              ▼
     SkillDetailModal
```

Example:

```ts
const [selectedSkill, setSelectedSkill] =
  useState<Skill | null>(null);
```

This state is user-event state only.

Never update it from `useFrame()`.

---

## Suggested Components

```txt
components/
└── sections/
    └── Skills/
        ├── SkillsSection.tsx
        ├── SkillFallbackGrid.tsx
        ├── SkillCategoryFilters.tsx
        └── SkillDetailModal.tsx

three/
└── skills/
    ├── SkillsScene.tsx
    ├── SkillNode.tsx
    ├── SkillNodes.tsx
    └── SkillConnections.tsx
```

Only split files if it improves readability.

---

## Related Skills

Inside modal:

```txt
RELATED

React Three Fiber
WebGL
GLSL
GSAP
```

Optional preferred interaction:

```txt
Tap Related Skill
↓
Modal content transitions to selected related skill
```

Do not unnecessarily close and reopen the modal.

---

## Phase 13 Performance

Avoid:

```txt
Per-frame React state
Excessive raycasting
Dozens of transparent objects
Huge glow systems
Heavy postprocessing
High-poly nodes
Excessive connection lines
```

Mobile:

```txt
Reduce node count
Reduce connections
Reduce shader complexity
Reduce glow
```

---

## Phase 13 Acceptance Criteria

Phase 13 is complete only when:

```txt
✓ Nodes render
✓ Mobile layout works
✓ Desktop layout works
✓ Nodes can be tapped
✓ Nodes can be clicked
✓ Keyboard controls work
✓ Selected node has feedback
✓ Modal opens
✓ Correct skill data is displayed
✓ Modal closes
✓ Escape works
✓ Focus handling works
✓ Mobile modal fits viewport
✓ Modal content scrolls if needed
✓ Background scroll is controlled
✓ HTML fallback exists
✓ WebGL is not required for skill information
✓ No mobile horizontal overflow
✓ Touch targets are usable
✓ Performance remains acceptable
```

---

# PHASE 14 — PROJECT DATA

Create:

```txt
src/data/projects.ts
```

Interface:

```ts
export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  year: number;
  technologies: string[];
  image: string;
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}
```

Do not hardcode project content inside cards.

Do not invent factual projects if actual project information is unavailable.

Use replaceable placeholder content clearly separated from real claims.

---

# PHASE 15 — SELECTED WORK

Create:

```txt
02 / SELECTED WORK

01

PROJECT NAME

Interactive Web Experience
2026

NEXT.JS
THREE.JS
GSAP

[ VIEW PROJECT ]
```

Mobile:

- Vertical project layout
- Large tap targets
- Readable images
- No hover dependency
- No horizontal overflow

Desktop may enhance composition.

---

# PHASE 16 — THREE.JS PROJECT GALLERY

Build interactive project presentation.

Potential:

```txt
Camera

├── Project Plane 01
├── Project Plane 02
├── Project Plane 03
└── Project Plane 04
```

Scroll:

```txt
User Scroll
↓
Camera moves
↓
Project enters focus
↓
Metadata reveals
↓
Previous project exits
```

Mobile may use a simpler project visualization.

Do not force complex 3D gallery behavior if it harms touch navigation.

Requirements:

```txt
Optimized textures
Preserved image ratio
Mobile fallback
Resource cleanup
Accessible HTML project content
```

---

# PHASE 17 — PROJECT SHADER INTERACTIONS

Possible:

```txt
UV distortion
Wave
Noise
RGB separation
Grayscale → color
```

Desktop:

```txt
Hover
→ subtle effect
```

Mobile:

```txt
Tap / active state
→ brief or minimal effect
```

Do not depend on hover.

Avoid aggressive distortion.

---

# PHASE 18 — PROJECT DETAIL PAGE

Create:

```txt
/work/[slug]
```

Content:

```txt
Project Name

Overview
Problem
Solution
Role
Technology
Challenges
Outcome

Live Website
GitHub
```

Optional:

```txt
NEXT PROJECT →
```

Mobile layout first.

Project routes must work without WebGL.

---

# PHASE 19 — EXPERIENCE

Create:

```txt
03 / EXPERIENCE

2026
Frontend Developer

2025
Web Developer

2024
Development Journey
```

Use real information only if available.

Otherwise keep data replaceable.

Animation:

```txt
Scroll
↓
Timeline progresses
↓
Date reveals
↓
Role reveals
↓
Description reveals
```

Reduce timeline animation on mobile and reduced-motion environments.

---

# PHASE 20 — PLAYGROUND

Create:

```txt
04 / PLAYGROUND

INTERACT WITH THE SCENE
```

Controls:

```txt
[ DISTORT ]
[ PARTICLES ]
[ WIREFRAME ]
[ LIGHTING ]
```

Mobile controls must be touch-safe.

Do not expose development tools like Leva in production UI.

Use custom controls.

---

# PHASE 21 — INTERACTIVE TERMINAL

Optional creative terminal.

```txt
ATHALLAH_OS

> whoami

Athallah Dzaki Anggoro Seputro

> skills

React
Next.js
TypeScript
Three.js
GSAP

> projects

Displaying selected work...

> contact

Let's build something.
```

Commands:

```txt
help
whoami
skills
projects
contact
clear
```

This is simulated UI only.

Never execute system commands from the website terminal.

Mobile:

- Large input
- Avoid virtual keyboard layout breakage
- Scrollable output
- Proper input focus

---

# PHASE 22 — CONTACT

Create:

```txt
05 / CONTACT

HAVE AN IDEA?

LET'S BUILD
SOMETHING GREAT.

[ LET'S TALK ]
```

Socials:

```txt
Email
GitHub
LinkedIn
Instagram
```

Store in:

```txt
src/data/socials.ts
```

Do not invent actual URLs or emails if unavailable.

Use easily replaceable placeholders.

---

# PHASE 23 — FINAL THREE.JS MOMENT

Create a closing visual that references the Hero.

Possible:

```txt
Particles
↓
Converge
↓
Sphere forms
↓
Scene becomes calm
↓
CTA appears
```

Or:

```txt
Hero object returns
↓
Material evolves
↓
Contact state appears
```

Mobile version should use reduced particle count and shader complexity.

---

# PHASE 24 — FOOTER

Example:

```txt
ATHALLAH DZAKI
ANGGORO SEPUTRO

Creative Developer

GitHub
LinkedIn
Email

Jakarta, Indonesia

© 2026 Athallah Dzaki Anggoro Seputro
```

Optional:

```txt
WEBGL / ACTIVE
LOCAL TIME / GMT+7
FPS
```

Only display FPS if it is actually measured.

Never hardcode a fake constant FPS.

---

# PHASE 25 — GLOBAL MOTION SYSTEM

Standardize motion.

Text:

```txt
opacity 0 → 1
translateY 40px → 0
```

Heading:

```txt
clip-path reveal
```

Images:

```txt
scale 1.05 → 1
```

Three.js:

```txt
lerp
camera interpolation
shader progress
```

Recommended easing:

```txt
power3.out
power4.inOut
expo.out
```

Define mobile variants with reduced distance and duration.

---

# PHASE 26 — GLSL SYSTEM

Create reusable shaders.

Suggested uniforms:

```glsl
uniform float uTime;
uniform float uProgress;
uniform float uIntensity;
uniform vec2 uMouse;
uniform vec2 uResolution;
```

Possible effects:

```txt
Simplex Noise
Fresnel
Gradient
Distortion
Wave
Glow
```

Keep shader code understandable.

Mobile should use reduced iterations and complexity where necessary.

---

# PHASE 27 — CUSTOM CURSOR

Desktop enhancement only.

States:

```txt
DEFAULT
LINK
VIEW
DRAG
ACTIVE
```

Example:

```txt
Project hover → VIEW
```

Disable on:

```txt
Touch devices
Mobile
Coarse pointer
Reduced motion where appropriate
```

Do not emulate a custom cursor on touch devices.

---

# PHASE 28 — SMOOTH SCROLL

Use Lenis only if it measurably improves UX.

If used, integrate correctly with:

```txt
GSAP ScrollTrigger
```

Verify:

```txt
Anchor links
Touch scrolling
Keyboard navigation
Scroll restoration
Mobile browser behavior
Reduced motion
```

Never compromise native mobile scrolling for visual smoothness.

---

# PHASE 29 — RESPONSIVE AUDIT

Responsive behavior must already exist before this Phase.

Phase 29 is a full audit and refinement.

## Mobile

Verify:

```txt
Single-column layouts where appropriate
Touch-first interactions
Readable typography
No horizontal overflow
Mobile navigation
Mobile modals
Safe areas
Simplified WebGL
Reduced shaders
Lower DPR
Accessible content
```

## Tablet

Enhance:

```txt
Whitespace
Composition
Node count
Project layout
Moderate WebGL effects
```

## Desktop

Enable:

```txt
Full 3D composition
Hover states
Custom cursor
More particles
Richer shaders
Expanded project gallery
```

Desktop enhancements must never be necessary to understand the content.

---

# PHASE 30 — PERFORMANCE MODES

Create quality profiles if justified.

```txt
HIGH
MEDIUM
LOW
```

Example:

## LOW / Mobile-oriented

```txt
DPR 1
Low particles
Simple shaders
Minimal transparency
No expensive postprocessing
```

## MEDIUM

```txt
DPR 1–1.25
Moderate particles
Moderate shader complexity
```

## HIGH

```txt
DPR up to 1.5
More particles
Richer shaders
Optional postprocessing
```

Prefer real runtime conditions over naive device-model detection.

---

# PHASE 31 — ACCESSIBILITY

Ensure:

```txt
Semantic HTML
Keyboard navigation
Visible focus indicators
ARIA labels
Accessible dialogs
Accessible navigation
Alt text
Readable contrast
Touch target sizes
Reduced motion
Accessible buttons
Accessible links
```

Important information may never exist exclusively inside WebGL.

---

# PHASE 32 — REDUCED MOTION

Support:

```css
@media (prefers-reduced-motion: reduce)
```

Reduce:

```txt
Parallax
Camera movement
Continuous rotation
Large translation
Shader distortion
Particle movement
Complex section transitions
```

Do not remove content.

---

# PHASE 33 — SEO

Configure:

```txt
Metadata
OpenGraph
Twitter metadata
Canonical URL
robots.txt
sitemap.xml
favicon
manifest
```

Suggested title:

```txt
Athallah Dzaki Anggoro Seputro — Creative Developer
```

Suggested description:

```txt
Portfolio of Athallah Dzaki Anggoro Seputro, a creative developer building modern, interactive and immersive web experiences.
```

Optional structured data:

```txt
Person
WebSite
CreativeWork
```

Only include factual data.

---

# PHASE 34 — WEBGL FALLBACK

Handle:

```txt
WebGL unavailable
WebGL context lost
Asset load failure
Shader compilation failure
Low-performance mode
```

Fallback must still display:

```txt
Hero
About
Skills
Projects
Experience
Contact
Footer
```

Never show a blank page because WebGL fails.

---

# PHASE 35 — TESTING

Test:

```txt
Chrome
Firefox
Safari
Edge
```

Devices / sizes:

```txt
320px mobile
360px mobile
390px mobile
414px mobile
Tablet
Desktop
```

Verify:

```txt
Navigation
Responsive layout
Three.js
Shaders
Scroll animations
Touch interactions
Project links
Skill node modal
Keyboard accessibility
Reduced motion
Loading
WebGL fallback
No horizontal overflow
```

---

# PHASE 36 — PERFORMANCE AUDIT

Review:

```txt
Bundle size
React rerenders
Draw calls
Geometry
Texture size
Materials
Shaders
Postprocessing
DPR
GPU memory
Image loading
Fonts
Unused JavaScript
Mobile frame rate
```

Measure first.

Do not optimize based only on assumptions.

---

# PHASE 37 — PRODUCTION CLEANUP

Perform:

```txt
Remove console.log
Remove debug controls
Remove unused imports
Remove dead files
Remove unused dependencies
Optimize images
Optimize models
Check environment variables
Check broken links
Check metadata
Run lint
Run typecheck
Run build
```

Do not delete useful code simply to reduce file count.

---

# PHASE 38 — DEPLOYMENT READINESS

Prepare repository for deployment.

Target workflow:

```txt
GitHub
↓
Vercel
↓
Custom Domain
```

Verify:

```txt
Production build
Environment variables
Metadata
OG image
Analytics if configured
Error monitoring if configured
Sitemap
Favicon
HTTPS compatibility
```

Do not fabricate credentials.

Do not configure secrets unless available.

---

# 23. GITHUB AUTO PUSH POLICY

Every successfully completed Phase must:

```txt
VALIDATE
↓
REVIEW DIFF
↓
COMMIT
↓
PUSH
↓
VERIFY
↓
CONTINUE
```

Use the currently active Git repository.

Use the currently active branch.

Do NOT:

```txt
Create another repository
Create a branch
Switch branch
Change remote
Force push
Rewrite published history
```

unless explicitly instructed.

---

# 24. INITIAL GIT INSPECTION

Before Phase 01:

```bash
git status
git branch --show-current
git remote -v
```

Internally determine:

```txt
CURRENT_BRANCH
CURRENT_REMOTE
CURRENT_REPOSITORY
```

Never assume branch is:

```txt
main
```

---

# 25. EXISTING UNCOMMITTED CHANGES

If unrelated changes already exist:

- Preserve them.
- Do not delete them.
- Do not overwrite them.
- Do not reset them.
- Do not accidentally include them in Phase commits.

Never automatically use:

```bash
git reset --hard
git clean -fd
git checkout .
git restore .
```

---

# 26. VALIDATION BEFORE COMMIT

Inspect `package.json`.

Run relevant existing scripts.

Examples:

```bash
npm run lint
npm run typecheck
npm run build
```

or:

```bash
pnpm lint
pnpm typecheck
pnpm build
```

or appropriate project equivalents.

Do not assume scripts exist.

Never claim:

```txt
PASS
```

unless the command was actually run successfully.

---

# 27. VALIDATION FAILURE POLICY

If the current Phase causes errors:

```txt
DO NOT COMMIT YET
```

Instead:

```txt
Identify error
↓
Find root cause
↓
Apply smallest reliable fix
↓
Validate again
```

If an error clearly existed before the current Phase:

- Do not rewrite unrelated code.
- Document it.
- Ensure the current Phase introduces no regression.

---

# 28. REVIEW BEFORE COMMIT

Before committing:

```bash
git status
git diff
git diff --staged
```

Inspect intended changes.

Never commit:

```txt
.env
.env.local
.env.production
API secrets
Tokens
Private keys
Passwords
Service credentials
Certificates
```

Respect `.gitignore`.

---

# 29. COMMIT POLICY

One Phase = one commit where possible.

Format:

```txt
type(phase-XX): description
```

Recommended commits:

```txt
feat(phase-01): setup project foundation
feat(phase-02): establish project architecture
feat(phase-03): add global three canvas
feat(phase-04): implement loading experience
feat(phase-05): add mobile-first navigation
feat(phase-06): build hero section
feat(phase-07): add interactive hero object
feat(phase-08): implement hero animation
feat(phase-09): build about section
feat(phase-10): add scroll camera system
feat(phase-11): add structured skill data
feat(phase-12): build skills interface
feat(phase-13): add interactive skill nodes and modal
feat(phase-14): add structured project data
feat(phase-15): build selected work section
feat(phase-16): implement three project gallery
feat(phase-17): add project shader interactions
feat(phase-18): create project detail pages
feat(phase-19): build experience section
feat(phase-20): add interactive playground
feat(phase-21): add portfolio terminal
feat(phase-22): build contact section
feat(phase-23): add closing three animation
feat(phase-24): build portfolio footer
feat(phase-25): standardize motion system
feat(phase-26): add reusable glsl system
feat(phase-27): add desktop custom cursor
feat(phase-28): integrate smooth scrolling
fix(phase-29): refine responsive experience
perf(phase-30): add adaptive performance modes
feat(phase-31): improve accessibility
feat(phase-32): support reduced motion
feat(phase-33): configure portfolio seo
feat(phase-34): add webgl fallback
test(phase-35): validate portfolio experience
perf(phase-36): optimize runtime performance
chore(phase-37): prepare production build
chore(phase-38): finalize deployment readiness
```

---

# 30. STAGING POLICY

If unrelated changes exist, do not blindly run:

```bash
git add .
```

Prefer:

```bash
git add <phase-files>
```

Then:

```bash
git diff --cached
```

Confirm only intended Phase changes are staged.

---

# 31. PUSH POLICY

After commit:

```bash
git branch --show-current
```

If upstream exists:

```bash
git push
```

If no upstream exists and `origin` is confirmed:

```bash
git push -u origin HEAD
```

Never blindly hardcode:

```bash
git push origin main
```

---

# 32. PUSH SAFETY

Never automatically run:

```bash
git push --force
git push -f
git push --force-with-lease
```

If remote has newer commits:

```bash
git fetch
git status
git log --oneline --decorate --graph --all -20
```

Inspect safely.

Do not overwrite remote history.

---

# 33. VERIFY PUSH

After each push:

```bash
git status -sb
git log -1 --oneline
```

Verify local branch status.

Then immediately continue to the next Phase.

---

# 34. PUSH FAILURE POLICY

If push fails because of authentication:

- Keep the local commit.
- Do not destroy changes.
- Do not repeatedly retry indefinitely.
- Record the problem.

If push fails because remote diverged:

- Fetch.
- Inspect.
- Resolve non-destructively if safe.
- Never force push automatically.

If safe continuation is possible, continue development while preserving commit history.

Report unresolved push failures in the final report.

---

# 35. SECURITY POLICY

Never expose or commit:

```txt
API keys
Passwords
Tokens
Private credentials
SSH keys
Cloud credentials
Service account secrets
Private certificates
```

Never fabricate credentials.

Use:

```txt
.env.example
```

for safe variable names when useful.

---

# 36. CONTENT POLICY

Do not invent factual professional history.

If unavailable, do not fabricate:

```txt
Company names
Job titles
Education
Real projects
Awards
Client names
Email address
GitHub URL
LinkedIn URL
Instagram URL
```

Use clearly replaceable placeholders or existing repository data.

The site architecture must make content easy to update.

---

# 37. AUTONOMOUS PHASE WORKFLOW

For every Phase:

```txt
READ CURRENT PHASE
↓
INSPECT RELATED EXISTING FILES
↓
IMPLEMENT MOBILE FIRST
↓
TEST MOBILE
↓
ENHANCE TABLET
↓
ENHANCE DESKTOP
↓
TEST RESPONSIVENESS
↓
RUN LINT / TYPECHECK / BUILD AS RELEVANT
↓
FIX CURRENT-PHASE ERRORS
↓
REVIEW GIT DIFF
↓
STAGE INTENDED FILES
↓
COMMIT PHASE
↓
PUSH CURRENT BRANCH
↓
VERIFY PUSH
↓
RECORD RESULT
↓
AUTOMATICALLY START NEXT PHASE
```

Do not pause between Phases.

---

# 38. PHASE FAILURE POLICY

If a Phase has a genuine technical blocker:

1. Investigate root cause.
2. Attempt focused fixes.
3. Do not falsely claim success.
4. Preserve stable code.
5. Do not commit broken implementation.
6. Record the blocker.
7. Continue only with later Phases that are technically independent and safe.

Do not ask for confirmation unless safe progress is genuinely impossible.

---

# 39. CODE QUALITY POLICY

Avoid:

```txt
any
Huge components
Duplicated logic
Magic numbers
Inline datasets
Unnecessary useEffect
Per-frame React state
Random animation
Unused dependencies
Placeholder production logic
```

Do not leave required functionality as:

```txt
TODO
Implement later
Coming soon
```

unless external content is genuinely unavailable.

---

# 40. RESPONSIVE TEST POLICY

For every relevant visual Phase, verify at least:

```txt
360 × 800
390 × 844
768 × 1024
1024 × 768
1440 × 900
```

Also check approximately:

```txt
320px width
```

when practical.

Look for:

```txt
Horizontal overflow
Text clipping
Button clipping
Navigation overlap
Canvas overflow
Skill node overlap
Modal overflow
Project layout problems
Touch target problems
Safe-area problems
Performance regressions
```

Fix issues during the Phase that introduces them.

Do not defer all responsive fixes until Phase 29.

---

# 41. FINAL VALIDATION

After Phase 38:

Run all available relevant checks.

Examples:

```txt
lint
typecheck
build
```

Inspect:

```bash
git status
git log --oneline -40
```

Verify:

```txt
No accidental secrets
No broken imports
No phase regressions
No obvious unused dependencies
No unintended debug code
No accidental uncommitted work
```

If cleanup changes are required:

```txt
chore: finalize portfolio production readiness
```

Commit, push, verify.

---

# 42. FINAL REPORT

Only after all possible Phases have been processed.

Format:

```txt
PROJECT IMPLEMENTATION COMPLETED

Repository:
...

Remote:
...

Branch:
...

Phases:
Phase 01 — COMPLETE / BLOCKED
Phase 02 — COMPLETE / BLOCKED
Phase 03 — COMPLETE / BLOCKED
...
Phase 38 — COMPLETE / BLOCKED

Validation:
Lint: PASS / FAIL / NOT AVAILABLE
TypeScript: PASS / FAIL / NOT AVAILABLE
Build: PASS / FAIL / NOT AVAILABLE

Responsive:
320px: PASS / FAIL
360px: PASS / FAIL
390px: PASS / FAIL
Tablet: PASS / FAIL
Desktop: PASS / FAIL

Mobile First:
- Navigation: ...
- Hero: ...
- Skills Nodes: ...
- Skill Modal: ...
- Projects: ...
- Playground: ...
- Contact: ...

Three.js:
- ...
- ...

Skill System:
- Nodes: ...
- Modal: ...
- Keyboard fallback: ...
- Mobile performance: ...

Performance:
- ...

Accessibility:
- ...

SEO:
- ...

Git:
Total Phase Commits: ...
Latest Commit: ...
Push Status: ...
Remote Branch: ...

Remaining Issues:
- ...

Manual Content To Replace:
- ...

Production Readiness:
READY / NEEDS ATTENTION
```

Never claim `PASS`, `SUCCESS`, or `READY` unless verified.

---

# 43. START COMMAND

Read this entire file before changing the repository.

Then execute:

```txt
You are operating in CONTINUOUS AUTONOMOUS MODE.

This portfolio MUST be developed MOBILE FIRST.

Inspect the current repository before modifying anything.

Detect:
- current package manager
- existing project architecture
- Next.js configuration
- current Three.js implementation
- current Git repository
- current Git branch
- current Git remote
- existing uncommitted changes

Preserve all unrelated user work.

Start PHASE 01.

For EVERY PHASE:

1. inspect relevant existing files
2. understand current architecture before editing
3. implement the mobile experience first
4. ensure core functionality works without hover
5. progressively enhance tablet
6. progressively enhance desktop
7. test responsive behavior
8. run available relevant validation
9. fix errors introduced by the current Phase
10. review git diff
11. stage only intended Phase changes
12. create one descriptive commit for the Phase
13. push to the CURRENT active branch of the EXISTING GitHub repository
14. verify the push
15. immediately continue to the next Phase

For PHASE 13 specifically:

- implement interactive Three.js skill nodes
- every skill node must be selectable
- mobile uses tap
- desktop supports click and optional hover enhancement
- selected node must have visible feedback
- selecting a node opens a responsive Skill Detail Modal
- mobile should use a bottom sheet or nearly fullscreen dialog
- modal must show:
  - skill name
  - category
  - short description
  - detailed explanation
  - use cases
  - related technologies
- modal must fit small mobile screens
- modal content must scroll internally if necessary
- background scroll must be controlled
- close button must be touch friendly
- Escape must close the modal where appropriate
- focus must move into the modal and return after close
- provide keyboard-accessible HTML skill controls
- important skill information must remain available without WebGL
- use one shared modal for Three.js nodes and HTML skill controls
- do not make nodes tiny on mobile
- reduce visible node count and connection complexity where necessary
- keep Three.js mobile performance lightweight

STRICT GIT RULES:

- use the current repository
- use the current branch
- do not create branches
- do not switch branches
- do not change remotes
- do not force push
- do not rewrite remote history
- do not delete unrelated work
- never commit secrets

DO NOT stop between Phases.

DO NOT ask whether to continue.

Continue autonomously through every Phase that can be safely completed.

After the final Phase:

- perform full repository validation
- fix regressions introduced by this implementation
- run final responsive checks
- run final production build
- create and push final cleanup commit if necessary
- provide one consolidated final report
```

---

# 44. CORE EXECUTION PRINCIPLE

Always follow:

```txt
UNDERSTAND
↓
DESIGN MOBILE FIRST
↓
BUILD
↓
TEST
↓
ENHANCE
↓
VALIDATE
↓
COMMIT
↓
PUSH
↓
CONTINUE
```

Never follow:

```txt
BUILD DESKTOP EVERYTHING
↓
TRY TO MAKE IT MOBILE
↓
ONE GIANT COMMIT
```

---

# 45. FINAL EXPERIENCE TARGET

The final user journey should feel like:

```txt
ENTER EXPERIENCE
       │
       ▼
ATHALLAH DZAKI
ANGGORO SEPUTRO
       │
       ▼
WHO IS ATHALLAH?
       │
       ▼
WHAT CAN HE BUILD?
       │
       ▼
INTERACT WITH HIS SKILLS
       │
       ├── TAP THREE.JS NODE
       │
       └── OPEN SKILL DETAIL
       │
       ▼
EXPLORE SELECTED WORK
       │
       ▼
FOLLOW HIS EXPERIENCE
       │
       ▼
INTERACT WITH PLAYGROUND
       │
       ▼
LET'S WORK TOGETHER
```

The result must feel cohesive across:

```txt
Mobile
Tablet
Desktop
```

The mobile experience must feel intentionally designed, not merely responsive.

Three.js, typography, animation, skill nodes, modal interactions, projects, navigation, accessibility, performance, and content must feel like one continuous creative developer experience.