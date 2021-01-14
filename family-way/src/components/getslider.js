import React, { useState, useEffect, useContext } from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { Grid, Typography,  Button, Card , Divider } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import { makeStyles } from '@material-ui/core/styles'
import { sliderContext } from '../contexts/sliders/sliderstate'
import { authContext } from '../contexts/auth/authstate'
import Animations from './loader'
const useStyles = makeStyles(theme => ({
  button: {
    color: 'white',
    width: '20em',
    border: 8,
    marginTop: '20px',
    marginLeft: '20px'
  },
  buttondelete: {
    color: 'white',
    width: '1em',
    border: 8,
    marginTop: '5px',
    marginBottom: '10px',
    backgroundColor: theme.palette.red.light
  },
  card: {
    width: "22em",
    //height: "22em",
    border: 8,
    marginTop: "15px",
    marginBottom: "15px",
    marginLeft: "10px",
    marginRight: "10px",
  },
  img: {
    width: "20em",
    height: "13em",
    marginLeft: "5px",
    marginRight: "5px",
    marginTop: "5px",
  },
  title:{
    marginLeft:"6px",
    marginTop :"6px",
    marginBottom :"6px"
  },
  name : {
    marginRight:"6px",
    marginTop :"6px",
    marginBottom :"6px",
    color :theme.palette.red.light
  }
}))

const GetSlider = () => {
  const classes=useStyles();
  const { loadUser } = useContext(authContext)
  const { getslider, sliders, removeslider } = useContext(sliderContext)
  // const [productArr,setProductArr]=useState([]);
  // const [catagoriesArr,setCatagoriesArr]=useState([]);
  // const [NewArr, setNewArr] = useState([]);
  useEffect(() => {
    loadUser();
    getslider();
    // eslint-disable-next-line
  }, [])
   console.log(sliders);
   /*if(sliders.length > 0){
    // const arr1=sliders.filter((slider)=>slider.isProduct !== false);
     setProductArr(sliders.filter((slider)=>slider.isProduct !== undefined && slider.isProduct !== false));
   }
   console.log(productArr);*/
  return (
    <React.Fragment>
      <Typography variant='h4'>عرض سلايدرالاصناف</Typography>
      <Grid container direction="row">
            {sliders.length > 0  ?
            sliders.map((slider)=>(
              slider.isProduct=== false ?
              <Card 
              className={classes.card}
              key={slider._id}>
                <img 
                 className={classes.img}
                src={`https://familyway.sa/uploads/sliders/${slider.image}`}
                alt="sliderimg" 
                 />
                  <Grid container justify="space-between">
                   <Grid item>
                     <Typography variant="h4" className={classes.title}>
                         الترتيب 
                     </Typography>
                   </Grid>
                   <Grid item>
                     <Typography variant="h4" className={classes.name} >
                         {slider.sort} 
                     </Typography>
                   </Grid>
                 </Grid>
                 {/*
                 <Grid container justify="space-between">
                   <Grid item>
                     <Typography variant="h4" className={classes.title}>
                        اسم الصنف 
                     </Typography>
                   </Grid>
                   <Grid item>
                     <Typography variant="h4" className={classes.name} >
                         {slider.category.name} 
                     </Typography>
                   </Grid>
                 </Grid>*/}
                 <Grid container justify="center">
                   <Button variant="contained" 
                   className={classes.buttondelete} 
                   onClick={()=>removeslider(slider._id)} >
                     مسح
                   </Button>
                 </Grid>
              </Card>:""
            ))
            :<Animations />}
          </Grid> 
          <Divider />
          <Typography variant='h4'> عرض سلايدر المنتجات </Typography>
          <Grid container direction="row">
            {sliders.length > 0  ?
            sliders.map((slider)=>(
              slider.isProduct=== true ?
              <Card 
              className={classes.card}
              key={slider._id}>
                <img 
                 className={classes.img}
                src={`https://familyway.sa/uploads/sliders/${slider.image}`}
                alt="sliderimg" 
                 />
                  <Grid container justify="space-between">
                   <Grid item>
                     <Typography variant="h4" className={classes.title}>
                         الترتيب 
                     </Typography>
                   </Grid>
                   <Grid item>
                     <Typography variant="h4" className={classes.name} >
                         {slider.sort} 
                     </Typography>
                   </Grid>
                 </Grid>
                 <Grid container justify="center">
                   <Button variant="contained"
                    className={classes.buttondelete}
                    onClick={()=>removeslider(slider._id)}>
                     مسح
                   </Button>
                 </Grid>
              </Card>:""
            ))
            :<Animations />}
          </Grid> 
          <Divider />
          <Typography variant='h4'> عرض باقي السلايدر  </Typography>
          <Grid container direction="row">
            {sliders.length > 0  ?
            sliders.map((slider)=>(
              slider.isProduct=== undefined ?
              <Card 
              className={classes.card}
              key={slider._id}>
                <img 
                 className={classes.img}
                src={`https://familyway.sa/uploads/sliders/${slider.image}`}
                alt="sliderimg" 
                 />
                  <Grid container justify="space-between">
                   <Grid item>
                     <Typography variant="h4" className={classes.title}>
                         الترتيب 
                     </Typography>
                   </Grid>
                   <Grid item>
                     <Typography variant="h4" className={classes.name} >
                         {slider.sort} 
                     </Typography>
                   </Grid>
                 </Grid>
                 <Grid container justify="center">
                   <Button variant="contained"
                    className={classes.buttondelete}
                    onClick={()=>removeslider(slider._id)}>
                     مسح
                   </Button>
                 </Grid>
              </Card>:""
            ))
            :<Animations />}
          </Grid> 
          
    </React.Fragment>
  )
}

export default GetSlider
