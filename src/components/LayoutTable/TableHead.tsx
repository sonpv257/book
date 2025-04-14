"use client";
import React, { useState } from "react";
import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Checkbox,
  Button,
} from "@mui/material";
import {
  useSearchBooks,
  useHandleChangePage,
  useRowAndHeadSync,
  useSelection,
} from "@/hooks";
import { CategoryHead } from "@/components/Category";
import { GradeHead } from "@/components/Grade";
import { BookTypeHead } from "@/components/BookType";
import { SearchBooks, CopyBook, BookRow } from "@/components/LayoutTable";

const BookTable = () => {
  const { books, loading, handleSearch } = useSearchBooks();
  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } =
    useHandleChangePage(50);

  const { handleGlobalChange, getLatestValue, setLastChangedData, resetAll } =
    useRowAndHeadSync(page);

  const currentPageBooks = books.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const { selectedBookIds, isAllSelected, handleSelectAll, handleSelectOne } =
    useSelection(currentPageBooks, page);

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleRowChange = (
    bookId: string,
    field: "category" | "grade" | "bookType",
    value: string
  ) => {
    setLastChangedData((prev) => ({
      ...prev,
      [bookId]: {
        ...prev[bookId],
        [field]: value,
        [`${field}Timestamp`]: Date.now(),
        timestamp: Date.now(),
      },
    }));
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 1250, margin: "auto" }}>
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
        <Box sx={{ display: "flex", gap: 1 }}>
          <SearchBooks
            onSearch={handleSearch}
            loading={loading}
            onResetFilters={resetAll}
          />
          <Button
            variant="contained"
            onClick={() => {
              setDialogOpen(true);
            }}
            size="small"
            sx={{ mt: 2 }}
            disabled={selectedBookIds.length === 0}
          >
            Sao chép
          </Button>
        </Box>
      </Box>

      <TableContainer
        component={Paper}
        sx={{ mt: 1, maxHeight: "84vh", width: "100%" }}
      >
        <Table stickyHeader sx={{ tableLayout: "fixed", width: "100%" }}>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ fontWeight: "bold", textAlign: "center", width: "3%" }}
              >
                STT
              </TableCell>
              <TableCell padding="checkbox">
                <Checkbox checked={isAllSelected} onChange={handleSelectAll} />
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", textAlign: "center", width: "52%" }}
              >
                Thông tin sách điện tử
              </TableCell>
              <TableCell sx={{ width: "20%" }}>
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
                  <CategoryHead
                    onChange={(val) => {
                      handleGlobalChange("category", val);
                    }}
                  />
                </Box>
              </TableCell>
              <TableCell sx={{ width: "20%" }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ fontWeight: "bold" }}>Khối/Lớp</Typography>
                  <GradeHead
                    onChange={(val) => {
                      handleGlobalChange("grade", val);
                    }}
                  />
                </Box>
              </TableCell>
              <TableCell sx={{ width: "20%" }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ fontWeight: "bold" }}>Kho sách</Typography>
                  <BookTypeHead
                    onChange={(val) => {
                      handleGlobalChange("bookType", val);
                    }}
                  />
                </Box>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6}>
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              currentPageBooks.map((book, index) => {
                const latestCategory = getLatestValue(book.id, "category", "");
                const latestGrade = getLatestValue(
                  book.id,
                  "grade",
                  book.gradeCode || ""
                );
                const latestBookType = getLatestValue(
                  book.id,
                  "bookType",
                  book.bookTypeCode || ""
                );

                return (
                  <BookRow
                    key={book.id}
                    index={index}
                    book={book}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    selected={selectedBookIds.includes(book.id)}
                    onSelect={() => {
                      handleSelectOne(book.id);
                    }}
                    category={latestCategory}
                    grade={latestGrade}
                    bookType={latestBookType}
                    onCategoryChange={(val) =>
                      handleRowChange(book.id, "category", val)
                    }
                    onGradeChange={(val) =>
                      handleRowChange(book.id, "grade", val)
                    }
                    onBookTypeChange={(val) =>
                      handleRowChange(book.id, "bookType", val)
                    }
                  />
                );
              })
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[50, 100]}
          component="div"
          count={books.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ position: "sticky", bottom: 0, backgroundColor: "white" }}
        />
      </TableContainer>
      <CopyBook
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        selectedBookIds={selectedBookIds}
        books={books}
        getLatestValue={getLatestValue}
      />
    </Box>
  );
};

export default BookTable;
