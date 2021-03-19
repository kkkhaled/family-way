import React, { useState, useEffect, useContext } from 'react'
import { Grid, Typography,  Button, Card , Divider } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import { makeStyles } from '@material-ui/core/styles'
import { sliderContext } from '../contexts/sliders/sliderstate'
import { authContext } from '../contexts/auth/authstate'
import Animations from './loader'

const useStyles = makeStyles(theme => ({
    button: {
        color: 'white',
        width: '20em',
        border: 8,
        marginTop: '20px',
        marginLeft: '20px'
      },
      buttondelete: {
        color: 'white',
        width: '1em',
        border: 8,
        marginTop: '5px',
        marginBottom: '10px',
        backgroundColor: theme.palette.red.light
      },
      card: {
        width: "22em",
        //height: "22em",
        border: 8,
        marginTop: "15px",
        marginBottom: "15px",
        marginLeft: "10px",
        marginRight: "10px",
      },
      img: {
        width: 250,
        height: 130,
        marginLeft: "5px",
        marginRight: "5px",
        marginTop: "5px",
        objectFit:"cover"
      },
      title:{
        marginLeft:"6px",
        marginTop :"6px",
        marginBottom :"6px"
      },
      name : {
        marginRight:"6px",
        marginTop :"6px",
        marginBottom :"6px",
        color :theme.palette.red.light
      }
}))

const GetCompanies = () => {
    const classes=useStyles();
    const { loadUser } = useContext(authContext);
    const {removecompanies,getCompanies , companies} = useContext(sliderContext);

    useEffect(() => {
        loadUser();
        getCompanies();
        // eslint-disable-next-line
      }, [])
      console.log(companies);
    return (
        <div>
             <Grid container direction="row">
            {companies.length > 0  ?
            companies.map((company)=>(
              <Card 
              className={classes.card}
              key={company._id}>
                <img 
                 className={classes.img}
                src={`https://familyway.sa/uploads/companies/${company.image}`}
                alt="company img" 
                 />
                  <Grid container justify="space-between">
                   <Grid item>
                     <Typography variant="h4" className={classes.title}>
                         الاسم 
                     </Typography>
                   </Grid>
                   <Grid item>
                     <Typography variant="h4" className={classes.name} >
                         {company.name} 
                     </Typography>
                   </Grid>
                 </Grid>
                 <Grid container justify="center">
                   <Button variant="contained" 
                   className={classes.buttondelete} 
                   onClick={()=>removecompanies(company._id)}
                    >
                     مسح
                   </Button>
                 </Grid>
              </Card>
            ))
            :<Animations />}
          </Grid> 
        </div>
    )
}

export default GetCompanies
