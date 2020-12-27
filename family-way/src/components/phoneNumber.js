import React,{useEffect,useState,useContext} from 'react';
import {  Grid, Typography, Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Alert } from '@material-ui/lab';
import {authContext} from '../contexts/auth/authstate'

const useStyles = makeStyles((theme)=>({
    page:{
        backgroundColor:"#9b59b6",
        padding :"200px"
    },
    field: {
      width: "30em",
      marginTop: "25px",
      marginBottom: "25px",
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

const PhoneNumber=()=>{
    const classes =useStyles();
    // define state for numbers
     const [phoneNumber, setPhoneNumber] = useState("");
     // define state for control alert
     const [alertData, setAlertData] = useState({ type:'info',message:"من فضلك ادخل رقم الهاتف"   });
    //getting function from context 
   const { addPhoneNumber,phone } = useContext(authContext);
    
  //loadphone
   useEffect(() => {
       if(phone!==null){
           console.log(phone);
       } 
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [authContext,phone])

   // handle phone state and addPhone func
   const handleSubmit=(e)=>{
       e.preventDefault(); 
       addPhoneNumber(phoneNumber);
       console.log(phoneNumber);
    /*   if (!phoneNumber.match("/^[0-9]+$/")) {
         addPhoneNumber(phoneNumber);
         if (phone !== null) {
              setAlertData({
          message:`${phone.code} :كود التفعيل الخاص بك `,
          type: "success",
        });
         }
   }else{
    setAlertData({
        message:"تاكد من ادخال البيانات بشكل صحيح",
        type: "error",
      });
   }
   */
}
   
    return(
         <div className={classes.page}>
            <Grid container justify='center' alignItems='center' direction='column' >
                <form
                 noValidate
                 autoComplete="off"
                 className={classes.box}  
                  onSubmit={handleSubmit}
                >
            <Grid item>
           <Alert severity={alertData.type} className={classes.alert} >{alertData.message}</Alert>
           </Grid>    
           <Grid item>
               <TextField
                variant='outlined' 
                label='رقم الهاتف' 
                 className={classes.field}
                 onChange={(e)=>setPhoneNumber(e.target.value)}
                  />
           </Grid>
           <Grid item>
               <Button variant='contained'  className={classes.button}  type='submit'>
                   تسجيل
               </Button>
           </Grid>
           </form>
           </Grid>
           </div>
    )
}

export default PhoneNumber;
