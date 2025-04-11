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

const GradeHead = ({ globalValue, onChange, value }: GradeComboProps) => {
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
        displayEmpty
        value={value !== undefined ? value : selectedGrade}
        onChange={handleChange}
        sx={{ fontSize: 14 }}
        renderValue={(selected) =>
          selected ? (
            grades.find((g) => g.code === selected)?.name || selected
          ) : (
            <span>--- Chọn khối/lớp ---</span>
          )
        }
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

export default GradeHead;
