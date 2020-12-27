import React from 'react';
import { Card, Grid, Typography, Divider, Button, TextField,Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme)=>({
    page:{
        backgroundColor:"#9b59b6",
        padding :"200px"
    },
    field: {
      width: "30em",
      marginTop: "28px",
      marginBottom: "8px",
      backgroundColor:"#fff"
    },
    codefield: {
        width: "30em",
        marginTop: "25px",
        marginBottom: "28px",
        backgroundColor:"#fff"
      },
    alert :{
        width : "30em",
        marginTop :"40px",
    },
    button :{
      width :"30em",
      color :'white',
      backgroundColor:"#9b59b6",
      fontWeight:'bold'
    },
    box :{
        backgroundColor:"white",
        padding :"40px"
    }
    
  }));

const PhoneVerify=()=>{
    const classes =useStyles() 
    return(
         <div className={classes.page}>
            <Grid container justify='center' alignItems='center' direction='column' >
                <Box className={classes.box}>
            <Grid item>
           <Alert severity="info" className={classes.alert} > 
            من فضلك ادخل رقم الهاتف و كود التفعيل الخاص بك
            </Alert>
           </Grid>    
           <Grid item>
               <TextField variant='outlined' label='رقم الهاتف'  className={classes.field} />
           </Grid>
           <Grid item>
               <TextField variant='outlined' label=' كود التفعيل'  className={classes.codefield} />
           </Grid>
           <Grid item>
               <Button variant='contained'  className={classes.button}>
                   دخول
               </Button>
           </Grid>
           </Box>
           </Grid>
           </div>
    )
}

export default PhoneVerify;
