"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { booktypeServices, categoryServices, gradeServices } from "@/services";
import { BookType, Category, DataContextProps, Grade } from "@/models";

const DataContext = createContext<DataContextProps | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [booktypes, setBookTypes] = useState<BookType[]>([]);

  useEffect(() => {
    const loadCategories = async () => {
      const data = await categoryServices.fetchCategories();
      setCategories(data);
    };

    const loadGrades = async () => {
      const data = await gradeServices.fetchGrades();
      setGrades(data);
    };

    const loadBookTypes = async () => {
      const data = await booktypeServices.fetchBookTypes();
      setBookTypes(data);
    };
    
    loadBookTypes();
    loadCategories();
    loadGrades();
  }, []);

  return (
    <DataContext.Provider value={{ categories, grades, booktypes }}>
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