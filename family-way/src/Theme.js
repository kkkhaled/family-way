import { createMuiTheme } from "@material-ui/core/styles";

const AppTheme = createMuiTheme({
  direction: "rtl",
  palette: {
    primary: {
      main: "#03A9F4",
    },
    secondary: {
      main: "#E91E63",
    },
    background: {
      main: "#ecf0f1",
    },
  },
});

export default AppTheme;
