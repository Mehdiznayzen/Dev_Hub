import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DevHub — The Community for Developers',
  description:
    'Build. Share. Connect. Everything developers need to learn, build, share and grow together. Share knowledge, ask questions, showcase projects, and connect with developers building the future.',
  keywords: [
    'developer community',
    'programming',
    'share knowledge',
    'ask questions',
    'showcase projects',
    'DevHub',
  ],
  openGraph: {
    title: 'DevHub — The Community for Developers',
    description:
      'Build. Share. Connect. Everything developers need to learn, build, share and grow together.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevHub — The Community for Developers',
    description:
      'Build. Share. Connect. Everything developers need to learn, build, share and grow together.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode; }) {
  return (
    <html lang="en" className="dark">
      <body 
        className={`${inter.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
