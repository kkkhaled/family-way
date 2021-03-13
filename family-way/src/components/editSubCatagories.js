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
import {subcatagoriesContext} from '../contexts/subcatagories/subcatagoriesState'

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

const EditSub=()=>{
    const classes = useStyles()
    // for handlr alert
    const [alertData, setAlertData] = useState({ open: false })
    // for handle switch
    const [Wide, setWide] = useState(false);
    const [name,setName] = useState('');
    const [sort,setSort] = useState(null);
    const [bio,setBio] = useState('');  

    const {currentSub,editSubCatagories} = useContext(subcatagoriesContext);

    useEffect(
      () => {
          if (currentSub!== null) {
              console.log(currentSub);
              setName(currentSub.name);
              setSort(currentSub.sort);
              setWide(currentSub.wide);
              setBio(currentSub.bio);
          }
          // eslint-disable-next-line
    }, [currentSub,subcatagoriesContext]);

    const handleUpdate=(e)=>{
       e.preventDefault();
       if(currentSub !== null){
       editSubCatagories(currentSub._id,name,sort,bio,Wide);
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
        <Grid>
          <TextField
            label='الترتيب'
            className={classes.field}
            value={sort}
            onChange={(e)=>setSort(e.target.value)}
          />
        </Grid>
        <Grid>
          <TextField
            label='Bio'
            className={classes.field}
            value={bio}
            onChange={(e)=>setBio(e.target.value)}
          />
        </Grid>
        <Grid>
          <FormControlLabel
            control={
              <Switch
                checked={Wide}
                onChange={() => setWide(value => !value)}
                name='checkedA'
              />
            }
            label='  عرض الشاشه بالكامل ؟'
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
export default EditSub;