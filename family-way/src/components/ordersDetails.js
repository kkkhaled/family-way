import React,{useState,useEffect,useContext} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Typography,
  Paper,
  Button,
  Card,
  Grid,
  Divider,
  Box,
  ListItemText
} from '@material-ui/core'
import { authContext } from '../contexts/auth/authstate';
import {ordersContext} from '../contexts/ordres/orderState';
import Animations from './loader';

const useStyle = makeStyles(theme => ({
    h5: {
        fontFamily: 'Releway',
        fontSize: '1.44rem',
        fontWeight: 600
      },
      h6 :{
        fontSize: '1.3rem',
        fontWeight: 'bold',
        color :"#6c5ce7"  
      },
      listtext :{
        fontSize: '25px',
        marginLeft:"10px",
        fontWeight :350
      },
      img : {
          width :"70px",
          height:"70px"
      },
      payment :{        
          fontSize: '20px',
          fontWeight :350

    }
}));

const OrdersDetails = () => {
    const classes = useStyle()
    const {loadUser } = useContext(authContext);
    const {currentOrder}=useContext(ordersContext);

    useEffect(() => {
       if(currentOrder !== null){
          console.log(currentOrder);
       }  
       loadUser();
        // eslint-disable-next-line
    }, [currentOrder,ordersContext]);
    return (
        <React.Fragment>
            {currentOrder !== null ?
            <Card>
                <Grid container direction="row">
                <Typography variant="h5" className={classes.h5}>
                    الطلب رقم {currentOrder.id}#
                </Typography>  
                <Typography variant="h5" className={classes.h5} style={{paddingRight:"9px"}}>
                    الحاله{currentOrder.status} 
                </Typography> 
                </Grid>
                <Divider />
                <Typography variant="h6" className={classes.h6}>
                    المنتجات
                </Typography> 
                <Box border={0.1}  borderColor="grey.500"  >
               <Grid container direction="row">
                  {currentOrder.items.map(item=>(
                     <Grid item>
                    <ListItemText 
                     className={classes.listtext}
                     key={item._id} >
                   - {item.title}
                      </ListItemText>
                      </Grid>
                   ))}
                   </Grid>

                   <Grid container direction="row">
                       {currentOrder.items.map(item=>(
                           <img 
                            key={item._id}
                           className={classes.img}
                            src={`https://familyway.sa/uploads/products/${item.image}`} 
                            alt="order img" />
                       ))}
                   </Grid>
                    </Box>
                <Box border={0.1}  borderColor="grey.500" style={{marginTop:5,padding:5}}  >
                <Typography variant="h6" className={classes.h6}>
                    وسيله الدفع
                </Typography>
                <Typography variant="h6" className={classes.payment}>
                    وسيله {currentOrder.paymentMethod}
                </Typography>
                </Box>
                <Box border={0.1}  borderColor="grey.500" style={{marginTop:5,padding:5}}  >
                <Typography variant="h6" className={classes.h6}>
                     اجمالي التكلفه
                </Typography>
                <Typography variant="h6" className={classes.payment}>
                     :المبلغ {currentOrder.totalCost}
                </Typography>
                </Box>
                <Box border={0.1}  borderColor="grey.500" style={{marginTop:5,padding:5}}  >
                <Typography variant="h6" className={classes.h6}>
                      ميعاد الوصول 
                </Typography>
                <Typography variant="h6" className={classes.payment}>
                      {currentOrder.arriveAt}
                </Typography>
                </Box>
            </Card> :
            <Animations /> }
        </React.Fragment>
    )
}

export default OrdersDetails
