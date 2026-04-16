import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import AudioController from '@/components/AudioController';

const inter = Inter({ subsets: ['latin'], weight: ['200', '300', '400'] });

export const metadata: Metadata = {
  title: 'A Midnight Memory — Happy Birthday Javascript',
  description: 'An interactive cinematic birthday experience',
  openGraph: {
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full overflow-hidden bg-[#050010]`}>
        {children}
        <AudioController />
      </body>
    </html>
  );
}