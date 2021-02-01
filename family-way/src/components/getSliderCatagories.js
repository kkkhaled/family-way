import React, { useEffect, useContext,useState } from 'react'
import { Grid, Typography,  Button, Card , Divider , TextField} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Autocomplete from "@material-ui/lab/Autocomplete";
import { sliderContext } from '../contexts/sliderCatagories/sliderCatagoriesState'
import { thirdcatagoriesContext } from '../contexts/thirdcatagories/thirdState'
import { authContext } from '../contexts/auth/authstate'
import Alert from '@material-ui/lab/Alert';
import Animations from './loader'
const useStyles = makeStyles(theme => ({
  head: {
    marginTop: "20px",
    marginLeft: "10px",
  },
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
    width: 250,
    height: 130,
    marginLeft: "5px",
    marginRight: "5px",
    marginTop: "5px",
    objectFit:"cover"
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
  const { getAllThirdCatagories, thirdcatagories } = useContext(
    thirdcatagoriesContext
  )

  useEffect(() => {
    loadUser();
    getAllThirdCatagories();
    // eslint-disable-next-line
  }, [])
   console.log(sliders);
   console.log(thirdcatagories);
   
     // handle filter input
  const handleFilter = (event, item) => {
    if (item) {
      getslider(item._id);
    }
  }

  const sliderViews=(
    <React.Fragment>
      <Grid container direction='row'>
      {sliders.length > 0  ?
            sliders.map((slider)=>(
              <Card 
              className={classes.card}
              key={slider._id}>
                <img 
                 className={classes.img}
                src={`https://familyway.sa/uploads/sliderCategory/${slider.image}`}
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
                   onClick={()=>removeslider(slider._id)} >
                     مسح
                   </Button>
                 </Grid>
              </Card>
            )):
        <div style={{ margin: "15px 0px", width: "100%" }}><Alert severity="info">
        <Typography variant='h5'>
        ادخل الصنف الثالث من فضلك
        </Typography>
        </Alert>
        </div>}
      </Grid>
    </React.Fragment>
  )
   

  return (
    <React.Fragment>
            <Grid container direction="column">
        <Typography variant="h4" className={classes.head}>
          عرض الاصناف الفرعيه
        </Typography>
        <Grid item>
          <Autocomplete
            id="combo-box-demo"
            style={{ width: "100%", margin: '15px 0' }}
            options={thirdcatagories}
            getOptionLabel={(option) => option.name}
             onChange={handleFilter}
            renderInput={(params) => (
              <TextField
                {...params}
                label="اختر الصنف الثالث"
                variant="outlined"
              />
            )}
          />
        </Grid>
        {sliderViews}
      </Grid> 
    </React.Fragment>
  )
}

export default GetSlider
