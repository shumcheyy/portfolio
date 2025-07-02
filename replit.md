# Modern Portfolio Application

## Overview

This is a full-stack portfolio web application built with a modern tech stack featuring React frontend, Express backend, and PostgreSQL database. The application showcases a security professional's portfolio with interactive terminal functionality, contact form, and modern UI components.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query for server state management
- **UI Components**: Radix UI primitives with custom styling
- **Theme System**: Context-based dark/light mode toggle
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful endpoints for contact form and data retrieval
- **Middleware**: Custom logging, JSON parsing, and error handling
- **Development**: Hot module replacement via Vite integration

### Database Layer
- **ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured for Neon serverless)
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Connection**: Neon serverless driver for edge compatibility

## Key Components

### Portfolio Features
1. **Interactive Terminal**: Custom terminal emulator with security-themed commands
2. **Hero Section**: Professional introduction with contact information
3. **Experience Timeline**: Work history with visual timeline
4. **Skills Grid**: Technical skills with animated progress bars
5. **Projects Showcase**: Featured projects with technology badges
6. **Contact Form**: Functional contact form with server-side validation
7. **Matrix Rain Effect**: Optional visual effect for enhanced user experience

### Technical Components
1. **Theme Provider**: System for managing light/dark themes
2. **Query Client**: Centralized API request handling with TanStack Query
3. **Form Validation**: Zod schema validation for type safety
4. **Responsive Design**: Mobile-first approach with Tailwind breakpoints
5. **Animation System**: CSS animations and transitions for smooth UX

## Data Flow

### Contact Form Flow
1. User fills out contact form with name, email, project type, and message
2. Frontend validates data using Zod schemas
3. Form submission triggers POST request to `/api/contact`
4. Backend validates and stores contact data
5. Success/error feedback displayed to user via toast notifications

### Portfolio Data Flow
1. Static portfolio content rendered on initial page load
2. Interactive terminal processes commands locally
3. Theme changes persist to localStorage
4. Contact data retrieved via GET `/api/contacts` (admin endpoint)

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React, React DOM, React Hook Form
- **UI Library**: Radix UI components, Lucide React icons
- **Styling**: Tailwind CSS, Class Variance Authority
- **State Management**: TanStack Query for server state
- **Form Handling**: React Hook Form with Zod resolvers

### Backend Dependencies
- **Server**: Express.js with TypeScript support
- **Database**: Drizzle ORM, Neon serverless driver
- **Development**: TSX for TypeScript execution
- **Build**: ESBuild for production bundling

## Deployment Strategy

### Development Environment
- **Local Development**: Vite dev server with HMR
- **Database**: Neon serverless PostgreSQL
- **Environment Variables**: DATABASE_URL for database connection
- **Port Configuration**: Express server with Vite middleware integration

### Production Build
1. **Frontend Build**: Vite builds client assets to `dist/public`
2. **Backend Build**: ESBuild bundles server code to `dist/index.js`
3. **Database**: Production PostgreSQL via Neon
4. **Static Serving**: Express serves built frontend assets
5. **Process Management**: Node.js process for production deployment

### Build Commands
- `npm run dev`: Development server with hot reload
- `npm run build`: Production build for both frontend and backend
- `npm run start`: Production server startup
- `npm run db:push`: Database schema deployment

## User Preferences

Preferred communication style: Simple, everyday language.

## Changelog

- July 02, 2025: Initial portfolio setup with hybrid terminal/modern web design
- July 02, 2025: Added GitHub deployment documentation and configuration files
- July 02, 2025: Implemented interactive terminal with security commands, dark/light themes, matrix effects
- July 02, 2025: Created deployment guides for Vercel, Railway, and custom domain setup