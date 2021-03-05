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
  Button
} from '@material-ui/core'
import VisibilityRoundedIcon from '@material-ui/icons/VisibilityRounded'
import { Link } from 'react-router-dom'
import Animations from './loader'
import { authContext } from '../contexts/auth/authstate'
import moment from 'moment'
import 'moment/locale/ar'
import { url } from '../constants/constants'
import axios from 'axios'

const useStyle = makeStyles(theme => ({
    head: {
      backgroundColor: '#fafafa'
    },
}))

const Emails =()=>{
    const classes = useStyle()
    const [emails,setEmails]=useState([])
    const {loadUser } = useContext(authContext)
     // load user data
     useEffect(() => {
     loadUser()
     getEmails()
    // eslint-disable-next-line
  }, [])

const getEmails=()=>{
    axios.get(`${url}/mail`)
         .then(res => setEmails(res.data))
         .catch(err => console.log(err))
}  

//   const date ="2020-03-05T10:04:43.925Z"
//   console.log(moment(date).fromNow());
//   const msg = 'ghjkllll'
//   console.log(msg.slice(0,3)); 
   return(
       <React.Fragment>
         <TableContainer elevation={0} component={Paper}>
          <Table aria-label='simple table'>
            <TableHead className={classes.head}>
            <TableRow>
                <TableCell align='center'>
                  <Typography variant='h5'>الاسم</Typography>
                </TableCell>
                <TableCell align='center'>
                  <Typography variant='h5'>الرقم</Typography>
                </TableCell>
                <TableCell align='center'>
                  <Typography variant='h5'>البريد</Typography>
                </TableCell>
                <TableCell align='center'>
                  <Typography variant='h5'>الرساله</Typography>
                </TableCell>
                <TableCell align='center'>
                  <Typography variant='h5'>الوقت</Typography>
                </TableCell>
                <TableCell align='center'>
                  <Typography variant='h5'>مشاهده </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                {emails.length > 0 ?
                   emails.map((row,i)=>(
                    <TableRow key={row._id}>
                    <TableCell align='center'> {row.name}</TableCell>
                    <TableCell align='center'> {row.phone}</TableCell>
                    <TableCell align='center'> {row.emailAddress}</TableCell>
                    <TableCell align='center'> {row.message.slice(0,4)}</TableCell>
                    <TableCell align='center'> {moment(row.createdAt).fromNow()}</TableCell>
                    <TableCell align='center'>
                      <Button component={Link}  to={`/email-details/${row._id}`}  >
                        <VisibilityRoundedIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                   ))
                :<Animations />}
            </TableBody>
          </Table>
        </TableContainer>
       </React.Fragment>
   )
}
export default Emails