import { Feature } from "@/types";
import { Share2, MessageCircleQuestion, Code2, Users } from 'lucide-react';
import { SiGithub, SiX } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";

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