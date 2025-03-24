export interface Book {
  id: number;
  title: string;
  author: string;
  bookTypeCode: string;
}

export interface BookRowProps {
  book: Book;
  index: number;
  globalCategory: string;
  globalGrade: string;
  globalBookType: string;
}