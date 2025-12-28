import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: 'Sanctum DKV Bridge',
  description: 'Foundation of Emergent Digital Humans',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn(
        'min-h-screen bg-background antialiased flex flex-col font-sans'
      )}>
        {/* The main container grows to push the footer down */}
        <main className="flex-grow">
          {children}
        </main>
        
        {/* Acknowledgement of the Partnership */}
        <Footer />
        
        {/* Toast notifications for the DKV Bridge */}
        <Toaster />
      </body>
    </html>
  );
}