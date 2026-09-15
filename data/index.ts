export type Profile = {
  id: string;
  userId: string;
  fullName: string | null;
  avatarUrl: string | null;
  bio: string | null;
  role: string | null;
  experience: string | null;
  location: string | null;
  github: string | null;
  linkedin: string | null;
  website: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Answer = {
  id: string;
  questionId: string;
  userId: string;
  content: string;
  isAccepted: boolean;
  createdAt: string;
  updatedAt: string;
  user: User
};

export type User = {
  id: string;
  clerkUserId: string;
  email: string;
  username: string | null;
  createdAt: string;
  updatedAt: string;
  profile: Profile | null;
};

export type Question = {
  id: string;
  userId: string;
  title: string;
  content: string;
  views: number;
  createdAt: string;
  updatedAt: string;
  user: User;
  answers: Answer[];
};

export type Tag = {
  name: string;
  count: number;
  description: string;
};


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