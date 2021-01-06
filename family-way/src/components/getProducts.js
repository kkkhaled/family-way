import React, { useState , useEffect,useContext } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  Grid,
  Card,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from "@material-ui/core/styles";
import {productContext} from '../contexts/products/productState'
import {thirdcatagoriesContext} from '../contexts/thirdcatagories/thirdState';


const useStyles = makeStyles((theme) => ({
  card: {
    width: "22em",
     //height: "30em",
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
    marginRight: "8px",
    marginTop: "8px",
    color: "red",
  },
  name: { marginLeft: "8px" },
  details: {
    marginLeft: "8px",
    color: theme.palette.gray,
  },
  autocomplete: {
    width: "38.5em",
    marginBottom: "15px",
    marginLeft: "50px",
  },
  button: {
    color: theme.palette.green.dark,
    backgroundColor: "white",
    width: "10em",
    height: "2.6em",
    marginTop: "12px",
    marginLeft: "8px",
    marginRight: "5px",
    marginBottom:"8px"
  },
  delbutton: {
    color: "red",
    backgroundColor:"white" ,
    width: "10em",
    height: "2.6em",
    marginTop: "12px",
    marginLeft: "8px",
    marginRight: "5px",
    marginBottom:"8px"
  },
  root: {
    width: '67%',
    '& > * + *': {
      marginTop: theme.spacing(10),
    },
  },
}));

const GetProducts = () => {
  const classes = useStyles();

  const {getAllThirdCatagories,thirdcatagories}= useContext(thirdcatagoriesContext);
  const {GetProductThird,removeProducts,products}=useContext(productContext);
  const [text,setText]=useState([{name :"تحميل !!"}])
  useEffect(()=>{
    getAllThirdCatagories();
      },
    // eslint-disable-next-line
  [])
 

     // handle filter input
     const handleFilter=(event,item)=>{
      if(item){
        GetProductThird(item._id);
        }
      }

  return (
    <React.Fragment>
      <Grid container direction="row">
        <Grid item>
          <Typography variant="h4">اختر الصنف الثالث</Typography>
        </Grid>
        <Grid item>
          {thirdcatagories.length >0 ? 
          <Autocomplete
            className={classes.autocomplete}
            id="combo-box-demo"
            onChange={handleFilter}
            options={thirdcatagories}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField
                {...params}
                label="اختر الصنف الثالث"
                variant="outlined"
              />
            )}
          /> :<Autocomplete
          className={classes.autocomplete}
          id="combo-box-demo"
          options={text}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField
              {...params}
              label="اختر الصنف الثالث"
              variant="outlined"
            />
          )}
        /> }
        </Grid>
      </Grid>

      <Grid container direction="row">
        {products.length > 0 ? 
        products.map((product) => (
          <Grid item key={product.name}>
            <Grid container direction="column">
              <Grid item>
                <Card className={classes.card}>
                  <img className={classes.img} src={`https://familyway.sa/uploads/products/${product.images}`} alt="subimg" />
                  <Grid container direction="column">
                    <Typography
                      variant="h5"
                      align="right"
                      className={classes.font}
                    >
                      {product.price}
                    </Typography>
                    <Grid item>
                      <Typography variant="h4" className={classes.name}>
                        {product.title}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="h5" className={classes.details}>
                        {product.details}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Grid container direction="row">
                        <Button variant="contained" className={classes.button}>
                          <Typography variant="h5">تعديل</Typography>
                        </Button>
                        <Button
                          variant="contained"
                          className={classes.delbutton}
                          onClick={()=>removeProducts(product._id)}
                        >
                          <Typography variant="h5"> مسح</Typography>
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        )):<div className={classes.root}><Alert severity="info">
        <Typography variant='h5'>
        ادخل الصنف الثالث من فضلك
        </Typography>
        </Alert>
        </div>}
      </Grid>
    </React.Fragment>
  );
};
export default GetProducts;
