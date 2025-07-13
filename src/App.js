import "./App.css";
import Weather from "./Weather";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: "IBM",
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Weather />
      </ThemeProvider>
    </div>
  );
}

export default App;
