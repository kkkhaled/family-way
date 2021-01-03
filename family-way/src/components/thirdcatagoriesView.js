import React, { useState,useEffect,useContext } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  Grid,
  Card,
  Typography,
  TextField,
  Button,
  Divider,
} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from "@material-ui/core/styles";
import {thirdcatagoriesContext} from '../contexts/thirdcatagories/thirdState';
import {subcatagoriesContext} from '../contexts/subcatagories/subcatagoriesState';

const useStyles = makeStyles((theme) => ({
  card: {
    width: "22em",
    height: "18em",
    border: 8,
    marginTop: "20px",
    marginBottom: "20px",
    marginLeft: "10px",
    marginRight: "10px",
  },
  img: {
    width: "10em",
    height: "8em",
    marginTop: "15px",
    marginLeft: "5.5em",
  },
  font: {
    marginLeft: "10px",
    marginTop: "8px",
    marginBottom: "8px",
  },

  field: {
    width: "60em",
    marginTop: "10px",
    marginBottom: "15px",
  },
    head: {
    marginTop: "20px",
    marginLeft: "10px",
  },
  autocomplete2: {
    width: "38.5em",
    marginBottom: "15px",
    marginTop: "15px",
    marginLeft: "50px",
  },
  itemSpace :{
    marginTop : "12px",
    marginBottom :"12px"
  },
  spacerRight :{
    paddingRight :"8px",
    color : theme.palette.red.light
  },
  spacerLeft :{
    paddingLeft:"8px"
  },
  root: {
    width: '78.7%',
    '& > * + *': {
      marginTop: theme.spacing(10),
    },
  },
}))

const ThirdCatagoriesView = () => {
    const classes = useStyles();
           // define component state
           const [text,setText]=useState({name:"انتظر تحميل البيانات"})
           const [name,setName]=useState("");
     
             // render subcatagories state && func
       const {getAllSubCatagories,subcatagories}=useContext(subcatagoriesContext);
       const {filteredthird,getFilteredThirdData} =useContext(thirdcatagoriesContext); 
       //loading subcatagories 
       useEffect(() => {
         getAllSubCatagories();
         // eslint-disable-next-line
     }, [])
     
      // handle filter input
      const handleFilter=(event,item)=>{
       if(item){
         getFilteredThirdData(item._id);
         setName(item.name);
         }
     } 

         const thirdCatagView=(
        <React.Fragment>
          <Grid container direction='row'>
            {filteredthird.length > 0 ?
            filteredthird.map((catag)=>(
              <Card className={classes.card}>
                <img className={classes.img}
                 src={`https://familyway.sa/uploads/thirdCategory/${catag.image}`} 
                  alt="subimg" />
                <Grid container justify='space-between' className={classes.itemSpace} >
                  <Grid item >
                    <Typography variant='h4' className={classes.spacerLeft}> الصنف الفرعي </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant='h4' className={classes.spacerRight}>{name}</Typography>
                  </Grid>
                </Grid>
                <Grid container justify='space-between' className={classes.itemSpace}>
                  <Grid item >
                    <Typography variant='h4' className={classes.spacerLeft}>اسم المنتج</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant='h4' className={classes.spacerRight}>{catag.name}</Typography>
                  </Grid>
                </Grid>
              </Card>
            )):
            <div className={classes.root}><Alert severity="info">
            <Typography variant='h5'>
            ادخل الصنف الفرعي من فضلك
            </Typography>
            </Alert>
            </div>}
          </Grid>
        </React.Fragment>
      )
    return(
        <React.Fragment>
          <Grid container direction="row">
              <Grid item>
              <Grid item>
          <Typography variant="h4" className={classes.head}>
            عرض الاصناف الثالثه
          </Typography>
        </Grid>
        <Grid item>
        {subcatagories.length >0 ? 
          <Autocomplete
            className={classes.autocomplete2}
            id="combo-box-demo"
            options={subcatagories}
            getOptionLabel={(option) => option.name}
            onChange={handleFilter}
            renderInput={(params) => (
              <TextField
                {...params}
                label="اختر الصنف الفرعي"
                variant="outlined"
              />
            )}
          />:
          <Autocomplete
          className={classes.autocomplete2}
          id="combo-box-demo"
          options={text}
          getOptionLabel={(option) => option.name}
          onChange={handleFilter}
          renderInput={(params) => (
            <TextField
              {...params}
              label="اختر الصنف الفرعي"
              variant="outlined"
            />
          )}
        />}
            </Grid>
           </Grid>
          </Grid>
          {thirdCatagView}
        </React.Fragment>
    )
}
export default ThirdCatagoriesView;