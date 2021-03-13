import React, { useState,useEffect,useContext } from 'react';
import {
  Grid,
  TextField,
  Button,
  FormControlLabel,
  Switch
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import { makeStyles } from '@material-ui/core/styles'
import {thirdcatagoriesContext} from '../contexts/thirdcatagories/thirdState'

const useStyles = makeStyles(theme => ({
    field: {
      width: '25em',
      marginTop: '8px',
      marginBottom: '8px'
    },
    formButton: {
      color: 'white',
      border: 5,
      marginTop: '8px'
    }
  }))

const EditThird=()=>{
    const classes = useStyles()
    // for handlr alert
    const [alertData, setAlertData] = useState({ open: false })
    // for handle switch
    const [name,setName] = useState('');


    const {third,editThirdCatagories} = useContext(thirdcatagoriesContext);

    useEffect(
      () => {
          if (third!== null) {
              console.log(third);
              setName(third.name);
          }
          // eslint-disable-next-line
    }, [third,thirdcatagoriesContext]);

    const handleUpdate=(e)=>{
       e.preventDefault();
       if(third !== null){
       editThirdCatagories(third._id,name)    
       setAlertData({
        open: true,
        type : 'success',
        message:"تم التعديل"
       })
    }
    }
    return(
        <React.Fragment>
        {alertData.open ? (
         <Alert severity={alertData.type}>{alertData.message}</Alert>
        ) : null}
        <form onSubmit={handleUpdate}>
        <Grid>
          <TextField
            label='اسم الصنف الفرعي'
            className={classes.field}
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />
        </Grid>
        <Grid container justify='center'>
          <Grid item>
            <Button
              variant='contained'
              color='primary'
              className={classes.formButton}
              type='submit'
            >
              حفظ
            </Button>
          </Grid>
        </Grid>
        </form>  
        </React.Fragment>
    )
}
export default EditThird;