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
    borderColor:"#dfe6e9",
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
   hours: {
    marginLeft: "55px",
      },
      spacer:{
        marginLeft:"5px",
        marginTop:"5px",
        marginBottom :"5px"
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
    marginTop: "5px",
    marginBottom: "5px",
  },
    driverValue:{
    marginLeft: "57px",
    marginTop: "5px",
    marginBottom: "5px",
  },
  allprices: {
    marginLeft: "49px",
    color :theme.palette.red.dark
  },
  button: {
    color: "white",
    backgroundColor: theme.palette.green.main,
    width: "10em",
    height: "2.4em",
    marginRight: "15px",
   marginBottom:"8px",
   marginTop:"5px"
  },
  delbutton: {
    color: "white",
    backgroundColor: theme.palette.secondary.main,
    width: "10em",
    height: "2.4em",
    marginBottom:"8px",
   marginTop:"5px",
   marginRight: "15px",
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
             <Typography variant='h4' className={classes.spacer}>
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
                   <Typography variant='h4' className={classes.spacer}>
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
                   <Typography variant='h5'className={classes.hours}>
                      {order.ordertime.hours}
                   </Typography>
                 </Grid>
                 </Grid>
                  <Divider />
                  <Grid item>
                    <Typography variant="h4" className={classes.spacer} >
                    طريقه الدفع 
                    </Typography>
                  </Grid>
                  <Grid item>
                  <Typography variant='h5' className={classes.username}>
                      {order.payment}
                   </Typography> 
                  </Grid>
                  <Divider />
                  <Grid item>
                    <Typography variant="h4" className={classes.spacer} >
                         المنتجات 
                    </Typography>
                  </Grid>
                  <Grid item>
                    <img src={order.products.img} alt="jg" className={classes.img}/>
                  </Grid>
                  <Divider />
                  <Grid item>
                    <Typography variant="h4" className={classes.spacer} >
                         الاسعار 
                    </Typography>
                  </Grid>
                  <Grid container>
                  <Grid item>
                 <Typography variant='h5' className={classes.username}  >
                     جميع المنتجات
                 </Typography>
                 </Grid> 
                 <Grid item>
                   <Typography variant='h5'className={classes.allproducts}>
                      {order.prices.allproducts}
                   </Typography>
                 </Grid>
                  </Grid>  
                   <Grid container>
                  <Grid item>
                 <Typography variant='h5' className={classes.username}  >
                      السواق
                 </Typography>
                 </Grid> 
                 <Grid item>
                   <Typography variant='h5'className={classes.driverValue}>
                      {order.prices.driver}
                   </Typography>
                 </Grid>
                  </Grid>
                  <Grid container>
                  <Grid item>
                 <Typography variant='h5' className={classes.username}  >
                     الاجمالي
                 </Typography>
                 </Grid> 
                 <Grid item>
                   <Typography variant='h5'className={classes.allprices}>
                      {order.prices.allprices}
                   </Typography>
                 </Grid>
                  </Grid>
               <Divider />
               <Grid container justify='flex-end' direction="row">
                 <Grid item>
                   <Button variant="contained" className={classes.button}>
                      تم التجهيز
                   </Button>
                   </Grid>
                   <Grid item>
                   <Button variant="contained" className={classes.delbutton}>
                     رفض
                   </Button>
                   </Grid>
               </Grid>
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
