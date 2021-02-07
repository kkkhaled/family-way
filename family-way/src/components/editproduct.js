import React, { useState , useEffect,useContext } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  Grid,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Switch
} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from "@material-ui/core/styles";
import {productContext} from '../contexts/products/productState';

const useStyles = makeStyles((theme) => ({
    field: {
      width: '25em',
      marginTop: '8px',
      marginBottom: '8px'
    },
    formButton: {
      color: 'white',
      border: 5,
      marginTop: '8px'
    },
   }));


  const EditProduct=()=>{
    const classes = useStyles();
    // for handlr alert
    const [alertData, setAlertData] = useState({ open: false });
    // for handle switch
    const [discountSwitch,setSwitch]=useState(false)
   // for variation switch
   const [switchOne, setISwitchOne] = useState(false);
   // for handle visiable
   const [isVisible, setIsVisible] = useState(false);
    // for give unit value
    const [units, setUnits] = useState([
      { id: 1, name: 'حبه' },
      { id: 2, name: 'اوتر' },
      { id: 3, name: 'كيلو' },
      { id: 4, name: 'كرتونه' }
    ])
   const [barCode,setBarCode]=useState(null);
   const [title,setTitle]=useState('');
   const [details, setDetails] = useState('');
   const [price, setPrice] = useState(null);
   const [increaseCount, setincreaseCount] = useState(null);
   const [unit, setUnit] = useState(null);
   const [discount, setDiscount] = useState(0);
   const [variationId, setVariationId] = useState('');
   const [discountEnds, setDiscountEnds] = useState(''); 

   const {updateProducts,currentProduct}=useContext(productContext);
   
   useEffect(()=>{
    if (currentProduct !== null) {
      console.log(currentProduct);
      setBarCode(currentProduct.barCode)
      setTitle(currentProduct.title)
      setDetails(currentProduct.details)
      setPrice(currentProduct.price)
      setincreaseCount(currentProduct.increaseCount)
      setDiscount(currentProduct.discount) 
      setVariationId(currentProduct.variationId)
      setIsVisible(currentProduct.isVisible)
      setUnit(currentProduct.unit)
    }
    if(currentProduct.discountEnds !== undefined){
      setDiscountEnds(currentProduct.discountEnds);
    }
    if(currentProduct.discount > 0){
      setSwitch(true)
    }
    if(currentProduct.variationId !== ""){
      setISwitchOne(true)  
    }
    },
    // eslint-disable-next-line
  [currentProduct,productContext])

  const handleUnit=(event,item)=>{
    if (item) {
      setUnit(item.id)
    }
  }

  const handleSubmit=(e)=>{
      e.preventDefault();
      if(title===''){
      setAlertData({
        open: true,
        message: "تاكد من ادخال اسم المنتج",
        type: "error",
      });
     }else if (price === null || price === '') {
      setAlertData({
        open: true,
        message: "تاكد من ادخال سعر المنتج",
        type: "error",
      });
    }else if (details === '') {
      setAlertData({
        open: true,
        message: "تاكد من ادخال تفاصيل المنتج",
        type: "error",
      });
    }else if (increaseCount === null || increaseCount==='') {
      setAlertData({
        open: true,
        message: "تاكد من ادخال مقدار الزياده ",
        type: "error",
      });
    }else if(barCode === null ||barCode===''){
      setAlertData({
        open: true,
        message: "تاكد من ادخال الكود بطريقه صحيحه",
        type: "error",
      });
    }else {
        const product={
        _id : currentProduct._id,
        discount,
        discountEnds,
        increaseCount,
        title,
        price,
        barCode,
        unit,
        isVisible,
        details,
        variationId
      }
      updateProducts(product);
      setAlertData({
        open: true,
        message: "تم تعديل المنتج ",
        type: "success",
      })
      // setBarCode('');
      // setTitle('') 
      // setDetails('');
      // setPrice('');
      // setincreaseCount('');
      // setUnit('');
      // setDiscount('');
      // setDiscountEnds('');
      // setVariationId('');
    }
  }
   
   const dialogContent = (
    <React.Fragment>
      {alertData.open ? (
        <Alert severity={alertData.type}>{alertData.message}</Alert>
      ) : null}
      <form onSubmit={handleSubmit}>
          <Grid >
              <TextField label="اسم المنتج" 
               className={classes.field}
               value={title}
               onChange={(e)=>setTitle(e.target.value)} />
          </Grid>
          <Grid >
              <TextField label="السعر" 
               className={classes.field}
               value={price}
               onChange={(e)=>setPrice(e.target.value)}               />
          </Grid>
          <Grid >
              <TextField label="التفاصيل"
                className={classes.field} 
                value={details}
                onChange={(e)=>setDetails(e.target.value)}/>
          </Grid>
          <Grid>   
                <TextField label="مقدار الزياده" 
                 className={classes.field} 
                 value={increaseCount}
                 onChange={(e)=>setincreaseCount(e.target.value)}/>
          </Grid>
          <Grid>   
                <TextField label="بار كود " 
                 value={barCode}
                 className={classes.field}
                 onChange={(e)=>setBarCode(e.target.value)} />
          </Grid>
          <Grid>
            <FormControlLabel
              control={
                <Switch
                  checked={discountSwitch}
                  onChange={() => setSwitch(value => !value)}
                  name='checkedA'
                />
              }
              label='هل تريد تخفيض ؟'
            />
          </Grid>
          {discountSwitch !== false ?
          <React.Fragment>
           <Grid>   
           <TextField label=" التخفيض" 
           value={discount}
            className={classes.field} 
            onChange={(e)=>setDiscount(e.target.value)}
            />
          </Grid>
           <Grid container justify="center">
           <TextField
             id="datetime-local"
             defaultValue={discountEnds}
             label="موعد انتهاء التخفيض"
             type="datetime-local"
             onChange={(e)=>setDiscountEnds(e.target.value)}
             className={classes.Field}
             InputLabelProps={{
               shrink: true,
             }}
           />
         </Grid>
         </React.Fragment>
         :null}
           <Grid>
            <FormControlLabel
              control={
                <Switch
                  checked={switchOne}
                  onChange={() => setISwitchOne(value => !value)}
                  name='checkedA'
                />
              }
              label=' دمج اكثر من منتج ؟'
            />
          </Grid>
          {switchOne ?
            <Grid>   
            <TextField label="اوجه التشابه" 
             className={classes.field} 
             value={variationId}
             onChange={(e)=>setVariationId(e.target.value)}/>
           </Grid>
           :null
        }
          <Grid>
            <FormControlLabel
              control={
                <Switch
                  checked={isVisible}
                  onChange={() => setIsVisible(value => !value)}
                  name='checkedA'
                />
              }
              label=' هل هو متاح ؟'
            />
          </Grid>
          
          <Grid>
           {currentProduct !== null ? 
          <Autocomplete
            className={classes.field}
            onChange={handleUnit}
            id="combo-box-demo"
            options={units}
            defaultValue={units.find(u => u.id == currentProduct.unit)}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField {...params} label="   الوحده" variant="outlined" />
            )}
          />:
          <Autocomplete
          className={classes.field}
          onChange={handleUnit}
          id="combo-box-demo"
          options={units}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField {...params} label="   الوحده" variant="outlined" />
          )}
        />}
        </Grid>
        <Grid container justify='center'>
                <Grid item>
                  <Button
                    variant='contained'
                    color='primary'
                    className={classes.formButton}
                    type="submit"
                  >
                    حفظ
                  </Button>
                </Grid>
              </Grid>
      </form>
    </React.Fragment>
  )
   return(
    <React.Fragment>
       {dialogContent}
     </React.Fragment>
   ) 
  }
 export default EditProduct; 