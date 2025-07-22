
import { use } from 'react';
import AcademicBookDetails from '@/components/features/academic-book-details';

interface BookDetailPageProps {
  params: {
    id: string;
  };
}

// The main page component is now a clean Server Component.
// It unwraps the params promise using `use` and passes the ID
// to the client component that handles all client-side logic.
export default function AcademicBookPage({ params }: BookDetailPageProps) {
  const { id } = params;

  return <AcademicBookDetails bookId={id} />;
}
