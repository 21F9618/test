import { DefaultTheme } from "react-native-paper";

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: "#EAE0C8",           // Licorice for text color
    primary: "#B2AC88",        // Atomic tangerine for primary color (for warmth and brightness)
    secondary: "#A47355",      // Chamoisee as a secondary color (complementary earthy tone)
    background: "#0A0A0A",
    surface: "#FAEBD7",        // Antique white for surface (from your original selection)
    error: "#8B0000",          // Dark red for error messages (unchanged)
    placeholder: "#8A7D72",
    sageGreen:"#B2AC88",
    pearlWhite:'#EAE0C8',
    ivory:'#FFFFF0'
  },
};
