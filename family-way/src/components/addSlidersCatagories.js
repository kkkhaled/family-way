import React, { useState, useEffect, useContext, useRef } from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete'
import {
  Grid,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Switch
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import { makeStyles } from '@material-ui/core/styles'
import { sliderContext } from '../contexts/sliderCatagories/sliderCatagoriesState'
import { thirdcatagoriesContext } from '../contexts/thirdcatagories/thirdState'
import { subcatagoriesContext } from '../contexts/subcatagories/subcatagoriesState'
import { productContext } from '../contexts/products/productState'
import { authContext } from '../contexts/auth/authstate'
import DroZone from './DropZone'

const useStyles = makeStyles(theme => ({
  button: {
    color: 'white',
    width: '20em',
    border: 8,
    marginTop: '20px'
  },
  buttonsubmit: {
    color: 'white',
    width: '20em',
    border: 8,
    marginTop: '20px',
    marginLeft: '20px',
    backgroundColor: theme.palette.green.main
  },
  sortField: {
    paddingRight: '80px',
    width: '26em'
  },
  autocomplete: {
    width: '38.5em',
    marginBottom: '15px',
    marginLeft: '50px'
  }
}))

const AddSlider = () => {
  const classes = useStyles()

  const autoCom = useRef(null);
  const autoCom2 = useRef(null);
  const autoCom3 = useRef(null);

  const [control,setControl]=useState(false);

  const [alertData, setAlertData] = useState({ open: false })
  const [dropZoneState, setDropZoneState] = useState(false)
 // const [text, setText] = useState([{ name: 'تحميل !!' }])

  const [files, setFiles] = useState([])
  const [isProduct, setisProduct] = useState(false)
  const [sort, setsort] = useState('')
  const [category, setcategory] = useState(null)
  const [action, setaction] = useState(null)

  const { loadUser } = useContext(authContext)
  const { addNewSliderCatagories, addNewSlider } = useContext(sliderContext)

  const { getAllSubCatagories, subcatagories } = useContext(
    subcatagoriesContext
  )

  const { getAllThirdCatagories, thirdcatagories } = useContext(
    thirdcatagoriesContext
  )
  const { GetProductViaCat, nonPagenateProducts } = useContext(productContext)

  useEffect(
    () => {
      getAllSubCatagories()
      getAllThirdCatagories()
      loadUser()
    },
    // eslint-disable-next-line
    []
  )

   // handle dropzone state
  const SelectFilesButtonHandler = () => {
    setDropZoneState(true)
  }

  const handleDropZoneSave = files => {
    setFiles(files)
  }

  // handle filter input
  const handleRef = (event, item) => {
    if (item) {
      setcategory(item._id)
    }
  }

  const handleFilter = (event, item) => {
    if (item) {
      GetProductViaCat(item._id)
      if(control === false){setControl(true)}
    }
  }

  const handleProduct = (event, item) => {
    if (item) {
      setaction(item._id)
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (sort === '') {
      setAlertData({
        open: true,
        message: 'تاكد من ادخال البيانات بشكل صحيح',
        type: 'error'
      })
    } else if (files.length === 0) {
      setAlertData({
        open: true,
        message: 'تاكد من رفع الصوره  ',
        type: 'error'
      })
    } else if (category === null) {
      setAlertData({
        open: true,
        message: 'تاكد من اختيار الصنف الثالث   ',
        type: 'error'
      })
    } else if (isProduct) {
      if(action !== null ){
      addNewSliderCatagories(category, files, isProduct, sort, action)
      setAlertData({
        open: true,
        message: 'تم الاضافه',
        type: 'success'
      })
      if(control === true){setControl(false)}

      const ele =autoCom.current.getElementsByClassName('MuiAutocomplete-clearIndicator')[0];
      if(ele) ele.click(); 

      const ele2 =autoCom2.current.getElementsByClassName('MuiAutocomplete-clearIndicator')[0];
      if(ele2) ele2.click(); 
     
      const ele3 =autoCom3.current.getElementsByClassName('MuiAutocomplete-clearIndicator')[0];
      if(ele3) ele3.click();

      setFiles([])
      setisProduct(false)
      setsort('')
      setcategory(null)
      setaction(null)
     }else{
     setAlertData({
      open: true,
      message: 'تاكد من اختيار منتج ',
      type: 'error'
    })
     }
    } else if (!isProduct) {
      addNewSlider(category, files, sort)
      setAlertData({
        open: true,
        message: 'تم الاضافه  ',
        type: 'success'
      })
      setFiles([])
      setsort('')
      setcategory(null)

      const ele =autoCom.current.getElementsByClassName('MuiAutocomplete-clearIndicator')[0];
      if(ele) ele.click();

    }
  }

  return (
    <React.Fragment>
      {alertData.open ? (
        <Alert severity={alertData.type}>{alertData.message}</Alert>
      ) : null}
      <form onSubmit={handleSubmit}>
        <Grid container direction='row' justify='center'>
          <Grid item style={{ width: '100%' }}>
            <TextField
              label='الترتيب'
              value={sort}
              onChange={e => setsort(~~e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid item>
          <Button
            variant='contained'
            color='primary'
            className={classes.button}
            onClick={SelectFilesButtonHandler}
          >
            اضافه الملف
          </Button>
        </Grid>
        {subcatagories.length > 0 ? (
          <Autocomplete
          ref={autoCom}
            style={{ width: '100%', margin: '20px 0px' }}
            id='combo-box-demo'
            onChange={handleRef}
            options={subcatagories}
            getOptionLabel={option => option.name}
            renderInput={params => (
              <TextField
                {...params}
                label='اختر الصنف الفرعي'
                variant='outlined'
              />
            )}
          />
        ) : null}
        <Grid container direction='column' justify='center'>
          <Grid item>
            <FormControlLabel
              control={
                <Switch
                  checked={isProduct}
                  onChange={() => setisProduct(value => !value)}
                  name='checkedA'
                />
              }
              label='هل هو منتج ؟'
            />
            {isProduct && thirdcatagories.length > 0 ? (
              <Autocomplete
              ref={autoCom2}
                style={{ width: '100%', margin: '20px 0px' }}
                id='combo-box-demo'
                onChange={handleFilter}
                options={thirdcatagories}
                getOptionLabel={option => option.name}
                renderInput={params => (
                  <TextField
                    {...params}
                    label='اختر الصنف الثالث'
                    variant='outlined'
                  />
                )}
              />
            ) : null}
          </Grid>
          <Grid item>
            {nonPagenateProducts.length > 0  && control ? (
              <Autocomplete
              ref={autoCom3}
                style={{ width: '100%', margin: '20px 0px' }}
                id='combo-box-demo'
                onChange={handleProduct}
                options={nonPagenateProducts}
                getOptionLabel={option => option.title}
                renderInput={params => (
                  <TextField
                    {...params}
                    label='اختر المنتج  '
                    variant='outlined'
                  />
                )}
              />
            ) : null}
          </Grid>
        </Grid>
        <Grid container justify='center'>
          <Button
            variant='contained'
            type='submit'
            className={classes.buttonsubmit}
          >
            تم
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
}

export default AddSlider
