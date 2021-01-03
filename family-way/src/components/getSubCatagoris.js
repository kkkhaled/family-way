import { Grid } from "@material-ui/core";
import React, { useState,useEffect,useContext } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  Typography,
  TextField,
  Button,
  Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {catagoriesContext} from '../contexts/catagories/catagoriesState';
import {subcatagoriesContext} from '../contexts/subcatagories/subcatagoriesState';
import SubCatagoryView from './subcatagoriesView'
import DroZone from "./DropZone";

const useStyles = makeStyles((theme) => ({
  card: {
    width: "22em",
    height: "22em",
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
    marginLeft: "10px",
    marginTop: "8px",
    marginBottom: "8px",
  },

  autocomplete: {
    width: "35em",
    marginRight: "15px",
  },
  button: {
    width: "22.5em",
    marginRight: "15px",
    marginLeft: "15px",
    color: "white",
    border: 8,
    marginTop: "10px",
  },
  field: {
    width: "60em",
    marginTop: "10px",
    marginBottom: "15px",
  },
  button2: {
    color: "white",
    width: "22em",
    marginTop: "12px",
    marginBottom: "22px",
    backgroundColor: theme.palette.green.main,
  },
  head: {
    marginTop: "20px",
    marginLeft: "10px",
  },
  autocomplete2: {
    width: "38.5em",
    marginBottom: "15px",
    marginTop: "15px",
    marginLeft: "50px",
  },
  itemSpace :{
    marginTop : "12px",
    marginBottom :"12px"
  },
  spacerRight :{
    paddingRight :"8px",
    color : theme.palette.red.light
  },
  spacerLeft :{
    paddingLeft:"8px"
  },
}));

const GetSubCatagories = () => {
   
    // define component state
    const [text,setText]=useState({name:"انتظر تحميل البيانات"})
    const [files, setFiles] = useState([]);
    const [dropZoneState, setDropZoneState] = useState(false);  
    const [name,setName]=useState("")
    const [parentId,setParentId]=useState(null)
  // render catagories state && func
  const {
    getAllCatagories
    ,catagories,
    loading,
    getOneCatagory
  }=useContext(catagoriesContext);
              

  // render subcatagories state && func
  const {
    addNewSubCatagories} =useContext(subcatagoriesContext)
  
  // loading catagories
  useEffect(()=>{
    getAllCatagories();
  }
 // eslint-disable-next-line
,[]);


  const classes = useStyles();
  
  // handle filter input
  const handleFilter=(event,item)=>{
    if(item){
     getOneCatagory(item._id);
     setParentId(item._id);
      }
  }

  // handle dropzone state
  const SelectFilesButtonHandler = () => {
    setDropZoneState(true);
  };

  const handleDropZoneSave = (files) => {
    setFiles(files);
  };

   const handleSubmit=(e)=>{
     e.preventDefault();
      if(parentId === null){
        console.log("err");
      }else if(name === ""){
          console.log("errr");
      }else {
        addNewSubCatagories(files,name,parentId,true);
      }
   }
 
    
  return (
    <React.Fragment>
      <Typography variant="h4" className={classes.head}>
        ادخل الاصناف الفرعيه
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container direction="column">
          <Grid item>
            <TextField
              variant="outlined"
              label="ادخل الاسم"
              onChange={(e)=>setName(e.target.value)}
              className={classes.field}
            />
          </Grid>
          <Grid item>
            <Grid container direction="row">
              <Grid item>
                {catagories.length >0 && ! loading ?
                <Autocomplete
                  className={classes.autocomplete}
                  id="combo-box-demo"
                  options={catagories}
                  getOptionLabel={(option) => option.name}
                  onChange={handleFilter}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="اختر الصنف الرئيسى"
                      variant="outlined"
                    />
                  )}
                />:  
                  <Autocomplete
                className={classes.autocomplete}
                id="combo-box-demo"
                options={text}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="اختر الصنف الرئيسى"
                    variant="outlined"
                  />
                )}
              /> }
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={SelectFilesButtonHandler}
                  className={classes.button}
                >
                  ادخل صوره الصنف
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid container justify="center">
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button2}
                type="submit"
              >
                تم
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
      <Divider />
       <DroZone
        open={dropZoneState}
        setOpen={setDropZoneState}
        handleSave={handleDropZoneSave}
      />
      <SubCatagoryView />
    </React.Fragment>
  );
};
export default GetSubCatagories;
