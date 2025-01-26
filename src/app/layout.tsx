import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';

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
          'mb-24 mt-12 flex flex-col items-center font-poppins antialiased',
          font.variable,
        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
