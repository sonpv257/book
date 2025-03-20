"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { categoryServices, gradeServices } from "@/services";
import { Category, DataContextProps, Grade } from "@/models";

const DataContext = createContext<DataContextProps | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);

  useEffect(() => {
    const loadCategories = async () => {
      const data = await categoryServices.fetchCategories();
      setCategories(data);
    };

    const loadGrades = async () => {
      const data = await gradeServices.fetchGrades();
      setGrades(data);
    };

    loadCategories();
    loadGrades();
  }, []);

  return (
    <DataContext.Provider value={{ categories, grades }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext must be used within a DataProvider");
  }
  return context;
};