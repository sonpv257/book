import { useState, useCallback, useEffect } from "react";

const useSelection = (currentPageBooks: { id: string }[], page: number) => {
  const [selectedBookIds, setSelectedBookIds] = useState<string[]>([]);

  useEffect(() => {
    setSelectedBookIds([]);
  }, [page]);

  const isAllSelected =
    currentPageBooks.length > 0 &&
    currentPageBooks.every((book) => selectedBookIds.includes(book.id));

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedBookIds((prev) =>
        prev.filter((id) => !currentPageBooks.some((b) => b.id === id))
      );
    } else {
      const newIds = currentPageBooks
        .map((book) => book.id)
        .filter((id) => !selectedBookIds.includes(id));
      setSelectedBookIds([...selectedBookIds, ...newIds]);
    }
  };

  const handleSelectOne = useCallback((id: string) => {
    setSelectedBookIds((prev) =>
      prev.includes(id) ? prev.filter((bookId) => bookId !== id) : [...prev, id]
    );
  }, []);

  return {
    selectedBookIds,
    isAllSelected,
    handleSelectAll,
    handleSelectOne,
  };
};

export default useSelection;
