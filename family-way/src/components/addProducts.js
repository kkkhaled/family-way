import React, { useState , useEffect,useContext } from "react";
import { Grid, TextField, Button } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import { Switch } from '@material-ui/core'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import DroZone from './DropZone'
import {productContext} from '../contexts/products/productState'
import {thirdcatagoriesContext} from '../contexts/thirdcatagories/thirdState';

const useStyles = makeStyles((theme) => ({
  field: {
    width: "32em",
    marginRight: "15px",
    marginBottom: "15px",
    marginTop: "15px",
  },
  button: {
    color: "white",
    width: "20em",
    border: 8,
    marginTop: "20px",
    marginLeft: "20px",
  },
  buttonsubmit: {
    color: "white",
    width: "20em",
    border: 8,
    marginTop: "20px",
    marginLeft: "20px",
    backgroundColor: theme.palette.green.main,
  },
  detailsfield: {
    width: "65em",
    marginTop: "10px",
    marginBottom: "10px",
  },
}));

const AddProducts = () => {
  const classes = useStyles();

  const {getAllThirdCatagories,thirdcatagories}= useContext(thirdcatagoriesContext);
  const {addProducts,updateProducts,currentProduct,setCurrentProduct}=useContext(productContext);

  //const [thirdId,setThirdId]=useState('');
  const [barCode,setBarCode]=useState('');
  const [files,setFiles]=useState([]); 
  const [title,setTitle]=useState('');
  const [details, setDetails] = useState('');
  const [categories, setCategories] = useState('');
  const [price, setPrice] = useState('');
  const [increaseCount, setincreaseCount] = useState('');
  const [unit, setUnit] = useState('');
  //const [userMax, setUserMax] = useState('');
  //const [inStock, setinStock] = useState('');
  //const [boxUnit, setboxUnit] = useState('');
  const [discount, setDiscount] = useState('');
  const [sold, setSold] = useState(''); 
  const [variationId, setVariationId] = useState('');
  const [discountEnds, setDiscountEnds] = useState('2020-12-26T18:42:46.236Z'); 
  
  const [dropZoneState, setDropZoneState] = useState(false)

  
  const [text,setText]=useState([{name :"تحميل !!"}])
 
  const [switchOne, setISwitchOne] = useState(false);
  const [switchtwo, setISwitchtwo] = useState(false);

    const [units, setUnits] = useState([
    { id: 0, name: "كيلو" },
    { id: 1, name: "حبه" },
    { id: 2, name: "كرتونه" },
  ]);
  
  useEffect(()=>{
    if(currentProduct !== null){
      console.log(currentProduct);
    }
    getAllThirdCatagories();
      },
    // eslint-disable-next-line
  [currentProduct,productContext]);

     // handle filter input
     const handleFilter=(event,item)=>{
      if(item){
        //setThirdId(item._id);
        setCategories(item._id);
        }
      }
      
      const handleUnit=(event,item)=>{
        if (item) {
          setUnit(item.id)
        }
      }

        // handle dropzone state
     const SelectFilesButtonHandler = () => {
       setDropZoneState(true)
      }

    const handleDropZoneSave = files => {
      setFiles(files)
     }

      // handle add and put prouct
      const handleSubmit=(e)=>{
         e.preventDefault();
        // console.log(barCode,categories,files,details);
        if (switchtwo === false) {
           setDiscount(null);
           setDiscountEnds(null);
        }
        if(currentProduct !== null){
           const product ={
             _id : currentProduct._id,
            categories:[categories],
            discount,
            increaseCount,
            sold,
            title,
            price,
            barCode,
            unit,
           }
           updateProducts(product);
           setCurrentProduct(null);
        }else {
          addProducts(barCode,files,title,details,categories,price,increaseCount,unit,discount,sold,variationId,discountEnds)
        }
      }

  return (
    <React.Fragment>
    <form onSubmit={handleSubmit}>
      <Grid container direction="column">
        <Grid item>
        {thirdcatagories.length >0 ?    
          <Autocomplete
            className={classes.detailsfield}
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
          className={classes.detailsfield}
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
        <Grid item>
          <Grid container direction="row">
            <Grid item>
              <TextField
                className={classes.field}
                variant="outlined"
                onChange={(e)=>setBarCode(e.target.value)}
                label="باركود"
              />
            </Grid>
            <Grid item>
              <Button
                color="primary"
                variant="contained"
                onClick={SelectFilesButtonHandler}
                className={classes.button}
              >
                ادخل الصور
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <TextField
            variant="outlined"
            label="ادخل العنوان"
            onChange={(e)=>setTitle(e.target.value)}
            className={classes.detailsfield}
          />
        </Grid>
        <Grid item>
          <TextField
            variant="outlined"
            label="ادخل التفاصيل"
            onChange={(e)=>setDetails(e.target.value)}
            className={classes.detailsfield}
          />
        </Grid>
        <Grid item>
            <FormControlLabel
              control={
                <Switch
                  checked={switchOne}
                  onChange={() => setISwitchOne(value => !value)}
                  name='checkedA'
                />
              }
              label='دمج اكثر من منتج ؟'
            />
          </Grid>
          {switchOne ? 
          <Grid item>
          <TextField
            variant="outlined"
            label=" اوجه التشابه"
            onChange={(e)=>setVariationId(e.target.value)}
            className={classes.detailsfield}
          />
        </Grid>
        :null}
        <Grid item>
          <TextField
            variant="outlined"
            label="ادخل السعر"
            onChange={(e)=>setPrice(e.target.value)}
            className={classes.detailsfield}
          />
        </Grid>
        <Grid item>
            <FormControlLabel
              control={
                <Switch
                  checked={switchtwo}
                  onChange={() => setISwitchtwo(value => !value)}
                  name='checkedA'
                />
              }
              label=' هل يوجد تخيض'
            />
          </Grid>
          {switchtwo ?
          <Grid>
          <Grid item>
          <TextField
            variant="outlined"
            label=" التخفيض"
            onChange={(e)=>setDiscount(e.target.value)}
            className={classes.detailsfield}
          />
        </Grid>   
        <Grid container justify="center">
            <TextField
              id="datetime-local"
              label="موعد انتهاء التخفيض"
              type="datetime-local"
              className={classes.textField}
              onChange={(e)=>setDiscountEnds(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          </Grid>: null}
        <Grid item>
          <TextField
            variant="outlined"
            label=" مقدار الزياده"
            onChange={(e)=>setincreaseCount(e.target.value)}
            className={classes.detailsfield}
          />
        </Grid>
        {/*
        
        <Grid item>
          <TextField
            variant="outlined"
            label="  اعلي قيمه للمستخدم"
            onChange={(e)=>setUserMax(e.target.value)}
            className={classes.detailsfield}
          />
        </Grid>*/ }
        <Grid item>
          <Autocomplete
            className={classes.detailsfield}
            id="combo-box-demo"
            options={units}
            onChange={handleUnit}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField {...params} label="   الوحده" variant="outlined" />
            )}
          />
        </Grid>
        {/* 
        <Grid item>
          <TextField
            variant="outlined"
            label="    المخزون"
            onChange={(e)=>setinStock(e.target.value)}
            className={classes.detailsfield}
          />
        </Grid>
        */}
        {/*
        <Grid item>
          <TextField
            variant="outlined"
            label="   مقدار الوحده "
            className={classes.detailsfield}
          />
        </Grid>
        */ }
        <Grid item>
          <Grid container justify="center">
            <Button variant="contained" className={classes.buttonsubmit} type="submit">
              تم
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
        <DroZone
        open={dropZoneState}
        setOpen={setDropZoneState}
        handleSave={handleDropZoneSave}
      />
      </React.Fragment>
  );
};
export default AddProducts;
