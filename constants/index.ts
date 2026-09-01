import { Feature } from "@/types";
import { Share2, MessageCircleQuestion, Code2, Users, LucideIcon } from 'lucide-react';
import { SiGithub, SiX } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";
import {
  Server,
  Layers,
  Smartphone,
  Container,
  Cpu,
  Brain,
  GraduationCap,
} from 'lucide-react';

// Navbar Component
export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Features', href: '#features' },
  { label: 'Projects', href: '#projects' },
];

// Stats Component
export const stats = [
  { value: '10K+', label: 'Developers' },
  { value: '25K+', label: 'Posts' },
  { value: '8K+', label: 'Projects' },
  { value: '50K+', label: 'Discussions' },
];

// Features Components
export const features: Feature[] = [
  {
    icon: Share2,
    title: 'Share Knowledge',
    description:
      'Publish technical posts, tutorials, ideas and discoveries with the developer community.',
  },
  {
    icon: MessageCircleQuestion,
    title: 'Ask & Answer',
    description:
      'Ask programming questions, help other developers and share your experience.',
  },
  {
    icon: Code2,
    title: 'Showcase Projects',
    description:
      'Present your projects, technologies and achievements to the developer community.',
  },
  {
    icon: Users,
    title: 'Connect & Grow',
    description:
      'Follow developers, discover new people and build meaningful professional connections.',
  },
];

// Technologies Component
export const technologies = [
  'JavaScript',
  'TypeScript',
  'React',
  'Next.js',
  'Node.js',
  'Java',
  'Spring Boot',
  'Python',
  'Laravel',
  'PHP',
  'PostgreSQL',
  'MongoDB',
];


// HowItWorks Component
export const steps = [
  {
    number: '01',
    title: 'Create your profile',
    description:
      'Build your developer identity and showcase your skills, stack and interests.',
  },
  {
    number: '02',
    title: 'Join the community',
    description:
      'Share, ask questions, discuss and connect with other developers across the platform.',
  },
  {
    number: '03',
    title: 'Build your reputation',
    description:
      'Contribute to the community and grow as a developer through meaningful engagement.',
  },
];

// Footer Component
export const columns = [
  {
    title: 'Product',
    links: ['Features', 'Projects'],
  },
  {
    title: 'Resources',
    links: ['Questions', 'Developers', 'Technologies'],
  },
  {
    title: 'Company',
    links: ['About', 'Contact', 'GitHub'],
  },
];

export const socials = [
  { icon: SiGithub, label: 'GitHub', href: '#' },
  { icon: FaLinkedin, label: 'LinkedIn', href: '#' },
  { icon: SiX, label: 'Twitter / X', href: '#' },
];

// Profile Page
export const decorativeSnippets = [
  { text: '</>', className: 'left-[5%] top-[14%] animate-float' },
  { text: '{ }', className: 'right-[6%] top-[20%] animate-float-slow delay-200' },
  { text: '0101', className: 'left-[8%] bottom-[16%] animate-float-slow delay-300' },
  { text: 'const developer = {}', className: 'right-[5%] bottom-[22%] animate-float delay-500' },
  { text: 'git push', className: 'left-[12%] top-[52%] animate-float delay-700' },
];

// Role Selector Component
type Role = {
  label: string;
  icon: LucideIcon;
};

export const roles: Role[] = [
  { label: 'Frontend Developer', icon: Code2 },
  { label: 'Backend Developer', icon: Server },
  { label: 'Full Stack Developer', icon: Layers },
  { label: 'Mobile Developer', icon: Smartphone },
  { label: 'DevOps Engineer', icon: Container },
  { label: 'Software Engineer', icon: Cpu },
  { label: 'Data Scientist', icon: Brain },
  { label: 'Student', icon: GraduationCap },
];

// Skill Tags Component
export const availableSkills = [
  // Core & Frontend (Existant + Nouveautés)
  'React',
  'Next.js',
  'TypeScript',
  'JavaScript',
  'Vue.js',
  'Angular',
  'Nuxt.js',
  'Svelte',
  'HTML5',
  'CSS3',
  'Tailwind CSS',
  'Sass',
  'Redux',

  // Backend & Langages (Existant + Nouveautés)
  'Node.js',
  'Express',
  'NestJS',
  'Python',
  'Django',
  'FastAPI',
  'PHP',
  'Laravel',
  'Java',
  'Spring Boot',
  'C#',
  'NET',
  'Go',
  'Rust',

  // Databases (Existant + Nouveautés)
  'SQL',
  'MySQL',
  'PostgreSQL',
  'MongoDB',
  'Redis',
  'Firebase',
  'Supabase',
  'Prisma',

  // DevOps & Cloud (Existant + Nouveautés)
  'Git',
  'GitHub',
  'Docker',
  'Kubernetes',
  'AWS',
  'Azure',
  'GCP',
  'CI/CD',
  'Linux',

  // Mobile & Desktop
  'React Native',
  'Flutter',
  'Swift',
  'Kotlin',

  // Testing & Performance
  'Jest',
  'Cypress',
  'Playwright',
  'GraphQL',
  'REST API',
];