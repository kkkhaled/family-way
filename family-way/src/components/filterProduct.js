import React,{useContext} from 'react'
import {
    Grid,
    Card,
    Typography,
    TextField,
    Button,
    Divider,
    makeStyles
  } from "@material-ui/core";
import EditProduct from './editproduct'
import {productContext} from '../contexts/products/productState';

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
  }));
const FilterProduct = ({removeProducts,handleOpen}) => {
    const {filterProducts}=useContext(productContext);
    const classes = useStyles();
    return (
         <Grid container direction="row">
           {filterProducts.length > 0 ?
              filterProducts.map((product)=>
              <Grid container direction="column" >
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
                        <Button variant="contained"
                         className={classes.button} 
                         onClick={()=>handleOpen(product)}
                        >
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
           )
           :null}
         </Grid>
    )
}

export default FilterProduct
