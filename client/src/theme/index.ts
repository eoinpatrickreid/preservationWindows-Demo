// src/theme/index.ts
import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const styles = {
  global: {
    "html, body": {
      backgroundColor: "#B5C9BD", // Your desired background color
      color: "gray.800", // Default text color
      margin: 0,
      padding: 0,
      boxSizing: "border-box",
      fontFamily: "system-ui, sans-serif",
    },
    "*::selection": {
      backgroundColor: "teal.200",
      color: "white",
    },
  },
};

const theme = extendTheme({ config, styles });

export default theme;
