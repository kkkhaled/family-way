import React, { useState, useEffect, useContext } from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete'
import {
  Grid,
  Card,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Divider
} from '@material-ui/core'
import Pagination from '@material-ui/lab/Pagination'
import Alert from '@material-ui/lab/Alert'
import SearchIcon from '@material-ui/icons/Search'
import { makeStyles } from '@material-ui/core/styles'
import { productContext } from '../contexts/products/productState'
import { thirdcatagoriesContext } from '../contexts/thirdcatagories/thirdState'
import { authContext } from '../contexts/auth/authstate'
import EditProduct from './editproduct'
import Draggable from 'react-draggable'
import moment from 'moment'
import 'moment/locale/ar'
import { url } from '../constants/constants'
import axios from 'axios'

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
    //height: "30em",
    border: 8,
    marginTop: '20px',
    marginBottom: '20px',
    marginLeft: '10px',
    marginRight: '10px'
  },
  img: {
    width: '20em',
    height: '13em',
    marginLeft: '15px',
    marginRight: '15px',
    marginTop: '15px'
  },
  font: {
    marginRight: '8px',
    marginTop: '8px',
    color: 'red'
  },
  name: { marginLeft: '8px' },
  details: {
    marginLeft: '8px',
    color: theme.palette.gray
  },
  autocomplete: {
    width: '38.5em',
    marginBottom: '15px',
    marginLeft: '50px'
  },
  button: {
    color: theme.palette.green.dark,
    backgroundColor: 'white',
    width: '10em',
    height: '2.6em',
    marginTop: '12px',
    marginLeft: '8px',
    marginRight: '5px',
    marginBottom: '8px'
  },
  delbutton: {
    color: 'red',
    backgroundColor: 'white',
    width: '10em',
    height: '2.6em',
    marginTop: '12px',
    marginLeft: '8px',
    marginRight: '5px',
    marginBottom: '8px'
  },
  root: {
    width: '67%',
    '& > * + *': {
      marginTop: theme.spacing(10)
    }
  },
  buttondialogsubmit: {
    color: 'white',
    backgroundColor: theme.palette.green.main,
    border: 5
  },
  search: {
    marginBottom: '20px',
    width: '22em'
  },
  divider: {
    marginBottom: '10px'
  },
  pagenation: {
    paddingTop: '35px',
    width: 'max-content',
    margin: 'auto'
  },
  onep: {
    margin: 2
  }
}))

const GetProducts = () => {
  const classes = useStyles()
  // for pop up
  const [openDialog, setOpenDialog] = useState(false)

  const { loadUser } = useContext(authContext)
  const { getAllThirdCatagories, thirdcatagories } = useContext(
    thirdcatagoriesContext
  )

  const {
    GetProductThird,
    removeProducts,
    products,
    setCurrentProduct,
    searchProducts,
    productdata
  } = useContext(productContext)
  const [id, setId] = useState(null)
  const [text, setText] = useState([{ name: 'تحميل !!' }])
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(11)

  useEffect(
    () => {
      loadUser()
      getAllThirdCatagories()
    },
    // eslint-disable-next-line
    []
  )

  // handle dialog open
  const handleOpen = product => {
    setOpenDialog(true)
    setCurrentProduct(product)
  }

  // handle dialog closed
  const handleClose = () => {
    setOpenDialog(false)
  }

  // handle search via name
  const handlenameSearch = e => {
    if (e.target.value.length > 0) {
      searchProducts(e.target.value)
      //console.log(1)
    }
  }
  //console.log(filterProducts);
  // handle filter input
  const handleFilter = (event, item) => {
    if (item) {
      setId(item._id)
      GetProductThird(item._id, page, limit)
    }
  }

  // handle remove
  //  const RemoveItem=(id)=>{
  //   removeProducts(id);
  //   products.products.filter(product=> product._id !== id);
  //  }

  const convertDiscountEnd = end => {
    return `سينتهي العرض ${moment(end).fromNow()}`
  }

  const createCloneFromProducts = async () => {
    try {
      const response = await axios.post(`${url}productsRoute`)
      alert("تم التصدير")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <React.Fragment>
      <Grid container style={{ flexWrap: 'nowrap', gridGap: 10 }}>
        <Grid item style={{ width: '33.333%' }}>
          <Typography variant='h4'>بحث عن طريق الاسم</Typography>
          <TextField
            label='اكتب اسم المنتج'
            style={{ width: '100%', margin: '20px 0px' }}
            variant='outlined'
            onChange={handlenameSearch}
          ></TextField>
        </Grid>
        <Grid item style={{ width: '33.333%' }}>
          <Typography variant='h4'>بحث عن طريق الصنف</Typography>
          <Autocomplete
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
        </Grid>
        <Grid item style={{ width: '33.333%' }}>
          <Typography variant='h4'>تصدير الي ملف اكسل</Typography>
          <Button
            style={{ width: '100%', margin: '20px 0px' }}
            variant='contained'
            onClick={() => {
              createCloneFromProducts()
            }}
          >
            تصدير
          </Button>
        </Grid>
      </Grid>
      <Divider className={classes.divider} />
      <Grid
        container
        style={{ gridGap: 10, display: 'grid', gridTemplateColumns: '1fr 1fr' }}
      >
        {products !== null && productdata.length > 0
          ? productdata.map(product => (
              <Grid item key={product._id}>
                <Card>
                  <div
                    style={{
                      height: 200,
                      width: '100%',
                      position: 'relative',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    {/* {product.variationId.length > 1 ? (
                      <p
                        style={{
                          position: 'absolute',
                          right: 5,
                          top: 0,
                          backgroundColor: '#E91E63',
                          color: '#FFF',
                          fontSize: 13,
                          borderRadius: 12,
                          padding: 6
                        }}
                      >
                        {product.variationId}
                      </p>
                    ) : null} */}
                    {/* 
                    {product.isHidden ? (
                      <p
                        style={{
                          position: 'absolute',
                          right: 5,
                          top: 20,
                          backgroundColor: '#E91E63',
                          color: '#FFF',
                          fontSize: 13,
                          borderRadius: 12,
                          padding: 6
                        }}
                      >
                        منتج مخفي
                      </p>
                    ) : null}

                    {!product.isVisible ? (
                      <p
                        style={{
                          position: 'absolute',
                          right: 5,
                          top: 40,
                          backgroundColor: '#E91E63',
                          color: '#FFF',
                          fontSize: 13,
                          borderRadius: 12,
                          padding: 6
                        }}
                      >
                        منتج غير متوفر الأن
                      </p>
                    ) : null} */}

                    {products.discountEnds ? (
                      <div
                        style={{
                          position: 'absolute',
                          top: 10,
                          right: 5,
                          backgroundColor: '#5e5ce6',
                          padding: 5,
                          borderRadius: 10
                        }}
                      >
                        <p
                          style={{ margin: 0, color: '#FFF', fontWeight: 900 }}
                        >
                          {convertDiscountEnd(products.discountEnds)}
                        </p>
                      </div>
                    ) : null}

                    <img
                      src={`https://familyway.sa/uploads/products/${product.images}`}
                      alt='subimg'
                      style={{ height: 250, objectFit: 'contain' }}
                    />
                  </div>
                  <Grid
                    container
                    direction='column'
                    style={{ position: 'relative' }}
                  >
                    {product.discount > 0 ? (
                      <div style={{ display: 'flex' }}>
                        <Typography
                          variant='h5'
                          align='right'
                          style={{ fontSize: 19, color: 'red' }}
                        >
                          {product.discount}
                        </Typography>
                        <Typography
                          variant='h5'
                          align='right'
                          style={{
                            textDecoration: 'line-through',
                            color: '#999',
                            marginRight: 10
                          }}
                        >
                          {product.price}
                        </Typography>
                      </div>
                    ) : (
                      <Typography
                        variant='h5'
                        align='right'
                        style={{ textTransform: 'line-through' }}
                      >
                        {product.price}
                      </Typography>
                    )}
                    <Grid item>
                      <Typography variant='h4'>{product.title}</Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant='h5'>{product.details}</Typography>
                    </Grid>
                    <Grid item>
                      <div
                        style={{
                          border: '1px solid rgba(0,0,0,,15)',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}
                      >
                        <p className={classes.onep}>هل للمنتج تشابه ؟</p>
                        <p
                          className={classes.onep}
                          style={{ fontSize: 13, textAlign: 'left' }}
                        >
                          {product.variationId.length > 1
                            ? product.variationId
                            : 'لا يوجد'}
                        </p>
                      </div>
                      <div
                        style={{
                          border: '1px solid rgba(0,0,0,,15)',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}
                      >
                        <p className={classes.onep}>هل المنتج متاح ؟</p>
                        <p className={classes.onep}>
                          {product.isVisible ? 'متاح' : 'ليس متاح'}
                        </p>
                      </div>
                      <div
                        style={{
                          border: '1px solid rgba(0,0,0,,15)',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}
                      >
                        <p className={classes.onep}>هل المنتج مخفي ؟</p>
                        <p className={classes.onep}>
                          {product.isHidden ? ' مخفي' : 'ليس مخفي'}
                        </p>
                      </div>
                    </Grid>
                    <Grid item>
                      <Grid container direction='row'>
                        <Button
                          style={{
                            flex: 1,
                            margin: 5,
                            backgroundColor: '#ffd60a'
                          }}
                          variant='contained'
                          onClick={() => handleOpen(product)}
                        >
                          <Typography variant='h5' style={{ color: '#FFF' }}>
                            تعديل
                          </Typography>
                        </Button>
                        <Button
                          style={{
                            flex: 1,
                            margin: 5,
                            backgroundColor: '#ff453a'
                          }}
                          variant='contained'
                          onClick={() => removeProducts(product._id)}
                        >
                          <Typography variant='h5' style={{ color: '#FFF' }}>
                            {' '}
                            مسح
                          </Typography>
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            ))
          : null}
      </Grid>
      {products !== null && products.pagination !== undefined ? (
        <Pagination
          onChange={(i, page) => {
            GetProductThird(id, page, limit)
          }}
          count={Math.ceil(products.pagination.totalItems / limit)}
          color='primary'
          className={classes.pagenation}
        />
      ) : (
        ''
      )}
      <Dialog
        open={openDialog}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby='draggable-dialog-title'
      >
        <DialogTitle style={{ cursor: 'move' }} id='draggable-dialog-title'>
          <Typography variant='h5' color='primary'>
            تعديل بيانات المنتج
          </Typography>
        </DialogTitle>
        <DialogContent>
          <EditProduct />
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
export default GetProducts
