import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";

const Styles = makeStyles((theme) => ({
  section: {
    background: "white",
    padding: "10px",
    margin: "20px 0",
  },
}));
const Section = ({ ...props }) => {
  const classes = Styles();
  return (
    <Paper elevation={1} className={classes.section}>
      {props.children}
    </Paper>
  );
};

export default Section;
