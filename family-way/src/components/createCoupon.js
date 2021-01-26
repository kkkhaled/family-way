import React, { useState, useContext, useEffect } from 'react'
import { Grid, TextField, Button, Typography, Divider } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { makeStyles } from '@material-ui/core/styles'
import { authContext } from '../contexts/auth/authstate'
import { thirdcatagoriesContext } from '../contexts/thirdcatagories/thirdState'
import { productContext } from '../contexts/products/productState'
import { couponsContext } from '../contexts/coupons/couponState'
import MultiSelect from 'react-multi-select-component'
import { Switch } from '@material-ui/core'
import { FormControlLabel } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import moment from 'moment'
import 'moment/locale/en-au'

const useStyles = makeStyles(theme => ({
  title: {
    marginTop: '5px',
    marginBottom: '5px'
  },
  codeField: {},
  forWhoField: {
    width: '100%',
    margin: '15px 0px',
    display: 'flex',
    justifyContent: 'space-between'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  chip: {
    margin: 2
  },
  multiSelector: {
    flex: 1
  }
}))

const CreateCoupon = () => {
  // for handle alert
  const [alertData, setAlertData] = useState({ open: false })
  // state for handle switches
  const [isUsers, setIsUsers] = useState(false)
  const [isCatagories, setIsCatagories] = useState(false)
  const [isProduct, setIsProduct] = useState(false)
  // state for multi selector
  const [selectedUser, setSelectedUser] = useState([])
  const [selectedCatagories, setSelectedCatagories] = useState([])
  const [selectedProduct, setSelectedProducts] = useState([])
  // state for unrxcepected multi selector
  const [userSelector, setuserSelector] = useState([])
  const [catagoriesSelectors, setcatagoriesSelectors] = useState([])
  const [productSelector, setproductSelector] = useState([])

  const classes = useStyles()
  const { getUnpagenatedUsers, users, loadUser } = useContext(authContext)
  const { allProducts, GetAllProducts } = useContext(productContext)
  const { getAllThirdCatagories, thirdcatagories } = useContext(
    thirdcatagoriesContext
  )
  const { createCoupon } = useContext(couponsContext)
  // state for add new element label by old data
  const [myNewData, setMyNewData] = useState([])
  const [usersData, setUsersData] = useState([])
  const [productsData, setProductsData] = useState([])
  // state for post coupons
  // handle for who
  const [itemId, setItemId] = useState(null) //for control selected item in هدف الكوبون
  const [code, setCode] = useState('')
  const [isDelvery, setIsDelvery] = useState(false)
  const [isOrder, setIsOrder] = useState(false)
  const [user, setUser] = useState([])
  const [product, setProduct] = useState([])
  const [category, setCategory] = useState([])
  // for handle discount
  const [isPercent, setIsPrecent] = useState(false)
  const [saved, setsaved] = useState(0)
  const [forWallet, setforWallet] = useState(0)
  const [forPoints, setforPoints] = useState(0)
  // for handle minmum
  const [minimum, setminimum] = useState(50)
  // for handle ends
  const [userCount, setuserCount] = useState(1)
  const [usedCount, setusedCount] = useState('')
  const [limit, setlimit] = useState(100)
  const [dateLimit, setdateLimit] = useState('')
  // for handle message
  const [message, setmessage] = useState('')
  // for handle notExpected
  const [unexpectUsers, setunexpectUsers] = useState([])
  const [unexcepectProduct, setunexcepectProduct] = useState([])
  const [unexcepectCategory, setunexcepectCategory] = useState([])

  const [options, setoptions] = useState([
    { label: 'المستخدمين', id: 1 },
    { label: 'المنتجات', id: 2 },
    { label: 'الاقسام', id: 3 },
    { label: 'التوصيل', id: 4 },
    { label: 'الطلبات', id: 5 }
  ])

  // load user data
  useEffect(() => {
    loadUser()
    getUnpagenatedUsers()
    getAllThirdCatagories()
    GetAllProducts()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    let oldData = thirdcatagories.map(item => {
      return { ...item, label: item.name, value: item._id }
    })
    setMyNewData([...oldData])
    // handle users data
    if (users !== null) {
      let newUsers = users.users.map(item => {
        return { ...item, label: item.name, value: item._id }
      })
      setUsersData([...newUsers])
    }
    // handle product data
    if (allProducts !== null) {
      let NewProducts = allProducts.map(item => {
        return { ...item, label: item.title, value: item._id }
      })
      setProductsData([...NewProducts])
    }
  }, [thirdcatagories, users, allProducts])

  useEffect(() => {
    // handle user forwho
    if (selectedUser.length > 0) {
      let newUsersIDS = selectedUser.map(item => {
        return { id: item._id }
      })
      newUsersIDS = newUsersIDS.map(id => {
        return [id.id]
      })
      setUser([...newUsersIDS])
    }
    // handle catagories
    if (selectedCatagories.length > 0) {
      let newcatagoriesIDS = selectedCatagories.map(item => {
        return { id: item._id }
      })
      newcatagoriesIDS = newcatagoriesIDS.map(id => {
        return [id.id]
      })
      setCategory(newcatagoriesIDS)
    }
    // handle product
    if (selectedProduct.length > 0) {
      let newproductIDS = selectedProduct.map(item => {
        return { id: item._id }
      })
      newproductIDS = newproductIDS.map(id => {
        return [id.id]
      })
      //console.log(newproductIDS);
      setProduct(newproductIDS)
    }
  }, [selectedUser, selectedCatagories, selectedProduct])

  useEffect(() => {
    // handle unexepected user
    if (userSelector.length > 0) {
      let newUsersIDS = userSelector.map(item => {
        return { id: item._id }
      })
      newUsersIDS = newUsersIDS.map(id => {
        return [id.id]
      })
      setunexpectUsers([...newUsersIDS])
    }
    // handle unexepected catagories
    if (catagoriesSelectors.length > 0) {
      let newcatagoriesIDS = catagoriesSelectors.map(item => {
        return { id: item._id }
      })
      newcatagoriesIDS = newcatagoriesIDS.map(id => {
        return [id.id]
      })
      setunexcepectCategory(newcatagoriesIDS)
    }
    // handle unexepected products
    if (productSelector.length > 0) {
      let newproductIDS = productSelector.map(item => {
        return { id: item._id }
      })
      newproductIDS = newproductIDS.map(id => {
        return [id.id]
      })
      setunexcepectProduct(newproductIDS)
    }
  }, [userSelector, catagoriesSelectors, productSelector])

  // handle selector
  const handleForWhoSelect = (event, item) => {
    if (item) {
      setItemId(item.id)
    }
    setIsDelvery(false)
    setIsOrder(false)
    setUser(value => (value = []))
    setProduct(value => (value = []))
    setCategory(value => (value = []))
    switch (item?.id) {
      case 4:
        setIsDelvery(true)
        break
      case 5:
        setIsOrder(true)
        break
    }
  }
  // handle submit form
  const handleSubmit = async e => {
    e.preventDefault()
    let userMerged = user.flat(1)
    let productsMerged = [].concat.apply([], product)
    let categoriesMerged = [].concat.apply([], category)

    const coupon = [
      {
        forWho: {
          user: userMerged,
          product: productsMerged,
          category: categoriesMerged,
          delivery: isDelvery,
          order: isOrder
        },
        notExpected: {
          user: unexpectUsers,
          product: unexcepectProduct,
          category: unexcepectCategory
        },
        discount: {
          isPercent,
          saved,
          forWallet,
          forPoints
        },
        end: {
          userCount,
          limit,
          dateLimit
        },
        code,
        minimum,
        message
      }
    ]
    console.log(coupon)
    createCoupon(coupon)
    setAlertData({
      open: true,
      message: 'تم اضافه الكوبون  ',
      type: 'success'
    })
  }
  return (
    <React.Fragment>
      {alertData.open ? (
        <Alert severity={alertData.type}>{alertData.message}</Alert>
      ) : null}
      <Typography variant='h4'>ادخل بيانات الكوبون</Typography>
      <form noValidate autoComplete='off' onSubmit={handleSubmit}>
        <Grid container direction='column'>
          <Grid item className={classes.forWhoField} style={{ flex: 1 }}>
            <TextField
              className={classes.firstOfCoupon}
              id='outlined-basic'
              label='الرمز الخاص بالكوبون'
              variant='outlined'
              onChange={e => setCode(e.target.value)}
            />
            <Autocomplete
              style={{ marginRight: 10, flex: 1 }}
              className={classes.firstOfCoupon}
              onChange={handleForWhoSelect}
              id='combo-box-demo'
              options={options}
              getOptionLabel={option => option.label}
              renderInput={params => (
                <TextField {...params} label='هدف الكوبون' variant='outlined' />
              )}
            />
          </Grid>
        </Grid>
        <Alert severity='info' style={{ margin: '10px 0px' }}>
          <strong>
            لا تملاء هدف الكوبون ان كان الخصم علي النقاط او المحفظه
          </strong>
        </Alert>
        {itemId === 1 ? (
          <div>
            {usersData.length > 0 ? (
              <MultiSelect
                options={usersData}
                value={selectedUser}
                onChange={setSelectedUser}
                labelledBy={'Select'}
              />
            ) : null}
          </div>
        ) : null}
        {itemId === 2 ? (
          <div>
            {productsData.length > 0 ? (
              <MultiSelect
                options={productsData}
                value={selectedProduct}
                onChange={setSelectedProducts}
                labelledBy={'Select'}
              />
            ) : null}
          </div>
        ) : null}
        {itemId === 3 ? (
          <div>
            {myNewData.length > 0 ? (
              <MultiSelect
                options={myNewData}
                value={selectedCatagories}
                onChange={setSelectedCatagories}
                labelledBy={'Select'}
              />
            ) : null}
          </div>
        ) : null}
        <Divider style={{ margin: '20px 0px' }} />
        <Typography variant='h4' style={{ marginTop: '10px' }}>
          الخصم
        </Typography>

        <Grid container style={{ marginTop: '15px' }}>
          <TextField
            defaultValue={minimum}
            style={{ flex: 1, zIndex: 0 }}
            className={classes.firstOfCoupon}
            id='outlined-basic'
            label='الحد الأدني لطلب الكوبون'
            variant='outlined'
            onChange={e => setminimum(~~e.target.value)}
          />
          <FormControlLabel
            style={{ marginTop: '10px', marginRight: '10px' }}
            control={
              <Switch
                checked={isPercent}
                onChange={() => setIsPrecent(value => !value)}
                name='checkedB'
                color='primary'
              />
            }
            label='هل الخصم سيكون بالنسبه المئويه ؟ '
          />
        </Grid>
        <Alert severity='info' style={{ margin: '10px 0px' }}>
          <strong> يجب ان تملاء حقل ادخال واحد فقط</strong>
          <br />
        </Alert>
        <Grid container style={{ gridGap: '10px' }}>
          <TextField
            style={{ flex: 1, zIndex: 0 }}
            className={classes.firstOfCoupon}
            id='outlined-basic'
            label='مبلغ الخصم او نسبة الخصم'
            variant='outlined'
            onChange={e => setsaved(~~e.target.value)}
          />
          <TextField
            style={{ flex: 1, zIndex: 0 }}
            className={classes.firstOfCoupon}
            id='outlined-basic'
            label='المبلغ الخاص بالمحفظه'
            variant='outlined'
            onChange={e => setforWallet(~~e.target.value)}
          />
          <TextField
            style={{ flex: 1, zIndex: 0 }}
            className={classes.firstOfCoupon}
            id='outlined-basic'
            label='المبلغ الخاص بالنقط'
            variant='outlined'
            onChange={e => setforPoints(~~e.target.value)}
          />
        </Grid>
        <Divider style={{ margin: '20px 0px' }} />

        <Typography
          variant='h4'
          style={{ marginTop: '10px', marginBottom: '20px' }}
        >
          الأنتهاء
        </Typography>
        <Grid container style={{ gridGap: '10px' }}>
          <TextField
            style={{ flex: 1, zIndex: 0 }}
            className={classes.firstOfCoupon}
            id='outlined-basic'
            label='الحد الأقصي للشخص الواحد'
            variant='outlined'
            onChange={e => setuserCount(~~e.target.value)}
          />
          <TextField
            defaultValue={limit}
            style={{ flex: 1, zIndex: 0 }}
            className={classes.firstOfCoupon}
            id='outlined-basic'
            label='الحد الأقصي لأستخدام الكوبون'
            variant='outlined'
            onChange={e => setlimit(~~e.target.value)}
          />
          <TextField
            id='datetime-local'
            label='اختر '
            type='datetime-local'
            onChange={e => {
              setdateLimit(moment(e.target.value).format())
            }}
            className={classes.firstOfCoupon}
            InputLabelProps={{
              shrink: true
            }}
          />
        </Grid>
        <Typography variant='h4' style={{ marginTop: '30px' }}>
          اقصاء
        </Typography>
        <Grid container style={{ gridGap: '10px' }}>
          <FormControlLabel
            style={{ marginTop: '10px', marginRight: '10px' }}
            control={
              <Switch
                checked={isUsers}
                onChange={() => setIsUsers(value => !value)}
                name='checkedB'
                color='primary'
              />
            }
            label=' اقصاء مستخدمين ؟ '
          />

          <FormControlLabel
            style={{ marginTop: '10px', marginRight: '10px' }}
            control={
              <Switch
                checked={isCatagories}
                onChange={() => setIsCatagories(value => !value)}
                name='checkedB'
                color='primary'
              />
            }
            label=' اقصاء اصناف ؟ '
          />
          <FormControlLabel
            style={{ marginTop: '10px', marginRight: '10px' }}
            control={
              <Switch
                checked={isProduct}
                onChange={() => setIsProduct(value => !value)}
                name='checkedB'
                color='primary'
              />
            }
            label=' اقصاء منتجات ؟ '
          />
        </Grid>

        <Grid container style={{ gridGap: '10px' }}>
          {isUsers ? (
            <Grid item className={classes.multiSelector}>
              <h5 style={{ marginBottom: '8px' }}>مستخدمين</h5>
              {usersData.length > 0 ? (
                <MultiSelect
                  options={usersData}
                  value={userSelector}
                  onChange={setuserSelector}
                  labelledBy={'Select'}
                />
              ) : null}
            </Grid>
          ) : null}

          {isCatagories ? (
            <Grid item className={classes.multiSelector}>
              <h5 style={{ marginBottom: '8px' }}>اقسام</h5>
              {myNewData.length > 0 ? (
                <MultiSelect
                  options={myNewData}
                  value={catagoriesSelectors}
                  onChange={setcatagoriesSelectors}
                  labelledBy={'Select'}
                />
              ) : null}
            </Grid>
          ) : null}

          {isProduct ? (
            <Grid item className={classes.multiSelector}>
              <h5 style={{ marginBottom: '8px' }}>منتجات</h5>
              {productsData.length > 0 ? (
                <MultiSelect
                  options={productsData}
                  value={productSelector}
                  onChange={setproductSelector}
                  labelledBy={'Select'}
                />
              ) : null}
            </Grid>
          ) : null}
        </Grid>
        <Alert severity='info' style={{ margin: '10px 0px' }}>
          <strong>
            الكوبون سيتجاهل كل المنتجات التي عليها تخفيض بدون تدخل
          </strong>
        </Alert>
        <Grid container>
          <Grid item style={{ width: '100%' }}>
            <TextField
              style={{ width: '100%', zIndex: 0 }}
              className={classes.firstOfCoupon}
              id='outlined-basic'
              label='رساله تعريفية عن الكوبون'
              variant='outlined'
              onChange={e => setmessage(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item style={{ width: '100%' }}>
            <Button
              variant='contained'
              color='primary'
              style={{ marginTop: '20px', color: '#FFF', width: '100%' }}
              type='submit'
            >
              انشاء
            </Button>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  )
}
export default CreateCoupon
