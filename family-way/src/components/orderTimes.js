import React, { useState, useContext, useEffect } from 'react'
import {
  Grid,
  TextField,
  Typography,
  Switch,
  makeStyles,
  Button,
  Divider,
  Card,
  IconButton
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import EditIcon from '@material-ui/icons/Edit'
import moment from 'moment'
import { authContext } from '../contexts/auth/authstate'
import { ordertimesContext } from '../contexts/orderTimes/ordertimeState'
import 'moment/locale/ar'
import { FormControlLabel } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  field: {
    width: '60em',
    marginTop: '10px',
    marginBottom: '10px'
  },
  font: {
    marginTop: '5px'
  },
  switch: {
    marginLeft: '10px'
  },
  head: {
    marginTop: '12px',
    marginLeft: '10px'
  },
  button: {
    width: '17em',
    color: 'white',
    border: 5,
    marginTop: '8px',
    marginBottom: '15px',
    marginRight: '120px',
    backgroundColor: theme.palette.green.main
  },
  title: {
    color: theme.palette.primary.main,
    marginLeft: '4px'
  },
  card: {
    width: '280px',
    marginLeft: '8px',
    marginRight: '8px',
    marginBottom: '8px',
    marginTop: '8px'
  },
  fromtitle: {
    marginLeft: '6px'
  },
  from: {
    color: '#95a5a6'
  },
  to: {
    color: '#95a5a6',
    marginRight: '42px'
  },
  status: {
    marginTop: '3px',
    marginBottom: '3px',
    color: theme.palette.green.main,
    marginLeft: '4px'
  },
  maxtitle: {
    marginLeft: '4px',
    marginTop: '3px',
    marginBottom: '3px'
  },
  editIcon: {
    marginRight: '35px',
    backgroundColor: theme.palette.yellow.main
  }
}))

const OrderTimes = () => {
  const classes = useStyles()
  // define context with state and func
  const {
    ordertimes,
    getOrderstime,
    addNewtime,
    EditOrdertime,
    removetime
  } = useContext(ordertimesContext)
  const { loadUser } = useContext(authContext)

  const [alertData, setAlertData] = useState({ open: false })

  const [state, setState] = useState({ isDisabled: false })
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [day, setDay] = useState(null)
  const [maxCount, setMaxCount] = useState(null)
  const [idDisabled, setIsDisabled] = useState(false)
  const [data, setData] = useState([
    {
      value: {
        from: '9ص',
        to: '12م'
      },
      isDisabled: false,
      currentCount: 11,
      day: 1,
      maxCount: 50
    },
    {
      value: {
        from: '12م',
        to: '3م'
      },
      isDisabled: false,
      currentCount: 2,
      day: 2,
      maxCount: 50
    },
    {
      value: {
        from: '3م',
        to: '6م'
      },
      isDisabled: true,
      currentCount: 26,
      day: 2,
      maxCount: 50
    },
    {
      value: {
        from: '3م',
        to: '6م'
      },
      isDisabled: true,
      currentCount: 2,
      day: 3,
      maxCount: 50
    },
    {
      value: {
        from: '3م',
        to: '6م'
      },
      isDisabled: true,
      currentCount: 8,
      day: 3,
      maxCount: 50
    },
    {
      value: {
        from: '6م',
        to: '12م'
      },
      isDisabled: true,
      currentCount: 37,
      day: 2,
      maxCount: 50
    },
    {
      value: {
        from: '9',
        to: '12ص'
      },
      isDisabled: false,
      currentCount: 50,
      day: 1,
      maxCount: 50
    }
  ])

  const date = moment()
    .add(3, 'days')
    .calendar({
      sameDay: '[اليوم]LTS',
      nextDay: 'غدا',
      nextWeek: 'dddd'
    })
  //console.log(date);
  const [orders, setOrders] = useState([])
  useEffect(() => {
    loadUser()
    getOrderstime()
    // eslint-disable-next-line
  }, [])
  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.checked })
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (from === '' || to === '' || day === null || maxCount === null) {
      setAlertData({
        open: true,
        message: 'تاكد من ادخال البيانات بشكل صحيح   ',
        type: 'error'
      })
    } else {
      addNewtime(from, to, day, state.isDisabled, maxCount)
      setAlertData({
        open: true,
        message: 'تم الاضافه  ',
        type: 'success'
      })
      setFrom('')
      setMaxCount(null)
      setTo('')
      setState({ isDisabled: false })
      setDay(null)
    }
  }

  useEffect(() => {
    const handleOrderTime = () => {
      var allTimes = []
      const handleTime = ordertimes
        .map((item, index) => {
          if (
            allTimes[item.day - 1] === undefined ||
            allTimes[item.day - 1].length == 0
          ) {
            return (allTimes[item.day - 1] = [item])
          } else {
            return allTimes[item.day - 1].push(item)
          }
        })
        .filter(itemFilter => {
          return Array.isArray(itemFilter)
        })
      setOrders(value => (value = allTimes))
    }

    handleOrderTime()
  }, [ordertimes])

  const ordertimesView = (
    <React.Fragment>
      <Grid container>
        <h2 className={classes.title}>اليوم</h2>
      </Grid>
      <Grid container direction='row'>
        {data.map(item => (
          <Grid item>
            <Card className={classes.card}>
              <Grid container>
                <Grid
                  item
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: 10
                  }}
                >
                  <Typography
                    variant='h5'
                    style={{ display: 'flex', color: '#999' }}
                  >
                    {moment()
                      .add(item.day, 'days')
                      .format('l')}
                  </Typography>
                  <Typography
                    variant='h5'
                    style={{ display: 'flex', color: '#999' }}
                  >
                    {moment()
                      .add(item.day, 'days')
                      .format('dddd')}
                  </Typography>
                </Grid>
                <hr style={{ width: '100%', borderColor: 'rgba(0,0,0,.1)' }} />
                <Grid
                  item
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: 10
                  }}
                >
                  <Typography variant='h4' style={{ display: 'flex' }}>
                    من : {item.value.from}
                  </Typography>
                  <Typography variant='h4' style={{ display: 'flex' }}>
                    الي : {item.value.to}
                  </Typography>
                </Grid>
                <Grid item style={{ padding: 10, width: '100%' }}>
                  <Typography variant='h5' style={{ display: 'flex' }}>
                    العدد الحالي : {item.currentCount}
                  </Typography>
                </Grid>
                <Grid item style={{ padding: 10, width: '100%' }}>
                  <Typography variant='h5' style={{ display: 'flex' }}>
                    الحد الأقصي : {item.maxCount}
                  </Typography>
                </Grid>
                <Grid item style={{ padding: 10, width: '100%' }}>
                  <FormControlLabel
                    style={{  }}
                    control={
                      <Switch
                        checked={idDisabled}
                        onChange={() => setIsDisabled(value => !value)}
                        name='checkedB'
                        color='primary'
                      />
                    }
                    label='ايقاف هذا التوقيت'
                  />
                </Grid>
                <Grid item style={{ width: '100%' }}>
                  <Button style={{ width: '100%', backgroundColor: '#f6f6f6' }}>
                    <strong>تعديل</strong>
                  </Button>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  )

  return (
    <React.Fragment>
      {alertData.open ? (
        <Alert severity={alertData.type}>{alertData.message}</Alert>
      ) : null}
      <form onSubmit={handleSubmit}>
        <Grid container direction='column'>
          <Grid item>
            <TextField
              variant='outlined'
              label='من'
              className={classes.field}
              onChange={e => setFrom(e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              variant='outlined'
              label='الي'
              className={classes.field}
              onChange={e => setTo(e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              variant='outlined'
              label='اليوم'
              className={classes.field}
              onChange={e => setDay(e.target.value)}
            />
          </Grid>
          <Grid container direction='row' justify='center'>
            <Grid item>
              <Typography variant='h5' className={classes.font}>
                اغلاق
              </Typography>
            </Grid>
            <Grid item>
              <Switch
                className={classes.switch}
                checked={state.isDisabled}
                onChange={handleChange}
                color='primary'
                name='isDisabled'
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            </Grid>
          </Grid>
          <Grid item>
            <TextField
              variant='outlined'
              label='الحد المسموح في هذا الوقت '
              className={classes.field}
              onChange={e => setMaxCount(e.target.value)}
            />
          </Grid>
          <Grid container justify='center'>
            <Grid item>
              <Button
                type='submit'
                variant='contained'
                className={classes.button}
              >
                تم
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
      <Divider />
      {ordertimesView}
    </React.Fragment>
  )
}

export default OrderTimes
