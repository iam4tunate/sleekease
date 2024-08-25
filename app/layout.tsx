import type { Metadata } from 'next';
import { Footer, Navbar } from '@/components/shared';
import './globals.css';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className='relative min-h-screen'>
        <Navbar />
        <main className='h-full pb-14'>{children}</main>
        <div className='absolute bottom-0 left-0 right-0'>
          <Footer />
        </div>
      </body>
    </html>
  );
}
