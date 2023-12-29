import {
  Box,
  IconButton,
  InputBase,
  Paper,
  TextField,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

type SearchTypes = {
  searchData: string | null;
  setSearchData: (data: string) => void;
};
const Search = ({ searchData, setSearchData }: SearchTypes) => {
  const theme = useTheme();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchData(event.target.value);
  };

  return (
    <Box
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: 400,
        backgroundColor: theme.palette.background.default,
        borderRadius: "5px",
      }}
    >
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase
        type="text"
        name="search"
        sx={{
          ml: 1,
          flex: 1,
        }}
        placeholder="Search by user..."
        inputProps={{ "aria-label": "search by user" }}
        onChange={handleChange}
      />
    </Box>
  );
};

export default Search;
