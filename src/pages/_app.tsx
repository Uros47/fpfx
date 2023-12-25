import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@emotion/react";
import theme from "@/theme";
import { AppCacheProvider } from "@mui/material-nextjs/v14-pagesRouter";
import { UserContextProvider } from "@/context/UsersContext";

export default function App({ Component, pageProps }: AppProps, props: any) {
  return (
    // <AppCacheProvider {...props}>
    //   <ThemeProvider theme={theme}>
    <UserContextProvider>
      <Component {...pageProps} />
    </UserContextProvider>
    //   </ThemeProvider>
    // </AppCacheProvider>
  );
}
