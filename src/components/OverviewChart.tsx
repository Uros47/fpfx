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
import InfoCard from "./InfoCard";
import { UsersType } from "@/types/Types";

const OverviewChart = () => {
  const { tableData, fetchUserById, chartData, cardData } = useUsersContext();

  const handleChange = (event: SelectChangeEvent<string>) => {
    fetchUserById(event.target.value);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", marginTop: "50px" }}>
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
              tableData.map((user: UsersType) => (
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
          height={250}
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
          <InfoCard
            data={cardData ? cardData.profit : undefined}
            infoText="Profit"
          />
          <InfoCard
            data={cardData ? cardData.loss : undefined}
            textColor="red"
            infoText="Loss"
          />
          <InfoCard
            data={cardData ? cardData.balance : undefined}
            textColor="orange"
            infoText="Balance"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default OverviewChart;
