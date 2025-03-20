"use client";
import React, { useEffect, useState } from "react";
import { FormControl, MenuItem, Select } from "@mui/material";
import { categoryServices } from "@/services";
import { Category } from "@/models";

const CategoryCombo: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    const loadCategories = async () => {
      const data = await categoryServices.fetchCategories();
      setCategories(data);
    };

    loadCategories();
  }, []);

  return (
    <FormControl fullWidth>
      <Select
        labelId="category-label"
        value={selectedCategory}
        onChange={(e) => {
          setSelectedCategory(e.target.value);
        }}
      >
        <MenuItem value="">-- Chọn thư mục --</MenuItem>
        {categories.map((category) => (
          <MenuItem key={category.id} value={category.code}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CategoryCombo;
