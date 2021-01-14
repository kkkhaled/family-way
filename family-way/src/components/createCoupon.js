import React, { useState, useContext, useEffect } from 'react'
import {
  Grid,
  TextField,
  Button,
  Typography,
  Divider,
   } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { authContext } from '../contexts/auth/authstate'
import { thirdcatagoriesContext } from '../contexts/thirdcatagories/thirdState'
import MultiSelect from 'react-multi-select-component'

const useStyles = makeStyles(theme => ({
  title: {
    marginTop: '5px',
    marginBottom: '5px'
  },
  codeField: {},
  forWhoField: {
    width: '100%',
    margin:"15px 0px",
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
  const [selected, setSelected] = useState([])

  const classes = useStyles()
  const { getAllUsers, users,loadUser } = useContext(authContext)

  const { getAllThirdCatagories, thirdcatagories } = useContext(thirdcatagoriesContext)
  
    const [options, setoptions] = useState([
    { label: 'المستخدمين', id: 1 },
    { label: 'المنتجات', id: 2 },
    { label: 'الالقسام', id: 3 },
    { label: 'التوصيل', id: 4 },
    { label: 'الطلبات', id: 5 }
  ])

  // load user data
  useEffect(() => {
    loadUser();
    getAllUsers();
    getAllThirdCatagories();
    // eslint-disable-next-line
  }, [])

  console.log(users);
  console.log(thirdcatagories);

  return (
    <React.Fragment>
      <Typography variant='h4'>ادخل بيانات الكوبون</Typography>
      <form noValidate autoComplete='off'>
        <Grid container direction='column'>
          <Grid item className={classes.forWhoField} style={{flex: 1}}>
            <TextField
              className={classes.firstOfCoupon}
              id='outlined-basic'
              label='الرمز الخاص بالكوبون'
              variant='outlined'
            />
            <Autocomplete
              style={{ marginRight: 10,flex: 1 }}
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
        {thirdcatagories.length > 0?
        <MultiSelect
          options={options}
          value={selected}
          onChange={setSelected}
          labelledBy={'Select'}
        />:null}
      </form>
    </React.Fragment>
  )
}
export default CreateCoupon
