"use client";
import React from "react";
import { TableCell, TableRow, Typography } from "@mui/material";
import { BookRowProps } from "@/models";
import { CategoryRow } from "@/components/Category";
import { GradeRow } from "@/components/Grade";
import { BookTypeRow } from "@/components/BookType";

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
        <CategoryRow globalValue={globalCategory} />
      </TableCell>
      <TableCell sx={{ width: "20%" }}>
        <GradeRow globalValue={globalGrade} />
      </TableCell>
      <TableCell sx={{ width: "20%" }}>
        <BookTypeRow
          globalValue={globalBookType}
          bookTypeCode={book.bookTypeCode}
        />
      </TableCell>
    </TableRow>
  );
};

export default BookRow;
