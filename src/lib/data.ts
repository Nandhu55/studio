
export type Remark = {
  id: string;
  bookId: string;
  text: string;
  authorName: string;
  authorAvatarUrl?: string;
  timestamp: string;
};

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
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password?: string;
    signedUpAt: string;
    avatarUrl?: string;
    course?: string;
    year?: string;
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
    { id: '1', name: 'Nandhu Reddy', firstName: 'Nandhu', lastName: 'Reddy', username: 'nandhureddy', email: 'gnreddy3555@gmail.com', password: 'password123', signedUpAt: '2024-01-15T10:30:00Z', avatarUrl: 'https://placehold.co/100x100.png', course: 'Computer Science', year: '2nd Year' },
    { id: '2', name: 'Sunny Kumar', firstName: 'Sunny', lastName: 'Kumar', username: 'sunnyk', email: 'sunny@example.com', password: 'password123', signedUpAt: '2024-02-20T14:00:00Z', avatarUrl: 'https://placehold.co/100x100.png', course: 'Electronics', year: '3rd Year' },
    { id: '3', name: 'User Three', firstName: 'User', lastName: 'Three', username: 'user3', email: 'user3@example.com', password: 'password123', signedUpAt: '2024-03-10T18:45:00Z', avatarUrl: 'https://placehold.co/100x100.png', course: 'Mechanical', year: '1st Year' },
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
    pdfUrl: 'data:application/pdf;base64,JVBERi0xLjQKJSDi48/gDQoNCjEgMCBvYmoKPDwKL1BhZ2VzIDIgMCBSCi9UeXBlIC9DYXRhbG9nCj4+CmVuZG9iagoNCjIgMCBvYmoKPDwKL0NvdW50IDEKL0tpZHMgWyAzIDAgUiBdCi9UeXBlIC9QYWdlcwo+PgplbmRvYmoKDQozIDAgb2JqCjw8Ci9Db250ZW50cyA0IDAgUgovTWVkaWFCb3ggWyAwIDAgNTk1IDg0MiBdCi9QYXJlbnQgMiAwIFIKL1Jlc29yY2VzIDw8Ci9Gb250IDw8Ci9GMSA1IDAgUgovRjIgNiAwIFIKPj4KL1Byb2NTZXRzIFsgL1BERiAvVGV4dCBdCj4+Ci9UeXBlIC9QYWdlCj4+CmVuZG9iagoNCjQgMCBvYmoKPDwKL0xlbmd0aCAxMzA2Cj4+CnN0cmVhbQpCSgoKL1AoQ2xlYW4gQ29kZTogQSBIYW5kYm9vayBvZiBBZ2lsZSBTb2Z0d2FyZSBDcmFmdHNtYW5zaGlwKSBUCjAuOTYyNzU1IDAgMCAtMC45NTg3NjEgMC4yODQ0ODMgODQxLjczODY0NiBUbQovRjEgNDAgVGYKKDAuMDAwMDAwKSBUawpCVAo1Ni44MjUgNzM3LjE5MzMgVGQKKEV2ZW4gYmFkIGNvZGUgY2FuIGZ1bmN0aW9uLiBCdXQgaWYgY29kZSBpc24ndCBjbGVhbiwgaXQgY2FuIGJyaW5nIGEgZGV2ZWxvcG1lbnQgb3JnYW5pemF0aW9uIHRvIGl0cyBrbmVlcy4gRXZlcnkKCnllYXIsIGNvdW50bGVzcyBob3VycyBhcmUgbG9zdCBhbmQgc2lnbmlmaWNhbnQgcmVzb3VyY2VzIGFyZSB3YXN0ZWQgYmVjYXVzZSBvZiBwb29ybHkgd3JpdHRlbiBjb2RlLgpCVAoyODMuNDM3IDcgVGwKLUYyIDcgVGYKKCkgVFEKLUYxIDEwIFRmCkJUCjU2LjgyNSA2ODYuNDkxOCBUZAooVGhpcyBib29rIGlzIGFib3V0IGdvb2QgcHJvZ3JhbW1pbmcuIEl0IGlzIGZpbGxlZCB3aXRoIHJlYWwgY29kZSBleGFtcGxlcy4gVGhleSBhcmUgY2hhbGxlbmdlcywganVzdCBhcyB0aGV5CmFyZS4gVGhlIGV4YW1wbGVzIGFyZSBhYm91dCB0aGUgcHJhY3RpY2Ugb2Ygd3JpdGluZyBjbGVhbiBjb2RlLCBpbmNsdWRpbmcgdGhlIHRlY2huaXF1ZXMgb2Ygd3JpdGluZwpjbGVhbiBmdW5jdGlvbnMsIGNsYXNzZXMsIGFuZCBzeXN0ZW1zLiBJdCBjb3ZlcnMgdG9waWNzIHN1Y2ggYXM6KSBUZApCVAgxMCAwIFRkCigiKSB0LQo4NS4xNzUgMCBUZAooIE5hbWluZyB2YXJpYWJsZXMsIGZ1bmN0aW9ucywgYW5kIGNsYXNzZXMgZm9yIGNsYXJpdHkgYW5kIGNvbnNpc3RlbmN5LiBUZAo4NS4xNzUgMCBUZAooIEZ1bmN0aW9uIGRlc2lnbiwgaW5jbHVkaW5nIGhhbmRsaW5nIGVycm9ycywgYm91bmRhcmllcywgYW5kIGFyZ3VtZW50cy4gVGQKNzUuMTc1IDAgVGQKLigiKSAwIFRkCigpIFRkCigpIFRkCigiKSB0LQooIENvbW1lbnRpbmc6IFdoYXQgbWFrZXMgYSBnb29kIGNvbW1lbnQsIGFuZCB3aGVuIHRvIHdyaXRlIHRoZW0uKSBUZAo4NS4xNzUgMCBUZAooIEZvcm1hdHRpbmc6IEhvdyB0byBsYXkgb3V0IGNvZGUgZm9yIG1heGltdW0gcmVhZGFiaWxpdHkuKSBUZAo4NS4xNzUgMCBUZAooIE9iamVjdHMgYW5kIGRhdGEgc3RydWN0dXJlczogVGhlIGRpZmZlcmVuY2UgYmV0d2VlbiBkYXRhIHRyYW5zZmVyIG9iamVjdHMgYW5kIHRydWUgZW5kb2JqZW5kDQoNCjUgMCBvYmoKPDwKL0Jhc2VGb250IC9IZWx2ZXRpY2EKL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcKL1N1YnR5cGUgL1R5cGUxCi9UeXBlIC9Gb250Cj4+CmVuZG9iagoNCjYgMCBvYmoKPDwKL0Jhc2VGb250IC9IZWx2ZXRpY2EKL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcKL1N1YnR5cGUgL1R5cGUxCi9UeXBlIC9Gb250Cj4+CmVuZG9iagoNCnhyZWYNCjAgNw0KMDAwMDAwMDAwMCA2NTUzNSBmIA0KMDAwMDAwMDAxNSAwMDAwMCBuIA0KMDAwMDAwMDA2MSAwMDAwMCBuIA0KMDAwMDAwMDExNyAwMDAwMCBuIA0KMDAwMDAwMDI5NiAwMDAwMCBuIA0KMDAwMDAxMjQwNSAwMDAwMCBuIA0KMDAwMDAxMjUxOCAwMDAwMCBuIA0KDQp0cmFpbGVyCjw8Ci9JbmZvIDw8Ci9BdXRob3IgKE5hbmRodSkKL0NyZWF0aW9uRGF0ZSAoRDoyMDI0MDcyOTEzMDY1OSswMCcwMCcpCi9Nb2REYXRlIChEOjIwMjQwNzI5MTMwNjU5KzAwJzAwJykKL1Byb2R1Y2VyIChpVHh0riA3LjEuOCAyMDE4IGJ5IGlUZXh0IEdyb3VwIE5WIFwoQUdQTC12ZXJzaW9uXCkpCi9UaXRsZSAoQ2xlYW4gQ29kZTogQSBIYW5kYm9vayBvZiBBZ2lsZSBTb2Z0d2FyZSBDcmFmdHNtYW5zaGlwKQo+PgovUm9vdCAxIDAgUgovU2l6ZSA3Cj4+DQpzdGFydHhyZWYNCjEyNjMxDQolJUVPRg==',
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
