import React, { useState, useEffect, useContext } from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { Grid, Typography, TextField, Button, Card } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import { makeStyles } from '@material-ui/core/styles'
import { sliderContext } from '../contexts/sliders/sliderstate'

const useStyles = makeStyles(theme => ({
  button: {
    color: 'white',
    width: '20em',
    border: 8,
    marginTop: '20px',
    marginLeft: '20px'
  },
  buttonsubmit: {
    color: 'white',
    width: '20em',
    border: 8,
    marginTop: '20px',
    marginLeft: '20px',
    backgroundColor: theme.palette.green.main
  }
}))

const GetSlider = () => {
  const { getslider, sliders, removeslider } = useContext(sliderContext)

  useEffect(() => {
    getslider()
    // eslint-disable-next-line
  }, [])
  console.log(sliders)
  return (
    <React.Fragment>
      <Typography variant='h4'>عرض سلايدرالاصناف</Typography>
      {/* <Grid container direction="row">
              {sliders.length > 0  ?
               sliders.map((slider)=>(
                   <h1>kkhkh</h1>
               ))  
            :null}
          </Grid> */}
    </React.Fragment>
  )
}

export default GetSlider
