export interface Book {
  id: number;
  title: string;
  author: string;
}

export interface BookRowProps {
  book: Book;
  index: number;
}