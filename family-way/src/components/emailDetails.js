import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { authContext } from '../contexts/auth/authstate'
import moment from 'moment'
import 'moment/locale/ar'
import Animations from './loader'
import { url } from '../constants/constants'
import { Grid, makeStyles, Typography } from '@material-ui/core'

const useStyle = makeStyles(theme => ({
    name: {
      color: '#717171',
      marginLeft :"5px"
    },
    spacer : {
        marginTop :"5px",
        marginBottom :"5px"
    }
}))

const EmailDetails = () => {
    const classes = useStyle()
    const { loadUser } = useContext(authContext)
    const [email,setEmail]=useState(null);
    useEffect(() => {
        loadUser();
        getEmail();
        // eslint-disable-next-line
      }, []);
      console.log(email);
      const getEmail=()=>{
        const path = window.location.pathname
        const _id = path.replace('/email-details/', '');
        axios.get(`${url}mail/${_id}`)
             .then(res=> setEmail(res.data))
             .catch(err => console.log(err))
    }  
    return (
        <div>
           {email !== null ?
           <div>
             <Grid container direction='row'className={classes.spacer}>
                 <Grid item>
                     <Typography variant="h5">
                          الاسم:    
                      </Typography> 
                 </Grid>
                 <Grid item >
                     <Typography variant="h5" className={classes.name}>
                          {email.name}  
                      </Typography> 
                 </Grid>
             </Grid>
             <Grid container direction='row' className={classes.spacer}>
                 <Grid item >
                     <Typography variant="h5">
                          البريد:    
                      </Typography> 
                 </Grid>
                 <Grid item>
                     <Typography variant="h5" className={classes.name}>
                          {email.emailAddress}  
                      </Typography> 
                 </Grid>
             </Grid>
             <Grid container direction='row' className={classes.spacer}>
                 <Grid item>
                     <Typography variant="h5">
                          الرقم:    
                      </Typography> 
                 </Grid>
                 <Grid item>
                     <Typography variant="h5" className={classes.name}>
                          {email.phone}  
                      </Typography> 
                 </Grid>
             </Grid>
             <Grid container direction='row' className={classes.spacer}>
                 <Grid item>
                     <Typography variant="h5">
                          الرساله:    
                      </Typography> 
                 </Grid>
                 <Grid item>
                     <Typography variant="h5" className={classes.name}>
                          {email.message}  
                      </Typography> 
                 </Grid>
             </Grid>
             <Grid container direction='row' className={classes.spacer}>
                 <Grid item>
                     <Typography variant="h5">
                          وقت الارسال:    
                      </Typography> 
                 </Grid>
                 <Grid item>
                     <Typography variant="h5" className={classes.name}>
                     {moment(email.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                      </Typography> 
                 </Grid>
             </Grid>
            </div>               
           :<Animations/>}
       </div>
    )
}

export default EmailDetails
