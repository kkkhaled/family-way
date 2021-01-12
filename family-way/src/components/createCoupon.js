import React, { useState, useContext, useEffect } from 'react'
import {
  Grid,
  TextField,
  Button,
  Typography,
  Card,
  Divider,
  Chip,
  Select,
  InputLabel,
  Input,
  MenuItem,
  FormControl,
  ListItemText
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

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

function getStyles (name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  }
}

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
  const theme = useTheme()
  const { getAllUsers, users } = useContext(authContext)
  const { getAllThirdCatagories, thirdcatagories } = useContext(
    thirdcatagoriesContext
  )
  const [personName, setPersonName] = useState([])

  const [options, setoptions] = useState([
    { name: 'المستخدمين', id: 1 },
    { name: 'المنتجات', id: 2 },
    { name: 'الالقسام', id: 3 },
    { name: 'التوصيل', id: 4 },
    { name: 'الطلبات', id: 5 }
  ])

  // load user data
  useEffect(() => {
    getAllUsers()
    getAllThirdCatagories()
    // eslint-disable-next-line
  }, [])

  const handleChange = event => {
    setPersonName(event.target.value)
  }

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
              getOptionLabel={option => option.name}
              renderInput={params => (
                <TextField {...params} label='هدف الكوبون' variant='outlined' />
              )}
            />
          </Grid>
        </Grid>
        <MultiSelect
          options={options1}
          value={selected}
          onChange={setSelected}
          labelledBy={'Select'}
        />
      </form>
    </React.Fragment>
  )
}
export default CreateCoupon
