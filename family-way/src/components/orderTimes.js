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
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
//import EditIcon from '@material-ui/icons/Edit'
import moment from 'moment'
import { authContext } from '../contexts/auth/authstate'
import { ordertimesContext } from '../contexts/orderTimes/ordertimeState'
import 'moment/locale/ar'
import { FormControlLabel } from '@material-ui/core'
import Animations from './loader'
import Draggable from 'react-draggable'

const useStyles = makeStyles(theme => ({
  field: {
    width: '60em',
    marginTop: '10px',
    marginBottom: '10px'
  },
  fieldedit: {
    width: '25em',
    marginTop: '8px',
    marginBottom: '8px'
  },
  buttondelete: {
    color: 'white',
    width: '0.9em',
    border: 8,
    marginTop: '5px',
    marginBottom: '10px',
    backgroundColor: theme.palette.red.light
  },
  removeButon: {
    backgroundColor: theme.palette.red.light,
    color: 'white',
    border: 5,
    marginLeft: '5px'
  },
  formButton: {
    color: 'white',
    border: 5,
    marginTop: '8px'
  },
  buttondialogsubmit: {
    color: 'white',
    backgroundColor: theme.palette.green.main,
    border: 5
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

function PaperComponent (props) {
  return (
    <Draggable
      handle='#draggable-dialog-title'
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  )
}

const OrderTimes = () => {
  const classes = useStyles()
  // define context with state and func
  const {
    ordertimes,
    getOrderstime,
    addNewtime,
    time,
    SetCurrnttime,
    EditOrdertime,
    removetime
  } = useContext(ordertimesContext)
  const { loadUser } = useContext(authContext)

  const [openDialog, setOpenDialog] = useState(false)
  const [alertData, setAlertData] = useState({ open: false })
  const [alertEditData, setAlertEditData] = useState({ open: false })

  const [id, setid] = useState(null)
  // state for add
  const [state, setState] = useState({ isDisabled: false })
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [day, setDay] = useState(null)
  const [maxCount, setMaxCount] = useState(null)
  // state for Edit
  const [idDisabled, setIsDisabled] = useState(false)
  const [EditTo, setEditTo] = useState('')
  const [EditFrom, setEditFrom] = useState('')
  const [EditMaxCount, setEditMaxCount] = useState(null)
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
    if (time !== null) {
      setEditTo(time.value.to)
      setEditFrom(time.value.from)
      setEditMaxCount(time.maxCount)
      setIsDisabled(time.isDisabled)
    }
    // eslint-disable-next-line
  }, [time, ordertimesContext])

  console.log(ordertimes)

  // handle dialog open
  const handleOpen = item => {
    setOpenDialog(true)
    setid(item._id)
    SetCurrnttime(item)
  }
  console.log(id)
  // handle dialog closed
  const handleClose = () => {
    setOpenDialog(false)
  }

  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.checked })
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (from === '' || to === '') {
      setAlertData({
        open: true,
        message: 'تاكد من ادخال البيانات بشكل صحيح   ',
        type: 'error'
      })
    } else if( day === null || day==='' || maxCount === null || maxCount ===''){
      setAlertData({
        open: true,
        message: 'تاكد من ادخال البيانات بشكل صحيح   ',
        type: 'error'
      })
    }
    else {
      addNewtime(from, to, day, state.isDisabled, maxCount)
      setAlertData({
        open: true,
        message: 'تم الاضافه  ',
        type: 'success'
      })
      setFrom('')
      setMaxCount('')
      setTo('')
      setState({ isDisabled: false })
      setDay('')
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

  const handleEditSubmit = e => {
    e.preventDefault()
    if (EditFrom === '') {
      setAlertEditData({
        open: true,
        message: 'تاكد من تحديث البيانات ',
        type: 'error'
      })
    } else if (EditTo === '') {
      setAlertEditData({
        open: true,
        message: 'تاكد من تحديث البيانات      ',
        type: 'error'
      })
    } else if (EditMaxCount === '') {
      setAlertEditData({
        open: true,
        message: ' تاكد من تحديث الحدالاقصي ',
        type: 'error'
      })
    } else {
      EditOrdertime(id, EditFrom, EditTo, idDisabled, EditMaxCount)
      setAlertEditData({
        open: true,
        message: 'تم التعديل  ',
        type: 'success'
      })
      setEditTo('')
      setEditFrom('')
      setEditMaxCount('')
    }
  }

  const EditView = (
    <React.Fragment>
      {alertEditData.open ? (
        <Alert severity={alertEditData.type}>{alertEditData.message}</Alert>
      ) : null}
      <form onSubmit={handleEditSubmit}>
        <Grid>
          <TextField
            label='من'
            className={classes.fieldedit}
            value={EditFrom}
            onChange={e => setEditFrom(e.target.value)}
          />
        </Grid>
        <Grid>
          <TextField
            label='الي'
            className={classes.fieldedit}
            value={EditTo}
            onChange={e => setEditTo(e.target.value)}
          />
        </Grid>
        <Grid>
          <TextField
            label='الحد المسموح في هذا الوقت '
            className={classes.fieldedit}
            value={EditMaxCount}
            onChange={e => setEditMaxCount(e.target.value)}
          />
        </Grid>
        <Grid item style={{ padding: 10, width: '100%' }}>
          <FormControlLabel
            style={{}}
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
        <Alert severity='info' style={{ margin: '10px 0px' }}>
          <strong>لا تقوم بمسح وقت من الاوقات وهوا مستخدم . قم بأيقافه اولاً حتي ينتهي جميع الموصلين بالتوصيل الطلبات علي هذا الوقت وبعدها قم بمسحه ان اردت</strong>
        </Alert>
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
  const ordertimesView = (
    <React.Fragment>
      <Grid container>
        <h2 className={classes.title}>اليوم</h2>
      </Grid>
      <Grid container direction='row'>
        {orders.length > 0 ? (
          ordertimes.map(item => (
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
                  <hr
                    style={{ width: '100%', borderColor: 'rgba(0,0,0,.1)' }}
                  />
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
                    <Grid item style={{ width: '100%' }}>
                    <Button
                      style={{ width: '100%', backgroundColor: '#f6f6f6' }}
                      onClick={() => handleOpen(item)}
                    >
                      <strong>تعديل</strong>
                    </Button>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          ))
        ) : (
          <Animations />
        )}
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
              value={from}
              className={classes.field}
              onChange={e => setFrom(e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              variant='outlined'
              label='الي'
              value={to}
              className={classes.field}
              onChange={e => setTo(e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              variant='outlined'
              label='اليوم'
              value={day}
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
              value={maxCount}
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
      <Dialog
        open={openDialog}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby='draggable-dialog-title'
      >
        <DialogTitle style={{ cursor: 'move' }} id='draggable-dialog-title'>
          <Typography variant='h5' color='primary'>
            هل حقا تريد التعديل او المسح
          </Typography>
        </DialogTitle>
        <DialogContent>{EditView}</DialogContent>
        <DialogActions>
          <Grid container justify='flex-end'>
            <Button
              style={{ marginLeft: '15px' }}
              onClick={() => removetime(id)}
              variant='contained'
              className={classes.removeButon}
            >
              مسح
            </Button>
            <Button
              onClick={handleClose}
              variant='contained'
              className={classes.buttondialogsubmit}
            >
              تم
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export default OrderTimes
