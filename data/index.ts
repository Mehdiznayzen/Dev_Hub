export type Question = {
  id: number;
  title: string;
  excerpt: string;
  votes: number;
  answers: number;
  views: number;
  tags: string[];
  author: string;
  createdAt: string;
  accepted: boolean;
};

export type Tag = {
  name: string;
  count: number;
  description: string;
};

export type User = {
  id: number;
  name: string;
  username: string;
  role: string;
  reputation: number;
  answers: number;
  questions: number;
  location: string;
  tags: string[];
};

export const questions: Question[] = [
  {
    id: 1,
    title: 'How should I structure authentication with Clerk in a Next.js application?',
    excerpt:
      "I'm building a developer community platform and I'm trying to keep authentication logic separated from my database layer. What's the recommended folder structure for middleware and protected routes?",
    votes: 24,
    answers: 5,
    views: 412,
    tags: ['nextjs', 'clerk', 'typescript'],
    author: 'Mehdi Znayzen',
    createdAt: '2 hours ago',
    accepted: true,
  },
  {
    id: 2,
    title: 'Why does my Drizzle relational query return a type error?',
    excerpt:
      "After enabling relational queries in Drizzle, my with() calls fail type-checking even though the relations are defined. The inferred type seems to be missing the nested shape.",
    votes: 18,
    answers: 3,
    views: 287,
    tags: ['drizzle', 'typescript', 'postgresql'],
    author: 'Sarah Johnson',
    createdAt: '5 hours ago',
    accepted: true,
  },
  {
    id: 3,
    title: "What's the best way to organize a large React application?",
    excerpt:
      'My team is scaling a React codebase and feature folders are getting messy. Are there established patterns for splitting components, hooks, and state without over-abstracting?',
    votes: 31,
    answers: 8,
    views: 1204,
    tags: ['react', 'typescript', 'architecture'],
    author: 'Alex Martin',
    createdAt: 'yesterday',
    accepted: false,
  },
  {
    id: 4,
    title: 'How can I properly handle server and client components in Next.js?',
    excerpt:
      "I keep running into hydration mismatches when composing server and client components. What's the correct boundary pattern and when should I use 'use client'?",
    votes: 15,
    answers: 4,
    views: 368,
    tags: ['nextjs', 'react'],
    author: 'Youssef Amrani',
    createdAt: 'yesterday',
    accepted: false,
  },
  {
    id: 5,
    title: 'PostgreSQL relation not found after running Drizzle migrations',
    excerpt:
      'My Drizzle push succeeds but queries fail with "relation does not exist". I suspect a schema naming issue or a missing search_path. How do I debug this?',
    votes: 9,
    answers: 2,
    views: 156,
    tags: ['postgresql', 'drizzle'],
    author: 'Emma Wilson',
    createdAt: '2 days ago',
    accepted: false,
  },
  {
    id: 6,
    title: 'How do I create reusable form components with TypeScript?',
    excerpt:
      'I want a generic FormField component that infers its value type from a zod schema and works with react-hook-form. Is there a clean pattern without losing type safety?',
    votes: 22,
    answers: 6,
    views: 524,
    tags: ['typescript', 'react', 'forms'],
    author: 'Daniel Smith',
    createdAt: '2 days ago',
    accepted: true,
  },
  {
    id: 7,
    title: 'Why is my Tailwind class not being applied?',
    excerpt:
      'A utility class works in one component but not another. I have checked the content config and there are no obvious typos. Could purge or the JIT layer be involved?',
    votes: 7,
    answers: 3,
    views: 198,
    tags: ['tailwind', 'css'],
    author: 'Mehdi Znayzen',
    createdAt: '3 days ago',
    accepted: false,
  },
  {
    id: 8,
    title: 'How should I structure API routes in a Next.js application?',
    excerpt:
      'With the App Router, route handlers feel different from the pages API. Should I keep business logic in separate modules and only call them from route.ts files?',
    votes: 14,
    answers: 4,
    views: 342,
    tags: ['nextjs', 'nodejs', 'api'],
    author: 'Sarah Johnson',
    createdAt: '3 days ago',
    accepted: false,
  },
];

export const popularTags = [
  'nextjs',
  'react',
  'typescript',
  'javascript',
  'postgresql',
];

export const tags: Tag[] = [
  { name: 'nextjs', count: 1240, description: 'The React framework for production — App Router, server components, and more.' },
  { name: 'react', count: 2180, description: 'A JavaScript library for building user interfaces with components.' },
  { name: 'typescript', count: 1890, description: 'A strongly typed programming language that builds on JavaScript.' },
  { name: 'javascript', count: 2540, description: 'The programming language of the web — ES6+, async, and patterns.' },
  { name: 'postgresql', count: 870, description: 'A powerful, open source object-relational database system.' },
  { name: 'drizzle', count: 540, description: 'A lightweight TypeScript ORM for SQL databases with great DX.' },
  { name: 'tailwind', count: 1320, description: 'A utility-first CSS framework for rapidly building custom designs.' },
  { name: 'nodejs', count: 1640, description: 'A JavaScript runtime built on Chrome\'s V8 engine for server-side apps.' },
  { name: 'clerk', count: 320, description: 'Authentication and user management for modern applications.' },
  { name: 'api', count: 980, description: 'Designing, building, and consuming REST and GraphQL APIs.' },
  { name: 'css', count: 1120, description: 'Styling, layout, animations, and modern CSS features.' },
  { name: 'forms', count: 460, description: 'Form handling, validation, and reusable form components.' },
  { name: 'architecture', count: 380, description: 'Application structure, patterns, and scalable code organization.' },
  { name: 'docker', count: 720, description: 'Containerization, orchestration, and deployment workflows.' },
  { name: 'supabase', count: 610, description: 'An open source Firebase alternative with Postgres and auth.' },
];

export const users: User[] = [
  {
    id: 1,
    name: 'Mehdi Znayzen',
    username: 'mehdiznayzen',
    role: 'Full Stack Developer',
    reputation: 8420,
    answers: 312,
    questions: 48,
    location: 'Casablanca, Morocco',
    tags: ['nextjs', 'react', 'typescript'],
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    username: 'sarahj',
    role: 'Backend Developer',
    reputation: 12150,
    answers: 487,
    questions: 32,
    location: 'San Francisco, USA',
    tags: ['postgresql', 'drizzle', 'nodejs'],
  },
  {
    id: 3,
    name: 'Alex Martin',
    username: 'alexm',
    role: 'Frontend Developer',
    reputation: 6320,
    answers: 198,
    questions: 65,
    location: 'Berlin, Germany',
    tags: ['react', 'tailwind', 'css'],
  },
  {
    id: 4,
    name: 'Youssef Amrani',
    username: 'youssefa',
    role: 'Software Engineer',
    reputation: 9870,
    answers: 274,
    questions: 21,
    location: 'Rabat, Morocco',
    tags: ['nextjs', 'api', 'architecture'],
  },
  {
    id: 5,
    name: 'Emma Wilson',
    username: 'emmaw',
    role: 'DevOps Engineer',
    reputation: 5410,
    answers: 156,
    questions: 38,
    location: 'London, UK',
    tags: ['docker', 'postgresql', 'supabase'],
  },
  {
    id: 6,
    name: 'Daniel Smith',
    username: 'daniels',
    role: 'Full Stack Developer',
    reputation: 7290,
    answers: 231,
    questions: 54,
    location: 'Toronto, Canada',
    tags: ['typescript', 'react', 'forms'],
  },
];
