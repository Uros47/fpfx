import { createTheme } from "@mui/material";
import { orange, red } from "@mui/material/colors";

declare module "@mui/material/styles" {
  export interface Theme {
    color: {
      turquoise: string;
      red: string;
      orange: string;
      evenTableRow: string;
      oddTableRow: string;
    };
  }
  // allow configuration using `createTheme`
  export interface ThemeOptions {
    color?: {
      turquoise?: string;
      red?: string;
      orange?: string;
      evenTableRow?: string;
      oddTableRow?: string;
    };
  }
}

const theme = createTheme({
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: "#012030",
          borderRadius: "5px",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: "none",
          fontWeight: 600,
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          fontWeight: 700,
        },
      },
    },
  },
  typography: {
    fontFamily: "Open Sans",
    h5: {
      color: "#F2E3D5",
      fontWeight: 700,
    },
  },
  palette: {
    text: {
      primary: "#A9A29C",
    },
    mode: "dark",
    background: {
      default: "#012030",
      paper: "#003A47",
    },
  },
  color: {
    evenTableRow: "#012F39",
    oddTableRow: "#013440",
    turquoise: "#0FC2C0",
    red: "#FF3737",
    orange: "#F6742A",
  },
});
export default theme;
