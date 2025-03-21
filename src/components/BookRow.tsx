"use client";
import React from "react";
import { TableCell, TableRow, Typography } from "@mui/material";
import { BookRowProps } from "@/models";
import { CategoryCombo, GradeCombo } from "@/components";

const BookRow = ({
  book,
  index,
  globalCategory,
  globalGrade,
}: BookRowProps) => {
  return (
    <TableRow>
      <TableCell
        sx={{
          width: "3%",
          minWidth: "3%",
          maxWidth: "3%",
          textAlign: "center",
        }}
      >
        {index + 1}
      </TableCell>
      <TableCell
        sx={{
          width: "52%",
          minWidth: "52%",
          maxWidth: "52%",
        }}
      >
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
            fontSize: 13,
          }}
        >
          Tác giả: {book.author}
        </Typography>
      </TableCell>
      <TableCell
        sx={{
          width: "25%",
          minWidth: "25%",
          maxWidth: "25%",
        }}
      >
        <CategoryCombo globalValue={globalCategory} />
      </TableCell>
      <TableCell
         sx={{
          width: "20%",
          minWidth: "20%",
          maxWidth: "20%",
        }}
      >
        <GradeCombo globalValue={globalGrade} />
      </TableCell>
    </TableRow>
  );
};

export default BookRow;
