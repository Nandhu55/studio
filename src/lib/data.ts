
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
  rating?: number;
};

export type User = {
    id: string;
    name: string;
    email: string;
    password?: string;
    signedUpAt: string;
    avatarUrl?: string;
    course?: string;
    year?: string;
    semester?: string;
    phone?: string;
}

export type QuestionPaper = {
  id: string;
  subject: string;
  category: string;
  year: string;
  semester?: string;
  university: string;
  type: 'Mid-1' | 'Mid-2' | 'Semester End' | 'Quiz';
  downloadUrl: string;
};


export const initialCategories = ['All', 'Computer Science', 'Electronics', 'Mechanical', 'Civil Engineering', 'Finance', 'Motivation'];
export const courses = ['Computer Science', 'Electronics', 'Mechanical', 'Civil Engineering'];
export const years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
export const semesters = ['1st Sem', '2nd Sem', '3rd Sem', '4th Sem', '5th Sem', '6th Sem', '7th Sem', '8th Sem'];

export const initialUsers: User[] = [
    { id: '1', name: 'Nandhu', email: 'gnreddy3555@gmail.com', password: 'password123', signedUpAt: '2024-01-15T10:30:00Z', avatarUrl: 'https://placehold.co/100x100.png', course: 'Computer Science', year: '2nd Year', semester: '4th Sem', phone: '123-456-7890' },
    { id: '2', name: 'Sunny', email: 'sunny@example.com', password: 'password123', signedUpAt: '2024-02-20T14:00:00Z', avatarUrl: 'https://placehold.co/100x100.png', course: 'Electronics', year: '3rd Year', semester: '5th Sem', phone: '098-765-4321' },
    { id: '3', name: 'User 3', email: 'user3@example.com', password: 'password123', signedUpAt: '2024-03-10T18:45:00Z', avatarUrl: 'https://placehold.co/100x100.png', course: 'Mechanical', year: '1st Year', semester: '2nd Sem', phone: '555-555-5555' },
];

export const initialQuestionPapers: QuestionPaper[] = [
  { id: 'qp1', subject: 'Data Structures', category: 'Computer Science', year: '2nd Year', semester: '3rd Sem', university: 'JNTU', type: 'Mid-1', downloadUrl: '#' },
  { id: 'qp2', subject: 'Thermodynamics', category: 'Mechanical', year: '1st Year', semester: '2nd Sem', university: 'JNTU', type: 'Semester End', downloadUrl: '#' },
  { id: 'qp3', subject: 'Digital Logic Design', category: 'Electronics', year: '2nd Year', semester: '4th Sem', university: 'JNTU', type: 'Mid-2', downloadUrl: '#' },
  { id: 'qp4', subject: 'Structural Analysis', category: 'Civil Engineering', year: '3rd Year', semester: '5th Sem', university: 'JNTU', type: 'Semester End', downloadUrl: '#' },
  { id: 'qp5', subject: 'Algorithms', category: 'Computer Science', year: '2nd Year', semester: '4th Sem', university: 'JNTU', type: 'Quiz', downloadUrl: '#' },
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
    rating: 4.8,
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
    rating: 4.7,
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
    rating: 4.6,
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
    rating: 4.5,
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
    rating: 4.9,
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
    rating: 4.8,
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
    rating: 4.7,
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
    rating: 4.6,
  },
  {
    id: '9',
    title: 'The Intelligent Investor',
    author: 'Benjamin Graham',
    category: 'Finance',
    year: 'All',
    description: 'The classic guide to value investing, offering timeless wisdom on how to reach your financial goals. A must-read for anyone interested in the stock market.',
    coverImage: 'https://placehold.co/300x450.png',
    pdfUrl: '#',
    dataAiHint: 'finance money',
    rating: 4.9,
  },
  {
    id: '10',
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    category: 'Finance',
    year: 'All',
    description: 'Timeless lessons on wealth, greed, and happiness. Morgan Housel shares 19 short stories exploring the strange ways people think about money.',
    coverImage: 'https://placehold.co/300x450.png',
    pdfUrl: '#',
    dataAiHint: 'money psychology',
    rating: 4.8,
  },
  {
    id: '11',
    title: 'The 7 Habits of Highly Effective People',
    author: 'Stephen R. Covey',
    category: 'Motivation',
    year: 'All',
    description: 'A holistic, integrated, principle-centered approach for solving personal and professional problems. A classic of the self-help genre.',
    coverImage: 'https://placehold.co/300x450.png',
    pdfUrl: '#',
    dataAiHint: 'success habits',
    rating: 4.7,
  },
  {
    id: '12',
    title: 'Atomic Habits',
    author: 'James Clear',
    category: 'Motivation',
    year: 'All',
    description: 'An easy & proven way to build good habits & break bad ones. This book offers a framework for improving every day.',
    coverImage: 'https://placehold.co/300x450.png',
    pdfUrl: '#',
    dataAiHint: 'habits improvement',
    rating: 4.9,
  },
];
