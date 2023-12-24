import React from "react";
import Search from "./Search";
import LeaderboardTable from "./LeaderboardTable";
import { Box, Typography } from "@mui/material";

const Leaderboard = () => {
  return (
    <div className="leaderboard-section">
      <Box>
        <Typography variant="h4">Leaderboard</Typography>
      </Box>
      <Box>
        <LeaderboardTable />
      </Box>
    </div>
  );
};

export default Leaderboard;
