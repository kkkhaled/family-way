import React from "react";
import { Grid, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  button: {
    width: "22em",
    color: "white",
    border: 5,
    marginTop: "8px",
    marginBottom: "15px",
  },

  input: {
    marginLeft: "10px",
    marginRight: "10px",
    width: "70em",
    marginBottom: "10px",
    marginTop: "40px",
  },
}));
const AddCatagiories = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <form>
        <Grid container direction="column">
          <Grid item>
            <TextField
              className={classes.input}
              variant="outlined"
              label="اخال اسم الصنف"
            />
          </Grid>
          <Grid container justify="center">
            <Grid item>
              <Button
                color="secondary"
                variant="contained"
                className={classes.button}
              >
                تم
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
};
export default AddCatagiories;
