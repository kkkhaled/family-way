import React, { useEffect, useState, useContext } from 'react'
import { Grid, Typography, Button, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Alert } from '@material-ui/lab'
import { authContext } from '../contexts/auth/authstate'

const useStyles = makeStyles(theme => ({
  page: {
    backgroundColor: '#9b59b6',
    padding: '200px'
  },
  field: {
    width: '30em',
    marginTop: '25px',
    marginBottom: '25px',
    backgroundColor: '#fff'
  },
  alert: {
    width: '30em',
    marginTop: '40px'
  },
  button: {
    width: '30em',
    color: 'white',
    backgroundColor: '#9b59b6',
    fontWeight: 'bold'
  },
  box: {
    backgroundColor: 'white',
    padding: '40px'
  }
}))

const PhoneNumber = props => {
  const classes = useStyles()
  // define state for numbers
  const [phoneNumber, setPhoneNumber] = useState('')
  const [codeNumber, setCodeNumber] = useState('')
  // define state for control alert
  const [alertData, setAlertData] = useState({
    type: 'info',
    message: 'من فضلك ادخل رقم الهاتف و كود التفعيل'
  })
  //getting function from context
  const { addPhoneNumber, phone, addCodeNumber, isAuthenticated , user} = useContext(
    authContext
  )

  //loadphone
  useEffect(() => {
    if (isAuthenticated && user.role === 'ADMIN') {
      props.history.push('/')
    }
    if (phone !== null) {
      console.log(phone)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authContext, phone, isAuthenticated, props.history])

  // handle phone state and addPhone func
  const handleSubmit = e => {
    e.preventDefault()
    if (phone) {
      addCodeNumber(phoneNumber, codeNumber)
    } else {
      addPhoneNumber(phoneNumber)
    }
  }

  return (
    <div className={classes.page}>
      {user !== null && user.role !== 'ADMIN' ?
      <Alert severity="error">
        لا يمكن تسجيل الدخول لغير الادمن 
      </Alert>
      :null}
      <Grid container justify='center' alignItems='center' direction='column'>
        <form
          noValidate
          autoComplete='off'
          className={classes.box}
          onSubmit={handleSubmit}
        >
          <Grid item>
            {phone ? (
              <Alert severity='success' className={classes.alert}>
                <Typography variant='h5'> كود التفعيل {phone.code}</Typography>
              </Alert>
            ) : (
              <Alert severity={alertData.type} className={classes.alert}>
                {alertData.message}
              </Alert>
            )}
          </Grid>
          {phone ? (
            <Grid item>
              <TextField
                variant='outlined'
                label='كود التفعيل'
                className={classes.field}
                value={codeNumber}
                onChange={e => setCodeNumber(e.target.value)}
              />
            </Grid>
          ) : (
            <Grid item>
              <TextField
                variant='outlined'
                label='رقم الهاتف'
                className={classes.field}
                value={phoneNumber}
                onChange={e => setPhoneNumber(e.target.value)}
              />
            </Grid>
          )}

          <Grid item>
            <Button
              variant='contained'
              className={classes.button}
              type='submit'
            >
              تسجيل
            </Button>
          </Grid>
        </form>
      </Grid>
    </div>
  )
}

export default PhoneNumber
