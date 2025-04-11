export interface Book {
  id: string;
  title: string;
  author: string;
  bookTypeCode: string;
  gradeCode: string;
  category: string;
  grade: string; 
}

export interface BookRowProps {
  book: Book;
  index: number;
  selected: boolean;
  onSelect: () => void;
  category: string;
  grade: string;
  bookType: string;
  onCategoryChange: (val: string) => void;
  onGradeChange: (val: string) => void;
  onBookTypeChange: (val: string) => void;
}
