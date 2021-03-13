import { Button, FormControlLabel, Grid, Switch } from '@material-ui/core'
import React, { useState, useEffect, useContext } from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete'
import {
   Card, 
  Typography, 
  TextField ,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
 } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { catagoriesContext } from '../contexts/catagories/catagoriesState'
import { subcatagoriesContext } from '../contexts/subcatagories/subcatagoriesState'
import EditSub from './editSubCatagories'
import Alert from '@material-ui/lab/Alert'
import axios from 'axios'
import { url } from '../constants/constants'
import Draggable from 'react-draggable'

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
    height: '22em',
    border: 8,
    marginTop: '20px',
    marginBottom: '20px',
    marginLeft: '10px',
    marginRight: '10px'
  },
  font: {
    marginLeft: '10px',
    marginTop: '8px',
    marginBottom: '8px'
  },

  field: {
    width: '60em',
    marginTop: '10px',
    marginBottom: '15px'
  },

  head: {
    marginTop: '20px',
    marginLeft: '10px'
  },
  autocomplete2: {
    width: '38.5em',
    marginBottom: '15px',
    marginTop: '15px',
    marginLeft: '50px'
  },
  itemSpace: {
    marginTop: '12px',
    marginBottom: '12px'
  },
  spacerRight: {
    paddingRight: '8px',
    color: theme.palette.red.light
  },
  spacerLeft: {
    paddingLeft: '8px'
  },
  root: {
    width: '78.7%',
    '& > * + *': {
      marginTop: theme.spacing(10)
    }
  },
  delbtn:{
    marginLeft:"10px",
    marginRight:"7px",
    width:"7.5em"
  },
  editbtn :{
    marginLeft:"7px",
    marginRight :"10px",
    width:"7.5em"
  },
  buttondialogsubmit: {
    color: 'white',
    backgroundColor: theme.palette.green.main,
    border: 5
  },
}))

const SubCatagoryView = () => {
  const classes = useStyles()
  // for pop up
  const [openDialog, setOpenDialog] = useState(false);
  // define component state
  const [text, setText] = useState({ name: 'انتظر تحميل البيانات' })
  const [name, setName] = useState('')
  const { getAllCatagories, catagories} = useContext(
    catagoriesContext
  )

  // render subcatagories state && func
  const {
    getFilteredSubSatagories,
    filterdata,
    removeSubCategory,
    setCurrentSub
  } = useContext(subcatagoriesContext)

  // loading catagories
  useEffect(
    () => {
      getAllCatagories()
    },
    // eslint-disable-next-line
    []
  )

    // handle dialog open
    const handleOpen = sub => {
      setOpenDialog(true)
      setCurrentSub(sub)
    }
  // handle dialog closed
  const handleClose = () => {
    setOpenDialog(false)
  }

  // handle filter input
  const handleFilter = (event, item) => {
    if (item) {
      getFilteredSubSatagories(item._id)
      setName(item.name)
    }
  }

  const hideSubCat = async item => {
    try {
      const response = await axios.put(`${url}subCategory/${item._id}`, {
        isHidden: !item.isHidden
      })
      window.location.reload(false)
    } catch (error) {
      console.log(error)
    }
  }


  const subCatagView = (
    <React.Fragment>
      <Grid container direction='row'>
        {filterdata.length > 0 ? (
          filterdata.map(item => (
            <Card key={item._id} style={{ margin: 10, textAlign: 'center' }}>
              <img
                style={{ width: 200, height: 100 }}
                src={`https://familyway.sa/uploads/subCategories/${item.image}`}
                alt='sub_img'
              />
              <div>
                <FormControlLabel
                  control={
                    <Switch
                      checked={item.isHidden}
                      onChange={() => {
                        hideSubCat(item)
                      }}
                      name='checkedA'
                    />
                  }
                  label='اخفاء'
                />
                <h5 style={{ textAlign: 'center', margin: 10 }}>{item.name}</h5>
                <Grid container direction="row"> 
                 <Grid item>
                <Button
                  className={classes.editbtn}
                  onClick={() => handleOpen(item)}
                  variant='contained'
                  style={{
                    backgroundColor: '#ffd60a',
                    color: '#FFF',
                    marginBottom: 5
                  }}
                     >
                  تعديل
                     </Button>
                   </Grid> 
                  <Grid item>
                <Button
                 className={classes.delbtn}
                  onClick={() => removeSubCategory(item._id)}
                  variant='contained'
                  style={{
                    backgroundColor: '#E91E63',
                    color: '#FFF',
                    marginBottom: 5,
                   }}
                >
                  مسح
                </Button>
                </Grid> 
              
                </Grid>
              </div>
            </Card>
          ))
        ) : (
          <div style={{ margin: '15px 0px', width: '100%' }}>
            <Alert severity='info'>
              <Typography variant='h5'>ادخل الصنف الرئيسى من فضلك</Typography>
            </Alert>
          </div>
        )}
      </Grid>
    </React.Fragment>
  )
  return (
    <React.Fragment>
      <Grid container direction='column'>
        <Typography variant='h4' className={classes.head}>
          عرض الاصناف الفرعيه
        </Typography>
        {subCatagView}
        <Grid item>
          <Autocomplete
            id='combo-box-demo'
            style={{ width: '100%', margin: '15px 0' }}
            options={catagories}
            getOptionLabel={option => option.name}
            onChange={handleFilter}
            renderInput={params => (
              <TextField
                {...params}
                label='اختر الصنف الرئيسى'
                variant='outlined'
              />
            )}
          />
        </Grid>
      </Grid>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby='draggable-dialog-title'
      >
        <DialogTitle style={{ cursor: 'move' }} id='draggable-dialog-title'>
          <Typography variant='h5' color='primary'>
            تعديل بيانات الصنف الفرعي
          </Typography>
        </DialogTitle>
        <DialogContent>
          <EditSub />
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
export default SubCatagoryView
