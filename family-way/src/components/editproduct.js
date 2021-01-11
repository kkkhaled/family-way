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
      // for handle switch
    const [discountSwitch,setSwitch]=useState(false)
   // for variation switch
   const [switchOne, setISwitchOne] = useState(false);
   // for handle visiable
   const [isVisible, setIsVisible] = useState(false);
    // for give unit value
   const [units, setUnits] = useState([
     { id: "1", name: "كيلو" },
     { id: "2", name: "حبه" },
     { id: "3", name: "كرتونه" },
   ])
   const [barCode,setBarCode]=useState('');
   const [title,setTitle]=useState('');
   const [details, setDetails] = useState('');
   const [price, setPrice] = useState('');
   const [increaseCount, setincreaseCount] = useState('');
   const [unit, setUnit] = useState('');
   const [discount, setDiscount] = useState('');
   const [variationId, setVariationId] = useState('');
   const [discountEnds, setDiscountEnds] = useState(''); 

   const {updateProducts,currentProduct}=useContext(productContext);
   
   useEffect(()=>{
    if (currentProduct !== null) {
      console.log(currentProduct);
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
      if (discountSwitch === false) {
        setDiscount(null);
        setDiscountEnds(null);
     }
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
  }
   
   const dialogContent = (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
          <Grid >
              <TextField label="اسم المنتج" 
               className={classes.field}
               onChange={(e)=>setTitle(e.target.value)} />
          </Grid>
          <Grid >
              <TextField label="السعر" 
               className={classes.field}
               onChange={(e)=>setPrice(e.target.value)}               />
          </Grid>
          <Grid >
              <TextField label="التفاصيل"
                className={classes.field} 
                onChange={(e)=>setDetails(e.target.value)}/>
          </Grid>
          <Grid>   
                <TextField label="مقدار الزياده" 
                 className={classes.field} 
                 onChange={(e)=>setincreaseCount(e.target.value)}/>
          </Grid>
          <Grid>   
                <TextField label="بار كود " 
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
            className={classes.field} 
            onChange={(e)=>setDiscount(e.target.value)}
            />
          </Grid>
           <Grid container justify="center">
           <TextField
             id="datetime-local"
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
          <Autocomplete
            className={classes.field}
            onChange={handleUnit}
            id="combo-box-demo"
            options={units}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField {...params} label="   الوحده" variant="outlined" />
            )}
          />
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