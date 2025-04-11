import { Book } from "./";

export interface CopyBookProps {
  open: boolean;
  onClose: () => void;
  selectedBookIds: string[];
  books: Book[];
  getLatestValue: (bookId: string, field: "category" | "grade" | "bookType", fallback: string) => string;
}
