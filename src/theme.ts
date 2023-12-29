import { createTheme } from "@mui/material";
import { orange, red } from "@mui/material/colors";

declare module "@mui/material/styles" {
  export interface Theme {
    color: {
      turquoise: string;
      red: string;
      orange: string;
    };
  }
  // allow configuration using `createTheme`
  export interface ThemeOptions {
    color?: {
      turquoise?: string;
      red?: string;
      orange?: string;
    };
  }
}

const theme = createTheme({
  typography: {
    fontFamily: "Open Sans",
    h4: {
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
    turquoise: "#0FC2C0",
    red: "#FF3737",
    orange: "#F6742A",
  },
});
export default theme;
