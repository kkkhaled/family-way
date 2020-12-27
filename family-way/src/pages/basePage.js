import React from "react";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core";
import SideBar from '../components/sidebar'

const Styles = makeStyles((theme) => ({
  page: {
    background: "transparent",
    padding: "10px",
  },
  
}));
const BasePage = ({ pageTitle, ...props }) => {
  const classes = Styles();
  return (
    <Box>
       <SideBar />
      <h1>{pageTitle}</h1>
      <Paper elevation={0} className={classes.page}>
        {props.children}
      </Paper>
    </Box>
  );
};

export default BasePage;
