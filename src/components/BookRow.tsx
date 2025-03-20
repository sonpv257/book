"use client";
import React from "react";
import { TableCell, TableRow, Typography } from "@mui/material";
import { BookRowProps } from "@/models";
import { CategoryCombo, GradeCombo } from "@/components";

const BookRow = ({ book, index }: BookRowProps) => {
  return (
    <TableRow>
      <TableCell sx={{ width: 50 }}>{index + 1}</TableCell>
      <TableCell sx={{ maxWidth: 350 }}>
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: 16,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
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
      <TableCell
        sx={{
          maxWidth: 200,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        <CategoryCombo />
      </TableCell>
      <TableCell
        sx={{
          maxWidth: 200,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        <GradeCombo />
      </TableCell>
    </TableRow>
  );
};

export default BookRow;
