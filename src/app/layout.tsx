import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from '@/components/common/theme-provider';
import { exo2, orbitron } from '@/app/fonts';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'B-Tech Hub',
  description: 'A digital library for B.Tech students with AI-powered study tools.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("font-body antialiased", exo2.variable, orbitron.variable)}>
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
