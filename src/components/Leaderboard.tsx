import React from "react";
import Search from "./Search";
import LeaderboardTable from "./LeaderboardTable";
import { Box, Typography, useTheme } from "@mui/material";

const Leaderboard = () => {
  const theme = useTheme();

  return (
    <>
      <Box sx={{ marginBottom: "10px" }}>
        <Typography variant="h4">Leaderboard</Typography>
      </Box>
      <Box display="flex" flexDirection="column">
        <LeaderboardTable />
      </Box>
    </>
  );
};

export default Leaderboard;
