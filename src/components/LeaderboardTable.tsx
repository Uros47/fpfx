import {
  Box,
  Typography,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  TableBody,
  IconButton,
  TablePagination,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import Search from "./Search";

const cellTitles = ["User", "Profit", "Loss", "Balance"];

const LeaderboardTable = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [tableData, setTableData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [sortColumn, setSortColumn] = useState<string>("Date of creation");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchData, setSearchData] = useState<string>("");

  let formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const fetchUsersData = async () => {
    setIsLoading(true);
    try {
      const queryParams = `?q=${searchData}&_page=${
        currentPage + 1
      }&_limit=${rowsPerPage}&_sort=${
        sortColumn === "Date of creation" ? "createdAt" : sortColumn
      }&_order=${sortOrder}`;

      const users = await fetch(
        `${process.env.NEXT_PUBLIC_API}/users` + queryParams,
        {
          method: "GET",
        }
      );
      const totalCountHeader = users.headers.get("X-Total-Count");
      const totalCountValue = totalCountHeader
        ? parseInt(totalCountHeader, 10)
        : 0;

      const data = await users.json();

      // transform user data
      const transformedData = data.map((user: any) => {
        // converting from negative with Math.abs()
        const accLoss = Math.abs(
          user.loss.reduce((a: any, b: any) => a + b, 0)
        );
        const accProfit = user.profit.reduce((a: any, b: any) => a + b, 0);
        const balance = accProfit - accLoss;
        const transformedUserObject = {
          id: user.id,
          name: user.name + " " + user.lastname,
          loss: accLoss,
          profit: accProfit,
          balance: balance,
        };
        return transformedUserObject;
      });

      setTableData(transformedData);
      setUsers(data);
      setTotalCount(totalCountValue);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      throw new Error("Error fetching data:", error);
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  useEffect(() => {
    fetchUsersData();
  }, [currentPage, rowsPerPage, sortOrder, sortColumn, searchData]);

  const handleSortRequest = (column: string) => {
    const isAsc = sortColumn === column && sortOrder === "asc";
    setSortOrder(isAsc ? "desc" : "asc");
    setSortColumn(column);
  };

  return (
    <>
      <Box alignSelf="end" sx={{ marginBottom: "10px" }}>
        <Search searchData={searchData} setSearchData={setSearchData} />
      </Box>
      <TableContainer sx={{ maxHeight: "603px" }} component={Paper}>
        <Table
          sx={{
            margin: "0 auto",
            width: "1200px",
          }}
          stickyHeader
          aria-label="collapsible table"
        >
          <TableHead>
            <TableRow>
              {cellTitles.map((title: string, index: number) => (
                <TableCell
                  sx={{ fontWeight: 600 }}
                  key={index}
                  sortDirection={sortColumn === title ? sortOrder : false}
                >
                  {title !== "Date of creation" ? (
                    title
                  ) : (
                    <TableSortLabel
                      active={sortColumn === "Date of creation"}
                      direction={sortOrder}
                      onClick={() => handleSortRequest("Date of creation")}
                    >
                      {title}
                    </TableSortLabel>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.length > 0 &&
              tableData.map((item: any) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{formatter.format(item.profit)}</TableCell>
                  <TableCell>{formatter.format(item.loss)}</TableCell>
                  <TableCell style={{ color: `${item.balance < 0 && "red"}` }}>
                    {formatter.format(item.balance)}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15, 20]}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={currentPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default LeaderboardTable;
