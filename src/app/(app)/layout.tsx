
import Header from '@/components/common/header';

export default function AppLayout({ children }: { children: React.ReactNode }) {

  // Note: The client-side auth check has been removed from this layout
  // to convert it into a Server Component for performance.
  // The check remains in the `/dashboard` layout and can be added to other
  // specific layouts as needed, but the primary app shell is now static.

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-6 sm:py-8">{children}</main>
    </div>
  );
}
