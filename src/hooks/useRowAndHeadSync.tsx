import { useCallback, useEffect, useState } from "react";
import { useGlobalFilters } from "@/hooks";

const useRowAndHeadSync = (page: number) => {
  const {
    handleGlobalCategoryChange,
    handleGlobalGradeChange,
    handleGlobalBookTypeChange,
  } = useGlobalFilters();

  const [lastChangedData, setLastChangedData] = useState<{
    [key: string]: {
      category?: string;
      grade?: string;
      bookType?: string;
      categoryTimestamp?: number;
      gradeTimestamp?: number;
      bookTypeTimestamp?: number;
      timestamp: number;
    };
  }>({});

  const [lastGlobalChange, setLastGlobalChange] = useState<{
    [key: string]: { value: string; timestamp: number };
  }>({});

  const now = () => new Date().getTime();

  const handleGlobalChange = useCallback(
    (type: "category" | "grade" | "bookType", value: string) => {
      const timestamp = now();
      if (type === "category") {
        handleGlobalCategoryChange(value);
        setLastGlobalChange((prev) => ({
          ...prev,
          category: { value, timestamp },
        }));
      } else if (type === "grade") {
        handleGlobalGradeChange(value);
        setLastGlobalChange((prev) => ({
          ...prev,
          grade: { value, timestamp },
        }));
      } else {
        handleGlobalBookTypeChange(value);
        setLastGlobalChange((prev) => ({
          ...prev,
          bookType: { value, timestamp },
        }));
      }
    },
    [
      handleGlobalCategoryChange,
      handleGlobalGradeChange,
      handleGlobalBookTypeChange,
    ]
  );

  const getLatestValue = useCallback(
    (
      bookId: string,
      type: "category" | "grade" | "bookType",
      fallback: string
    ) => {
      const row = lastChangedData[bookId];
      const global = lastGlobalChange[type];
      const rowValue = row?.[type];
      const rowTime = row?.[`${type}Timestamp`] ?? 0;
      const globalValue = global?.value;
      const globalTime = global?.timestamp ?? 0;

      if (rowValue !== undefined && rowTime >= globalTime) return rowValue;
      if (globalValue !== undefined) return globalValue;
      return fallback;
    },
    [lastChangedData, lastGlobalChange]
  );

  const resetAll = useCallback(() => {
    handleGlobalCategoryChange("");
    handleGlobalGradeChange("");
    handleGlobalBookTypeChange("");
    setLastGlobalChange({});
    setLastChangedData({});
  }, [
    handleGlobalCategoryChange,
    handleGlobalGradeChange,
    handleGlobalBookTypeChange,
  ]);

  useEffect(() => {
    resetAll();
  }, [page, resetAll]);

  return {
    lastChangedData,
    handleGlobalChange,
    getLatestValue,
    setLastChangedData,
    resetAll,
  };
};

export default useRowAndHeadSync;
