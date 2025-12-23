# Website Style Guide & Section Descriptions

## Design System Overview

### Color Palette
- **Primary Accent**: `#00bef7` (Cyan blue) - Used for CTAs, highlights, borders, icons
- **Background Dark**: `#141b38` (Deep navy blue) - Primary dark background
- **Background Dark Alt**: `#1a2342` (Slightly lighter navy) - Alternative dark sections
- **White Cards**: `#ffffff` - Card backgrounds with subtle transparency
- **Text Colors**:
  - White: `text-white` for headings on dark backgrounds
  - Gray-900: `text-gray-900` for headings on white cards
  - Gray-700: `text-gray-700` for body text on white cards
  - White/70-80: `text-white/70` or `text-white/80` for secondary text on dark backgrounds

### Typography
- **Headings**: 'Orlean' font family, bold (700), large sizes (4xl-8xl)
- **Body Text**: 'Aventa' font family, light (300)
- **Eyebrow Text**: Uppercase, letter-spacing `0.3em-0.4em`, small size (xs-sm)
- **Heading Sizes**: Responsive from `text-3xl` (mobile) to `text-8xl` (desktop)

### Spacing & Layout
- **Section Padding**: `py-20` (vertical), `px-6 md:px-10 lg:px-14` (horizontal)
- **Section Height**: `min-h-[100vh]` for full viewport sections
- **Container**: Centered with max-width constraints
- **Grid Gaps**: `gap-6 md:gap-8 lg:gap-10` for card grids

### Border Radius
- **Cards**: `rounded-2xl` to `rounded-3xl` (24px-30px)
- **Buttons**: `rounded-full` (pill shape)
- **Inputs**: `rounded-xl` to `rounded-2xl` (12px-24px)

### Shadows & Effects
- **Card Shadows**: `shadow-[0_18px_42px_rgba(15,23,42,0.22)]` to `shadow-[0_24px_60px_rgba(15,23,42,0.32)]`
- **Backdrop Blur**: `backdrop-blur-sm` on cards
- **Borders**: `border border-white/10` to `border-white/12` on dark backgrounds
- **Hover Borders**: `hover:border-[#00bef7]/50` to `hover:border-[#00bef7]/70`

### Animations
- **Library**: GSAP (GreenSock) for scroll-triggered animations
- **Easing**: `power3.out`, `power2.out`, `back.out(1.3-1.5)`
- **Stagger**: 0.05s-0.1s between elements
- **Intersection Observer**: Threshold 0.2, rootMargin "0px 0px -10% 0px"

---

## Section 1: Hero Section

### Structure
- Full viewport height (`h-screen min-h-[600px]`)
- Background video with overlay gradient
- Content positioned at bottom with large heading, description, and CTA buttons

### Styling
- **Background**: Dark navy (`#141b38`) with full-screen video background
- **Video Filter**: `brightness(1.1) contrast(1.2) saturate(1.1) hue-rotate(200deg)`
- **Overlay**: Gradient from `#141b38/60` via `#1a2342/70` to `#141b38/80`
- **Heading**: White, 3xl-7xl responsive, bold, max-width constrained
- **Description**: White/80 opacity, base-xl responsive
- **Buttons**: 
  - Primary: `#00bef7` background, white text, rounded-full
  - Secondary: Transparent with white border, hover fills white

### Animations
- **Heading**: Word-by-word fade-in with stagger (0.08s), `back.out(1.5)` easing, 60px y-offset
- **Description**: Fade-in with 40px y-offset, `power3.out` easing
- **Buttons**: Scale from 0.9, fade-in, stagger 0.1s, `back.out(1.3)` easing
- **Video**: Auto-play, loop, muted, with GSAP filter animation

### Interactions
- Scroll detection triggers smooth scroll to next section
- Buttons trigger smooth scroll to target sections

---

## Section 2: About Section

### Structure
- Two-column grid layout (1.15fr : 0.85fr on large screens)
- Left: Eyebrow, heading, description, 2-column grid of value cards
- Right: Sticky sidebar card with quote

### Styling
- **Background**: `#141b38`
- **Value Cards**: 
  - White background with `border-white/10`
  - Shadow: `shadow-[0_22px_45px_rgba(15,23,42,0.32)]`
  - Hover: Border changes to `#00bef7/50`, background to `white/90`
  - Icon container: `#00bef7/10` background, `#00bef7/30` border
  - Icon: `#00bef7` color
- **Sidebar Card**: White, rounded-[36px], sticky positioning
- **Quote Card**: Dashed border `#00bef7/40`, `#00bef7/10` background

### Animations
- All elements fade in from 40px y-offset
- Stagger: 0.05s between value cards
- Timeline: Eyebrow → Heading → Description → Cards → Sidebar → Quote

### Content Pattern
- Eyebrow text (uppercase, letter-spaced)
- Large heading (6xl-8xl)
- Description paragraph
- Icon-based value cards with title, description, and icon

---

## Section 3: Services Section

### Structure
- Centered header (eyebrow, heading, description)
- 3-column grid of flip cards (on large screens)

### Styling
- **Background**: `#1a2342`
- **Cards**: 
  - Height: 450px-520px responsive
  - White background, `border-white/12`
  - 3D perspective for flip effect
  - Front: Image, title, summary, description, "Click to Explore" footer
  - Back: Service details, features list, highlights tags
- **Card Animation**: Stack in center, then spread to grid positions with rotation

### Animations
- **Entry**: Cards start stacked in center with slight rotation, fade in, then spread to grid positions
- **Flip**: 3D rotateY 180deg on click, 0.4s cubic-bezier transition
- **Hover**: Scale 1.02 on hover

### Interactions
- Click card to flip and reveal details
- Cards use Framer Motion for flip animations
- Front shows summary, back shows full feature list

---

## Section 4: Portfolio Section

### Structure
- Centered header
- 3-column grid of project cards

### Styling
- **Background**: `#1a2342`
- **Project Cards**:
  - Height: 500px
  - White background
  - Image container with contained image (object-contain)
  - Gradient overlay from bottom: `from-[#141b38] via-[#141b38]/90 to-transparent`
  - Overlay starts at `translate-y-[calc(100%-80px)]`, moves to `translate-y-0` on hover
- **Title**: Always visible in overlay
- **Details**: Visible on hover (category, description, client, tech tags)

### Animations
- Fade in from 40px y-offset with stagger
- Image scale 1.05 on hover
- Overlay slides up on hover (500ms ease-out)
- Details fade in with 100ms delay

### Content Pattern
- Project image (contained, not cropped)
- Title always visible
- Hover reveals: category badge, description, client name, technology tags

---

## Section 5: Technology Section

### Structure
- Centered header
- 3D carousel with draggable/swipeable cards

### Styling
- **Background**: `#141b38`
- **Carousel Cards**:
  - White background, rounded-2xl
  - 75% width, centered
  - 3D perspective: 1500px
  - Current: Centered, full opacity, scale 1
  - Previous/Next: Half visible, 0.4 opacity, scale 0.9, rotated ±25deg, translateZ -200px
- **Card Content**: 
  - Technology name (3xl-4xl)
  - Description paragraph
  - 3-column grid: Stack tags, Features list, Use cases tags

### Animations
- Auto-advance every 3 seconds
- Drag/swipe to navigate
- Smooth 3D transforms with cubic-bezier easing
- Velocity-based swipe detection

### Interactions
- Mouse drag and touch swipe support
- Infinite loop carousel
- Cooldown period after navigation (3 seconds)
- Auto-pause on hover/drag

---

## Section 6: Why Choose Us Section

### Structure
- Centered header
- 4-column grid of benefit cards
- Stats row below

### Styling
- **Background**: `#141b38`
- **Benefit Cards**:
  - White background, `border-white/12`
  - Large emoji icon (5xl)
  - Title, description, feature list
  - Border-top separator for features
  - Hover: Lift up (-8px), scale 1.05, border color change
- **Stats Cards**:
  - White background, `border-white/10`
  - Large number (4xl-5xl), label below
  - 2-column grid on mobile, 4-column on desktop

### Animations
- Fade in from 40px y-offset
- Stagger: 0.02s for benefit cards, 0.05s for stats
- Hover: Framer Motion `whileHover` with y: -8, scale: 1.05

### Content Pattern
- Icon/emoji
- Title (2xl-3xl)
- Description paragraph
- Feature list with bullet points

---

## Section 7: How It Works Section

### Structure
- Header
- Horizontal timeline with progress indicator
- Large flip card carousel
- Navigation dots

### Styling
- **Background**: `#1a2342`
- **Timeline**:
  - Horizontal line with progress bar (`#00bef7`)
  - Numbered circles: Active = `#00bef7` with glow, Completed = `#00bef7` with checkmark, Inactive = `white/10`
- **Process Card**:
  - White background, large (460px height)
  - Front: Icon, timeline label, title, summary, details, "Click to see deliverables"
  - Back: Deliverables list, key activities, process metrics grid
  - 3D flip on click

### Animations
- Auto-advance carousel every 5 seconds
- Progress bar animates with scaleX transform
- Card flip: 0.8s cubic-bezier rotateY
- Fade transitions between cards
- Pause on hover/interaction, resume after 8 seconds

### Interactions
- Click timeline dots to jump to step
- Click card to flip and see details
- Arrow navigation
- Auto-pause on interaction

---

## Section 8: Contact Section

### Structure
- Two-column grid (1.1fr : 0.9fr)
- Left: Header + contact point cards
- Right: Sticky contact form

### Styling
- **Background**: `#141b38`
- **Contact Cards**:
  - White background, `border-white/10`
  - Title, description, action button
  - Button: `#00bef7/10` background, `#00bef7` text
  - Hover: Border `#00bef7/70`, background `white/90`
- **Form**:
  - White background, rounded-2xl to rounded-[32px]
  - Inputs: Gray-50 background, gray-200 border
  - Focus: `#00bef7` border, ring `#00bef7/40`
  - Submit button: `#00bef7` background, gray-950 text, rounded-full

### Animations
- Fade in from 30-40px y-offset
- Stagger: 0.05s for contact cards
- Form fades in after cards

### Form Fields
- Name (required)
- Email (required)
- Company (optional)
- Message (required, textarea)

---

## Section 9: Footer Section

### Structure
- Two-column grid (1.2fr : 0.8fr)
- Left: Logo, tagline, description, email CTA
- Right: 3-column link groups

### Styling
- **Background**: `#1a2342`
- **Border**: Top border `white/10`
- **Links**: `white/70` text, hover to `#00bef7`
- **CTA Button**: `#00bef7` background, gray-950 text
- **Copyright**: `white/40` text, bottom border

### Layout
- Logo at top left
- Large tagline heading
- Description paragraph
- Email CTA button
- Link groups: Work, Company, Connect
- Footer links: Privacy, Terms, Accessibility

---

## Common Patterns & Components

### Eyebrow Text
- Uppercase
- Letter-spacing: `0.3em-0.4em`
- Color: `#00bef7`
- Size: `xs-sm`
- Margin bottom: `mb-3` to `mb-6`

### Section Headings
- Font: Orlean, bold (700)
- Size: `text-4xl` to `text-8xl` responsive
- Color: White on dark backgrounds
- Leading: `leading-tight`
- Max-width: Often constrained with `max-w-4xl`

### Cards
- White background
- Border: `border-white/10` to `border-white/12`
- Shadow: `shadow-[0_18px_42px_rgba(15,23,42,0.22)]` or similar
- Border radius: `rounded-2xl` to `rounded-3xl`
- Padding: `p-6` to `p-10`
- Hover: Border color change, slight background change, sometimes lift/scale

### Buttons
- Primary: `#00bef7` background, white/gray-950 text, rounded-full
- Secondary: Transparent with border, hover fill
- Padding: `px-6 py-3` to `px-8 py-3`
- Font: Semibold
- Transition: `duration-300`

### Animations Pattern
1. Set initial state: `opacity: 0, y: 40`
2. Create GSAP timeline (paused)
3. Animate elements with stagger
4. Use IntersectionObserver to trigger on scroll
5. Threshold: 0.2, rootMargin: "0px 0px -10% 0px"

### Responsive Breakpoints
- Mobile: Default (< 600px)
- sm: 600px
- md: 768px
- lg: 1024px
- xl: 1200px
- 2xl: 1440px

### Spacing Scale
- Small: `gap-3` to `gap-4`
- Medium: `gap-6` to `gap-8`
- Large: `gap-10` to `gap-12`
- Section padding: `py-20`

---

## Technical Implementation Notes

### Animation Libraries
- **GSAP**: Scroll-triggered animations, timelines, stagger effects
- **Framer Motion**: Interactive animations, hover effects, card flips

### Scroll Behavior
- Smooth scrolling between sections
- Custom scroll hooks for section detection
- Universal scroll system with ignore attributes

### Performance
- IntersectionObserver for scroll-triggered animations
- CSS transforms for hardware acceleration
- Backdrop blur for glassmorphism effects
- Optimized video loading and playback

### Accessibility
- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Focus states on form inputs

---

## Usage Instructions

To recreate a similar styled website:

1. **Setup**: Use Next.js with TypeScript, Tailwind CSS, GSAP, and Framer Motion
2. **Colors**: Apply the color palette consistently across all sections
3. **Typography**: Load Orlean and Aventa fonts, apply to headings and body
4. **Layout**: Use container class with responsive padding
5. **Cards**: Apply white background, subtle borders, shadows, and hover effects
6. **Animations**: Use GSAP timelines with IntersectionObserver triggers
7. **Spacing**: Follow the spacing scale for consistent rhythm
8. **Responsive**: Test all breakpoints, use mobile-first approach

### Key Styling Classes to Reuse
- Section container: `min-h-[100vh] bg-[#141b38] py-20`
- Card base: `bg-white border border-white/10 rounded-2xl shadow-[0_18px_42px_rgba(15,23,42,0.22)]`
- Eyebrow: `text-sm uppercase tracking-[0.4em] text-[#00bef7]`
- Heading: `text-6xl md:text-7xl lg:text-8xl font-bold text-white`
- Primary button: `bg-[#00bef7] text-white rounded-full px-8 py-3`

