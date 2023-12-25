import React from "react";
import Search from "./Search";
import LeaderboardTable from "./LeaderboardTable";
import { Box, Typography } from "@mui/material";

const Leaderboard = () => {
  return (
    <div>
      <Box sx={{ marginBottom: "10px" }}>
        <Typography variant="h4">Leaderboard</Typography>
      </Box>
      <Box display="flex" flexDirection="column">
        <LeaderboardTable />
      </Box>
    </div>
  );
};

export default Leaderboard;
