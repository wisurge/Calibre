# Routinsie

A modern productivity application built with Next.js 14, featuring habit tracking, goal setting, journaling, and daily planning. Built following atomic design principles with TypeScript and Tailwind CSS.

## ✨ Features

- 🏠 **Dashboard** - Daily habit tracking and task management
- 📝 **Journal** - Personal reflection and mood tracking
- 🎯 **Goals** - Mission tracking with progress visualization
- 🎨 **Customize** - Theme selection and personalization
- 📅 **Daily Planner** - Comprehensive daily schedule management
- 🧩 **Atomic Design** - Scalable component architecture
- 📱 **Responsive** - Mobile-first design approach
- 🔒 **Supabase Integration** - Ready for backend integration
- 📊 **Analytics** - Vercel Analytics and Speed Insights integration

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account (for full functionality)

### Installation

1. **Clone the repository:**
```bash
git clone <repository-url>
cd routinsie
```

2. **Install dependencies:**
```bash
npm install
# or
yarn install
```

3. **Set up environment variables:**
```bash
cp env.example .env.local
```

4. **Configure Supabase (optional):**
   - Create a new Supabase project
   - Copy your project URL and anon key to `.env.local`
   - Run the SQL schema from `supabase-schema.sql` in your Supabase SQL editor

5. **Run the development server:**
```bash
npm run dev
# or
yarn dev
```

6. **Open your browser** to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
routinsie/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles and CSS variables
│   ├── layout.tsx         # Root layout with footer
│   ├── page.tsx          # Dashboard (home page)
│   ├── journal/          # Journal page
│   ├── goals/            # Goals page
│   ├── customize/        # Theme customization
│   └── planner/          # Daily planner
├── components/           # Atomic design components
│   ├── atoms/           # Basic building blocks
│   │   ├── Button/      # Button component
│   │   ├── Checkbox/    # Checkbox component
│   │   └── ProgressBar/ # Progress bar component
│   ├── molecules/       # Simple component groups
│   │   ├── Card/        # Card component
│   │   └── MoodSelector/ # Mood selection component
│   └── organisms/       # Complex UI components
│       ├── Header/      # Navigation header
│       ├── Sidebar/     # Navigation sidebar
│       └── Footer/      # App footer
├── lib/                 # Utility functions
│   ├── utils.ts        # Utility functions
│   └── supabase.ts     # Supabase client and types
├── supabase-schema.sql # Database schema
└── ...config files
```

## 🧩 Atomic Design Structure

This project follows atomic design methodology:

- **Atoms**: Basic building blocks (Button, Checkbox, ProgressBar)
- **Molecules**: Simple component groups (Card, MoodSelector)
- **Organisms**: Complex UI components (Header, Sidebar, Footer)

## 🎨 Pages Overview

### Dashboard (`/`)
- Daily habit tracking with progress visualization
- Task management with priority levels
- Mood selection and habit tracker
- Motivational quotes

### Journal (`/journal`)
- Daily reflection interface
- Past journal entries with mood indicators
- Rich text input for thoughts and feelings

### Goals (`/goals`)
- Mission cards with progress tracking
- Goal completion celebration
- Inspirational quotes section

### Customize (`/customize`)
- Theme selection with live preview
- Color palette customization
- Visual theme previews

### Daily Planner (`/planner`)
- Comprehensive daily schedule
- Morning, afternoon, and evening routines
- Task categorization and time management

## 🛠 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🗄 Database Schema

The app includes a complete Supabase schema with the following tables:
- `users` - User profiles
- `habits` - Daily habits with streaks
- `tasks` - Task management
- `goals` - Goal tracking with progress
- `journal_entries` - Journal entries with moods
- `themes` - User theme preferences

## 🎯 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Animations**: Framer Motion
- **Component Architecture**: Atomic Design

## 🔧 Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

## 🚀 Deployment

1. **Build the application:**
```bash
npm run build
```

2. **Deploy to Vercel (recommended):**
```bash
npx vercel
```

3. **Set up environment variables** in your deployment platform

4. **Run the database schema** in your Supabase project

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Atomic Design Methodology](https://bradfrost.com/blog/post/atomic-web-design/)

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Design inspiration from modern productivity apps
- Icons by [Lucide](https://lucide.dev/)
- Built with ❤️ using Next.js and TypeScript
