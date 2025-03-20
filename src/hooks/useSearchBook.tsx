import { useState, useEffect } from "react";
import { Book } from "@/models";
import { bookServices } from "@/services";

const useSearchBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async (searchKey: string) => {
    setLoading(true);
    try {
      const data = await bookServices.fetchBooks(searchKey);
      setBooks(data);
    } catch (error) {
      console.error("Lỗi khi tìm kiếm sách", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch(""); 
  }, []);

  return { books, loading, handleSearch };
};

export default useSearchBooks;