"use client";
import React, { useEffect, useState } from "react";
import { FormControl, MenuItem, Select } from "@mui/material";
import { gradeServices } from "@/services";
import { Grade } from "@/models";

const GradeCombo: React.FC = () => {
  const [grades, setGrades] = useState<Grade[]>([]);
  const [selectedGrade, setSelectedGrade] = useState<string>("");

  useEffect(() => {
    const loaodGrades = async () => {
      const data = await gradeServices.fetchGrades();
      setGrades(data);
    };

    loaodGrades();
  }, []);

  return (
    <FormControl fullWidth>
      <Select
        labelId="grade-label"
        value={selectedGrade}
        onChange={(e) => {
          setSelectedGrade(e.target.value);
        }}
      >
        <MenuItem value="">-- Chọn khối/lớp --</MenuItem>
        {grades.map((grade) => (
          <MenuItem key={grade.id} value={grade.code}>
            {grade.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default GradeCombo;
