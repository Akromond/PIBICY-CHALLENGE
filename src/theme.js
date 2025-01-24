import { createTheme } from "@mui/material/styles"

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2" // Blue
    },
    secondary: {
      main: "#dc004e" // Pink
    },
    background: {
      default: "#f5f5f5" // Light gray
    }
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600
    }
  }
})

export default theme
