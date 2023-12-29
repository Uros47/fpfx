import { createTheme } from "@mui/material";
import { orange, red } from "@mui/material/colors";

declare module "@mui/material/styles" {
  export interface Theme {
    color: {
      red: string;
      orange: string;
    };
  }
  // allow configuration using `createTheme`
  export interface ThemeOptions {
    color?: {
      red?: string;
      orange?: string;
    };
  }
}

const theme = createTheme({
  color: {
    red: red[500],
    orange: orange[500],
  },
});
export default theme;
