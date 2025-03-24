"use client";
import React from "react";
import { TableCell, TableRow, Typography } from "@mui/material";
import { BookRowProps } from "@/models";
import { BookTypeCombo, CategoryCombo, GradeCombo } from "@/components";

const BookRow = ({
  book,
  index,
  globalCategory,
  globalGrade,
  globalBookType,
}: BookRowProps) => {
  return (
    <TableRow>
      <TableCell sx={{ width: "3%", textAlign: "center" }}>
        {index + 1}
      </TableCell>
      <TableCell sx={{ width: "52%" }}>
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
      <TableCell sx={{ width: "20%" }}>
        <CategoryCombo globalValue={globalCategory} />
      </TableCell>
      <TableCell sx={{ width: "20%" }}>
        <GradeCombo globalValue={globalGrade} />
      </TableCell>
      <TableCell sx={{ width: "20%" }}>
        <BookTypeCombo
          globalValue={globalBookType}
          bookTypeCode={book.bookTypeCode}
        />
      </TableCell>
    </TableRow>
  );
};

export default BookRow;
