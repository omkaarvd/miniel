import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';

const font = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'Miniel - A URL Shortner',
  description: 'Miniel a URL Shortner',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <link rel='icon' href='/favicon.ico' sizes='any' />
      </head>

      <body
        className={cn(
          'mx-6 mb-24 mt-12 max-w-2xl font-poppins antialiased lg:mx-auto',
          font.variable,
        )}
      >
        {children}
      </body>
    </html>
  );
}
