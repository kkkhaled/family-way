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
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from '@material-ui/core'
import Pagination from "@material-ui/lab/Pagination";
import EditIcon from '@material-ui/icons/Edit'
import SearchIcon from '@material-ui/icons/Search';
import { authContext } from '../contexts/auth/authstate'
import { Switch } from '@material-ui/core'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Animations from './loader'
import Draggable from 'react-draggable'

const useStyle = makeStyles(theme => ({
  head: {
    backgroundColor: '#fafafa'
  },
  editicon: {
    backgroundColor: theme.palette.yellow.main,
    color: 'white',
    marginRight: '5px'
  },
  delIcon: {
    color: 'white',
    backgroundColor: theme.palette.secondary.main
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
    color: 'white',
    border: 5,
    marginTop: '8px'
  },
  pagenation: {
    paddingTop: "35px",
    width: "max-content",
    margin: "auto"
  },
  search :{
    marginBottom :"20px",
    width :"22em"
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

const UsersTable = () => {
  const classes = useStyle()
  const [isBlocked, setIsBlocked] = useState(false);
  const [wallet,setWallet]=useState('');
  const [spin,setSpins]=useState('');
  const [points,setPoints]=useState('');
  const { getAllUsers,EditUsers,users,searchviaName,searchviaPhone,searchuser,loadUser } = useContext(authContext);
  const [userPhone,setUserPhone]=useState(''); 
  //for hanle pop-up
  const [openDialog, setOpenDialog] = useState(false)
  // for pagenate
  const [limit,setLimit]=useState(12)

  // load user data
  useEffect(() => {
    loadUser();
    loadPagenate();
    // eslint-disable-next-line
  }, [])
  
  //console.log(users);
   
  const loadPagenate=(page)=>{
    getAllUsers(page,limit)
     }
  
  // handle dialog open
  const handleClickOpen = (phone) => {
    setOpenDialog(true);
    setUserPhone(phone);
  }
 // console.log(userPhone);

  // handle dialog closed
  const handleClose = () => {
    setOpenDialog(false)
  }

  const handleUpate=(e)=>{
    e.preventDefault();
    EditUsers(userPhone,wallet,points,spin,isBlocked);
  }
  
  // handle search via name
  const handlenameSearch =(e)=>{
    searchviaName(e.target.value);
  } 
 console.log(searchuser);

   // handle search via name
   const handlenamephone =(e)=>{
    searchviaPhone(e.target.value);
  } 


   const dialogContent = (
    <React.Fragment>
      <form onSubmit={handleUpate}>
        <Grid container direction='column'>
          <Grid item>
            <TextField
              variant='outlined'
              label=' المحفظه'
              className={classes.field}
              onChange={(e)=>{setWallet(e.target.value)}}
            />
          </Grid>
          <Grid item>
            <TextField
              variant='outlined'
              label=' النقاط'
              className={classes.field}
              onChange={(e)=>{setPoints(e.target.value)}}
            />
          </Grid>
          <Grid item>
            <TextField
              variant='outlined'
              label=' المحاولات المتاحه'
              className={classes.field}
              onChange={(e)=>{setSpins(e.target.value)}}
            />
          </Grid>
          <Grid item>
            <FormControlLabel
              control={
                <Switch
                  checked={isBlocked}
                  onChange={() => setIsBlocked(value => !value)}
                  name='checkedA'
                />
              }
              label='محظور ؟'
            />
          </Grid>
          <Grid container justify='center'>
            <Grid item>
              <Button
                variant='contained'
                color='primary'
                className={classes.formButton}
                type="submit"
              >
                حفظ
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  )

  return (
    <React.Fragment>
      <Typography variant="h4">
        بحث المستخدمين
      </Typography>
      <Grid container direction="row" justify="space-between">
        <Grid item>
      <TextField label="بحث عن طريق الاسم"
       className={classes.search}
       onChange={handlenameSearch}>
        <SearchIcon />
      </TextField>
      </Grid>
      <Grid item>
      <TextField 
      onChange={handlenamephone}
      label="بحث عن طريق رقم الهاتف"
       className={classes.search}>
        <SearchIcon />
      </TextField>
      </Grid>
      </Grid>
      {searchuser !== null ?
        <TableContainer elevation={0} component={Paper}>
        <Table aria-label='simple table'>
          <TableHead className={classes.head}>
            <TableRow>
              <TableCell align='center'>
                <Typography variant='h5'>العدد</Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography variant='h5'>الاسم</Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography variant='h5'>الدور</Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography variant='h5'>المحفظه</Typography>
              </TableCell>
              <TableCell>
                <Typography variant='h5' align='center'>
                  المحاولات المتاحه
                </Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography variant='h5'>النقاط</Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography variant='h5'>نوع الهاتف</Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography variant='h5'>التعديل</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {searchuser !== null ?
             searchuser.users.map((row,i) => (
              <TableRow key={row.name}>
                <TableCell component='th' scope='row' align='center'>
                  {i+1}
                </TableCell>
                <TableCell align='center'> {row.name}</TableCell>
                <TableCell align='center'> {row.role}</TableCell>
                <TableCell align='center'> {row.wallet}</TableCell>
                <TableCell align='center'> {row.spins}</TableCell>
                <TableCell align='center'> {row.points}</TableCell>
                <TableCell align='center'> اندرويد</TableCell>
                <TableCell align='center'>
                  <EditIcon
                    className={classes.editicon}
                    onClick={()=>handleClickOpen(row.phone)}
                  />
                </TableCell>
              </TableRow>  
            )): <Animations />}
          </TableBody>
        </Table>
      </TableContainer> : 
      <TableContainer elevation={0} component={Paper}>
        <Table aria-label='simple table'>
          <TableHead className={classes.head}>
            <TableRow>
              <TableCell align='center'>
                <Typography variant='h5'>العدد</Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography variant='h5'>الاسم</Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography variant='h5'>الدور</Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography variant='h5'>المحفظه</Typography>
              </TableCell>
              <TableCell>
                <Typography variant='h5' align='center'>
                  المحاولات المتاحه
                </Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography variant='h5'>النقاط</Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography variant='h5'>نوع الهاتف</Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography variant='h5'>التعديل</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users !== null ?
             users.users.map((row,i) => (
              <TableRow key={row.name}>
                <TableCell component='th' scope='row' align='center'>
                  {i+1}
                </TableCell>
                <TableCell align='center'> {row.name}</TableCell>
                <TableCell align='center'> {row.role}</TableCell>
                <TableCell align='center'> {row.wallet}</TableCell>
                <TableCell align='center'> {row.spins}</TableCell>
                <TableCell align='center'> {row.points}</TableCell>
                <TableCell align='center'> اندرويد</TableCell>
                <TableCell align='center'>
                  <EditIcon
                    className={classes.editicon}
                    onClick={()=>handleClickOpen(row.phone)}
                  />
                </TableCell>
              </TableRow>  
            )): <Animations />}
          </TableBody>
        </Table>
      </TableContainer>}
      {users !== null && searchuser === null?
        <Pagination
          onChange={(i,page) => {
             loadPagenate(page);  
          }}
          count={Math.ceil(users.pagination.totalItems/limit)}
          color="primary"
          className={classes.pagenation}
        />
      :""}
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
        <DialogContent>{dialogContent}</DialogContent>
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
export default UsersTable
