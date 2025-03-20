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
  TablePagination,
  Box,
} from "@mui/material";
import { Book } from "@/models";
import { bookServices } from "@/services";
import BookRow from "./BookRow";
import { useHandleChangePage } from "@/hooks";
import CategoryCombo from "@/components/CategoryCombo";
import GradeCombo from "@/components/GradeCombo";

const BookTable = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } =
    useHandleChangePage(10);

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
    <Box>
      <Typography
        variant="h6"
        sx={{ padding: 1, margin: "auto", fontWeight: "bold" }}
      >
        Kho học liệu số
      </Typography>
      <TableContainer
        component={Paper}
        sx={{
          maxWidth: 1000,
          maxHeight: 570,
          margin: "auto",
          mt: 1,
          overflow: "auto",
        }}
      >
        {loading ? (
          <Typography align="center" sx={{ padding: 2 }}>
            <CircularProgress />
          </Typography>
        ) : (
          <>
            <Table stickyHeader>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#333" }}>
                  <TableCell
                    sx={{ fontWeight: "bold", width: 50, textAlign: "center" }}
                  >
                    STT
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      maxWidth: 350,
                      textAlign: "center",
                    }}
                  >
                    Thông tin sách điện tử
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      width: 200,
                      textAlign: "center",
                    }}
                  >
                    Thư mục <CategoryCombo />
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      width: 200,
                      textAlign: "center",
                    }}
                  >
                    Khối/Lớp <GradeCombo />
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {books
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((book, index) => (
                    <BookRow
                      key={book.id}
                      index={index + page * rowsPerPage}
                      book={book}
                    />
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[10, 50, 100]}
              component="div"
              count={books.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              sx={{ position: "sticky", bottom: 0, backgroundColor: "white" }}
            />
          </>
        )}
      </TableContainer>
    </Box>
  );
};

export default BookTable;
