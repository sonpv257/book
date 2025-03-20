"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Book } from "@/models";
import { bookServices } from "@/services";
import BookRow from "./BookRow";

const BookTable: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadBooks = async () => {
      setLoading(true);
      const data = await bookServices.fetchBooks();
      setBooks(data);
      setLoading(false);
    };

    loadBooks();
  }, []);

  return (
    <TableContainer component={Paper} sx={{ maxWidth: 900, margin: "auto", mt: 2 }}>
      <Typography variant="h6" sx={{ padding: 1 }}>
        Kho học liệu số
      </Typography>
      {loading ? (
        <Typography align="center" sx={{ padding: 2 }}>
          <CircularProgress />
        </Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#333" }}>
              <TableCell sx={{ fontWeight: "bold" }}>STT</TableCell>
              <TableCell sx={{ fontWeight: "bold", maxWidth: 300 }}>
                Thông tin sách điện tử
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", minWidth: 200 }}>
                Thư mục
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", minWidth: 200 }}>
                Khối/Lớp
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book, index) => (
              <BookRow key={book.id} index={index} book={book} />
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
};

export default BookTable;
