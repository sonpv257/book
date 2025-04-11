"use client";
import React from "react";
import { TableCell, TableRow, Typography, Checkbox } from "@mui/material";
import { BookRowProps } from "@/models";
import { CategoryRow } from "@/components/Category";
import { GradeRow } from "@/components/Grade";
import { BookTypeRow } from "@/components/BookType";

const BookRow: React.FC<BookRowProps> = ({
  book,
  index,
  selected,
  onSelect,
  category,
  grade,
  bookType,
  onCategoryChange,
  onGradeChange,
  onBookTypeChange,
}) => {
  return (
    <TableRow hover>
      <TableCell sx={{ width: "3%", textAlign: "center" }}>
        {index + 1}
      </TableCell>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onChange={onSelect} />
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
        {book.author && (
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
        )}
      </TableCell>
      <TableCell sx={{ width: "20%" }}>
        <CategoryRow value={category} onChange={onCategoryChange} />
      </TableCell>
      <TableCell sx={{ width: "20%" }}>
        <GradeRow
          value={grade}
          gradeCode={book.gradeCode}
          onChange={onGradeChange}
        />
      </TableCell>
      <TableCell sx={{ width: "20%" }}>
        <BookTypeRow
          value={bookType}
          bookTypeCode={book.bookTypeCode}
          onChange={onBookTypeChange}
        />
      </TableCell>
    </TableRow>
  );
};

export default BookRow;
