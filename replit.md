# Humsafar - Travel Package Booking Platform

## Overview

Humsafar is a travel package booking website focused on Pakistani tourism destinations. The platform allows users to browse curated travel packages, filter by destination and budget, and complete bookings through a multi-step process. The application features a modern, card-based UI inspired by platforms like Airbnb and Booking.com, with a color palette reflecting Pakistani regional tourism (teals, greens).

The platform connects travelers with local tour operators, showcasing packages for destinations like Skardu, Hunza Valley, Fairy Meadows, and other scenic locations across Pakistan.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight alternative to React Router)
- **State Management**: React Context API for cart state, TanStack Query for server state
- **UI Library**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens
- **Build Tool**: Vite

**Design System:**
The application uses a comprehensive design system based on the "New York" Shadcn theme with extensive customization:
- Typography: Inter (primary), Playfair Display (accent serif for headings)
- Color scheme: Teal/green primary colors (`--primary: 174 65% 35%`) matching Pakistani tourism aesthetics
- Consistent spacing system using Tailwind's spacing scale
- Custom CSS variables for theming (light mode configured, dark mode structure in place)
- Card-based layouts with elevation effects (hover and active states)

**Component Architecture:**
- Atomic design approach with reusable UI components in `client/src/components/ui/`
- Feature components organized by page (`Header`, page-specific components)
- Context providers for cross-cutting concerns (CartContext, QueryClient, TooltipProvider)

**State Management Strategy:**
- **Local UI State**: React useState/useReducer within components
- **Global Cart State**: Context API with localStorage persistence for cart items and traveler details
- **Server State**: TanStack Query (configured but no API calls yet in the current implementation)
- Cart persists traveler information, package selection, check-in/out dates

**Routing Structure:**
- `/` - HomePage (package browsing and filtering)
- `/about` - AboutPage (company story, stats, values)
- `/contact` - ContactPage (contact form, info cards, WhatsApp integration)
- `/booking` - BookingPage (traveler details collection)
- `/payment` - PaymentPage (payment instructions and confirmation)
- Client-side routing with wouter, single-page application pattern
- Header navigation with active state highlighting using useLocation hook

### Backend Architecture

**Technology Stack:**
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Development Server**: Vite middleware integration for HMR
- **Production Serving**: Static file serving of built client

**Server Structure:**
- Dual-mode setup: `index-dev.ts` (development with Vite) and `index-prod.ts` (production)
- Separation of concerns: `app.ts` for Express configuration, `routes.ts` for API routes
- Storage interface pattern with in-memory implementation (`storage.ts`)

**Current Implementation:**
The backend is minimally configured with:
- User schema defined but no authentication implemented
- Storage interface abstraction ready for database integration
- Express middleware for JSON parsing with raw body preservation
- No actual API routes registered yet - placeholder structure in place

**Design Decisions:**
- **Storage Abstraction**: Uses an interface pattern (`IStorage`) allowing easy swap from in-memory (`MemStorage`) to database implementation without changing consuming code
- **Development Experience**: Vite integration provides HMR for client code during development
- **Production Optimization**: Separate build process creates optimized static assets served by Express

### Data Storage

**Database Schema (Defined but Not Connected):**
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Schema Location**: `shared/schema.ts`
- **Current Tables**: Users table with id, username, password fields
- **Migration System**: Drizzle Kit configured with migrations output to `./migrations`

**Database Configuration:**
- Expects `DATABASE_URL` environment variable for PostgreSQL connection
- Connection using `@neondatabase/serverless` driver (optimized for serverless PostgreSQL)
- Schema uses Zod for validation via `drizzle-zod` integration

**Storage Pattern:**
The application uses an in-memory storage implementation currently, but is architected to easily transition to PostgreSQL:
- Interface-based design allows swapping implementations
- Schema already defined for Drizzle ORM
- No database connection active in current state

**Data Persistence:**
- Client-side: localStorage for cart state (package, traveler details, dates)
- Server-side: Currently in-memory Map, designed for PostgreSQL migration

### External Dependencies

**Core Libraries:**
- **@tanstack/react-query**: Server state management and caching (v5.60.5)
- **wouter**: Lightweight routing library
- **react-hook-form**: Form state management with Zod validation via @hookform/resolvers
- **date-fns**: Date manipulation and formatting
- **zod**: Runtime type validation for forms and schemas

**UI Component Libraries:**
- **@radix-ui/***: Comprehensive set of unstyled, accessible UI primitives (dialogs, popovers, select, etc.)
- **shadcn/ui**: Pre-built components based on Radix UI with Tailwind styling
- **lucide-react**: Icon library
- **embla-carousel-react**: Carousel/slider functionality

**Styling:**
- **tailwindcss**: Utility-first CSS framework
- **tailwind-merge + clsx**: Conditional class name management
- **class-variance-authority**: Component variant system

**Database & ORM:**
- **drizzle-orm**: TypeScript ORM (v0.39.1)
- **drizzle-kit**: Schema management and migrations
- **@neondatabase/serverless**: Serverless PostgreSQL driver
- **drizzle-zod**: Zod schema generation from Drizzle schemas

**Development Tools:**
- **vite**: Build tool and dev server
- **@vitejs/plugin-react**: React plugin for Vite
- **tsx**: TypeScript execution for development
- **esbuild**: Production bundling of server code
- **@replit/vite-plugin-***: Replit-specific development enhancements

**Session Management:**
- **express-session**: Session middleware configured
- **connect-pg-simple**: PostgreSQL session store (configured but not active with in-memory storage)

**Payment Integration:**
None currently implemented. Payment page shows manual payment instructions (bank transfer details, WhatsApp contact) rather than automated payment processing.

**Image Assets:**
Static image imports from `attached_assets/generated_images/` directory for hero images and package thumbnails (Skardu, Hunza Valley, Fairy Meadows, etc.)