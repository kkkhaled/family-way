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
} from '@material-ui/core'
import Pagination from "@material-ui/lab/Pagination";
import VisibilityRoundedIcon from '@material-ui/icons/VisibilityRounded';
import { authContext } from '../contexts/auth/authstate';
import {ordersContext} from '../contexts/ordres/orderState';
import Animations from './loader';
import { Link } from 'react-router-dom';

const useStyle = makeStyles(theme => ({
    pagenation: {
        paddingTop: "35px",
        width: "max-content",
        margin: "auto"
      },
}));

const OrdersTable=()=>{
    const classes = useStyle()
    const {loadUser } = useContext(authContext);
    const {getOrders,orders,SetCurrntOrder}=useContext(ordersContext);
    const [subOrderList, setSideOrderList] = useState([
        'جميع الطلبات',
        'تم استلام الطلب',
        'مرحلة المراجعه',
        'جاري التجهيز',
        'في الطريق',
        'تم التوصيل',
        'تحت المراجعة للأسترجاع',
        'تم الأسترجاع',
        'لم يتم الأسترجاع',
        'تم الرفض'
      ])
    const [limit,setLimit]=useState(12)

    useEffect(() => {
         loadUser();
         loadPagenateOrders();
       // eslint-disable-next-line
    }, []);

    const loadPagenateOrders=(page)=>{
        getOrders(page,limit)
    }
   
    console.log(orders);
     
    return(
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
             </TableRow>
          </TableHead>
          <TableBody>
            {orders !== null ?
             orders.orders.map((row,i) => (
              <TableRow key={row.name}>
                  <TableCell align='center'> {row.id}</TableCell>
                <TableCell align='center'> 1234</TableCell>
                <TableCell align='center'> {row.time.day}</TableCell>
                <TableCell align='center'> {row.totalCost}</TableCell>
                <TableCell align='center'> {row.status}</TableCell>
                <TableCell align='center'> </TableCell>
                <TableCell align='center'>
                    <Button 
                         component={Link}
                         to="/order-details"
                        onClick={()=>SetCurrntOrder(row)} >
                        <VisibilityRoundedIcon/>
                    </Button>
                </TableCell>
                 </TableRow>  
            )): <Animations />}
          </TableBody>
        </Table>
      </TableContainer>
            {orders !== null  ?
        <Pagination
          onChange={(i,page) => {
             loadPagenateOrders(page);  
          }}
          count={Math.ceil(orders.pagination.totalItems/limit)}
          color="primary"
          className={classes.pagenation}
        />
      :""}
        </React.Fragment>
    )
}
export default OrdersTable;