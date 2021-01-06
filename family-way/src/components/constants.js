import React, { useState,useEffect,useContext } from "react";
import { TextField, Grid, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {constantsContext} from '../contexts/constants/constantState';
import Animations from './loader'

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
   const {AddConstants , getConstant , constants}= useContext(constantsContext);
   
  const [high,setHigh]=useState('');
  const [low,setLow]=useState('');
  const [freeOrder,setfreeOrder]=useState('');
  const [midOrder,setMidOrder]=useState('');
  const [minimum,setMinimum]=useState('');
  const [pointsToMoney,setPointsToMoney]=useState('');
  const [mobile,setMobile]=useState('')
  const [daysForReturns,setdaysForReturns]=useState('')

  useEffect(() => {
     getConstant();
     // eslint-disable-next-line
  }, [])


  // handle submit
  const handleSubmit=(e)=>{
     e.preventDefault();
     AddConstants(high,low,freeOrder,midOrder,minimum,pointsToMoney,daysForReturns,mobile);
  }

  return (
    <React.Fragment>
      {constants !== null ?
      <form onSubmit={handleSubmit} >
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
                value={constants.deliveryPrice.high}
                onChange={(e)=>setHigh(e.target.value)}
                variant="outlined"
                label="السعر الاعلي"
              />
              <TextField
                className={classes.field}
                value={low}
                onChange={(e)=>setLow(e.target.value)}
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
                placeholder={constants.order.freeOrder}
                className={classes.field}
                value={constants.order.freeOrder}
                onChange={(e)=>setfreeOrder(e.target.value)}
                variant="outlined"
                label="الاوردر المجاني "
              />
              <TextField
                className={classes.field}
                value={constants.order.midOrder}
                onChange={(e)=>setMidOrder(e.target.value)}
                variant="outlined"
                label=" متوسط سعر لل اوردر"
              />
              <TextField
                className={classes.field}
                value={constants.order.minimum}
                onChange={(e)=>setMinimum(e.target.value)}
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
              value={constants.convertorMoney.pointsToMoney}
              onChange={(e)=>setPointsToMoney(e.target.value)}
              variant="outlined"
              label=" قيمه النقط "
            />
          </Grid>
          <Grid item>
            <TextField
              className={classes.field}
              value={constants.mobileNumber}
              onChange={(e)=>setMobile(e.target.value)}
              variant="outlined"
              label="  رقم الهاتف "
            />
          </Grid>
          <Grid item>
            <TextField
              className={classes.field}
              value={constants.daysForReturns}
              onChange={(e)=>setdaysForReturns(e.target.value)}
              variant="outlined"
              label="  ايام الرجوع "
            />
          </Grid>
          <Grid item>
            <Grid container justify="center">
              <Grid item>
                <Button variant="contained" className={classes.button} type="submit" >
                  تم
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form> :
      <Animations />
      }
    </React.Fragment>
  );
};

export default Constants;
