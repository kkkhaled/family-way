import React,{useState,useEffect,useContext} from 'react'
import { Typography , Button ,Divider,Card,makeStyles,Grid} from '@material-ui/core'
import {adsContext} from '../contexts/Ads/adsState'
import { authContext } from '../contexts/auth/authstate'
import DroZone from './DropZone'
import Animations from './loader'

const useStyles = makeStyles(theme => ({
    button: {
      color: 'white',
      marginTop :"5px",
      marginBottom :"5px",
      width :"100%"
    },
   
  }))

const Ads = () => {
    const classes= useStyles();
    const { loadUser } = useContext(authContext);
    const {Ads,getAds,createAds,removeOne} = useContext(adsContext)
    const [files, setFiles] = useState([]);
    const [alertData, setAlertData] = useState({ open: false });
    const [dropZoneState, setDropZoneState] = useState(false)

     useEffect(() => {
        loadUser();
        getAds();
        // eslint-disable-next-line
      }, [])

      console.log(Ads);

  // handle dropzone state
  const SelectFilesButtonHandler = () => {
    setDropZoneState(true)
  }

  const handleDropZoneSave = files => {
    setFiles(files);
    createAds(files);
  }

      return (
        <React.Fragment>
          <Grid container direction="column" alignItems='center' > 
           <Grid item>
            <Typography variant="h4">
                انشاء اعلان جديد
            </Typography>
             </Grid>
            <Button
            className={classes.button}
              color='primary'
              variant='contained'
              onClick={SelectFilesButtonHandler}
              style={{ flex: 1 }}
            >
              ادخل الصور
            </Button>
            </Grid>
           <DroZone
        open={dropZoneState}
        setOpen={setDropZoneState}
        handleSave={handleDropZoneSave}
      />
        </React.Fragment>
    )
}

export default Ads
