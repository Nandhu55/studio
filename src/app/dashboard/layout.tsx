import Header from '@/components/common/header';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-6 sm:py-8">{children}</main>
    </div>
  );
}
