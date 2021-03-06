import React, { useState, useEffect, useContext } from 'react'
import {
  Typography,
  Button,
  Divider,
  Card,
  makeStyles,
  Grid
} from '@material-ui/core'
import { adsContext } from '../contexts/Ads/adsState'
import { authContext } from '../contexts/auth/authstate'
import DroZone from './DropZone'
import Animations from './loader'
import { urlImages } from '../constants/constants'
import { Alert } from '@material-ui/lab'

const useStyles = makeStyles(theme => ({
  button: {
    color: 'white',
    marginTop: '5px',
    marginBottom: '5px',
    width: '100%'
  },
  button2: {
    color: 'white',
    marginTop: '5px',
    marginBottom: '5px',
    width: '100%',
    backgroundColor : theme.palette.red.light
  }
}))

const Ads = () => {
  const classes = useStyles()
  const { loadUser } = useContext(authContext)
  const { Ads, getAds, createAds, removeOne } = useContext(adsContext)
  const [files, setFiles] = useState([])
  const [alertData, setAlertData] = useState({ open: false })
  const [dropZoneState, setDropZoneState] = useState(false)

  useEffect(() => {
    loadUser()
    getAds()
    // eslint-disable-next-line
  }, [])

  // handle dropzone state
  const SelectFilesButtonHandler = () => {
    setDropZoneState(true)
  }

  const handleDropZoneSave = files => {
    setFiles(files)
    createAds(files)
    setAlertData({
      open : true,
      type : 'success',
      message : 'تم التعديل'
    })
  }
  console.log(`${urlImages}AdView/${Ads}`)

  const handleRemove=()=>{
    removeOne();
    setAlertData({
      open : true,
      type : 'success',
      message : 'تم المسح'
    })
  }


  return (
    <React.Fragment>
         {alertData.open ? (
        <Alert severity={alertData.type}>{alertData.message}</Alert>
      ) : null}
      <Grid container direction='column' alignItems='center'>
        <Alert severity='info' style={{ margin: '10px 0px' }}>
          <strong>
            يستحسن ان تكون الصوره 380* 700
          </strong>
        </Alert>
        <Grid item>
          <img
            src={`${urlImages}AdView/${Ads}`}
            style={{ width: 280, height: 'auto', objectFit: 'cover' }}
          />
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
        <Button
          className={classes.button2}
          variant='contained'
          onClick={handleRemove}
          style={{ flex: 1 }}
        >
          مسح الصوره
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
