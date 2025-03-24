import { BookType, Category, Grade } from "@/models";

export interface DataContextProps {
  categories: Category[];
  grades: Grade[];
  booktypes: BookType[];
}