# CloudLearn - Interactive Cloud Computing Education Platform

## Overview

CloudLearn is a full-stack educational web application designed to teach cloud computing concepts through interactive learning experiences. The platform features a modern React frontend with TypeScript, an Express.js backend, and uses Drizzle ORM for database operations with PostgreSQL.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **State Management**: TanStack Query for server state, React Context for UI state
- **Routing**: Wouter for lightweight client-side routing
- **Build Tool**: Vite for development and bundling

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Driver**: Neon Database serverless connection
- **Session Management**: PostgreSQL-backed sessions with connect-pg-simple

### Database Schema
The application uses three main tables:
- `users`: User authentication and profile information
- `user_progress`: Tracks learning progress, completed sections, and quiz scores
- `quiz_attempts`: Stores quiz attempt history with answers and scores

## Key Components

### Learning Management System
- **Progress Tracking**: Real-time progress updates with visual indicators
- **Section Completion**: Automatic progress tracking using Intersection Observer API
- **Quiz System**: Timed quizzes with immediate feedback and score tracking
- **Glossary**: Searchable terminology database with categorized definitions

### Interactive Features
- **Smooth Scrolling Navigation**: Animated section transitions
- **Dark/Light Theme**: Persistent theme switching with localStorage
- **Responsive Design**: Mobile-first approach with breakpoint-based layouts
- **Visual Animations**: CSS transitions and hover effects for enhanced UX

### Content Architecture
- **Modular Sections**: Reusable components for different learning modules
- **Interactive Demonstrations**: Visual explanations of cloud concepts
- **Team Profiles**: Educational team member information and credentials

## Data Flow

1. **User Progress**: Client fetches progress from `/api/progress/:userId`, updates are sent via POST requests
2. **Quiz Submissions**: Quiz attempts are submitted to `/api/quiz/submit` with complete answer sets
3. **Real-time Updates**: TanStack Query manages cache invalidation and optimistic updates
4. **Theme Persistence**: Theme preferences stored in localStorage and synchronized across sessions

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL connection
- **drizzle-orm**: Type-safe database operations
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Accessible UI primitives
- **tailwindcss**: Utility-first CSS framework

### Development Tools
- **Vite**: Fast development server and build tool
- **TypeScript**: Type safety and developer experience
- **ESLint/Prettier**: Code quality and formatting
- **Drizzle Kit**: Database schema management and migrations

## Deployment Strategy

### Development Environment
- **Local Development**: Vite dev server with hot module replacement
- **Database**: Neon Database with connection pooling
- **Environment Variables**: DATABASE_URL for database connectivity

### Production Build
- **Frontend**: Vite builds static assets to `dist/public`
- **Backend**: ESBuild bundles server code to `dist/index.js`
- **Static Serving**: Express serves built frontend assets in production

### Database Management
- **Schema Changes**: Managed through Drizzle migrations in `./migrations`
- **Connection**: Serverless PostgreSQL with automatic connection pooling
- **Deployment**: Database schema pushed via `drizzle-kit push`

### Performance Considerations
- **Query Optimization**: TanStack Query with stale-while-revalidate caching
- **Bundle Optimization**: Vite tree-shaking and code splitting
- **Image Optimization**: External CDN for user avatars and assets
- **Database Indexing**: Proper indexing on user_id foreign keys

The application follows a traditional client-server architecture with clear separation of concerns, making it maintainable and scalable for educational content delivery.