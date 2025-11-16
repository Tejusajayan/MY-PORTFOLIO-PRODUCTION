# Design Guidelines: Tech Portfolio Website

## Design Approach
**Reference-Based**: Drawing from the provided design images showcasing a bold, dark-themed portfolio aesthetic with striking purple/pink gradients, large typography, and diagonal geometric patterns. The design references modern portfolio sites like Awwwards-featured work with a focus on visual impact and professional presentation.

## Core Design Principles
- **Bold Visual Impact**: Large typography, high contrast, dramatic gradients
- **Dark Sophistication**: Deep dark backgrounds (#0a0a0f to #1a1a24 range) with vibrant accent pops
- **Geometric Patterns**: Diagonal lines, grid patterns, subtle background textures
- **Smooth Animations**: Fade-ins, slide-ups, gradient shifts on scroll

## Typography

**Font Stack**: 
- Primary: Inter or Manrope (Google Fonts) - clean, modern sans-serif
- Accent: Space Grotesk for hero headlines - geometric, tech-forward

**Hierarchy**:
- Hero Headlines: 4xl to 6xl (72-96px desktop), ultra-bold weight (800-900), gradient text effects
- Section Headers: 3xl to 4xl (48-60px), bold (700), white with slight glow
- Subheadings: xl to 2xl (24-32px), medium weight (500-600)
- Body Text: base to lg (16-18px), regular (400), light gray (#a0a0b0)
- Captions/Labels: sm (14px), medium (500), muted purple/gray

## Layout System

**Spacing Primitives**: Use Tailwind units of 4, 8, 12, 16, 24, 32
- Component padding: p-8 to p-16
- Section spacing: py-24 to py-32 (desktop), py-12 to py-16 (mobile)
- Card gaps: gap-8 for grids

**Container Strategy**:
- Full-width sections with max-w-7xl inner containers
- Content sections: max-w-6xl
- Text-heavy areas: max-w-4xl

## Component Library

### Hero Section
- Full viewport height (min-h-screen) with centered content
- Large gradient headline text (purple #a855f7 to pink #ec4899)
- Animated subtitle with typing or fade-in effect
- Diagonal line pattern overlay in background
- CTA button with blur background and border glow
- Scroll indicator at bottom

### Navigation
- Fixed header with blur backdrop (backdrop-blur-md)
- Logo/name on left, navigation links centered/right
- Social icons in header or floating right
- Smooth color transition on scroll
- Mobile: Hamburger menu with slide-in panel

### Project Cards
- Grid layout: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Card design: Dark background (#1a1a24) with subtle border
- Hover effect: Lift (translate-y) and glow border
- Content: Project thumbnail, title, tech stack tags, brief description
- Tags: Small pills with purple/pink gradient backgrounds
- "View Details" link with arrow icon

### Project Modal
- Overlay: Dark backdrop (backdrop-blur-sm bg-black/60)
- Modal: Centered, max-w-4xl, max-h-[85vh], scrollable content
- Header: Project title, close button (top-right X)
- Content sections: Hero image, description, tech stack, features list, external links
- Footer: Previous/Next project navigation

### Expertise/Skills Section
- 2-column layout on desktop (lg:grid-cols-2)
- Large icons (Heroicons - use code, chip, rocket icons)
- Card style: Dark with gradient border on hover
- Title + bulleted skill list per card
- Subtle background pattern (diagonal lines)

### Testimonials
- Carousel or 3-column grid
- Quote styling: Large quotation marks, italic text
- Author: Photo (circular), name, title/company
- Card background: Slightly lighter than page (#252530)
- Border accent: Thin purple gradient line

### Contact Form
- Single column, centered, max-w-2xl
- Input fields: Dark background, purple border focus state
- Labels: Small, above inputs, purple text
- Submit button: Gradient background, glow effect
- Success/error messages with subtle animations

### Resume Section
- Split layout: PDF preview on left (iframe), download button + highlights on right
- Download button: Prominent, with download icon
- Highlights: Key achievements in bullet format

### Admin Panel
- Sidebar navigation (left): Dashboard, Projects, Skills, Testimonials, Messages
- Content area: Tables for listings, forms for editing
- Clean, functional design (less flashy than public site)
- Purple accent for primary actions

## Images

**Hero Section**: Large background image (abstract tech/code visualization, geometric patterns, or professional headshot with overlay) - full bleed with dark gradient overlay to maintain text readability

**About Me**: Professional headshot or workspace photo, positioned left/right of text content

**Project Cards**: Project screenshots or mockups (16:9 aspect ratio preferred)

**Testimonial Photos**: Client headshots (circular, small - 48-64px diameter)

## Animations

**On Load**:
- Hero text: Fade-in with slight upward slide (duration-700)
- Navigation: Slide down from top (duration-500)

**On Scroll**:
- Section fade-ins: Intersection Observer triggering opacity and translate-y
- Card stagger: Sequential reveal with 100ms delays
- Parallax: Subtle background movement (diagonal lines)

**Interactions**:
- Button hover: Scale (1.05) with glow intensification
- Card hover: Lift (-translate-y-2) with shadow increase
- Link hover: Gradient color shift
- Modal: Fade-in backdrop + scale modal from 0.95 to 1

## Responsive Breakpoints

- Mobile (< 768px): Single column, stacked sections, full-width cards
- Tablet (768px - 1024px): 2-column grids, reduced spacing
- Desktop (> 1024px): Full multi-column layouts, generous spacing

## Accessibility
- Maintain 4.5:1 contrast for body text on dark backgrounds
- Focus states: Purple outline (ring-2 ring-purple-500)
- ARIA labels for icons and interactive elements
- Keyboard navigation for modals and forms
- Form validation with clear error messages

This design creates a bold, modern portfolio that stands out while maintaining professional credibility and excellent usability.