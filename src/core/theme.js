import { DefaultTheme } from "react-native-paper";

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: "#4B3A2F",          // Warm brown for text
    primary: "#8B3E2F",       // Deep rust as the primary color
    secondary: "#5D3A1A",     // Dark walnut brown as secondary
    background: "#D2B48C",    // Tan background for a softer, warm feel
    surface: "#FAEBD7",       // Antique white for surfaces
    error: "#8B0000",         // Dark red for error messages
    placeholder: "#8A7D72",   // Subtle taupe for placeholder text
  },
};
