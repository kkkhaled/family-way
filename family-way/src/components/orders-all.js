import React, { useState, useEffect, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Snackbar
} from '@material-ui/core'
import Pagination from '@material-ui/lab/Pagination'
import VisibilityRoundedIcon from '@material-ui/icons/VisibilityRounded'
import { authContext } from '../contexts/auth/authstate'
import { ordersContext } from '../contexts/ordres/orderState'
import Animations from './loader'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { url } from '../constants/constants'
import { Alert } from '@material-ui/lab'

const useStyle = makeStyles(theme => ({
  pagenation: {
    paddingTop: '35px',
    width: 'max-content',
    margin: 'auto'
  },
  head: {
    backgroundColor: '#fafafa'
  }
}))

const OrdersTable = ({ isArchived }) => {
  const [alertData, setAlertData] = useState({ open: false })
  const classes = useStyle()
  const { loadUser } = useContext(authContext)
  const { getOrders, orders, getOrder } = useContext(ordersContext)
  const [limit, setLimit] = useState(12)

  useEffect(() => {
    loadUser()
    loadPagenateOrders()
    // eslint-disable-next-line
  }, [])

  const loadPagenateOrders = page => {
    getOrders(page, limit, isArchived)
  }

  const handleGetOrder = order => {
    getOrder(order._id)
    // SetCurrntOrder(order);
  }

  const archiveOrder = async id => {
    try {
      const response = await axios.put(`${url}order/${id}`, {
        isArchived: true
      })
      setAlertData({
        open: true,
        message: 'تمت الأرشفه',
        type: 'success'
      })
      loadPagenateOrders()
    } catch (error) {
      console.log(error.message)
    }
  }

  const unArchiveOrder = async id => {
    try {
      const response = await axios.put(`${url}order/${id}`, {
        isArchived: false
      })
      setAlertData({
        open: true,
        message: 'تم إلغاء الأرشفه',
        type: 'success'
      })
      loadPagenateOrders()
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <React.Fragment>
      <TableContainer elevation={0} component={Paper}>
        <Table aria-label='simple table'>
          <TableHead className={classes.head}>
            <TableRow>
              <TableCell align='center'>
                <Typography variant='h5'>رقم الطلب</Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography variant='h5'>رقم الهاتف</Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography variant='h5'>الوقت</Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography variant='h5'>السعر</Typography>
              </TableCell>
              <TableCell>
                <Typography variant='h5' align='center'>
                  الحاله
                </Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography variant='h5'>التعليق</Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography variant='h5'>مشاهده</Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography variant='h5'>
                  أرشفه
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders !== null ? (
              orders.orders.map((row, i) => (
                <TableRow key={row._id}>
                  <TableCell align='center'> {row.id}</TableCell>
                  <TableCell align='center'> 1234</TableCell>
                  <TableCell align='center'> {row.time.day}</TableCell>
                  <TableCell align='center'>
                    {' '}
                    {row.totalCost.toFixed(2)}
                  </TableCell>
                  {row.status === 0 ? (
                    <TableCell align='center'> تم استلام الطلب</TableCell>
                  ) : null}
                  {row.status === 1 ? (
                    <TableCell align='center'>مرحلة المراجعة</TableCell>
                  ) : null}
                  {row.status === 2 ? (
                    <TableCell align='center'>جاري التجهيز</TableCell>
                  ) : null}
                  {row.status === 3 ? (
                    <TableCell align='center'>في الطريق </TableCell>
                  ) : null}
                  {row.status === 4 ? (
                    <TableCell align='center'>تم التوصيل</TableCell>
                  ) : null}
                  {row.status === 5 ? (
                    <TableCell align='center'>تحت المراجعة للأسترجاع</TableCell>
                  ) : null}
                  {row.status === 6 ? (
                    <TableCell align='center'>تم الأسترجاع</TableCell>
                  ) : null}
                  {row.status === 7 ? (
                    <TableCell align='center'>لم يتم الاسترجاع</TableCell>
                  ) : null}
                  {row.status === 8 ? (
                    <TableCell align='center'>تم الرفض</TableCell>
                  ) : null}
                  <TableCell align='center'>
                    {' '}
                    <b style={{ color: 'red' }}> تعليق </b>{' '}
                  </TableCell>
                  <TableCell align='center'>
                    <Button
                      component={Link}
                      to={`/order-details/${row._id}`}
                      onClick={() => handleGetOrder(row)}
                    >
                      <VisibilityRoundedIcon />
                    </Button>
                  </TableCell>
                  <TableCell align='center'>
                    <Button
                      onClick={() => {
                        if (isArchived) {
                          unArchiveOrder(row._id)
                        } else {
                          archiveOrder(row._id)
                        }
                      }}
                      variant='outlinedPrimary'
                    >
                      {!isArchived ? ' أرشفة الطلب' : 'إلغاء الأرشفه'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <Animations />
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {orders !== null ? (
        <Pagination
          onChange={(i, page) => {
            loadPagenateOrders(page)
          }}
          count={Math.ceil(orders.pagination.totalItems / limit)}
          color='primary'
          className={classes.pagenation}
        />
      ) : (
        ''
      )}
      <Snackbar
        open={alertData.open}
        autoHideDuration={6000}
        onClose={() => setAlertData(value => (value = false))}
      >
        <Alert
          onClose={() => setAlertData(value => (value = false))}
          severity='success'
        >
          تم أرشفة الطلب بنجاح
        </Alert>
      </Snackbar>
    </React.Fragment>
  )
}
export default OrdersTable
