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
    width: "55em",
    // height: "22em",
    border: 8,
    marginTop: "20px",
    marginBottom: "20px",
    //marginLeft: "10px",
    //marginRight: "10px",
  },
  head: {
    marginTop: "8px",
    marginLeft: "8px",
  },
  username: {
    color: theme.palette.gray,
    marginLeft: "8px",
    marginRight :"120px"
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


  const orderView=(
    <React.Fragment>
      <Grid container direction='column'>
        {orders.map((order)=>(
         <Grid item>
          <Card className={classes.card}>
           <Grid item>
             <Typography variant='h4'>
                 المستخدم
             </Typography>
           </Grid>
           <Grid container justify='flex-start'>
               <Grid item>
                 <Typography variant='h5' className={classes.username}  >
                    {order.user.name} 
                 </Typography>
                 </Grid> 
                 <Grid item>
                   <Typography variant='h5'>
                      {order.user.phone}
                   </Typography>
                 </Grid>
                 </Grid>
                  <Divider />
                <Grid item>
                   <Typography variant='h4'>
                     وقت الاوردر
                   </Typography>
                </Grid>
               <Grid container justify='flex-start'>
               <Grid item>
                 <Typography variant='h5' className={classes.username}  >
                    {order.ordertime.day} 
                 </Typography>
                 </Grid> 
                 <Grid item>
                   <Typography variant='h5'>
                      {order.ordertime.hours}
                   </Typography>
                 </Grid>
                 </Grid>
                  <Divider />
            </Card>
            </Grid>
        ))}
      </Grid> 
    </React.Fragment>
  )

  return (
    <React.Fragment>
       {orderView}
    </React.Fragment>
  );
};
export default Orders;
