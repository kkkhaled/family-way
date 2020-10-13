import React, { useState } from "react";
import {
  Grid,
  TextField,
  Typography,
  Switch,
  makeStyles,
} from "@material-ui/core";
import Moment from "react-moment";
import moment from "moment";

const useStyles = makeStyles({
  field: {
    width: "60em",
    marginTop: "10px",
    marginBottom: "10px",
  },
  font: {
    marginTop: "5px",
  },
  switch: {
    marginLeft: "10px",
  },
  head: {
    marginTop: "12px",
  },
});

const OrderTimes = () => {
  const classes = useStyles();

  const [state, setState] = useState({ isDisabled: false });

  const date = moment().add(3, "days").calendar({
    sameDay: "[اليوم]LTS",
    nextDay: "غدا",
    nextWeek: "dddd",
  });
  console.log(date);
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <React.Fragment>
      <form>
        <Grid container direction="column">
          <Grid item>
            <TextField
              variant="outlined"
              label="من"
              className={classes.field}
            />
          </Grid>
          <Grid item>
            <TextField
              variant="outlined"
              label="الي"
              className={classes.field}
            />
          </Grid>
          <Grid item>
            <TextField
              variant="outlined"
              label="اليوم"
              className={classes.field}
            />
          </Grid>
          <Grid container direction="row" justify="center">
            <Grid item>
              <Typography variant="h5" className={classes.font}>
                اغلاق
              </Typography>
            </Grid>
            <Grid item>
              <Switch
                className={classes.switch}
                checked={state.isDisabled}
                onChange={handleChange}
                color="primary"
                name="isDisabled"
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            </Grid>
          </Grid>
          <Grid item>
            <TextField
              variant="outlined"
              label="الحد المسموح في هذا الوقت "
              className={classes.field}
            />
          </Grid>
          <Grid item>
            <Typography variant="h5" className={classes.head}>
              اوقات التوصيل المتاحه التي تعتمد علي عدد الطلبات المطلوبه والسعر
              ايضا يعتمد علي الحد الذي وصل اليه المستخدم من طلبات
            </Typography>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
};

export default OrderTimes;
