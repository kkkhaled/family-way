import React,{ useState, useEffect, useContext } from 'react';
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
  import {sliderContext} from '../contexts/sliders/sliderstate';
  import {thirdcatagoriesContext} from '../contexts/thirdcatagories/thirdState';
  import {productContext} from '../contexts/products/productState';
  import { authContext } from '../contexts/auth/authstate'
  import DroZone from './DropZone';


  const useStyles = makeStyles((theme) => ({
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
    sortField :{
        paddingRight:"80px",
        width:"26em"
    },
    autocomplete: {
        width: "38.5em",
        marginBottom: "15px",
        marginLeft: "50px",
      },
  }));

const AddSlider = () => {

    const classes=useStyles(); 
    const [alertData, setAlertData] = useState({ open: false });
    const [dropZoneState, setDropZoneState] = useState(false);
    const [text,setText]=useState([{name :"تحميل !!"}]);

    const [files, setFiles] = useState([]);
    const [isProduct, setisProduct] = useState(false);
    const [sort, setsort] = useState('');
    const [category, setcategory] = useState('');
    const [action, setaction] = useState('');
    const [isCatagory,setIscatagory]=useState(false);

    const { loadUser } = useContext(authContext)
    const {addNewSliderProduct,addNewSliderCatag,addNewSlider} = useContext(sliderContext);
    const {getAllThirdCatagories,thirdcatagories}= useContext(thirdcatagoriesContext);
    const {GetProductViaCat,nonPagenateProducts}=useContext(productContext);
  
    useEffect(()=>{
        getAllThirdCatagories();
        loadUser();
          },
        // eslint-disable-next-line
       [])


     // handle dropzone state
      const SelectFilesButtonHandler = () => {
       setDropZoneState(true)
        }
     
      const handleDropZoneSave = files => {
       setFiles(files)
        }

         // handle filter input
     const handleFilter=(event,item)=>{
        if(item){
          GetProductViaCat(item._id);
          }
        }

        const handleProduct=(event,item)=>{
           if(item){
               setaction(item._id);
           }
        }

        const handleCatagory=(event,item)=>{
            if(item){
                setcategory(item._id);
            }  
        }

        const handleSubmit=(e)=>{
            e.preventDefault();
            if(sort===''){
              setAlertData({
                open: true,
                message: "تاكد من ادخال البيانات بشكل صحيح",
                type: "error",
              });
            }else if(files.length === 0){
              setAlertData({
                open: true,
                message: "تاكد من رفع الصوره  ",
                type: "error",
              });
            }
            if(isProduct){
                addNewSliderProduct(files,isProduct,sort,action);
                setAlertData({
                  open: true,
                  message: "تم الاضافه  ",
                  type: "success",
                });
            }else if(isCatagory){
                addNewSliderCatag(files,category,sort);
                setAlertData({
                  open: true,
                  message: "تم الاضافه  ",
                  type: "success",
                });
            }else if(!isProduct&&!isCatagory){
                addNewSlider(files,sort)
                setAlertData({
                  open: true,
                  message: "تم الاضافه  ",
                  type: "success",
                });
            }
         }
   
    return (
        <React.Fragment>
           {alertData.open ? (
        <Alert severity={alertData.type}>{alertData.message}</Alert>
            ) : null}
           <form onSubmit={handleSubmit}>
             <Grid container direction="row" justify="center">
                <Grid item>
                   <TextField label="الترتيب" 
                   className={classes.sortField}
                   onChange={(e)=>setsort(e.target.value)} 
                   />
                </Grid> 
                <Grid item>
                    <Button 
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={SelectFilesButtonHandler}
                    >
                        اضافه الملف
                    </Button>
                </Grid>     
             </Grid>    
             <Grid container direction="column" justify="center">
                 <Grid item>
                 <FormControlLabel
              control={
                <Switch
                  checked={isProduct}
                  onChange={() => setisProduct(value => !value)}
                  name='checkedA'
                />
              }
              label='   هل هو منتج ؟'
            />
            {isProduct && thirdcatagories.length >0  ?
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
              />
             :null}
             </Grid>
             <Grid item>
             {nonPagenateProducts.length > 0 ? 
             <Autocomplete
              className={classes.autocomplete}
              id="combo-box-demo"
              onChange={handleProduct}
              options={nonPagenateProducts}
              getOptionLabel={(option) => option.title}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="اختر المنتج  "
                  variant="outlined"
                />
              )}
              />:null}
             </Grid>
             <Grid item>
                 <FormControlLabel
                control={
                 <Switch
                  checked={isCatagory}
                  onChange={() => setIscatagory(value => !value)}
                  name='checkedA'
                />
              }
              label='   هل هو صنف ؟'
            />
             </Grid>
             {isCatagory && thirdcatagories.length >0  ?
             <Autocomplete
             className={classes.autocomplete}
             id="combo-box-demo"
             onChange={handleCatagory}
             options={thirdcatagories}
             getOptionLabel={(option) => option.name}
             renderInput={(params) => (
               <TextField
                 {...params}
                 label="اختر الصنف الثالث"
                 variant="outlined"
               />
             )}
             />
             :null}
             </Grid>
             <Grid container justify="center">
             <Button variant="contained"  
                 type='submit'
                 className={classes.buttonsubmit}
                  >تم
                  </Button>
                  </Grid>
           </form> 
           <DroZone
        open={dropZoneState}
        setOpen={setDropZoneState}
        handleSave={handleDropZoneSave}
      />
        </React.Fragment>
    )
}

export default AddSlider
