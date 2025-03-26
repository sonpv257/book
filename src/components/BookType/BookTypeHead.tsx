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

const BookTypeHead = ({ globalValue, onChange, value }: BookTypeComboProps) => {
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
        displayEmpty
        value={value !== undefined ? value : selectedBookType || ""}
        onChange={handleChange}
        sx={{ fontSize: 14 }}
        renderValue={(selected) =>
          selected ? (
            booktypes.find((b) => b.code === selected)?.name || selected
          ) : (
            <span>--- Chọn kho sách ---</span>
          )
        }
      >
        <MenuItem value="--- Chọn kho sách ---" sx={{ fontSize: 14 }}>
          --- Chọn kho sách ---
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

export default BookTypeHead;
