import React, { useState,useEffect,useContext } from "react";
import { TextField, Grid, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {constantsContext} from '../contexts/constants/constantState'

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
  
  const [high,setHigh]=useState('');
  const [low,setLow]=useState('');
  const [freeOrder,setfreeOrder]=useState('');
  const [midOrder,setMidOrder]=useState('');
  const [minimum,setMinimum]=useState('');
  const [pointsToMoney,setPointsToMoney]=useState('');


  const {AddConstants}= useContext(constantsContext); 
  
  // handle submit
  const handleSubmit=(e)=>{
     e.preventDefault();
     AddConstants(high,low,freeOrder,midOrder,minimum,pointsToMoney);
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
