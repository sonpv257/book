import { useState } from "react";

export const useGlobalFilters = () => {
  const [globalCategory, setGlobalCategory] = useState<string>("");
  const [globalGrade, setGlobalGrade] = useState<string>("");
  const [globalBookType, setGlobalBookType] = useState<string>("");

  const handleGlobalCategoryChange = (value: string) => {
    setGlobalCategory(value);
  };

  const handleGlobalGradeChange = (value: string) => {
    setGlobalGrade(value);
  };

  const handleGlobalBookTypeChange = (value: string) => {
    setGlobalBookType(value);
  }

  return {
    globalCategory,
    globalGrade,
    globalBookType,
    handleGlobalBookTypeChange,
    handleGlobalCategoryChange,
    handleGlobalGradeChange,
  };
};