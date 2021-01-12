import React, { useState , useEffect,useContext } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  Grid,
  Card,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Divider
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import Alert from '@material-ui/lab/Alert';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from "@material-ui/core/styles";
import {productContext} from '../contexts/products/productState';
import {thirdcatagoriesContext} from '../contexts/thirdcatagories/thirdState';
import EditProduct from './editproduct'
import Draggable from 'react-draggable'



function PaperComponent (props) {
  return (
    <Draggable
      handle='#draggable-dialog-title'
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  )
}

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
  buttondialogsubmit: {
    color: 'white',
    backgroundColor: theme.palette.green.main,
    border: 5
  },
  search :{
    marginBottom :"20px",
    width :"22em"
  },
  divider :{
    marginBottom:"10px"
  },
  pagenation: {
    paddingTop: "35px",
    width: "max-content",
    margin: "auto"
  },
}));

const GetProducts = () => {
  const classes = useStyles();
   // for pop up
  const [openDialog, setOpenDialog] = useState(false)

  const {getAllThirdCatagories,thirdcatagories}= useContext(thirdcatagoriesContext);
  
  const {
       GetProductThird,
       removeProducts,
       products,
       setCurrentProduct,
       searchProducts,
       filterProducts}=useContext(productContext);
  const [id,setId]=useState(null); 
  const [text,setText]=useState([{name :"تحميل !!"}]);
  const [page,setPage]=useState(1);
  const [limit,setLimit]=useState(11);
  useEffect(()=>{
    getAllThirdCatagories();
      },
    // eslint-disable-next-line
   [])


      // handle dialog open
       const handleOpen=(product)=>{
        setOpenDialog(true)
         setCurrentProduct(product)
       } 

       // handle dialog closed
  const handleClose = () => {
    setOpenDialog(false)
  }

    // handle search via name
    const handlenameSearch =(e)=>{
      searchProducts(e.target.value);
    } 
    console.log(filterProducts);
     // handle filter input
     const handleFilter=(event,item)=>{
      if(item){
        setId(item._id);
        GetProductThird(item._id,page,limit);
        }
      }
      console.log(products);

  return (
    <React.Fragment>
         <Typography variant="h4">
        بحث المنتجات
      </Typography>
      <TextField label="بحث عن طريق الاسم"
       className={classes.search}
      onChange={handlenameSearch}>
        <SearchIcon />
      </TextField>
      <Divider className={classes.divider} />
      <Grid container direction="row">
      {filterProducts.length>0 ? 
           filterProducts.map((product)=>
                             <Grid item>
                <Card className={classes.card}>
                  <img className={classes.img} 
                  src={`https://familyway.sa/uploads/products/${product.images}`}
                   alt="subimg" />
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
           ):
      <div>
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
        {products !== null ? 
        products.products.map((product) => (
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
          </Grid>
        )):<div className={classes.root}><Alert severity="info">
        <Typography variant='h5'>
        ادخل الصنف الثالث من فضلك
        </Typography>
        </Alert>
        </div>}
        </Grid>
      </div>}
        </Grid>
        {products !==null && filterProducts.length === 0 ?
        <Pagination
          onChange={(i,page) => {
            GetProductThird(id,page,limit);
          }}
          count={Math.ceil(products.pagination.totalItems/limit)}
          color="primary"
          className={classes.pagenation}
        />
      :""}
      <Dialog
        open={openDialog}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby='draggable-dialog-title'
      >
        <DialogTitle style={{ cursor: 'move' }} id='draggable-dialog-title'>
          <Typography variant='h5' color='primary'>
            تعديل بيانات المنتج
          </Typography>
        </DialogTitle>
        <DialogContent>
          <EditProduct />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant='contained'
            className={classes.buttondialogsubmit}
          >
            تم
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
export default GetProducts;
