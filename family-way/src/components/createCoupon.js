import React, { useState, useContext, useEffect } from 'react'
import { Grid, TextField, Button, Typography, Divider } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { makeStyles} from '@material-ui/core/styles'
import { authContext } from '../contexts/auth/authstate'
import { thirdcatagoriesContext } from '../contexts/thirdcatagories/thirdState'
import { productContext } from '../contexts/products/productState';
import { couponsContext } from '../contexts/coupons/couponState'
import MultiSelect from 'react-multi-select-component'
import { Switch } from '@material-ui/core'
import { FormControlLabel } from '@material-ui/core'
import { Alert} from '@material-ui/lab'

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
  const options1 = [
    { label: 'Grapes 🍇', value: 'grapes' },
    { label: 'Mango 🥭', value: 'mango' },
    { label: 'Strawberry 🍓', value: 'strawberry', disabled: true },
    { label: 'Watermelon 🍉', value: 'watermelon' },
    { label: 'Pear 🍐', value: 'pear' },
    { label: 'Apple 🍎', value: 'apple' },
    { label: 'Tangerine 🍊', value: 'tangerine' },
    { label: 'Pineapple 🍍', value: 'pineapple' },
    { label: 'Peach 🍑', value: 'peach' }
  ]

  
  
  const isPercent = useState(false)
  const [selected, setSelected] = useState([])
  const [id, setId] = useState(null);


  const classes = useStyles()
  const { getUnpagenatedUsers, users, loadUser } = useContext(authContext)
  const {products,GetProductViaCat} = useContext(productContext);
  const { getAllThirdCatagories, thirdcatagories } = useContext(thirdcatagoriesContext);
  const { createCoupon } = useContext(couponsContext);

  const [options, setoptions] = useState([
    { label: 'المستخدمين', id: 1 },
    { label: 'المنتجات', id: 2 },
    { label: 'الالقسام', id: 3 },
    { label: 'التوصيل', id: 4 },
    { label: 'الطلبات', id: 5 }
  ])

 // load user data
  useEffect(() => {
    loadUser()
    getUnpagenatedUsers()
    getAllThirdCatagories()
       // eslint-disable-next-line
  }, []);
  console.log(users)
  console.log(thirdcatagories)

  return (
    <React.Fragment>
      <Typography variant='h4'>ادخل بيانات الكوبون</Typography>
      <form noValidate autoComplete='off'>
        <Grid container direction='column'>
          <Grid item className={classes.forWhoField} style={{ flex: 1 }}>
            <TextField
              className={classes.firstOfCoupon}
              id='outlined-basic'
              label='الرمز الخاص بالكوبون'
              variant='outlined'
            />
            <Autocomplete
              style={{ marginRight: 10, flex: 1 }}
              className={classes.firstOfCoupon}
              id='combo-box-demo'
              options={options}
              getOptionLabel={option => option.label}
              renderInput={params => (
                <TextField {...params} label='هدف الكوبون' variant='outlined' />
              )}
            />
          </Grid>
        </Grid>
        {thirdcatagories.length > 0 ? (
          <MultiSelect
            options={options1}
            value={selected}
            onChange={setSelected}
            labelledBy={'Select'}
          />
        ) : null}
        <Divider style={{ margin: '20px 0px' }} />

        <Typography variant='h4' style={{ marginTop: '10px' }}>
          الخصم
        </Typography>

        <Grid container style={{ marginTop: '15px' }}>
          <TextField
            style={{ flex: 1, zIndex: 0 }}
            className={classes.firstOfCoupon}
            id='outlined-basic'
            label='الحد الأدني لطلب الكوبون'
            variant='outlined'
          />
          <FormControlLabel
            style={{ marginTop: '10px', marginRight: '10px' }}
            control={
              <Switch
                checked={isPercent}
                // onChange={handleChange}
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
          />
          <TextField
            style={{ flex: 1, zIndex: 0 }}
            className={classes.firstOfCoupon}
            id='outlined-basic'
            label='المبلغ الخاص بالمحفظه'
            variant='outlined'
          />
          <TextField
            style={{ flex: 1, zIndex: 0 }}
            className={classes.firstOfCoupon}
            id='outlined-basic'
            label='المبلغ الخاص بالنقط'
            variant='outlined'
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
          />
          <TextField
            style={{ flex: 1, zIndex: 0 }}
            className={classes.firstOfCoupon}
            id='outlined-basic'
            label='الحد الأقصي لأستخدام الكوبون'
            variant='outlined'
          />
          <TextField
            id='datetime-local'
            label='اختر '
            type='datetime-local'
            defaultValue='2017-05-24T10:30'
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
          <Grid item className={classes.multiSelector}>
            <h5 style={{ marginBottom: '8px' }}>مستخدمين</h5>
            <MultiSelect
              options={options}
              value={selected}
              onChange={setSelected}
              labelledBy={'Select'}
            />
          </Grid>
          <Grid item className={classes.multiSelector}>
            <h5 style={{ marginBottom: '8px' }}>اقسام</h5>
            <MultiSelect
              options={options}
              value={selected}
              onChange={setSelected}
              labelledBy={'Select'}
            />
          </Grid>
          <Grid item className={classes.multiSelector}>
            <h5 style={{ marginBottom: '8px' }}>منتجات</h5>
            <MultiSelect
              options={options}
              value={selected}
              onChange={setSelected}
              labelledBy={'Select'}
            />
          </Grid>
        </Grid>
        <Alert severity='info' style={{ margin: '10px 0px' }}>
          <strong>
            الكوبون سيتجاهل كل المنتجات التي عليها تخفيض بدون تدخل
          </strong>
        </Alert>
        <Grid container>
          <Grid item style={{ width: "100%" }}>
            <TextField
              style={{ width: '100%', zIndex: 0 }}
              className={classes.firstOfCoupon}
              id='outlined-basic'
              label='رساله تعريفية عن الكوبون'
              variant='outlined'
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item style={{ width: "100%" }}>
            <Button variant='contained' color='primary' style={{ marginTop: '20px', color: "#FFF",width: "100%"  }}>
              انشاء
          </Button>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  )
}
export default CreateCoupon
