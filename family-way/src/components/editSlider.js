import React, { useState,useEffect,useContext } from 'react';
import {
  Grid,
  TextField,
  Button,
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import { makeStyles } from '@material-ui/core/styles'
import {sliderContext} from '../contexts/sliders/sliderstate'

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

const EditSlider=()=>{
const classes = useStyles()
// for handlr alert
const [alertData, setAlertData] = useState({ open: false });
const [sort,setSort] = useState(null);

const {currentslider,EditSliders} = useContext(sliderContext);
 
useEffect(
    () => {
        if (currentslider!== null) {
            console.log(currentslider);
            setSort(currentslider.sort);
        }
        // eslint-disable-next-line
  }, [currentslider,sliderContext]);

  const handleUpdate=(e)=>{
    e.preventDefault();
    if(currentslider !== null || currentslider !== ''){
    EditSliders(currentslider._id,sort);
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
        label='الترتيب'
        className={classes.field}
        value={sort}
        onChange={(e)=>setSort(e.target.value)}
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
export default EditSlider;