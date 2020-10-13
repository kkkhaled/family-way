import React, { useState } from "react";
import {
  Grid,
  Button,
  Typography,
  Card,
  Divider,
  makeStyles,
} from "@material-ui/core";
import order1 from "../assets/images/order1.webp";
import order3 from "../assets/images/order3.jpg";

const useStyles = makeStyles((theme) => ({
  card: {
    width: "22em",
    // height: "22em",
    border: 8,
    marginTop: "20px",
    marginBottom: "20px",
    marginLeft: "10px",
    marginRight: "10px",
  },
  head: {
    marginTop: "8px",
    marginLeft: "8px",
  },
  username: {
    color: theme.palette.gray,
    marginLeft: "11px",
    marginTop: "8px",
    marginBottom: "8px",
  },
  phone: {
    color: theme.palette.gray,
    marginLeft: "50px",
    marginTop: "8px",
    marginBottom: "8px",
  },
  hours: {
    color: theme.palette.gray,
    marginLeft: "100px",
    marginTop: "8px",
    marginBottom: "8px",
  },
  img: {
    marginLeft: "11px",
    marginRight: "8px",
    marginBottom: "5px",
    marginTop: "5px",
    height: "85px",
    width: "85px",
  },
  allproducts: {
    marginTop: "8px",
    marginBottom: "8px",
    marginLeft: "60px",
  },
  driver: {
    marginTop: "8px",
    marginBottom: "8px",
    marginLeft: "114px",
  },
  allprices: {
    marginTop: "8px",
    marginBottom: "8px",
    marginLeft: "106px",
  },
  button: {
    color: "white",
    backgroundColor: theme.palette.green.main,
    width: "10em",
    height: "2.4em",
    marginTop: "12px",
    marginLeft: "8px",
    marginRight: "5px",
    marginBottom: "8px",
  },
  delbutton: {
    color: "white",
    backgroundColor: theme.palette.secondary.main,
    width: "10em",
    height: "2.4em",
    marginTop: "12px",
    marginLeft: "8px",
    marginRight: "5px",
    marginBottom: "8px",
  },
}));
const Orders = () => {
  const classes = useStyles();
  const [orders, setOrders] = useState([
    {
      user: { name: "عمر عاطف", phone: 5487448784444 },
      ordertime: { day: "اليوم", hours: "12 ص - 9 م" },
      payment: "عند الاستلام",
      products: { img: order3, count: 20 },
      prices: { allproducts: 22, driver: 10, allprices: 32 },
    },
    {
      user: { name: "عمر عاطف", phone: 5487448784444 },
      ordertime: { day: "اليوم", hours: "12 ص - 9 م" },
      payment: "عند الاستلام",
      products: { img: order1, count: 20 },
      prices: { allproducts: 22, driver: 10, allprices: 32 },
    },
    {
      user: { name: "عمر عاطف", phone: 5487448784444 },
      ordertime: { day: "اليوم", hours: "12 ص - 9 م" },
      payment: "عند الاستلام",
      products: { img: order1, count: 20 },
      prices: { allproducts: 22, driver: 10, allprices: 32 },
    },
    {
      user: { name: "عمر عاطف", phone: 5487448784444 },
      ordertime: { day: "اليوم", hours: "12 ص - 9 م" },
      payment: "عند الاستلام",
      products: { img: order1, count: 20 },
      prices: { allproducts: 22, driver: 10, allprices: 32 },
    },
    {
      user: { name: "عمر عاطف", phone: 5487448784444 },
      ordertime: { day: "اليوم", hours: "12 ص - 9 م" },
      payment: "عند الاستلام",
      products: { img: order1, count: 20 },
      prices: { allproducts: 22, driver: 10, allprices: 32 },
    },
    {
      user: { name: "عمر عاطف", phone: 5487448784444 },
      ordertime: { day: "اليوم", hours: "12 ص - 9 م" },
      payment: "عند الاستلام",
      products: { img: order1, count: 20 },
      prices: { allproducts: 22, driver: 10, allprices: 32 },
    },
    {
      user: { name: "عمر عاطف", phone: 5487448784444 },
      ordertime: { day: "اليوم", hours: "12 ص - 9 م" },
      payment: "عند الاستلام",
      products: { img: order1, count: 20 },
      prices: { allproducts: 22, driver: 10, allprices: 32 },
    },
  ]);
  return (
    <React.Fragment>
      <Grid container direction="row">
        {orders.map((order) => (
          <Grid item>
            <Card className={classes.card}>
              <Grid container direction="column">
                <Grid item>
                  <Typography variant="h4" className={classes.head}>
                    المستخدم
                  </Typography>
                </Grid>
                <Grid item>
                  <Grid container direction="row">
                    <Grid item>
                      <Typography variant="h5" className={classes.username}>
                        {order.user.name}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="h5" className={classes.phone}>
                        {order.user.phone}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Divider />
                <Grid item>
                  <Typography variant="h4" className={classes.head}>
                    وقت الاوردر
                  </Typography>
                </Grid>
                <Grid item>
                  <Grid container direction="row">
                    <Grid item>
                      <Typography variant="h5" className={classes.username}>
                        {order.ordertime.day}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="h5" className={classes.hours}>
                        {order.ordertime.hours}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Divider />
                <Grid item>
                  <Typography variant="h4" className={classes.head}>
                    طريقه الدفع
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h5" className={classes.username}>
                    {order.payment}
                  </Typography>
                </Grid>
                <Divider />
                <Grid item>
                  <Typography variant="h4" className={classes.head}>
                    المنتجات
                  </Typography>
                </Grid>
                <Grid item>
                  <img
                    src={order.products.img}
                    alt="order imgs"
                    className={classes.img}
                  />
                </Grid>
                <Divider />
                <Grid item>
                  <Typography variant="h4" className={classes.head}>
                    الاسعار
                  </Typography>
                </Grid>
                <Grid item>
                  <Grid container direction="row">
                    <Grid item>
                      <Typography variant="h5" className={classes.username}>
                        جميع المنتجات
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="h5" className={classes.allproducts}>
                        {order.prices.allproducts}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container direction="row">
                    <Grid item>
                      <Typography variant="h5" className={classes.username}>
                        السواق
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="h5" className={classes.driver}>
                        {order.prices.driver}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container direction="row">
                    <Grid item>
                      <Typography variant="h5" className={classes.username}>
                        الاجمالي
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="h5" className={classes.allprices}>
                        {order.prices.allprices}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Divider />
                <Grid item>
                  <Grid container direction="row">
                    <Grid item>
                      <Button variant="contained" className={classes.delbutton}>
                        <Typography variant="h5">رفض</Typography>
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button variant="contained" className={classes.button}>
                        <Typography variant="h5"> تم التجهيز</Typography>
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
};
export default Orders;
