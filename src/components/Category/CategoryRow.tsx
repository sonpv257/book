"use client";
import React, { useState, useEffect } from "react";
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useDataContext } from "@/provider/DataProvider";
import { CategoryComboProps } from "@/models";

const CategoryRow = ({
  globalValue,
  onChange,
  value,
}: CategoryComboProps) => {
  const { categories } = useDataContext();
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    if (globalValue !== undefined) {
      setSelectedCategory(globalValue);
    }
  }, [globalValue]);

  const handleChange = (e: SelectChangeEvent<string>) => {
    const newValue = e.target.value;
    setSelectedCategory(newValue);
    if (onChange) onChange(newValue); 
  };

  return (
    <FormControl fullWidth size="small" sx={{ minWidth: 120 }}>
      <Select
        value={value !== undefined ? value : selectedCategory}
        onChange={handleChange}
        sx={{ fontSize: 14 }}
      >
        <MenuItem value="" sx={{ fontSize: 14 }}>
          --- Chọn thư mục ---
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

export default CategoryRow;