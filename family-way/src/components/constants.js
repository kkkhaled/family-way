import React, { useState } from "react";
import { TextField, Grid, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  font: {
    marginLeft: "10px",
    marginTop: "10px",
  },
  field: {
    width: "22em",
    marginLeft: "12px",
    marginRight: "25px",
    marginTop: "15px",
    marginBottom: "15px",
  },
  button: {
    color: "white",
    width: "22em",
    marginBottom: "15px",
    backgroundColor: theme.palette.green.main,
  },
}));

const Constants = () => {
  const classes = useStyles();
  const [deliveryPrice, setDeliveryPrice] = useState({ high: 15, low: 10 });
  const [order, setOrder] = useState({
    freeOrder: 100,
    midOrder: 70,
    minimumOrder: 40,
  });
  const [converterMoney, setConverterMoney] = useState({ pointsToMoney: 6 });

  return (
    <React.Fragment>
      <form>
        <Grid container direction="column">
          <Grid item>
            <Typography variant="h4" className={classes.font}>
              سعر التوصيل
            </Typography>
          </Grid>
          <Grid item>
            <Grid container direction="row">
              <TextField
                className={classes.field}
                value={deliveryPrice.high}
                variant="outlined"
                label="السعر الاعلي"
              />
              <TextField
                className={classes.field}
                value={deliveryPrice.low}
                variant="outlined"
                label="السعر الاقل"
              />
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="h4" className={classes.font}>
              الطلبات
            </Typography>
          </Grid>
          <Grid item>
            <Grid container direction="row">
              <TextField
                className={classes.field}
                value={order.freeOrder}
                variant="outlined"
                label="الاوردر المجاني "
              />
              <TextField
                className={classes.field}
                value={order.midOrder}
                variant="outlined"
                label=" متوسط سعر لل اوردر"
              />
              <TextField
                className={classes.field}
                value={order.minimumOrder}
                variant="outlined"
                label=" اقل سعر لل اوردر   "
              />
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="h4" className={classes.font}>
              النقط المحوله
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              className={classes.field}
              value={converterMoney.pointsToMoney}
              variant="outlined"
              label=" قيمه النقط "
            />
          </Grid>
          <Grid item>
            <Grid container justify="center">
              <Grid item>
                <Button variant="contained" className={classes.button}>
                  تم
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
};

export default Constants;
