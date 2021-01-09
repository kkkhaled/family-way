import React ,{useState,useContext,useEffect} from 'react';
import {
    Grid,
    TextField,
    Button,
    Typography,
    Card,
    Divider,
    Chip,
    Select,
    InputLabel,
    Input,
    MenuItem,
    FormControl,
    ListItemText
    } from '@material-ui/core';

    import Autocomplete from "@material-ui/lab/Autocomplete";
     import { makeStyles } from '@material-ui/core/styles';
    import { authContext } from '../contexts/auth/authstate';
    import {thirdcatagoriesContext} from '../contexts/thirdcatagories/thirdState';


  const useStyles = makeStyles(theme => ({
      title:{
         marginTop:"5px",
         marginBottom:"5px"
      },
      codeField :{
          width:"190px",
          marginBottom:"10px",
          marginLeft :"8px",
      },
      forWhoField:{
           width :"190px"
      },
       formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  }))
  
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

 const CreateCoupon = () => {
     const  classes = useStyles();
     const { getAllUsers,users } = useContext(authContext);
     const {getAllThirdCatagories,thirdcatagories}= useContext(thirdcatagoriesContext);
      
     const [options, setoptions] = useState(
         [
           {name:"المستخدمين",id:1},
           {name:"المنتجات",id:2},
           {name:"الالقسام",id:3},
           {name:"التوصيل",id:4},
           {name:"الطلبات",id:5},
         ])


            // load user data
           useEffect(() => {
           getAllUsers();
           getAllThirdCatagories();
        // eslint-disable-next-line
        }, [])
     
          
    return (
        <React.Fragment>
            <Typography variant="h4">
                ادخل بيانات الكوبون
            </Typography>
            <form noValidate autoComplete="off">
                    <TextField  variant="standard" label="ادخل الكود" className={classes.codeField} />
                    <Divider />
                    <Grid container direction="column">
                        <Grid item>
                        <Typography variant="h5" color="primary" className={classes.title}>
                             المتوقع استخدامهم للكوبون
                        </Typography>
                        <Autocomplete
                            className={classes.forWhoField}
                               id="combo-box-demo"
                            options={options}
                             getOptionLabel={(option) => option.name}
                               renderInput={(params) => (
                               <TextField
                                     {...params}
                                   label="اختر"
                                     variant="outlined"
                                   />
                                )}
                               />
                        </Grid>
                        <Grid item>
                   
                        </Grid>
                    </Grid>
            </form>
        </React.Fragment>
    )
}
export default CreateCoupon