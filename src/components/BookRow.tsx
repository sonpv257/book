"use client";
import React from "react";
import { TableCell, TableRow, Typography } from "@mui/material";
import { BookRowProps } from "@/models";
import CategoryCombo from "@/components/CategoryCombo";
import GradeCombo from "@/components/GradeCombo";

const BookRow: React.FC<BookRowProps> = ({ book, index }) => {
  return (
    <TableRow>
      <TableCell>{index + 1}</TableCell>
      <TableCell>
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
          {book.title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Tác giả: {book.author}
        </Typography>
      </TableCell>
      <TableCell>
        <CategoryCombo />
      </TableCell>
      <TableCell>
        <GradeCombo />
      </TableCell>
    </TableRow>
  );
};

export default BookRow;
