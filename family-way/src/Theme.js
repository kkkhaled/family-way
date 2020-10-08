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
  typography: {
    tab: {
      // fontFamily: "Raleway",
      textTransform: "none",
      fontWeight: 700,
      fontSize: "1rem",
    },
    h3: {
      fontFamily: "Pacifico",
      fontSize: "2.5rem",
    },
    h4: {
      fontFamily: "Releway",
      fontSize: "1.85rem",
      fontWeight: 700,
    },
    h5: {
      fontFamily: "Releway",
      fontSize: "1.34rem",
      fontWeight: 700,
    },
  },
});

export default AppTheme;
