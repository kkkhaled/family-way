import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, TextField, Typography } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import DroZone from "./DropZone";
import Alert from "@material-ui/lab/Alert";
import { sliderContext } from "../contexts/sliders/sliderstate";


const useStyles = makeStyles((theme) => ({
    buttonsubmit: {
        color: 'white',
        width: '20em',
        border: 8,
        marginTop: '20px',
        marginLeft: '20px',
        backgroundColor: theme.palette.green.main
      },
      button: {
        color: 'white',
        width: '20em',
        border: 8,
        marginTop: '20px',
      },
      Field: {
        paddingRight: '80px',
        width: '26em'
      },
  alert: {
    marginTop: "10px",
  },
}));

const AddCompanies = () => {
    const classes = useStyles();
    const [files, setFiles] = useState([]);
    const [dropZoneState, setDropZoneState] = useState(false);
    const [alertData, setAlertData] = useState({ open: false });
    const [name,setName] = useState('');
    const { createCompanies } = useContext(sliderContext);
    
  const SelectFilesButtonHandler = () => {
    setDropZoneState(true);
  };

  const handleDropZoneSave = (files) => {
    setFiles(files);
  };

  const handleSubmit=(e)=>{
      e.preventDefault();
      if(files.length < 1 ){
         setAlertData({
            open: true,
            message: "ارفع الصوره !",
            type: "warning",
          });
      }else if(name === ''){
        setAlertData({
            open: true,
            message: " ادخل اسم الشركه",
            type: "warning",
          });
      }else {
         createCompanies(name,files);
         setAlertData({
            open: true,
            message: "   تم الاضافه",
            type: "success",
          }); 
          setName('');
          setFiles([]);
      }  
  }

    return (
        <div >
           <Typography variant="h4" align="left">
                ادخال بيانات الشركه
            </Typography> 
        {alertData.open ? (
        <Alert className={classes.alert} severity={alertData.type}>
          {alertData.message}
        </Alert>
      ) : (
        ""
      )} 
       <form onSubmit={handleSubmit}  autoComplete="off">
       <Grid item>   
        <Grid container direction="column">
         <Grid item>   
              <TextField 
               label="ادخل الاسم" 
               className={classes.Field}
               value={name}
               onChange={e => setName(e.target.value)} 
               />
         </Grid>
         <Grid item>
        <Button
          color="primary"
          className={classes.button}
          onClick={SelectFilesButtonHandler}
          variant="contained"
        >
          اختر الصوره
        </Button>
        </Grid>
        </Grid> 
        </Grid>
        <Grid container justify= 'center'>
          <Button
            type="submit"
            variant="contained"
            className={classes.buttonsubmit}
          >
            تم
          </Button>
          </Grid>
      </form>
      <DroZone
        open={dropZoneState}
        setOpen={setDropZoneState}
        handleSave={handleDropZoneSave}
      />
        </div>
    )
}

export default AddCompanies
