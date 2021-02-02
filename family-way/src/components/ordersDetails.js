import React, { useState, useEffect, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Typography,
  Paper,
  Button,
  Card,
  Grid,
  Divider,
  Box,
  ListItemText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { Alert } from '@material-ui/lab'
import { authContext } from '../contexts/auth/authstate'
import { ordersContext } from '../contexts/ordres/orderState'
import Draggable from 'react-draggable'
import DroZone from './DropZone'
import Animations from './loader'
import moment from 'moment'
import 'moment/locale/ar'
import { convertPaymentText } from '../constants/constants'

const useStyle = makeStyles(theme => ({
  h5: {
    fontFamily: 'Releway',
    fontSize: '1.44rem',
    fontWeight: 600
  },
  h6: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    color: '#6c5ce7'
  },
  listtext: {
    fontSize: '29px',
    marginLeft: '10px',
    fontWeight: 350
  },
  img: {
    width: '180px',
    height: '180px',
    objectFit: 'contain'
  },
  payment: {
    fontSize: '20px',
    fontWeight: 'normal'
  },
  button: {
    width: '100%',
    color: 'white',
    backgroundColor: theme.palette.green.main,
    marginTop: '5px'
  },
  buttonRefause: {
    width: '100%',
    color: 'white',
    backgroundColor: theme.palette.red.light,
    marginTop: '5px'
  },
  autocomplete: {
    width: '15em',
    margin: '15px 0px',
    display: 'flex',
    justifyContent: 'space-between'
  },
  buttondialogsubmit: {
    color: 'white',
    backgroundColor: theme.palette.green.main,
    border: 5
  },
  field: {
    width: '22em',
    marginTop: '8px',
    marginBottom: '8px'
  },
  formButton: {
    marginTop: '22px',
    marginLeft: '8px',
    color: 'white',
    border: 5
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

const OrdersDetails = props => {
  const classes = useStyle()
  const [openDialog, setOpenDialog] = useState(false)
  const [alertData, setAlertData] = useState({ open: false })
  const [dropZoneState, setDropZoneState] = useState(false)
  const [files, setFiles] = useState([])
  const [status, setstaus] = useState([
    { id: 0, text: 'تم استلام الطلب' },
    { id: 1, text: 'مرحلة المراجعه' },
    { id: 2, text: 'جاري التجهيز' },
    { id: 3, text: 'في الطريق' },
    { id: 4, text: 'تم التوصيل' },
    { id: 5, text: 'تحت المراجعة للأسترجاع' },
    { id: 6, text: 'تم الأسترجاع' },
    { id: 7, text: 'لم يتم الأسترجاع' },
    { id: 8, text: 'تم الرفض' }
  ])

  const [statusId, setstatusId] = useState(null)

  const { loadUser } = useContext(authContext)
  const { updateOrders, refuseOrder, order } = useContext(ordersContext)
  console.log(order)
  // console.log(props.match.params.id);  
  useEffect(() => {
    loadUser();
  //  console.log(props.match.params.id); 
  // console.log(props);  
    // eslint-disable-next-line
  }, [])
  //console.log(props);  

  // handle dropzone state
  const SelectFilesButtonHandler = () => {
    setDropZoneState(true)
  }

  const handleDropZoneSave = files => {
    setFiles(files)
  }

  // handle dialog open
  const handleOpen = () => {
    setOpenDialog(true)
  }

  // handle dialog closed
  const handleClose = () => {
    setOpenDialog(false)
  }
  // handle status id
  const handleStatus = (event, item) => {
    if (item) {
      setstatusId(item.id)
    }
  }
  //console.log(statusId);

  const handleRefuse = () => {
    refuseOrder(order._id, 8)
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (order.bill.length > 0) {
      setAlertData({
        open: true,
        message: ' لا يمكن التعديل علي الطلب ',
        type: 'error'
      })
    } else if (statusId === null) {
      setAlertData({
        open: true,
        message: 'تاكد من اختيار الحاله  ',
        type: 'error'
      })
    } else if (files.length === 0) {
      setAlertData({
        open: true,
        message: 'تاكد من رفع الصوره  ',
        type: 'error'
      })
    } else {
      updateOrders(order._id, files, statusId)
      setAlertData({
        open: true,
        message: 'تم تعديل الطلب ',
        type: 'success'
      })
    }
  }

  const editOrder = (
    <React.Fragment>
      {alertData.open ? (
        <Alert severity={alertData.type}>{alertData.message}</Alert>
      ) : null}
      <form onSubmit={handleSubmit}>
        <Grid container direction='row'>
          <Grid item>
            <Autocomplete
              onChange={handleStatus}
              className={classes.autocomplete}
              style={{ marginRight: 10, flex: 1 }}
              id='combo-box-demo'
              options={status}
              getOptionLabel={option => option.text}
              renderInput={params => (
                <TextField
                  {...params}
                  label='ادخل الحاله  '
                  variant='outlined'
                />
              )}
            />
          </Grid>
          <Grid item>
            <Button
              variant='contained'
              onClick={SelectFilesButtonHandler}
              color='primary'
              className={classes.formButton}
            >
              ارفع الصوره
            </Button>
          </Grid>
        </Grid>
        <Grid container justify='center'>
          <Button
            color='primary'
            variant='contained'
            type='submit'
            className={classes.formButton}
          >
            حفظ
          </Button>
        </Grid>
      </form>
      <DroZone
        open={dropZoneState}
        setOpen={setDropZoneState}
        handleSave={handleDropZoneSave}
      />
    </React.Fragment>
  )

  return (
    <React.Fragment>
      {order.length > 0 ? (
        order.map(order => (
          <Card>
            <Grid container direction='row'>
              <Typography variant='h5' className={classes.h5}>
                الطلب رقم {order.id}#
              </Typography>

              {order.status === 0 ? (
                <Typography
                  variant='h5'
                  className={classes.h5}
                  style={{ paddingRight: '9px' }}
                >
                  الحاله تم استلام الطلب
                </Typography>
              ) : null}
              {order.status === 1 ? (
                <Typography
                  variant='h5'
                  className={classes.h5}
                  style={{ paddingRight: '9px' }}
                >
                  الحاله مرحلة المراجعة
                </Typography>
              ) : null}
              {order.status === 2 ? (
                <Typography
                  variant='h5'
                  className={classes.h5}
                  style={{ paddingRight: '9px' }}
                >
                  الحاله جاري التجهيز
                </Typography>
              ) : null}
              {order.status === 3 ? (
                <Typography
                  variant='h5'
                  className={classes.h5}
                  style={{ paddingRight: '9px' }}
                >
                  الحاله في الطريق
                </Typography>
              ) : null}
              {order.status === 4 ? (
                <Typography
                  variant='h5'
                  className={classes.h5}
                  style={{ paddingRight: '9px' }}
                >
                  الحاله تم التوصيل
                </Typography>
              ) : null}
              {order.status === 5 ? (
                <Typography
                  variant='h5'
                  className={classes.h5}
                  style={{ paddingRight: '9px' }}
                >
                  الحاله تحت المراجعة للاسترجاع
                </Typography>
              ) : null}
              {order.status === 6 ? (
                <Typography
                  variant='h5'
                  className={classes.h5}
                  style={{ paddingRight: '9px' }}
                >
                  الحاله تم الاسترجاع
                </Typography>
              ) : null}
              {order.status === 7 ? (
                <Typography
                  variant='h5'
                  className={classes.h5}
                  style={{ paddingRight: '9px' }}
                >
                  الحاله لم يتم الاسترجاع
                </Typography>
              ) : null}
              {order.status === 8 ? (
                <Typography
                  variant='h5'
                  className={classes.h5}
                  style={{ paddingRight: '9px' }}
                >
                  الحاله تم الرفض
                </Typography>
              ) : null}
            </Grid>
            <Divider />
            <Typography variant='h6' className={classes.h6}>
              المنتجات
            </Typography>

            <Box border={0.1} borderColor='grey.500'>
              <Grid container direction='row'>
                {order.items.map(item => (
                  <Grid
                    item
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <img
                      key={item._id}
                      className={classes.img}
                      src={`https://familyway.sa/uploads/products/${item.image}`}
                      alt='order img'
                    />
                    <Grid item>
                      <p style={{ fontSize: 22 }}>
                        <strong>{item.title}</strong>
                      </p>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Box
              border={0.1}
              borderColor='grey.500'
              style={{ marginTop: 5, padding: 5 }}
            >
              <Typography variant='h6' className={classes.h6}>
                عنوان الشحن
              </Typography>
              <Typography variant='h6' className={classes.payment}>
                {order.shippingAddress.locationName}
              </Typography>
              <Typography variant='h6' className={classes.payment}>
                {order.shippingAddress.addressType}
              </Typography>
              <Typography variant='h6' className={classes.payment}>
                {order.shippingAddress.anyInstructions}
              </Typography>
              <Typography variant='h6' className={classes.payment}>
                {order.shippingAddress.buildNumber}
              </Typography>
              <Typography variant='h6' className={classes.payment}>
                {order.shippingAddress.name}
              </Typography>
              <Typography variant='h6' className={classes.payment}>
                {order.shippingAddress.nearestLandmark}
              </Typography>
            </Box>
            <Box
              border={0.1}
              borderColor='grey.500'
              style={{ marginTop: 5, padding: 5 }}
            >
              <Typography variant='h6' className={classes.h6}>
                وسيله الدفع
              </Typography>
              <Typography variant='h6' className={classes.payment}>
                {convertPaymentText(order.paymentMethod)}
              </Typography>
            </Box>
            {/* <Box
              border={0.1}
              borderColor='grey.500'
              style={{ marginTop: 5, padding: 5 }}
            >
              <div>
                <h5 style={{ color: '#888' }}>
                  <h5 style={{ fontWeight: 'bold' }}>طلبت </h5>
                  {moment(order.createdAt)
                    .subtract(10, 'days')
                    .calendar()}
                  {'  '}
                  {moment(order.createdAt).format('dddd')}
                </h5>
                <h5>التوصيل </h5> {moment(order.time.day).format('dddd')}

              </div>
            </Box> */}
            {order.time.hour !== null ? 
            <Box
              border={0.1}
              borderColor='grey.500'
              style={{ marginTop: 5, padding: 5 }}
            >
             
              <Typography variant='h6' className={classes.h6}>
                ميعاد الطلب
              </Typography>
              <Typography variant='h6' className={classes.payment}>
                {moment(order.time.day).format('dddd')}
              </Typography>
              <Typography variant='h6' className={classes.payment}>
                من {order.time.hour.value.from} - الي {order.time.hour.value.to}
              </Typography>
            </Box>:null}
            <Box
              border={0.1}
              borderColor='grey.500'
              style={{ marginTop: 5, padding: 5 }}
            >
              <Typography variant='h6' className={classes.h6}>
                بيانات المستخدم
              </Typography>
              {order.user.name !== undefined ? (
                <Typography variant='h6' className={classes.payment}>
                  {order.user.name}
                </Typography>
              ) : null}
              <Typography variant='h6' className={classes.payment}>
                النقاط {order.user.points}
              </Typography>
              <Typography variant='h6' className={classes.payment}>
                رقم الهاتف المسجل {order.user.phone}
              </Typography>
            </Box>
            {order.isDriverRated || order.isProductsRated ? (
              <Box
                border={0.1}
                borderColor='grey.500'
                style={{ marginTop: 5, padding: 5 }}
              >
                <Typography variant='h6' className={classes.h6}>
                  التقيمات
                </Typography>
                {order.isDriverRated ? (
                  <Typography variant='h6' className={classes.payment}>
                    تقييم السائق {order.driverRate}
                  </Typography>
                ) : null}
                {order.isProductsRated ? (
                  <Typography variant='h6' className={classes.payment}>
                    تقييم السائق {order.productRate}
                  </Typography>
                ) : null}
              </Box>
            ) : null}
            <Typography variant='h6' className={classes.payment}>
              المبلغ المتوقع {order.expectedMoney}
            </Typography>
            <Typography variant='h6' className={classes.payment}>
              تفاصيل اضافيه {order.details}
            </Typography>
            <Box
              border={0.1}
              borderColor='grey.500'
              style={{ marginTop: 5, padding: 5 }}
            >
              <Typography variant='h6' className={classes.h6}>
                سعر المتجات
              </Typography>
              <Typography variant='h6' className={classes.payment}>
                المبلغ {order.productsCost.toFixed(2)}
              </Typography>
              <Typography variant='h6' className={classes.h6}>
                سعر التوصيل
              </Typography>
              <Typography variant='h6' className={classes.payment}>
                {' '}
                {order.delivery == 0 ? 'مجاناً' : order.delivery.toFixed(2)}
              </Typography>
              <Typography variant='h6' className={classes.h6}>
                اجمالي التكلفه
              </Typography>
              <Typography variant='h6' className={classes.payment}>
                المبلغ {order.totalCost.toFixed(2)}
              </Typography>
            </Box>
            <Button
              variant='contained'
              onClick={handleOpen}
              className={classes.button}
            >
              تعديل
            </Button>
            <Button
              variant='contained'
              onClick={handleRefuse}
              className={classes.buttonRefause}
            >
              رفض الطلب
            </Button>
          </Card>
        ))
      ) : (
        <Animations />
      )}
      <Dialog
        open={openDialog}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby='draggable-dialog-title'
      >
        <DialogTitle style={{ cursor: 'move' }} id='draggable-dialog-title'>
          <Typography variant='h5' color='primary'>
            تعديل بيانات المستخدم
          </Typography>
        </DialogTitle>
        <DialogContent>{editOrder}</DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant='contained'
            className={classes.buttondialogsubmit}
          >
            تم
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export default OrdersDetails
