import React from "react";
import Search from "./Search";
import LeaderboardTable from "./LeaderboardTable";
import { Box, Paper, SvgIcon, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import table_icon from "@/assets/icons/table_icon.svg";

const Leaderboard = () => {
  const theme = useTheme();

  return (
    <Box component={Paper} sx={{ padding: "20px" }}>
      <Box sx={{ marginBottom: "10px" }}>
        <Typography variant="h4">
          <Image src={table_icon} alt="cup_icon" height={23} /> Leaderboard
        </Typography>
      </Box>
      <Box display="flex" flexDirection="column">
        <LeaderboardTable />
      </Box>
    </Box>
  );
};

export default Leaderboard;
