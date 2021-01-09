import React, { useState , useContext,useEffect } from "react";
import {
  Grid,
  TextField,
  Typography,
  Switch,
  makeStyles,
  Button,
  Divider,
  Card,
  IconButton
} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import moment from "moment";
import {ordertimesContext} from '../contexts/orderTimes/ordertimeState'

const useStyles = makeStyles(theme=>(({
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
    marginLeft:"10px"
  },
  button: {
    width: '17em',
    color: 'white',
    border: 5,
    marginTop: '8px',
    marginBottom: '15px',
    marginRight :"120px",
    backgroundColor: theme.palette.green.main
  },
  title :{
    color:theme.palette.primary.main,
    marginLeft:"4px" 
  },
  card :{
    width : "280px",
    marginLeft:"8px",
    marginRight :"8px",
    marginBottom :"8px",
    marginTop :"8px" 
  },
  fromtitle:{
    marginLeft :"6px"
  },
  from :{
    color :"#95a5a6"
  },
  to :{
    color :"#95a5a6",
    marginRight:"42px" 
  },
   status :{
     marginTop :"3px",
     marginBottom :"3px",
     color : theme.palette.green.main,
     marginLeft:"4px"
   },
   maxtitle:{
     marginLeft:"4px",
     marginTop :"3px",
     marginBottom :"3px",
   },
   editIcon :{
     marginRight:"35px",
     backgroundColor:theme.palette.yellow.main,
}
  })))


const OrderTimes = () => {
  const classes = useStyles();
  // define context with state and func
   const {ordertimes,getOrderstime,addNewtime,EditOrdertime,removetime} = useContext(ordertimesContext)
   
  const [state, setState] = useState({ isDisabled: false });
  const [from,setFrom] = useState("");
  const [to,setTo]=useState("");
  const [day,setDay]= useState("");
  const [maxCount, setMaxCount] = useState("");
  const [data,setData]=useState([
    {
      value: {
          from: "9ص",
          to: "12م"
      },
      isDisabled: false,
      currentCount: 11,
      day: 1,
      maxCount: 50,
  },
  {
      value: {
          from : "12م",
          to: "3م"
      },
      isDisabled: false,
      currentCount: 2,
      day: 2,
      maxCount: 50,
  },
  {
      value: {
          from: "3م",
          to: "6م"
      },
      isDisabled: true,
      currentCount: 26,
      day: 2,
      maxCount: 50,
  },
  {
      value: {
          from: "3م",
          to: "6م"
      },
      isDisabled: true,
      currentCount: 2,
      day: 3,
      maxCount: 50,
  },
  {
      value: {
          from: "3م",
          to: "6م"
      },
      isDisabled: true,
      currentCount: 8,
      day: 3,
      maxCount: 50,
  },
  {
      value: {
          from: "6م",
          to: "12م"
      },
      isDisabled: true,
      currentCount: 37,
      day: 2,
      maxCount: 50,
  },
  {
      value: {
          from: "9",
          to: "12ص"
      },
      isDisabled: false,
      currentCount: 50,
      day: 1,
      maxCount: 50,
  }
  ])   

  const date = moment().add(3, "days").calendar({
    sameDay: "[اليوم]LTS",
    nextDay: "غدا",
    nextWeek: "dddd",
  });
  //console.log(date);
   
  useEffect(() => {
     getOrderstime();
    // eslint-disable-next-line
  }, [])
   
  console.log(ordertimes);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleSubmit=(e)=>{
    e.preventDefault();
    addNewtime(from,to,day,state.isDisabled,maxCount);
  }
  
  const ordertimesView=(
    <React.Fragment>
       <Grid container direction="row">
        <Grid container>
          <h2 className={classes.title}>اليوم</h2>
        </Grid>
        {data.map(item=>(
          <Grid item>
            <Card className={classes.card}>
              <Grid container justify="space-between">
                <Grid item>
                  <Typography variant="h4" className={classes.fromtitle}>
                        من  
                  </Typography>
                </Grid>
                <Grid item>
                <Typography variant="h5"  className={classes.from} >{item.value.from}</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h4">
                  الي
                  </Typography>
                </Grid>
                <Grid item>
                   <Typography variant="h5" className={classes.to}>
                     {item.value.to}
                   </Typography>
                </Grid>
              </Grid>
              <Grid item>
                  {item.isDisabled ? <Typography variant="h4" className={classes.status} >متاح الان</Typography> 
                  :<Typography variant="h4" className={classes.status}>غير متاح</Typography>
                  }
              </Grid>
              <Grid container justify="space-between">
                <Grid item>
                  <Typography variant="h4" className={classes.maxtitle} >
                    الحد الاقصي
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h5" className={classes.to}>
                    {item.maxCount}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container justify="space-between">
                <Grid item>
                  <Typography variant="h4" className={classes.maxtitle}>
                  المستخدم حاليا
                  </Typography>
                </Grid> 
                <Grid item>
                  <Typography variant="h5" className={classes.to} >
                     {item.currentCount}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container justify="space-between">
                <Grid item>
                  <Typography variant="h4"className={classes.maxtitle}>
                    التعديل
                  </Typography>
                </Grid>
                <Grid item>
                    <EditIcon className={classes.editIcon} />
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
      <form onSubmit={handleSubmit}>
        <Grid container direction="column">
          <Grid item>
            <TextField
              variant="outlined"
              label="من"
              className={classes.field}
              onChange={(e)=> setFrom(e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              variant="outlined"
              label="الي"
              className={classes.field}
              onChange={(e)=> setTo(e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              variant="outlined"
              label="اليوم"
              className={classes.field}
              onChange={(e)=>setDay(e.target.value)}
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
              onChange={(e)=>setMaxCount(e.target.value)}
            />
          </Grid>
          <Grid container justify='center'>
          <Grid item>
            <Button type="submit" variant="contained" className={classes.button} >تم</Button>
          </Grid>
        </Grid>
        </Grid>
      </form>
     <Divider />
      {ordertimesView}
    </React.Fragment>
  );
};

export default OrderTimes;
