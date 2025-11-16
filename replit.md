# Tech Portfolio Website

## Overview
A modern, professional portfolio website for showcasing design and development work. Built with React, TypeScript, Tailwind CSS, and Express. Features a dark theme with purple/pink gradient accents, smooth animations, and an admin panel for content management.

## Project Structure
- **Frontend**: React SPA with Wouter routing, TanStack Query, Shadcn UI components
- **Backend**: Express.js with in-memory storage (MemStorage)
- **Styling**: Tailwind CSS with custom dark theme, Space Grotesk and Inter fonts
- **State**: TanStack Query for server state, React Hook Form for forms

## Key Features

### Public Site
1. **Hero Section** - Animated typography with gradient text, diagonal line patterns
2. **About Section** - Professional bio and workspace image with scroll animations
3. **Services/Expertise** - Cards showcasing design and development skills
4. **Projects Portfolio** - Grid of project cards with detail modals
5. **Testimonials** - Client feedback with quotes and attribution
6. **Resume Section** - Experience timeline and downloadable PDF
7. **Contact Form** - Validated form for client inquiries
8. **Responsive Design** - Mobile-first, fully responsive across all devices

### Admin Panel
1. **Dashboard** - Overview stats and recent activity
2. **Projects Management** - CRUD for portfolio projects
3. **Expertise Management** - CRUD for skills and services
4. **Testimonials Management** - CRUD for client reviews
5. **Messages** - View and manage contact form submissions
6. **Social Links** - Manage social media profiles
7. **About/Resume** - Edit personal information and bio

## Data Model
- **Projects**: title, description, image, techStack[], features[], liveUrl, githubUrl
- **Expertise**: title, description, icon, skills[]
- **Testimonials**: name, title, company, content, avatar
- **Contacts**: name, email, subject, message, read status
- **Social Links**: platform, url, icon
- **About**: name, title, bio, email, phone, location, resumePdf

## Design System
- **Colors**: Dark background (#0a0a0f), purple/pink gradients (280° 85%)
- **Typography**: Inter (sans), Space Grotesk (display), JetBrains Mono (mono)
- **Components**: Shadcn UI with custom dark theme
- **Animations**: Framer Motion, scroll-triggered fade-ins, hover elevations
- **Spacing**: Consistent 8px grid system

## Routes
- `/` - Public portfolio homepage
- `/admin` - Admin dashboard
- `/admin/projects` - Manage projects
- `/admin/expertise` - Manage expertise areas
- `/admin/testimonials` - Manage testimonials
- `/admin/messages` - View contact submissions
- `/admin/social` - Manage social links
- `/admin/about` - Edit about/resume info

## Recent Changes
- **2025-01-15**: Initial project setup with complete schema, frontend components, and admin panel
- Generated placeholder images for hero, about, and projects
- Implemented dark theme with purple/pink gradient accents
- Created responsive navigation with smooth scroll
- Built all admin CRUD interfaces with form validation

## Development Notes
- Images imported using `@assets` alias from attached_assets/generated_images/
- All forms use React Hook Form with Zod validation
- TanStack Query handles data fetching with automatic cache invalidation
- Admin panel uses Shadcn Sidebar component for navigation
- Smooth scroll animations using Intersection Observer
- SEO meta tags configured in index.html
