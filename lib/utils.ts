import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Users, MessageCircle, TrendingUp } from 'lucide-react';


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function initials(name?: string | null) {
  if (!name) {
    return "?";
  }

  return name
    .trim()
    .split(/\s+/)
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export const avatarColors = [
  "from-blue-500 to-cyan-500",
  "from-violet-500 to-fuchsia-500",
  "from-emerald-500 to-teal-500",
  "from-amber-500 to-orange-500",
  "from-rose-500 to-pink-500",
  "from-indigo-500 to-blue-500",
];

export const communityStats = [
  { icon: Users, label: 'developers', value: '12.4k' },
  { icon: TrendingUp, label: 'questions', value: '3.8k' },
  { icon: MessageCircle, label: 'answers', value: '8.9k' },
];