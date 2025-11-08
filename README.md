# Slabs - Animated Next.js Website

A beautiful, modern website built with Next.js 15, featuring stunning animations powered by GSAP and Framer Motion.

## Features

- 🎨 **GSAP Animations** - High-performance animations with smooth timelines
- ✨ **Framer Motion** - Declarative animations that feel natural
- 🌊 **Smooth Scrolling** - Beautiful scroll-triggered animations
- 🚀 **Modern Design** - Clean interface with gradient backgrounds and glass effects
- 📱 **Responsive** - Works perfectly on all devices
- ⚡ **Next.js 15** - Latest version with App Router
- 🎯 **TypeScript** - Fully typed for better development experience
- 💅 **Tailwind CSS** - Utility-first CSS framework

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx         # Home page
│   │   └── globals.css      # Global styles
│   └── components/
│       ├── HeroSection.tsx      # Hero section with GSAP animations
│       ├── FeatureSection.tsx   # Features with scroll triggers
│       ├── SlideSection.tsx     # Sliding carousel
│       └── ParallaxSection.tsx  # Parallax scroll effects
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.ts
```

## Technologies Used

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **GSAP** - Animation library
- **Framer Motion** - React animation library
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## Build for Production

```bash
npm run build
npm start
```

## License

MIT
