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
  Paper,
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
import { useTheme } from "@mui/material/styles";

type SelectTypes = {
  id: string;
  name: string;
};

const OverviewChart = () => {
  const theme = useTheme();
  const { tableData, fetchUserById, chartData, cardData } = useUsersContext();

  const handleChange = (event: SelectChangeEvent<string>) => {
    fetchUserById(event.target.value);
  };

  return (
    <Box
      component={Paper}
      sx={{
        display: "flex",
        flexDirection: "column",
        marginTop: "50px",
        padding: "20px",
      }}
    >
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
            sx={{
              width: "35%",
              backgroundColor: theme.palette.background.default,
            }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={handleChange}
            defaultValue=""
          >
            {tableData.length > 0 &&
              tableData.map((user: SelectTypes) => (
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
          <InfoCard data={cardData?.profit} infoText="Profit" />
          <InfoCard
            data={cardData?.loss}
            textColor={theme.color.red}
            infoText="Loss"
          />
          <InfoCard
            data={cardData?.balance}
            textColor={theme.color.orange}
            infoText="Balance"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default OverviewChart;
