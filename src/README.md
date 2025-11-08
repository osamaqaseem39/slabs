# Project Structure

This directory contains the source code for the application organized into logical sections.

## Directory Structure

```
src/
├── app/                    # Next.js app directory (pages, layouts, global styles)
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
│
├── sections/              # Page sections (main content blocks)
│   ├── HeroSection.tsx
│   └── index.ts           # Section exports
│
├── components/            # Reusable UI components
│   └── layout/            # Layout components (Navbar, Footer)
│       ├── Navbar.tsx
│       ├── Footer.tsx
│       └── index.ts
│
├── utils/                # Utility functions and helpers
│   ├── SmoothScroll.tsx
│   └── index.ts
│
├── types/                # TypeScript type definitions
│   └── index.ts
│
├── constants/            # Application constants
│   └── index.ts
│
└── README.md            # This file
```

## Organization Principles

### Sections (`src/sections/`)
Large, page-level components that represent distinct sections of the website. These are typically used once per page and contain significant content.

### Components (`src/components/`)
Reusable UI components organized by category:
- **layout/**: Components that affect page structure (navigation, footer)

### Utils (`src/utils/`)
Helper functions, hooks, and utilities that don't render UI but provide functionality.

### Types (`src/types/`)
Shared TypeScript type definitions and interfaces.

### Constants (`src/constants/`)
Application-wide constants like colors, animation durations, and configuration values.

## Import Patterns

Use the `@/` alias for clean imports:

```typescript
// Sections
import { HeroSection } from "@/sections";

// Layout components
import { Navbar, Footer } from "@/components/layout";

// Utils
import { SmoothScroll } from "@/utils";

// Types
import type { Position, Size } from "@/types";

// Constants
import { COLORS, ANIMATION_DURATIONS } from "@/constants";
```

