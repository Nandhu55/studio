
import { use } from 'react';
import BookDetails from '@/components/features/book-details';

interface BookDetailPageProps {
  params: {
    id: string;
  };
}

// The main page component is now a clean Server Component.
// It unwraps the params promise using `use` and passes the ID
// to the client component that handles all client-side logic.
export default function BookDetailPage({ params }: BookDetailPageProps) {
  const { id } = use(params);

  return <BookDetails bookId={id} />;
}
