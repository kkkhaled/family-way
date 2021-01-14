import React, { useState,useEffect,useContext } from "react";
import { TextField, Grid, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Alert } from "@material-ui/lab";
import {constantsContext} from '../contexts/constants/constantState';
import { authContext } from '../contexts/auth/authstate'
//import Animations from './loader'
import server from '../api/server'

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
   const { loadUser } = useContext(authContext)
   const {AddConstants}= useContext(constantsContext);

  const [alertData, setAlertData] = useState({ open: false });

  const [high,setHigh]=useState('');
  const [low,setLow]=useState('');
  const [freeOrder,setfreeOrder]=useState('');
  const [midOrder,setMidOrder]=useState('');
  const [minimum,setMinimum]=useState('');
  const [pointsToMoney,setPointsToMoney]=useState('');
  const [mobile,setMobile]=useState('')
  const [daysForReturns,setdaysForReturns]=useState('');

  useEffect(() => {
    loadUser();
         // eslint-disable-next-line
  }, [])

  useEffect(() => {
     server.get('/constants',{'headers': {
      'Authorization': 'Bearer ' + localStorage.token }}).then(res =>{
        //console.log(res)
        setHigh(res.data.deliveryPrice.high)
        setLow(res.data.deliveryPrice.low)
        setfreeOrder(res.data.order.freeOrder)
        setMidOrder(res.data.order.midOrder)
        setMinimum(res.data.order.minimum)
        setPointsToMoney(res.data.convertorMoney.pointsToMoney)
        setMobile(res.data.mobileNumber)
        setdaysForReturns(res.data.daysForReturns)
        }
        ).catch(err => console.log(err))
     // eslint-disable-next-line
  }, [])


  // handle submit
  const handleSubmit=(e)=>{
     e.preventDefault();
     AddConstants(high,low,freeOrder,midOrder,minimum,pointsToMoney,daysForReturns,mobile);
  }

  return (
    <React.Fragment>
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
                value={high}
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
                className={classes.field}
                value={freeOrder}
                onChange={(e)=>setfreeOrder(e.target.value)}
                variant="outlined"
                label="الاوردر المجاني "
              />
              <TextField
                className={classes.field}
                value={midOrder}
                onChange={(e)=>setMidOrder(e.target.value)}
                variant="outlined"
                label=" متوسط سعر لل اوردر"
              />
              <TextField
                className={classes.field}
                value={minimum}
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
              value={pointsToMoney}
              onChange={(e)=>setPointsToMoney(e.target.value)}
              variant="outlined"
              label=" قيمه النقط "
            />
          </Grid>
          <Grid item>
            <TextField
              className={classes.field}
              value={mobile}
              onChange={(e)=>setMobile(e.target.value)}
              variant="outlined"
              label="  رقم الهاتف "
            />
          </Grid>
          <Grid item>
            <TextField
              className={classes.field}
              value={daysForReturns}
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
      </form> 
     
    </React.Fragment>
  );
};

export default Constants;
