import React, { useState, useContext, useEffect } from 'react'
import {
  Card,
  Grid,
  Typography,
  makeStyles,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper
} from '@material-ui/core'
import { couponsContext } from '../contexts/coupons/couponState'
import { authContext } from '../contexts/auth/authstate'
import Animations from './loader'
import Draggable from 'react-draggable'
import moment from 'moment'
import 'moment/locale/ar'

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

const useStyles = makeStyles(theme => ({
  card: {
    width: '22em',
    marginBottom: '8px',
    marginLeft: '8px',
    marginRight: '8px'
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
  buttondialogsubmit: {
    color: 'white',
    backgroundColor: theme.palette.green.main,
    border: 5
  }
}))

const CouponsView = () => {
  const classes = useStyles()
  const [openDialog, setOpenDialog] = useState(false)
  const [id, setid] = useState(null)
  const { loadUser } = useContext(authContext)
  const { coupons, getCoupons, deleteCoupon } = useContext(couponsContext)
  useEffect(
    () => {
      getCoupons()
      loadUser()
    },
    // eslint-disable-next-line
    []
  )

  // handle dialog open
  const handleOpen = id => {
    setOpenDialog(true)
    setid(id)
  }
  console.log(id)
  // handle dialog closed
  const handleClose = () => {
    setOpenDialog(false)
  }

  const handleDelete = () => {
    deleteCoupon(id)
    setOpenDialog(false)
  }

  //console.log(coupons);
  return (
    <React.Fragment>
      <Grid container direction='row'>
        {coupons.length > 0 ? (
          coupons.map(coupon => (
            <Card className={classes.card}>
              <Grid container alignItems='center' direction='column'>
                <Grid item>
                  <Typography variant='h4' color='primary'>
                    {coupon.code}
                  </Typography>
                  <Typography variant='h4' color='primary'>
                    {coupon.message}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant='h4' color='primary'>
                    الخصم : {coupon.discount.saved}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant='h4' color='primary'>
                    عدد الأستخدام : {coupon.end.usedCount}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant='h4' color='primary'>
                    الحد الأقصي : {coupon.end.limit}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant='h4' color='primary'>
                    تاريخ الأنتهاء : {moment(coupon.end.dateLimit).fromNow()}
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    variant='contained'
                    className={classes.buttondelete}
                    onClick={() => handleOpen(coupon._id)}
                  >
                    مسح
                  </Button>
                </Grid>
              </Grid>
            </Card>
          ))
        ) : (
          <Animations />
        )}
      </Grid>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby='draggable-dialog-title'
      >
        <DialogTitle style={{ cursor: 'move' }} id='draggable-dialog-title'>
          <Typography variant='h5' color='primary'>
            هل حقا تريد المسح الكوبون
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container direction='row'>
            <Button
              onClick={handleDelete}
              variant='contained'
              className={classes.removeButon}
            >
              نعم
            </Button>
            <Button
              onClick={handleClose}
              variant='contained'
              className={classes.buttondialogsubmit}
              style={{ width: '20px', marginRight: '15px' }}
            >
              لا
            </Button>
          </Grid>
        </DialogContent>
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

export default CouponsView
