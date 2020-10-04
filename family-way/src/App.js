import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ThemeProvider, makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppTheme from "./Theme";
import SideBar from "./components/sidebar";
import Addcatagiories from "./pages/addcatagiories";
import Getsubcatagiories from "./pages/getsubCatagories";
import RTL from "./components/rtl";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },

  content: {
    flexGrow: 1,
    margin: "0px 15px 0px 15px",
    // padding: "15px"
    // padding: theme.spacing(3),
  },
}));

export default function MiniDrawer() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={AppTheme}>
      <div className={classes.root}>
        <CssBaseline />
        <BrowserRouter>
          <RTL>
            <SideBar />
            <main className={classes.content}>
              <Switch>
                <Route
                  exact
                  path="/Addcatagiories"
                  component={Addcatagiories}
                />
                <Route
                  exact
                  path="/Getsubcatagiories"
                  component={Getsubcatagiories}
                />
              </Switch>
            </main>
          </RTL>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}
