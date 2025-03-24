"use client";
import React, { useState, useEffect } from "react";
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useDataContext } from "@/provider/DataProvider";
import { BookTypeComboProps } from "@/models";

const BookTypeCombo = ({
  globalValue,
  onChange,
  value,
}: BookTypeComboProps) => {
  const { booktypes } = useDataContext();
  const [selectedBookType, setSelectedBookType] = useState<string>("");

  useEffect(() => {
    if (globalValue !== undefined) {
      setSelectedBookType(globalValue);
    }
  }, [globalValue]);

  const handleChange = (e: SelectChangeEvent<string>) => {
    const newValue = e.target.value;
    setSelectedBookType(newValue);
    if (onChange) onChange(newValue);
  };

  return (
    <FormControl fullWidth size="small" sx={{ minWidth: 120 }}>
      <Select
        labelId="booktype-label"
        value={value !== undefined ? value : selectedBookType}
        onChange={handleChange}
        sx={{ fontSize: 14 }}
      >
        <MenuItem value="" sx={{ fontSize: 14 }}>
          -- Chọn bộ sách --
        </MenuItem>
        {booktypes.map((booktype) => (
          <MenuItem
            key={booktype.id}
            value={booktype.code}
            sx={{ fontSize: 14 }}
          >
            {booktype.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default BookTypeCombo;
