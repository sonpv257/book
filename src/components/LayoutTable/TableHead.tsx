"use client";
import React, { useEffect, useState } from "react";
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
import { useHandleChangePage, useSearchBooks, useGlobalFilters } from "@/hooks";
import { CategoryHead } from "@/components/Category";
import { GradeHead } from "@/components/Grade";
import { BookTypeHead } from "@/components/BookType";
import { SearchBooks, CopyBook, BookRow } from "@/components/LayoutTable";

const BookTable = () => {
  const { books, loading, handleSearch } = useSearchBooks();
  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } =
    useHandleChangePage(50);
  const {
    globalCategory,
    globalGrade,
    globalBookType,
    handleGlobalBookTypeChange,
    handleGlobalCategoryChange,
    handleGlobalGradeChange,
  } = useGlobalFilters();

  const [selectedBookIds, setSelectedBookIds] = useState<string[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [lastChangedData, setLastChangedData] = useState<
    Record<
      string,
      {
        category?: string;
        grade?: string;
        bookType?: string;
        timestamp?: number;
      }
    >
  >({});
  const [lastGlobalChange, setLastGlobalChange] = useState<{
    category?: { value: string; timestamp: number };
    grade?: { value: string; timestamp: number };
    bookType?: { value: string; timestamp: number };
  }>({});

  const currentPageBooks = books.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const isAllSelected =
    currentPageBooks.length > 0 &&
    currentPageBooks.every((book) => selectedBookIds.includes(book.id));

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedBookIds((prev) =>
        prev.filter((id) => !currentPageBooks.some((b) => b.id === id))
      );
    } else {
      const newIds = currentPageBooks
        .map((book) => book.id)
        .filter((id) => !selectedBookIds.includes(id));
      setSelectedBookIds([...selectedBookIds, ...newIds]);
    }
  };

  const handleSelectOne = (id: string) => {
    setSelectedBookIds((prev) =>
      prev.includes(id) ? prev.filter((bookId) => bookId !== id) : [...prev, id]
    );
  };

  const now = () => new Date().getTime();

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
        timestamp: now(),
      },
    }));
  };

  const handleGlobalChange = (
    type: "category" | "grade" | "bookType",
    value: string
  ) => {
    const time = now();
    if (type === "category") {
      handleGlobalCategoryChange(value);
      setLastGlobalChange((prev) => ({
        ...prev,
        category: { value, timestamp: time },
      }));
    } else if (type === "grade") {
      handleGlobalGradeChange(value);
      setLastGlobalChange((prev) => ({
        ...prev,
        grade: { value, timestamp: time },
      }));
    } else {
      handleGlobalBookTypeChange(value);
      setLastGlobalChange((prev) => ({
        ...prev,
        bookType: { value, timestamp: time },
      }));
    }
  };

  const getLatestValue = (
    bookId: string,
    type: "category" | "grade" | "bookType",
    fallback: string
  ) => {
    const row = lastChangedData[bookId];
    const global = lastGlobalChange[type];
    const rowValue = row?.[type];
    const rowTime = row?.timestamp ?? 0;
    const globalValue = global?.value;
    const globalTime = global?.timestamp ?? 0;

    if (rowValue !== undefined && rowTime >= globalTime) return rowValue;
    if (globalValue !== undefined) return globalValue;
    return fallback;
  };

  useEffect(() => {
    handleGlobalCategoryChange("");
    handleGlobalGradeChange("");
    handleGlobalBookTypeChange("");
    setLastGlobalChange({});
  }, [
    page,
    handleGlobalCategoryChange,
    handleGlobalGradeChange,
    handleGlobalBookTypeChange,
  ]);

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
        <Box sx={{ display: "flex", gap: 1 }}>
          <SearchBooks onSearch={handleSearch} loading={loading} />
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
                    value={globalCategory}
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
                    value={globalGrade}
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
                    value={globalBookType}
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
              currentPageBooks.map((book, index) => (
                <BookRow
                  key={book.id}
                  index={index}
                  book={book}
                  selected={selectedBookIds.includes(book.id)}
                  onSelect={() => {
                    handleSelectOne(book.id);
                  }}
                  category={getLatestValue(book.id, "category", "")}
                  grade={getLatestValue(book.id, "grade", book.gradeCode || "")}
                  bookType={getLatestValue(
                    book.id,
                    "bookType",
                    book.bookTypeCode || ""
                  )}
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
              ))
            )}
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
      </TableContainer>
      <CopyBook
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
        }}
        selectedBookIds={selectedBookIds}
        books={books}
        getLatestValue={getLatestValue}
      />
    </Box>
  );
};

export default BookTable;
