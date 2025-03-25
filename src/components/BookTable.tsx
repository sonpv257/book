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
import { useHandleChangePage, useSearchBooks, useGlobalFilters } from "@/hooks";
import {
  BookRow,
  BookTypeCombo,
  CategoryCombo,
  GradeCombo,
  SearchBooks,
} from "@/components";

const BookTable = () => {
  const { books, loading, handleSearch } = useSearchBooks();
  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } =
    useHandleChangePage(10);

  const {
    globalCategory,
    globalGrade,
    globalBookType,
    handleGlobalBookTypeChange,
    handleGlobalCategoryChange,
    handleGlobalGradeChange,
  } = useGlobalFilters();

  return (
    <Box sx={{ width: "100%", maxWidth: 1200, margin: "auto" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 1,
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
          mt: 1,
          maxHeight: "84vh",
          width: "100%",
        }}
      >
        <Table stickyHeader sx={{ tableLayout: "fixed", width: "100%" }}>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  textAlign: "center",
                  width: "3%",
                  minWidth: "3%",
                  maxWidth: "3%",
                }}
              >
                STT
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  textAlign: "center",
                  width: "52%",
                  minWidth: "52%",
                  maxWidth: "52%",
                }}
              >
                Thông tin sách điện tử
              </TableCell>
              <TableCell
                sx={{
                  width: "20%",
                  minWidth: "20%",
                  maxWidth: "20%",
                }}
              >
                <Box
                  sx={{
                    fontSize: 13,
                    gap: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ fontWeight: "bold" }}>Thư mục</Typography>
                  <CategoryCombo
                    onChange={handleGlobalCategoryChange}
                    value={globalCategory}
                  />
                </Box>
              </TableCell>
              <TableCell
                sx={{
                  width: "20%",
                  minWidth: "20%",
                  maxWidth: "20%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ fontWeight: "bold" }}>Khối/Lớp</Typography>
                  <GradeCombo
                    onChange={handleGlobalGradeChange}
                    value={globalGrade}
                  />
                </Box>
              </TableCell>
              <TableCell
                sx={{
                  width: "20%",
                  minWidth: "20%",
                  maxWidth: "20%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ fontWeight: "bold" }}>Kho sách</Typography>
                  <BookTypeCombo
                    onChange={(value) => handleGlobalBookTypeChange(value)}
                    value={globalBookType}
                  />
                </Box>
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
                    globalCategory={globalCategory}
                    globalGrade={globalGrade}
                    globalBookType={globalBookType}
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
