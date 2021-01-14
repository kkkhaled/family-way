import React,{useState,useContext, useEffect} from 'react';
import {Card,Grid,Typography,makeStyles} from '@material-ui/core';
import {couponsContext} from '../contexts/coupons/couponState'
import { authContext } from '../contexts/auth/authstate'
import Animations  from './loader' 


const useStyles = makeStyles((theme) => ({
     card : {
         width :"22em",
         marginBottom:"8px",
         marginLeft:"8px",
         marginRight:"8px",
     }
  }));

const CouponsView = () => {

    const classes=useStyles();
    const { loadUser } = useContext(authContext)
    const {coupons,getCoupons} = useContext(couponsContext);
    useEffect(()=>{
        getCoupons();
        loadUser();
    },
        // eslint-disable-next-line
    [])
    console.log(coupons);
    return (
        <React.Fragment>
            <Grid container direction="row">
                {coupons.length > 0 ?
                 coupons.map((coupon)=>
                  <Card className={classes.card} >
                      <Grid container alignItems="center" direction="column">
                          <Grid item>
                              <Typography variant="h4" color="primary" >
                                   {coupon.message}
                              </Typography>
                          </Grid>
                          <Grid item>
                              <Typography variant="h4" >
                                   {coupon.minimum}
                              </Typography>
                          </Grid>
                        </Grid>  
                  </Card>)
                :<Animations />}
            </Grid>
        </React.Fragment>
    )
}

export default CouponsView
