"use client";
import React from "react";
import { TableCell, TableRow, Typography } from "@mui/material";
import { BookRowProps } from "@/models";
import CategoryCombo from "@/components/CategoryCombo";
import GradeCombo from "@/components/GradeCombo";

const BookRow = ({ book, index }: BookRowProps) => {
  return (
    <TableRow>
      <TableCell>{index + 1}</TableCell>
      <TableCell>
        <Typography sx={{ fontWeight: "bold", fontSize: 16 }}>
          {book.title}
        </Typography>
        <Typography
          color="textSecondary"
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: 350,
            fontSize: 13,
          }}
        >
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
