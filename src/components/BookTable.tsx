"use client";
import React from "react";
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
import { useHandleChangePage } from "@/hooks";
import { BookRow, CategoryCombo, GradeCombo, SearchBooks } from "@/components";
import { useSearchBooks } from "@/hooks";

const BookTable = () => {
  const { books, loading, handleSearch } = useSearchBooks();
  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } =
    useHandleChangePage(10);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 1,
          margin: "auto",
          maxWidth: 1000,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Kho học liệu số
        </Typography>
        <SearchBooks onSearch={handleSearch} loading={loading} />
      </Box>

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
        <Table stickyHeader>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#333" }}>
              <TableCell
                sx={{ fontWeight: "bold", width: 50, textAlign: "center" }}
              >
                STT
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", maxWidth: 350, textAlign: "center" }}
              >
                Thông tin sách điện tử
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", width: 200, textAlign: "center" }}
              >
                Thư mục <CategoryCombo />
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", width: 200, textAlign: "center" }}
              >
                Khối/Lớp <GradeCombo />
              </TableCell>
            </TableRow>
          </TableHead>
          {loading ? (
            <TableBody>
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
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
          )}
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
      </TableContainer>
    </Box>
  );
};

export default BookTable;
