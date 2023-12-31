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
  styled,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import React, { useEffect, useState } from "react";
import Search from "./Search";
import useUsersContext from "@/context/UsersContext";
import { TableData } from "@/types/Types";

const LeaderboardTable = () => {
  const theme = useTheme();

  const AlternateTableRow = styled(TableRow)(() => ({
    "&:nth-of-type(even)": {
      backgroundColor: theme.color.evenTableRow,
    },
    "&:nth-of-type(odd)": {
      backgroundColor: theme.color.oddTableRow,
    },
  }));

  let formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const {
    fetchUsersData,
    currentPage,
    rowsPerPage,
    sortOrder,
    sortColumn,
    searchData,
    setSearchData,
    handleChangePage,
    handleChangeRowsPerPage,
    handleSortRequest,
    tableData,
    totalCount,
    chartData,
  } = useUsersContext();

  useEffect(() => {
    fetchUsersData();
  }, [currentPage, rowsPerPage, sortOrder, sortColumn, searchData, chartData]);

  return (
    <>
      <Box alignSelf="end" sx={{ marginBottom: "10px" }}>
        <Search searchData={searchData} setSearchData={setSearchData} />
      </Box>
      {tableData.length > 0 ? (
        <>
          {" "}
          <TableContainer sx={{ maxHeight: "603px" }}>
            <Table stickyHeader aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell sortDirection={sortOrder}>
                    <TableSortLabel
                      active={true}
                      direction={sortOrder}
                      onClick={() => handleSortRequest("name")}
                    >
                      User
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>Profit</TableCell>
                  <TableCell>Loss</TableCell>
                  <TableCell>Balance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map((item: TableData) => (
                  <AlternateTableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{formatter.format(item.profit)}</TableCell>
                    <TableCell>{formatter.format(item.loss)}</TableCell>
                    <TableCell
                      style={{
                        color: `${
                          item.balance < 0
                            ? `${theme.color.red}`
                            : `${theme.color.turquoise}`
                        }`,
                      }}
                    >
                      {formatter.format(item.balance)}
                    </TableCell>
                  </AlternateTableRow>
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
      ) : (
        <Typography>No data to display.</Typography>
      )}
    </>
  );
};

export default LeaderboardTable;
