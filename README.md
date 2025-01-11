# Task Calendar with Next.js and Supabase

This project is a task management application built with Next.js and Supabase. It features user authentication, a calendar view, and the ability to create and manage tasks for specific dates.

## Features

- User authentication (sign up, sign in, sign out)
- Calendar view for selecting dates
- Daily view with time slots from 6 AM to 10 PM
- Create, read, update, and delete tasks
- Real-time updates using Supabase

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework for building the frontend and API routes
- [Supabase](https://supabase.io/) - Open-source Firebase alternative for the backend
- [shadcn/ui](https://ui.shadcn.com/) - UI component library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

You will also need a Supabase account and a new Supabase project.

## Getting Started

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/task-calendar.git
   cd task-calendar
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
   Replace `your_supabase_project_url` and `your_supabase_anon_key` with your actual Supabase project credentials.

4. Set up the Supabase database:
   Open the [Supabase SQL Editor](https://app.supabase.io/) and run the following SQL query to create the `tasks` table:
   ```sql
   create table tasks (
     id serial primary key,
     user_id uuid references auth.users(id) on delete cascade,
     task_name text not null,
     task_description text,
     task_date timestamp not null,
     created_at timestamp with time zone default now(),
     updated_at timestamp with time zone default now()
   );
   ```
   This will create a `tasks` table to store tasks for users.

5. Run the development server:
   ```
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
task-calendar/
├── app/
│   ├── auth/
│   │   ├── signin/
│   │   └── signup/
│   ├── dashboard/
│   ├── day/
│   │   └── [date]/
│   ├── page.tsx
│   └── layout.tsx
├── components/
│   └── ui/
├── utils/
│   └── supabase.ts
├── .env.local
├── package.json
└── README.md
```

## Usage

1. Sign up for a new account or sign in if you already have one.
2. On the dashboard, you'll see a calendar. Click on a date to view or add tasks for that day.
3. In the day view, you can see existing tasks and create new ones.
4. To create a task, click the "Create Task" button and fill in the task details.
5. Tasks will appear in the time slots on the day view.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Acknowledgements

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.io/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

