"use client";
import React, { useState } from "react";
import { Box, IconButton, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { SearchBooksProps } from "@/models";

const SearchBooks = ({ onSearch, onResetFilters }: SearchBooksProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    onSearch(searchQuery.trim());
    onResetFilters?.();
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
      <TextField
        variant="outlined"
        fullWidth
        size="small"
        value={searchQuery}
        autoComplete="off"
        placeholder="Tìm kiếm ..."
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
        slotProps={{
          input: {
            startAdornment: (
              <IconButton
                onClick={() => {
                  handleSearch();
                }}
              >
                <SearchIcon />
              </IconButton>
            ),
          },
        }}
      />
    </Box>
  );
};

export default SearchBooks;
