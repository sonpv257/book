"use client";
import React, { useState } from "react";
import { FormControl, MenuItem, Select } from "@mui/material";
import { useDataContext } from "@/provider/DataProvider";

interface CategoryComboProps {
  selected: string;
  onChange?: (value: string) => void; 
}

const CategoryCombo = () => {
  const { categories } = useDataContext();
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  return (
    <FormControl fullWidth size="small" sx={{ minWidth: 120 }}>
      <Select
        labelId="category-label"
        value={selectedCategory}
        onChange={(e) => {
          setSelectedCategory(e.target.value);
        }}
        sx={{ fontSize: 14 }}
      >
        <MenuItem value="" sx={{ fontSize: 14 }}>
          -- Chọn thư mục --
        </MenuItem>
        {categories.map((category) => (
          <MenuItem
            key={category.id}
            value={category.code}
            sx={{ fontSize: 14 }}
          >
            {category.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CategoryCombo;
