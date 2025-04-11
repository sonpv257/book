import { useState, useCallback } from "react";

const useGlobalFilters = () => {
  const [globalCategory, setGlobalCategory] = useState<string>("");
  const [globalGrade, setGlobalGrade] = useState<string>("");
  const [globalBookType, setGlobalBookType] = useState<string>("");

  const handleGlobalCategoryChange = useCallback((value: string) => {
    setGlobalCategory(value);
  }, []);

  const handleGlobalGradeChange = useCallback((value: string) => {
    setGlobalGrade(value);
  }, []);

  const handleGlobalBookTypeChange = useCallback((value: string) => {
    setGlobalBookType(value);
  }, []);

  return {
    globalCategory,
    globalGrade,
    globalBookType,
    handleGlobalBookTypeChange,
    handleGlobalCategoryChange,
    handleGlobalGradeChange,
  };
};

export default useGlobalFilters;
