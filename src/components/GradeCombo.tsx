"use client";
import React, { useState } from "react";
import { FormControl, MenuItem, Select } from "@mui/material";
import { useDataContext } from "@/provider/DataProvider";

const GradeCombo = () => {
  const { grades } = useDataContext();
  const [selectedGrade, setSelectedGrade] = useState<string>("");

  return (
    <FormControl fullWidth size="small" sx={{ minWidth: 120 }}>
      <Select
        labelId="grade-label"
        value={selectedGrade}
        onChange={(e) => {
          setSelectedGrade(e.target.value);
        }}
        sx={{ fontSize: 14 }}
      >
        <MenuItem value="" sx={{ fontSize: 14 }}>
          -- Chọn khối/lớp --
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

export default GradeCombo;
