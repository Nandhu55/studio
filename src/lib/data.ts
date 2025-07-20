

export type Book = {
  id: string;
  title: string;
  author: string;
  category: string;
  year: string;
  description: string;
  coverImage: string;
  pdfUrl: string;
  dataAiHint: string;
};

export type User = {
    id: string;
    name: string;
    email: string;
    signedUpAt: string;
    avatarUrl?: string;
}

export type QuestionPaper = {
  id: string;
  subject: string;
  category: string;
  year: string;
  university: string;
  type: 'Midterm' | 'Final' | 'Quiz';
  downloadUrl: string;
};


export const initialCategories = ['All', 'Computer Science', 'Electronics', 'Mechanical', 'Civil Engineering'];
export const years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

export const initialUsers: User[] = [
    { id: '1', name: 'Nandhu', email: 'gnreddy3555@gmail.com', signedUpAt: '2024-01-15T10:30:00Z', avatarUrl: 'https://placehold.co/100x100.png'},
    { id: '2', name: 'Sunny', email: 'sunny@example.com', signedUpAt: '2024-02-20T14:00:00Z', avatarUrl: 'https://placehold.co/100x100.png'},
    { id: '3', name: 'User 3', email: 'user3@example.com', signedUpAt: '2024-03-10T18:45:00Z', avatarUrl: 'https://placehold.co/100x100.png'},
];

export const initialQuestionPapers: QuestionPaper[] = [
  { id: 'qp1', subject: 'Data Structures', category: 'Computer Science', year: '2nd Year', university: 'JNTU', type: 'Midterm', downloadUrl: '#' },
  { id: 'qp2', subject: 'Thermodynamics', category: 'Mechanical', year: '1st Year', university: 'JNTU', type: 'Final', downloadUrl: '#' },
  { id: 'qp3', subject: 'Digital Logic Design', category: 'Electronics', year: '2nd Year', university: 'JNTU', type: 'Midterm', downloadUrl: '#' },
  { id: 'qp4', subject: 'Structural Analysis', category: 'Civil Engineering', year: '3rd Year', university: 'JNTU', type: 'Final', downloadUrl: '#' },
  { id: 'qp5', subject: 'Algorithms', category: 'Computer Science', year: '2nd Year', university: 'JNTU', type: 'Quiz', downloadUrl: '#' },
];

export const books: Book[] = [
  {
    id: '1',
    title: 'Structure and Interpretation of Computer Programs',
    author: 'Harold Abelson, Gerald Jay Sussman',
    category: 'Computer Science',
    year: '2nd Year',
    description: 'A classic of computer science that has taught generations of programmers how to think about programs. It emphasizes the importance of functional programming and abstraction.',
    coverImage: 'https://placehold.co/300x450.png',
    pdfUrl: '#',
    dataAiHint: 'technology programming',
  },
  {
    id: '2',
    title: 'The Art of Electronics',
    author: 'Paul Horowitz, Winfield Hill',
    category: 'Electronics',
    year: '2nd Year',
    description: 'A comprehensive and practical guide to electronics, from basic principles to advanced topics. It is known for its hands-on approach and clear explanations.',
    coverImage: 'https://placehold.co/300x450.png',
    pdfUrl: '#',
    dataAiHint: 'circuits technology',
  },
  {
    id: '3',
    title: 'Shigley\'s Mechanical Engineering Design',
    author: 'Richard G. Budynas, J. Keith Nisbett',
    category: 'Mechanical',
    year: '3rd Year',
    description: 'The definitive textbook for mechanical engineering design, providing a solid foundation in the principles of design, materials, and failure analysis.',
    coverImage: 'https://placehold.co/300x450.png',
    pdfUrl: '#',
    dataAiHint: 'gears machinery',
  },
  {
    id: '4',
    title: 'Fundamentals of Structural Analysis',
    author: 'Kenneth M. Leet, Chia-Ming Uang',
    category: 'Civil Engineering',
    year: '3rd Year',
    description: 'An introduction to the basic principles of structural analysis, with a focus on real-world applications. Covers topics like trusses, beams, and frames.',
    coverImage: 'https://placehold.co/300x450.png',
    pdfUrl: '#',
    dataAiHint: 'bridge construction',
  },
  {
    id: '5',
    title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
    author: 'Robert C. Martin',
    category: 'Computer Science',
    year: '1st Year',
    description: 'Even bad code can function. But if code isn\'t clean, it can bring a development organization to its knees. This book teaches the principles of writing clean, maintainable, and efficient code.',
    coverImage: 'https://placehold.co/300x450.png',
    pdfUrl: '#',
    dataAiHint: 'software development',
  },
  {
    id: '6',
    title: 'Introduction to Algorithms',
    author: 'Thomas H. Cormen, et al.',
    category: 'Computer Science',
    year: '2nd Year',
    description: 'The bible of algorithms. A comprehensive textbook covering the full spectrum of modern algorithms, from sorting and searching to graph algorithms and computational geometry.',
    coverImage: 'https://placehold.co/300x450.png',
    pdfUrl: '#',
    dataAiHint: 'algorithms data',
  },
    {
    id: '7',
    title: 'Microelectronic Circuits',
    author: 'Adel S. Sedra, Kenneth C. Smith',
    category: 'Electronics',
    year: '3rd Year',
    description: 'This market-leading textbook continues its standard of excellence and innovation, teaching the analysis and design of transistor circuits and op-amp-based analog circuits.',
    coverImage: 'https://placehold.co/300x450.png',
    pdfUrl: '#',
    dataAiHint: 'semiconductor electronics',
  },
  {
    id: '8',
    title: 'Thermodynamics: An Engineering Approach',
    author: 'Yunus A. Çengel, Michael A. Boles',
    category: 'Mechanical',
    year: '1st Year',
    description: 'The subject of thermodynamics deals with energy and has long been an essential part of engineering curricula. This book presents thermodynamics in an intuitive and engaging way.',
    coverImage: 'https://placehold.co/300x450.png',
    pdfUrl: '#',
    dataAiHint: 'heat engine',
  },
];
