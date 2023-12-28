import React, { createContext, useContext, useState } from "react";
import { CardData, TableData, UsersType } from "@/types/Types";

interface UsersContextInterface {
  //   user: UsersType;
  //   setUser: (user: UsersType) => void;
  users: UsersType[] | null;
  searchData: string;
  setSearchData: (searchData: string) => void;
  tableData: TableData[];
  setTableData: (tableData: any) => void;
  setUsers: (users: UsersType[]) => void;
  fetchUserById: (id: string) => void;
  fetchUsersData: () => void;
  currentPage: number;
  rowsPerPage: number;
  totalCount: number;
  handleChangePage: (event: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setCurrentPage: (currentPage: number) => void;
  setRowsPerPage: (rowsPerPage: number) => void;
  handleSortRequest: (column: string) => void;
  sortOrder: any;
  setSortOrder: (prop: any) => void;
  sortColumn: any;
  setSortColumn: (prop: any) => void;
  chartData: any;
  cardData: CardData | undefined;
  setCardData: (data: CardData) => void;
}

const UsersContext = createContext<UsersContextInterface>(
  {} as UsersContextInterface
);

interface UsersContextProps {
  children: React.ReactNode;
}

export default function useUsersContext() {
  return useContext(UsersContext);
}

export const UserContextProvider = ({ children }: UsersContextProps) => {
  const [users, setUsers] = useState<UsersType[]>([]);
  const [tableData, setTableData] = useState<TableData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [sortColumn, setSortColumn] = useState<string>();
  const [searchData, setSearchData] = useState<string>("");
  const [chartData, setChartData] = useState<string>("");
  const [cardData, setCardData] = useState<CardData | undefined>();

  const fetchUsersData = async () => {
    try {
      const queryParams = `?q=${searchData}&_page=${
        currentPage + 1
      }&_limit=${rowsPerPage}&_sort=${sortColumn}&_order=${sortOrder}`;

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
      const transformedData = data.map((user: UsersType) => {
        // converting from negative with Math.abs()
        const accLoss = Math.abs(
          user.loss.reduce((a: number, b: number) => a + b, 0)
        );
        const accProfit = user.profit.reduce(
          (a: number, b: number) => a + b,
          0
        );
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
    } catch (error: any) {
      throw new Error("Error fetching data:", error);
    }
  };

  const fetchUserById = async (id: string) => {
    try {
      const user = await fetch(`${process.env.NEXT_PUBLIC_API}/users/${id}`, {
        method: "GET",
      });
      const data = await user.json();

      const accLoss = Math.abs(
        data.loss.reduce((a: number, b: number) => a + b, 0)
      );
      const accProfit = data.profit.reduce((a: number, b: number) => a + b, 0);
      const balance = accProfit - accLoss;
      const transformedUserObject = {
        loss: accLoss,
        profit: accProfit,
        balance: balance,
      };
      setCardData(transformedUserObject);

      const chartDataArr: any = [];

      // Looping through the profit and loss arrays to create objects for chart
      for (let i = 0; i < data.profit.length; i++) {
        chartDataArr.push({
          id: i + 1,
          profit: data.profit[i],
          loss: data.loss[i],
        });
      }
      setChartData(chartDataArr);
    } catch (error: any) {
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

  const handleSortRequest = (column: string) => {
    const isAsc = sortColumn === column && sortOrder === "asc";
    setSortOrder(isAsc ? "desc" : "asc");
    setSortColumn(column);
  };
  return (
    <UsersContext.Provider
      value={{
        users,
        fetchUserById,
        setUsers,
        tableData,
        setTableData,
        fetchUsersData,
        handleChangePage,
        handleChangeRowsPerPage,
        currentPage,
        rowsPerPage,
        setRowsPerPage,
        setCurrentPage,
        totalCount,
        handleSortRequest,
        sortOrder,
        sortColumn,
        setSortOrder,
        setSortColumn,
        searchData,
        setSearchData,
        chartData,
        cardData,
        setCardData,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};
