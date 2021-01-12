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
     import { makeStyles,useTheme } from '@material-ui/core/styles';
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

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}

 const CreateCoupon = () => {
     const  classes = useStyles();
     const theme = useTheme();
     const { getAllUsers,users } = useContext(authContext);
     const {getAllThirdCatagories,thirdcatagories}= useContext(thirdcatagoriesContext);
     const [personName, setPersonName] = useState([]);

      
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

        const handleChange = (event) => {
          setPersonName(event.target.value);
        };
      
     
          
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
                        <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-chip-label">Chip</InputLabel>
        <Select
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          multiple
          value={personName}
          onChange={handleChange}
          input={<Input id="select-multiple-chip" />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {selected.map((value) => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {thirdcatagories.length > 0
            ? thirdcatagories.map((name) => (
                <MenuItem
                  key={thirdcatagories.name}
                  value={thirdcatagories.name}
                  style={getStyles(thirdcatagories.name, personName, theme)}
                >
                  {thirdcatagories.name}
                </MenuItem>
              ))
            : ""}
        </Select>
      </FormControl>
                        </Grid>
                    </Grid>
            </form>
        </React.Fragment>
    )
}
export default CreateCoupon