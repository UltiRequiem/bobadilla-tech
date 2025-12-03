# Boba Tech - Landing Page with WebGL Shaders

A cutting-edge landing page built with Next.js 15, TypeScript, Three.js, and WebGL shaders featuring modern animations and responsive design.

## 🚀 Features

### Core Features
- **WebGL Shader Background**: Custom animated shader using Three.js for a unique visual experience
- **Responsive Navigation**: Mobile-friendly navbar with dropdown menus
- **Smooth Animations**: Framer Motion animations throughout the site
- **Static Site Generation**: All pages are pre-rendered for optimal performance
- **SEO Optimized**: Meta tags and semantic HTML structure

### Pages & Routes

#### Main Landing Page (`/`)
- Hero section with animated background
- Services overview (8 core services)
- Featured projects showcase
- Pricing section (3 packages)
- Contact form with CTA
- Footer with social links

#### Services Pages
- `/services` - All services overview with core services and industry solutions
- `/services/[slug]` - Individual service pages (39 dynamic pages)
- `/services/all/[industry]` - Industry-specific service collections (5 industries)

### Services Offered

#### Core Services (8)
1. Web Development
2. CMS Development
3. MVP Development
4. Web Application Development
5. Mobile App Development
6. Back-end Development
7. Front-end Development
8. Web Portal Development

#### Industry Solutions (5 categories)
1. **Healthcare** (8 services)
   - Healthcare Software Development
   - Healthcare IT Consulting
   - Healthcare App Development
   - Healthcare UI/UX Design
   - Medical Apps for Patients
   - Healthcare Software Testing
   - Telemedicine App Development
   - Healthcare Website Design

2. **Education** (7 services)
   - Education Software Development
   - Education App Development
   - LMS Development Services
   - E-learning Application Development
   - E-learning Software Development
   - Education Portals Development
   - School Management Software

3. **Finance** (6 services)
   - Financial Software Development
   - Web Design for Financial Services
   - Financial Mobile App Development
   - Banking Apps Development
   - Payment App Development
   - Payment Integration Services

4. **Transportation and Logistics** (5 services)
   - Transportation Software Development
   - Logistics App Development
   - Logistics Web Design
   - Transportation Management Software
   - Supply Chain Software Development

5. **Machine Learning & AI** (5 services)
   - AI Consulting Services
   - AI Development Services
   - AI Integration Services
   - AI Chatbot Development
   - ChatGPT Integration

### Pricing Packages

#### Static Website Packages
1. **Starter Landing Page** - $350
   - Single landing page
   - Responsive design
   - Basic SEO optimization
   - Contact form integration
   - 2 rounds of revisions
   - 7-10 day delivery

2. **Multi-Page Website** - $850 (Most Popular)
   - Up to 5 custom pages
   - Advanced responsive design
   - SEO optimization
   - CMS integration (optional)
   - Contact & lead forms
   - 3 rounds of revisions
   - 14-21 day delivery
   - Analytics integration

3. **Premium Web Experience** - $1,500+
   - Unlimited pages
   - Custom design & animations
   - Advanced SEO & performance
   - Full CMS integration
   - E-commerce capabilities
   - API integrations
   - Unlimited revisions
   - Priority support

## 🛠 Tech Stack

### Core Technologies
- **Next.js 15.5.7** - React framework with App Router
- **TypeScript 5** - Type-safe development
- **React 19.1.2** - UI library
- **Tailwind CSS 4** - Utility-first CSS framework

### 3D Graphics & Animation
- **Three.js** - 3D graphics library
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Helpers for React Three Fiber
- **Framer Motion** - Animation library

### Deployment
- **OpenNext for Cloudflare** - Cloudflare Pages adapter
- **Wrangler** - Cloudflare CLI

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx                    # Root layout with metadata
│   ├── page.tsx                      # Home page
│   ├── globals.css                   # Global styles
│   └── services/
│       ├── page.tsx                  # Services listing page
│       ├── [slug]/
│       │   └── page.tsx              # Dynamic service pages
│       └── all/
│           └── [industry]/
│               └── page.tsx          # Industry-specific pages
├── components/
│   ├── shaders/
│   │   └── ShaderBackground.tsx      # WebGL shader component
│   ├── sections/
│   │   ├── Hero.tsx                  # Hero section
│   │   ├── Services.tsx              # Services section
│   │   ├── Projects.tsx              # Projects showcase
│   │   ├── Pricing.tsx               # Pricing section
│   │   └── Contact.tsx               # Contact form & CTA
│   └── ui/
│       └── Navbar.tsx                # Navigation component
└── data/
    └── services.ts                   # Services data structure
```

## 🎨 Design Features

### Visual Design
- Dark theme with gradient accents (cyan, blue, purple)
- Custom WebGL shader background with flowing gradients
- Glassmorphism effects (backdrop blur)
- Smooth scroll behavior
- Custom scrollbar styling

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Mobile menu for navigation
- Adaptive grid layouts

### Animations
- Fade-in on scroll
- Hover effects on cards and buttons
- Stagger animations for lists
- Transform animations on buttons
- Gradient text effects

## 🚦 Getting Started

### Development Server
```bash
npm run dev
```
Starts the development server at http://localhost:3000

### Build for Production
```bash
npm run build
```
Creates an optimized production build with static generation

### Deploy to Cloudflare
```bash
npm run deploy
```
Builds and deploys to Cloudflare Pages

## 📝 Key Components

### ShaderBackground
Custom WebGL shader with Perlin noise-based flowing gradients. Creates a dynamic, animated background that runs at 60fps without impacting performance.

### Navbar
Sticky navigation with:
- Logo
- Navigation links (Services, Projects, Resources, Pricing, Contact)
- Resources dropdown (Blog, Tools, Open Source, APIs)
- Book a Call CTA button
- Mobile responsive menu

### Service Pages
Dynamic pages with:
- Breadcrumb navigation
- Service overview
- Key features checklist
- Benefits cards
- Sidebar with CTA
- Related services section

## 🔗 Important Links

### Placeholders to Update
- LinkedIn: `https://linkedin.com/company/bobatech`
- GitHub: `https://github.com/bobatech`
- Email: `contact@bobatech.dev`
- Phone: `+1 (555) 123-4567`
- Calendly link for "Book a Call" buttons (currently `#book-call`)

## 📊 Performance

### Build Output
- **49 static pages** generated at build time
- **First Load JS**: ~345KB (shared chunks optimized)
- **Main page size**: 45.6KB
- All routes pre-rendered for instant loading

### Optimizations
- Static Site Generation (SSG) for all pages
- Code splitting by route
- Optimized chunk sizes
- Lazy loading for heavy components

## 🎯 Next Steps

### Content
1. Add real project case studies with images
2. Create blog content for Resources section
3. Add client testimonials
4. Include team member profiles

### Functionality
1. Integrate Calendly for booking calls
2. Connect contact form to email service
3. Add analytics (Google Analytics, Plausible, etc.)
4. Implement CMS for blog posts

### Assets
1. Replace placeholder project images
2. Add company logo and favicon
3. Create Open Graph images for social sharing
4. Add screenshots for services

### Integrations
1. Set up newsletter subscription
2. Add live chat support
3. Integrate payment gateway for direct purchases
4. Connect to CRM system

## 🌐 Deployment

The site is configured for deployment on **Cloudflare Pages** using OpenNext adapter. All pages are statically generated for maximum performance and global CDN distribution.

### Environment Variables
Configure in `.dev.vars` for local development and in Cloudflare dashboard for production.

## 📄 License

Private project for Boba Tech agency.

---

**Built with Deep Engineering Expertise** 🚀
