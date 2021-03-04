import React, { useState, useEffect, useContext } from 'react'
import {
  Grid,
  TextField,
  Button,
  Typography,
  Card,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import { Alert } from '@material-ui/lab'
//import EditIcon from '@material-ui/icons/Edit'
import { authContext } from '../contexts/auth/authstate'
import { catagoriesContext } from '../contexts/catagories/catagoriesState'
import Animations from './loader'
import { Switch } from '@material-ui/core'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import EditIcon from '@material-ui/icons/Edit'
import { url } from '../constants/constants'
import axios from 'axios'

const useStyles = makeStyles(theme => ({
  button: {
    width: '100%',
    color: 'white',
    marginTop: '8px',
    marginBottom: '15px',
    backgroundColor: theme.palette.green.main
  },
  input: {
    flex: '1'
  },
  dialog: {
    width: '100% !important'
  },
  card: {
    margin: '8px',
    width: '260px',
    padding: '6px'
  },
  name: {
    marginLeft: '10px',
    marginRight: '15px'
  },
  editicon: {
    backgroundColor: theme.palette.yellow.main,
    color: 'white',
    marginLeft: '5px',
    cursor: 'pointer',
    borderRadius: '50%',
    padding: 2
  },
  delIcon: {
    color: 'white',
    marginLeft: '5px',
    backgroundColor: theme.palette.secondary.main,
    cursor: 'pointer',
    borderRadius: '50%',
    padding: 2
  },
  cardOfCategories: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '1px solid rgba(0,0,0,.15)',
    borderRadius: 3,
    padding: 10
  }
}))
const AddCatagiories = () => {
  const classes = useStyles()
  const [name, setName] = useState('')
  const [sort, setSort] = useState('')
  const [isCompany, setIsCompany] = useState(false)
  const [alertData, setAlertData] = useState({ open: false })
  const { loadUser } = useContext(authContext)
  const [openDialog, setOpenDialog] = useState(false)
  const [editInput, setEditInput] = useState('')
  const [saveId, setSaveId] = useState(null)
  const {
    getAllCatagories,
    addNewCategories,
    removeOne,
    catagories,
    loading
  } = useContext(catagoriesContext)

  useEffect(
    () => {
      getAllCatagories()
    },
    // eslint-disable-next-line
    []
  )

  //load user data
  useEffect(() => {
    loadUser()
    // eslint-disable-next-line
  }, [])

  // handle add new catagories
  const handleSubmit = e => {
    e.preventDefault()
    if (name === '' || sort === '') {
      setAlertData({
        open: true,
        message: 'تاكد من ادخال البيانات بشكل صحيح',
        type: 'error'
      })
    } else {
      addNewCategories(name, sort, isCompany)
      setAlertData({
        open: true,
        message: 'تم اضافه الصنف  ',
        type: 'success'
      })
      setName('')
      setSort('')
      if (isCompany === true) {
        setIsCompany(false)
      }
    }
  }

  const handleUpdate = async () => {
    console.log(saveId, editInput)
    try {
      const response = await axios.put(`${url}categories/${saveId}`, {
        name: editInput
      })
      console.log(response)
      setAlertData({
        open: true,
        message: 'تم اضافه الصنف',
        type: 'success'
      })
      getAllCatagories()
    } catch (error) {
      console.log(error)
      setAlertData({
        open: true,
        message: error.message,
        type: 'error'
      })
    }
  }

  return (
    <React.Fragment>
      {alertData.open ? (
        <Alert severity={alertData.type}>{alertData.message}</Alert>
      ) : null}
      <form onSubmit={handleSubmit}>
        <Grid container style={{ gridGap: '10px' }}>
          <Grid item style={{ flex: 1 }}>
            <TextField
              style={{ width: '100%' }}
              variant='outlined'
              label='ادخال اسم الصنف'
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </Grid>
          <Grid item style={{ flex: 1 }}>
            <TextField
              style={{ width: '100%' }}
              variant='outlined'
              label='  الترتيب'
              value={sort}
              onChange={e => setSort(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid item style={{ marginTop: '15px' }}>
          <FormControlLabel
            control={
              <Switch
                checked={isCompany}
                onChange={() => setIsCompany(value => !value)}
                name='checkedA'
              />
            }
            label='هل هوا خاص بشركه ؟'
          />
        </Grid>

        <Button variant='contained' className={classes.button} type='submit'>
          انشاء
        </Button>
      </form>
      <Divider />
      <Typography variant='h4' color='primary' style={{ margin: '20px 0px' }}>
        عرض الاصناف الرئسيه
      </Typography>
      <Dialog
        fullWidth={true}
        open={openDialog}
        onClose={() => setOpenDialog(value => (value = false))}
        aria-labelledby='draggable-dialog-title'
      >
        <DialogTitle style={{ cursor: 'move' }} id='draggable-dialog-title'>
          <Typography variant='h4' color='primary'>
            تعديل
          </Typography>
        </DialogTitle>
        <DialogContent>
          <TextField
            id='outlined-basic'
            label='اكتب الأسم الجديد'
            variant='outlined'
            className={classes.dialog}
            onChange={text => {
              setEditInput(text.target.value)
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleUpdate()}
            variant='contained'
            className={classes.dialog}
            style={{
              margin: '0px 15px',
              backgroundColor: '#06f',
              marginBottom: '10px',
              color: '#FFF'
            }}
          >
            تعديل
          </Button>
        </DialogActions>
      </Dialog>
      <Grid container direction='row' style={{ gridGap: '6px' }}>
        {catagories.length > 0 && !loading ? (
          catagories.map(catag => (
            <Grid item className={classes.cardOfCategories} key={catag._id}>
              <Typography variant='h5' className={classes.name}>
                {catag.sort}
              </Typography>
              <Typography variant='h5' className={classes.name}>
                {catag.name}
              </Typography>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <EditIcon
                  fontSize='small'
                  className={classes.editicon}
                  onClick={() => {
                    setSaveId(catag._id)
                    setOpenDialog(value => (value = true))
                  }}
                />
                <DeleteForeverIcon
                  fontSize='small'
                  className={classes.delIcon}
                  onClick={() => {
                    removeOne(catag._id)
                  }}
                />
              </div>
            </Grid>
          ))
        ) : (
          <Animations />
        )}
      </Grid>
    </React.Fragment>
  )
}
export default AddCatagiories
