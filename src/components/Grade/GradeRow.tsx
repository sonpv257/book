"use client";
import React, { useState, useEffect } from "react";
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useDataContext } from "@/provider/DataProvider";
import { GradeComboProps } from "@/models";

const GradeRow = ({ globalValue, onChange, value }: GradeComboProps) => {
  const { grades } = useDataContext();
  const [selectedGrade, setSelectedGrade] = useState<string>("");

  useEffect(() => {
    if (globalValue !== undefined) {
      setSelectedGrade(globalValue);
    }
  }, [globalValue]);

  const handleChange = (e: SelectChangeEvent<string>) => {
    const newValue = e.target.value;
    setSelectedGrade(newValue);
    if (onChange) onChange(newValue);
  };

  return (
    <FormControl fullWidth size="small" sx={{ minWidth: 120 }}>
      <Select
        labelId="grade-label"
        value={value !== undefined ? value : selectedGrade}
        onChange={handleChange}
        sx={{ fontSize: 14 }}
      >
        <MenuItem value="" sx={{ fontSize: 14 }}>
          --- Chọn khối/lớp ---
        </MenuItem>
        {grades.map((grade) => (
          <MenuItem key={grade.id} value={grade.code} sx={{ fontSize: 14 }}>
            {grade.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default GradeRow;
