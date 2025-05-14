# Personal Portfolio Website

A professional portfolio website built with React, Express.js, and PostgreSQL, showcasing personal projects and skills with a modern design.

## Features

- 🎨 Modern, responsive design with Tailwind CSS
- ⚡ React.js frontend with server-side rendering
- 🔧 Express.js backend
- 📊 PostgreSQL database with Drizzle ORM
- 📱 Mobile-first approach
- 🎭 Smooth page transitions with Framer Motion
- 📝 Contact form with validation
- 🖼️ Project showcase with detailed views

## Tech Stack

- **Frontend**: React.js, Tailwind CSS, Shadcn UI, Framer Motion
- **Backend**: Express.js
- **Database**: PostgreSQL with Drizzle ORM
- **Type Safety**: TypeScript
- **Routing**: Wouter
- **Form Handling**: React Hook Form with Zod validation
- **Data Fetching**: TanStack Query

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/sane-RK9/about_me.git
   cd about_me
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file with the following:
   ```
   DATABASE_URL=your_postgresql_connection_string
   ```

4. **Initialize the database**
   ```bash
   npm run db:push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5000`.

## Project Structure

```
├── client/                # Frontend React application
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Page components
│   │   ├── hooks/        # Custom React hooks
│   │   └── lib/          # Utility functions
├── server/               # Express.js backend
│   ├── routes.ts         # API routes
│   └── storage.ts        # Database operations
└── shared/              # Shared types and schemas
    └── schema.ts        # Database schema and types
```

## License

MIT License
