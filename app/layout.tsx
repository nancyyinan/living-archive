import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: 'Living Archive — Yinan Xue',
  description: 'A developing collection of questions, images, references, and visual thinking.',
  openGraph: {
    title: 'Living Archive — Yinan Xue',
    description: 'A developing collection of questions, images, references, and visual thinking.',
    images: [{ url: '/og.png', width: 1731, height: 909, alt: 'Living Archive — Yinan Xue' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Living Archive — Yinan Xue',
    description: 'A developing collection of questions, images, references, and visual thinking.',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className="dark"><body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body></html>;
}
