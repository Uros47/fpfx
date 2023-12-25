import useUsersContext from "@/context/UsersContext";
import {
  FormControl,
  Select,
  MenuItem,
  Box,
  InputLabel,
  Typography,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";

// const data = {
//   id: "2230978213987124057",
//   name: "Elise",
//   lastname: "Hebert",
//   profit: [80000, 50000, 130000, 70000, 120000, 45000],
//   loss: [-30000, -20000, -40000, -25000, -10000, -12000],
// };

// const chartData: any = [];

// // Looping through the profit and loss arrays to create objects for chart
// for (let i = 0; i < data.profit.length; i++) {
//   chartData.push({
//     id: i + 1,
//     profit: data.profit[i],
//     loss: data.loss[i],
//   });
// }

const OverviewChart = () => {
  //   const [selectedUser, setSelectedUser] = useState();

  const { tableData, fetchUserById, chartData, cardData } = useUsersContext();
  console.log(cardData, "card data");

  const handleChange = (event: SelectChangeEvent<string>) => {
    fetchUserById(event.target.value);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: "50px",
        }}
      >
        <Typography width="50%" variant="h4">
          Overview
        </Typography>

        <FormControl
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "50%",
            justifyContent: "end",
          }}
        >
          <Typography alignSelf="center" mr="5px">
            Select User
          </Typography>
          <Select
            sx={{ width: "35%" }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={handleChange}
            defaultValue=""
          >
            {tableData.length > 0 &&
              tableData.map((user: any) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <LineChart
          width={881}
          height={204}
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="id" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="profit" stroke="#8884d8" />
          <Line type="monotone" dataKey="loss" stroke="#82ca9d" />
        </LineChart>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            sx={{ width: "300px" }}
            label="Profit"
            id="outlined-read-only-input"
            value={
              cardData ? cardData.profit : "select user to display total profit"
            }
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            sx={{ input: { color: "red" } }}
            label="Loss"
            id="outlined-read-only-input"
            value={
              cardData ? cardData.loss : "select user to display total loss"
            }
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            sx={{ input: { color: "orange" } }}
            label="Balance"
            id="outlined-read-only-input"
            value={
              cardData ? cardData.balance : "select user to display balance"
            }
            InputProps={{
              readOnly: true,
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default OverviewChart;
