"use client";
import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Box,
  Typography,
} from "@mui/material";
import { CopyBookProps } from "@/models";
import { useDataContext } from "@/provider/DataProvider";

const CopyBook = ({
  open,
  onClose,
  selectedBookIds,
  books,
  getLatestValue,
}: CopyBookProps) => {
  const { categories, grades, booktypes } = useDataContext();

  const getCategoryName = (code: string) =>
    categories.find((c) => c.code === code)?.name || code;
  const getGradeName = (code: string) =>
    grades.find((g) => g.code === code)?.name || code;
  const getBookTypeName = (code: string) =>
    booktypes.find((b) => b.code === code)?.name || code;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Thông tin các sách đã chọn</DialogTitle>
      <DialogContent>
        {selectedBookIds.map((id) => {
          const book = books.find((b) => b.id === id);
          if (!book) return null;
          const cat = getLatestValue(id, "category", "");
          const grd = getLatestValue(id, "grade", book.gradeCode || "");
          const typ = getLatestValue(id, "bookType", book.bookTypeCode || "");

          return (
            <Box key={id} sx={{ p: 2, borderBottom: "1px solid #ccc" }}>
              <Typography>
                <strong>{book.title}</strong>
              </Typography>
              {book.author && <Typography fontSize={12}>Tác giả: {book.author}</Typography>}
              <Typography>Thư mục: {getCategoryName(cat)}</Typography>
              <Typography>Khối/Lớp: {getGradeName(grd)}</Typography>
              <Typography>Kho sách: {getBookTypeName(typ)}</Typography>
            </Box>
          );
        })}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Đóng</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CopyBook;
