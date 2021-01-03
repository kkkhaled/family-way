import { Grid } from "@material-ui/core";
import React, { useState,useEffect,useContext } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  Card,
  Typography,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {catagoriesContext} from '../contexts/catagories/catagoriesState';
import {subcatagoriesContext} from '../contexts/subcatagories/subcatagoriesState';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    card: {
      width: "22em",
      height: "22em",
      border: 8,
      marginTop: "20px",
      marginBottom: "20px",
      marginLeft: "10px",
      marginRight: "10px",
    },
    img: {
      width: "20em",
      height: "13em",
      marginLeft: "15px",
      marginRight: "15px",
      marginTop: "15px",
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
  }));

  const SubCatagoryView=()=>{
      const classes = useStyles();
         // define component state
    const [text,setText]=useState({name:"انتظر تحميل البيانات"})
    const [name,setName]=useState('')
        const {
        getAllCatagories
        ,catagories,
        loading,
      }=useContext(catagoriesContext);
                  
    
      // render subcatagories state && func
      const {
        getFilteredSubSatagories,
        filterdata,
        } =useContext(subcatagoriesContext)
      
      // loading catagories
      useEffect(()=>{
        getAllCatagories();
      }
     // eslint-disable-next-line
    ,[]);

     // handle filter input
  const handleFilter=(event,item)=>{
    if(item){
     getFilteredSubSatagories(item._id);
     setName(item.name)
      }
    }
    
  const subCatagView=(
    <React.Fragment>
      <Grid container direction='row'>
        {filterdata.length > 0  ?
        filterdata.map((item)=>(
          <Card className={classes.card} key={item.id}>
            <img className={classes.img}
             src={`https://familyway.sa/uploads/subCategories/${item.image}`} 
             alt="sub_img" />
            <Grid container justify='space-between' className={classes.itemSpace} >
              <Grid item >
                <Typography variant='h4' className={classes.spacerLeft}>اسم الصنف</Typography>
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
                <Typography variant='h4' className={classes.spacerRight}  >{item.name}</Typography>
              </Grid>
            </Grid>
          </Card>
        )):<div className={classes.root}><Alert severity="info">
          <Typography variant='h5'>
          ادخل الصنف الرئيسى من فضلك
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
              <Typography variant="h4" className={classes.head}>
            عرض الاصناف الفرعيه
            </Typography>
              </Grid>
              <Grid item>
              {catagories.length>0 && !loading ?
          <Autocomplete
            className={classes.autocomplete2}
            id="combo-box-demo"
            options={catagories}
            getOptionLabel={(option) =>option.name}
            onChange={handleFilter}
            renderInput={(params) => (
              <TextField
                {...params}
                label="اختر الصنف الرئيسى"
                variant="outlined"
              />
            )}
          />:            
          <Autocomplete
            className={classes.autocomplete2}
            id="combo-box-demo"
            options={text}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField
                {...params}
                label="اختر الصنف الرئيسى"
                variant="outlined"
              />
            )}
          />}
          </Grid>
          </Grid>
             {subCatagView}
      </React.Fragment>
  )
 }
 export default SubCatagoryView;