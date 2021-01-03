import React, { useState,useEffect,useContext } from "react";
import {
  Grid,
  TextField,
  Button,
  Typography,
  Card,
  Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import {authContext} from '../contexts/auth/authstate';
import {catagoriesContext} from '../contexts/catagories/catagoriesState';
//import {useAsync} from '../hooks/useAsync';
import Animations from './loader';
//import { useStateIfMounted } from "use-state-if-mounted";


const useStyles = makeStyles((theme) => ({
  button: {
    width: "22em",
    color: "white",
    border: 5,
    marginTop: "8px",
    marginBottom: "15px",
    backgroundColor: theme.palette.green.main,
  },

  input: {
    marginLeft: "10px",
    marginRight: "10px",
    width: "70em",
    marginTop: "40px",
  },
  input2: {
    marginLeft: "10px",
    marginRight: "10px",
    width: "70em",
    marginBottom: "10px",
    marginTop: "20px",
  },
  card: {
    marginLeft: "20px",
    marginRight: "20px",
    marginTop: "25px",
    marginBottom: "25px",
    width: "305px",
  },
   name : {
    marginLeft :"10px",
    marginRight :"40px"
  },
  editicon: {
    backgroundColor: theme.palette.yellow.main,
    color: "white",
    marginRight: "10px",
    marginLeft: "10px",
    marginTop: "5px",
  },
  delIcon: {
    color: "white",
    backgroundColor: theme.palette.secondary.main,
    marginRight :"10px"
  },
  
}));
const AddCatagiories = () => {
  const classes = useStyles();

  const [name,setName] =useState('');
  const [sort,setSort]=useState('') 
   

  const {loadUser} = useContext(authContext);
  const {getAllCatagories,addNewCategories,removeOne,catagories,loading}=useContext(catagoriesContext);
 

  
 useEffect(()=>{
     getAllCatagories();
    }
   // eslint-disable-next-line
  ,[]);

 //load user data
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  
  // handle add new catagories
  const handleSubmit=(e)=>{
     e.preventDefault();
     addNewCategories(name,sort);
    };



  const catagView=(
    <React.Fragment>
      {console.log(catagories)}
        <Grid container direction='row'>
           {(catagories.length >1  && !loading) ? 
              catagories.map((catag)=>(
              <Card className={classes.card} key={catag._id}  >
              <Grid container justify='space-between' >
                <Typography variant="h4"  className={classes.name}>
                   {catag.name}
                </Typography>
                <Grid item>
                  <EditIcon className={classes.editicon} />
                  <DeleteForeverIcon className={classes.delIcon} />
                </Grid>
             </Grid>  
              </Card>
           )):<Animations />  
         }
        </Grid>
    </React.Fragment>
  )

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <Grid container direction="column">
          <Grid item>
            <TextField
              className={classes.input}
              variant="outlined"
              label="ادخال اسم الصنف"
              onChange={(e)=>setName(e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              className={classes.input2}
              variant="outlined"
              label="  الترتيب"
              onChange={(e)=>setSort(e.target.value)}
            />
          </Grid>
          <Grid container justify="center">
            <Grid item>
              <Button variant="contained" className={classes.button} type="submit">
                تم
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
      <Divider />
      <Typography variant="h4" color="primary">
        عرض الاصناف الرئسيه
      </Typography>
       {catagView}
    </React.Fragment>
  );
};
export default AddCatagiories;
