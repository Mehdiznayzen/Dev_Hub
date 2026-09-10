"use client";

import {
  Home,
  HelpCircle,
  Tag,
  Users,
  History,
  MessageCircle,
  Bookmark,
  Settings,
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import IncompleteProfileCard from '../profile/IncompleteProfileCard';
import { useUser } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';

type NavItem = {
  label: string;
  icon: typeof Home;
  href: string;
};

const mainNav: NavItem[] = [
  { label: 'Home', icon: Home, href: '/' },
  { label: 'Questions', icon: HelpCircle, href: '/questions' },
  { label: 'Tags', icon: Tag, href: '/tags' },
  { label: 'Users', icon: Users, href: '/users' },
];

const activityNav: NavItem[] = [
  { label: 'My Questions', icon: History, href: '/my-questions' },
  { label: 'My Answers', icon: MessageCircle, href: '/my-answers' },
  { label: 'Bookmarks', icon: Bookmark, href: '/bookmarks' },
];

function NavGroup({ items }: { items: NavItem[]}) {
  const { user } = useUser();
  const pathname = usePathname();

  return (
    <nav className="space-y-1" aria-label="Sidebar navigation">
      {
        items.map((item) => {
          const href =
          item.label === 'Home' ? '/' : `/dashboard/${user?.id}${item.href}`;

          const isActive = pathname === href;
          return (
            <Link
              key={item.label}
              href={item.label === "Home" ? `/` : `/dashboard/${user?.id}/${item.href}`}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })
      }
    </nav>
  );
}

const DashboardSidebar = () => {
  const [isExistingProfile, setIsExistingProfile] = useState<boolean>(false);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_GET_PROFILE!);

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await response.json();

        setIsExistingProfile(!!data.profile);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    getProfile();
  }, []);

  return (
    <aside className="hidden md:block">
      <div className="sticky top-20 space-y-6">
        <NavGroup items={mainNav} />

        <div className="space-y-1">
          <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Your Activity
          </p>
          <NavGroup items={activityNav} />
        </div>

        {
          !isExistingProfile && (
            <IncompleteProfileCard />
          )
        }
      </div>
    </aside>
  );
}


export default DashboardSidebar;