import React, { useState, useEffect, useContext, useRef } from 'react'
import { Grid, TextField, Button, Divider } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { makeStyles } from '@material-ui/core/styles'
import { Switch } from '@material-ui/core'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import DroZone from './DropZone'
import { productContext } from '../contexts/products/productState'
import { thirdcatagoriesContext } from '../contexts/thirdcatagories/thirdState'
import { authContext } from '../contexts/auth/authstate'
import { Alert } from '@material-ui/lab'

const useStyles = makeStyles(theme => ({
  field: {
    width: '32em',
    marginRight: '15px',
    marginBottom: '15px',
    marginTop: '15px'
  },
  button: {
    color: 'white',
    border: 8
  },
  buttonsubmit: {
    color: 'white',
    width: '20em',
    border: 8,
    marginTop: '20px',
    marginLeft: '20px',
    backgroundColor: theme.palette.green.main
  },
  detailsfield: {
    width: '100%'
  },
  containerTwoColumns: {
    width: '100%',
    marginTop: '15px',
    gridGap: '10px',
    flexWrap: 'no-wrap',
    display: 'flex'
  }
}))

const AddProducts = () => {
  const classes = useStyles()
  const autoCom = useRef(null)
  const autoCom2 = useRef(null)
  const autoCom3 = useRef(null)

  const { loadUser } = useContext(authContext)
  const { getAllThirdCatagories, thirdcatagories } = useContext(
    thirdcatagoriesContext
  )
  const { addProducts } = useContext(productContext)

  const [alertData, setAlertData] = useState({ open: false })

  //const [thirdId,setThirdId]=useState('');
  const [barCode, setBarCode] = useState(null)
  const [files, setFiles] = useState([])
  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')
  const [categories, setCategories] = useState(null)
  const [price, setPrice] = useState(null)
  const [increaseCount, setincreaseCount] = useState(null)
  const [valueOfAdd, setValueOfAdd] = useState('منتجات')
  const [unit, setUnit] = useState(null)
  const [isCard, setIsCard] = useState(false)
  //const [userMax, setUserMax] = useState('');
  //const [inStock, setinStock] = useState('');
  //const [boxUnit, setboxUnit] = useState('');
  const [discount, setDiscount] = useState(0)
  //const [sold, setSold] = useState('')
  const [variationId, setVariationId] = useState('')
  const [discountEnds, setDiscountEnds] = useState('')

  const [dropZoneState, setDropZoneState] = useState(false)

  const [text, setText] = useState(null)

  const [switchOne, setISwitchOne] = useState(false)
  const [switchtwo, setISwitchtwo] = useState(false)

  const [units, setUnits] = useState([
    { id: 1, name: 'حبه' },
    { id: 2, name: 'اوتر' },
    { id: 3, name: 'كيلو' },
    { id: 4, name: 'كرتونه' }
  ])

  useEffect(
    () => {
      getAllThirdCatagories()
      loadUser()
    },
    // eslint-disable-next-line
    []
  )

  // handle filter input
  const handleFilter = (event, item) => {
    if (item) {
      //setThirdId(item._id);
      setCategories(item._id)
    }
  }

  const handleUnit = (event, item) => {
    if (item) {
      setUnit(item.id)
    }
  }

  // handle dropzone state
  const SelectFilesButtonHandler = () => {
    setDropZoneState(true)
  }

  const handleDropZoneSave = files => {
    setFiles(files)
  }

  // handle add and put prouct
  const handleSubmit = e => {
    e.preventDefault()

    if (valueOfAdd == 'منتجات') {
      // console.log(barCode,categories,files,details);
      if (switchtwo === false) {
        setDiscount(0)
      }
      if (categories === null || categories === '') {
        setAlertData({
          open: true,
          message: 'تاكد من ادخال القسم الثالث',
          type: 'error'
        })
      } else if (files.length === 0) {
        setAlertData({
          open: true,
          message: 'تاكد من رفع الصوره  ',
          type: 'error'
        })
      } else if (title === '') {
        setAlertData({
          open: true,
          message: 'تاكد من ادخال اسم المنتج',
          type: 'error'
        })
      } else if (details === '') {
        setAlertData({
          open: true,
          message: 'تاكد من ادخال تفاصيل المنتج',
          type: 'error'
        })
      } else if (price === null || price === '') {
        setAlertData({
          open: true,
          message: 'تاكد من ادخال سعر المنتج',
          type: 'error'
        })
      } else if (increaseCount === null || increaseCount === '') {
        setAlertData({
          open: true,
          message: 'تاكد من ادخال مقدار الزياده ',
          type: 'error'
        })
      } else if (increaseCount === '') {
        setAlertData({
          open: true,
          message: 'تاكد من ادخال الوحده ',
          type: 'error'
        })
      } else {
        addProducts(
          barCode,
          files,
          title,
          details,
          categories,
          price,
          increaseCount,
          unit,
          discount,
          //  sold,
          variationId,
          discountEnds
        )
        setAlertData({
          open: true,
          message: 'تم اضافه المنتج ',
          type: 'success'
        })
        setBarCode('')
        setTitle('')
        setFiles([])
        setDetails('')
        setPrice('')
        setCategories('')
        setincreaseCount('')
        setUnit(null)
        setDiscount(0)
        setDiscountEnds('')
        setVariationId('')
        setISwitchOne(false)
        setISwitchtwo(false)
        setText(null)
        //autoCom.searchText = '';
        const ele2 = autoCom2.current.getElementsByClassName(
          'MuiAutocomplete-clearIndicator'
        )[0]
        if (ele2) ele2.click()

        const ele = autoCom.current.getElementsByClassName(
          'MuiAutocomplete-clearIndicator'
        )[0]
        if (ele) ele.click()
      }
    } else {
      if (categories === null || categories === '') {
        setAlertData({
          open: true,
          message: 'تاكد من ادخال القسم الثالث',
          type: 'error'
        })
      } else if (files.length === 0) {
        setAlertData({
          open: true,
          message: 'تاكد من رفع الصوره  ',
          type: 'error'
        })
      } else if (title === '') {
        setAlertData({
          open: true,
          message: 'تاكد من ادخال اسم المنتج',
          type: 'error'
        })
      } else if (details === '') {
        setAlertData({
          open: true,
          message: 'تاكد من ادخال تفاصيل المنتج',
          type: 'error'
        })
      } else if (price === null || price === '') {
        setAlertData({
          open: true,
          message: 'تاكد من ادخال سعر المنتج',
          type: 'error'
        })
      }
      addProducts(
        Math.random().toString(),
        files,
        title,
        details,
        categories,
        price,
        1,
        '1',
        '',
        '',
        null,
        isCard
      )
      setTitle('')
      setFiles([])
      setDetails('')
      setPrice('')
      setCategories('')
    }
  }
  return (
    <React.Fragment>
      {alertData.open ? (
        <Alert severity={alertData.type}>{alertData.message}</Alert>
      ) : null}
      <form onSubmit={handleSubmit}>
        <Grid container>
          <Autocomplete
            style={{ marginBottom: 20 }}
            className={classes.detailsfield}
            defaultValue='منتجات'
            onChange={(event, text) => {
              if (valueOfAdd == 'منتجات') {
                setIsCard(value => (value = true))
              } else {
                setIsCard(value => (value = false))
              }
              setValueOfAdd(value => (value = text))
              console.log(valueOfAdd)
            }}
            options={['منتجات', 'كروت']}
            getOptionLabel={option => option}
            renderInput={params => (
              <TextField {...params} label='انشاء ماذا ؟' variant='outlined' />
            )}
          />
          {valueOfAdd == 'منتجات' ? (
            <>
              <Grid item style={{ width: '100%' }}>
                <Autocomplete
                  ref={autoCom}
                  className={classes.detailsfield}
                  id='combo-box-demo'
                  onChange={handleFilter}
                  options={thirdcatagories}
                  searchText={text}
                  getOptionLabel={option => option.name}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label='اختر الصنف الثالث'
                      variant='outlined'
                    />
                  )}
                />
              </Grid>
              <Grid item className={classes.containerTwoColumns}>
                <TextField
                  variant='outlined'
                  value={title}
                  label='اسم المنتج'
                  onChange={e => setTitle(e.target.value)}
                  style={{ flex: 1 }}
                />
                <TextField
                  variant='outlined'
                  label='التفاصيل'
                  value={details}
                  onChange={e => setDetails(e.target.value)}
                  style={{ flex: 1 }}
                />
              </Grid>

              <Grid item className={classes.containerTwoColumns}>
                <TextField
                  variant='outlined'
                  value={price}
                  label='ادخل السعر'
                  onChange={e => setPrice(e.target.value)}
                  style={{ flex: 1 }}
                />
                <TextField
                  variant='outlined'
                  label=' مقدار الزياده'
                  value={increaseCount}
                  onChange={e => setincreaseCount(e.target.value)}
                  style={{ flex: 1 }}
                />
                <Autocomplete
                  id='combo-box-demo'
                  ref={autoCom2}
                  options={units}
                  onChange={handleUnit}
                  style={{ flex: 1 }}
                  getOptionLabel={option => option.name}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label='   الوحده'
                      variant='outlined'
                    />
                  )}
                />
              </Grid>
              <Grid item className={classes.containerTwoColumns}>
                <TextField
                  variant='outlined'
                  value={barCode}
                  onChange={e => setBarCode(e.target.value)}
                  label='باركود'
                  style={{ flex: 1 }}
                />
                <Button
                  color='primary'
                  variant='contained'
                  onClick={SelectFilesButtonHandler}
                  className={classes.button}
                  style={{ flex: 1 }}
                >
                  ادخل الصور
                </Button>
              </Grid>
              <Grid item className={classes.containerTwoColumns}>
                <FormControlLabel
                  style={{ flex: 1 }}
                  control={
                    <Switch
                      checked={switchOne}
                      onChange={() => setISwitchOne(value => !value)}
                      name='checkedA'
                    />
                  }
                  label='دمج اكثر من منتج ؟'
                />
              </Grid>

              {switchOne ? (
                <Grid
                  item
                  className={classes.containerTwoColumns}
                  style={{ margin: 0 }}
                >
                  <TextField
                    style={{ flex: 1 }}
                    variant='outlined'
                    label=' اوجه التشابه'
                    value={variationId}
                    onChange={e => setVariationId(e.target.value)}
                  />
                </Grid>
              ) : null}

              <Grid
                item
                className={classes.containerTwoColumns}
                style={{ margin: 0 }}
              >
                <FormControlLabel
                  control={
                    <Switch
                      checked={switchtwo}
                      onChange={() => setISwitchtwo(value => !value)}
                      name='checkedA'
                    />
                  }
                  label=' هل يوجد تخيض'
                />
              </Grid>
              {switchtwo ? (
                <Grid
                  item
                  className={classes.containerTwoColumns}
                  style={{ margin: 5 }}
                >
                  <TextField
                    style={{ flex: 1 }}
                    variant='outlined'
                    label='قيمة التخفيض'
                    value={discount}
                    onChange={e => setDiscount(e.target.value)}
                    className={classes.detailsfield}
                  />
                  <TextField
                    style={{ flex: 1 }}
                    id='datetime-local'
                    label='موعد انتهاء التخفيض'
                    type='datetime-local'
                    className={classes.textField}
                    onChange={e => setDiscountEnds(e.target.value)}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </Grid>
              ) : null}
            </>
          ) : (
            <Grid item style={{ margin: 5, width: '100%' }}>
              <Grid item style={{ width: '100%' }}>
                <Autocomplete
                  ref={autoCom3}
                  className={classes.detailsfield}
                  id='combo-box-demo'
                  onChange={handleFilter}
                  options={thirdcatagories.filter(item => item.forCards)}
                  searchText={text}
                  getOptionLabel={option => option.name}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label='اختر الصنف الثالث'
                      variant='outlined'
                    />
                  )}
                />
              </Grid>
              <Grid item className={classes.containerTwoColumns}>
                <TextField
                  variant='outlined'
                  value={title}
                  label='اسم المنتج'
                  onChange={e => setTitle(e.target.value)}
                  style={{ flex: 1 }}
                />
                <TextField
                  variant='outlined'
                  label='التفاصيل'
                  value={details}
                  onChange={e => setDetails(e.target.value)}
                  style={{ flex: 1 }}
                />
              </Grid>
              <Grid item className={classes.containerTwoColumns}>
                <TextField
                  variant='outlined'
                  value={price}
                  label='ادخل السعر'
                  onChange={e => setPrice(e.target.value)}
                  style={{ flex: 1 }}
                />
              </Grid>
              <Grid item className={classes.containerTwoColumns}>
                <Button
                  color='primary'
                  variant='contained'
                  onClick={SelectFilesButtonHandler}
                  className={classes.button}
                  style={{ flex: 1 }}
                >
                  ادخل الصور
                </Button>
              </Grid>
            </Grid>
          )}
          <Grid item style={{ width: '100%', marginTop: 20 }}>
            <Button
              variant='contained'
              type='submit'
              style={{
                width: '100%',
                backgroundColor: '#30d158',
                color: '#FFF'
              }}
            >
              تم
            </Button>
          </Grid>
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
export default AddProducts
