import React, { useState, useEffect, useContext, useRef } from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete'
import {
  Grid,
  Typography,
  TextField,
  Button,
  Divider,
  FormControlLabel,
  Switch
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Alert } from '@material-ui/lab'
import { thirdcatagoriesContext } from '../contexts/thirdcatagories/thirdState'
import { subcatagoriesContext } from '../contexts/subcatagories/subcatagoriesState'
import ThirdCatagoriesView from './thirdcatagoriesView'
import { authContext } from '../contexts/auth/authstate'
import DroZone from './DropZone'

const useStyles = makeStyles(theme => ({
  card: {
    width: '22em',
    height: '18em',
    border: 8,
    marginTop: '20px',
    marginBottom: '20px',
    marginLeft: '10px',
    marginRight: '10px'
  },
  img: {
    width: '10em',
    height: '8em',
    marginTop: '15px',
    marginLeft: '5.5em'
  },
  font: {
    marginLeft: '10px',
    marginTop: '8px',
    marginBottom: '8px'
  },

  autocomplete: {
    width: '35em',
    marginRight: '15px'
  },
  button: {
    width: '22.5em',
    marginRight: '15px',
    marginLeft: '15px',
    color: 'white',
    border: 8,
    marginTop: '10px'
  },
  field: {
    width: '60em',
    marginTop: '10px',
    marginBottom: '15px'
  },
  button2: {
    color: 'white',
    width: '22em',
    marginTop: '12px',
    marginBottom: '22px',
    backgroundColor: theme.palette.green.main
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
  }
}))

const GetThirdCatagories = () => {
  const classes = useStyles()
  const autoCom = useRef(null)
  // define component state
  const [alertData, setAlertData] = useState({ open: false })
  const [text, setText] = useState({ name: 'انتظر تحميل البيانات' })
  const [forCards, setForCards] = useState(false)
  const [files, setFiles] = useState([])
  const [dropZoneState, setDropZoneState] = useState(false)
  const [name, setName] = useState('')
  const [subId, setSubId] = useState(null)

  // render subcatagories state && func
  const { getAllSubCatagories, subcatagories } = useContext(
    subcatagoriesContext
  )
  const { addNewThirdCatagories } = useContext(thirdcatagoriesContext)
  const { loadUser } = useContext(authContext)

  //loading subcatagories
  useEffect(() => {
    loadUser()
    getAllSubCatagories()
    // eslint-disable-next-line
  }, [])

  // handle filter input
  const handleFilter = (event, item) => {
    if (item) {
      setSubId(item._id)
    }
  }

  // handle dropzone state
  const SelectFilesButtonHandler = () => {
    setDropZoneState(true)
  }

  const handleDropZoneSave = files => {
    setFiles(files)
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (subId === null) {
      setAlertData({
        open: true,
        message: 'تاكد من ادخال القسم الفرعي',
        type: 'error'
      })
    } else if (name === '') {
      setAlertData({
        open: true,
        message: 'تاكد من ادخال اسم الصنف الثالث',
        type: 'error'
      })
    } else if (files.length === 0) {
      setAlertData({
        open: true,
        message: 'تاكد من رفع الصوره  ',
        type: 'error'
      })
    } else {
      addNewThirdCatagories(files, name, subId,forCards)
      setAlertData({
        open: true,
        message: 'تم اضافه الصنف ',
        type: 'success'
      })
      setFiles([])
      setName('')
      setSubId(null)
      setForCards(value => value = false)
      const ele = autoCom.current.getElementsByClassName(
        'MuiAutocomplete-clearIndicator'
      )[0]
      if (ele) ele.click()
    }
  }

  return (
    <React.Fragment>
      {alertData.open ? (
        <Alert severity={alertData.type}>{alertData.message}</Alert>
      ) : null}
      <Typography variant='h4' style={{ margin: '15px 0px' }}>
        ادخل الاصناف الثالثه
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container direction='column'>
          <Grid item style={{ display: 'flex', gridGap: '10px' }}>
            <Autocomplete
              ref={autoCom}
              style={{ flex: 1 }}
              id='combo-box-demo'
              options={subcatagories}
              getOptionLabel={option => option.name}
              onChange={handleFilter}
              renderInput={params => (
                <TextField
                  {...params}
                  label='اختر الصنف الفرعي'
                  variant='outlined'
                />
              )}
            />
            <TextField
              style={{ flex: 1 }}
              variant='outlined'
              label='اسم الصنف'
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </Grid>
          <Grid item>
            <FormControlLabel
              control={
                <Switch
                  checked={forCards}
                  onChange={() => setForCards(value => !value)}
                  name='checkedA'
                />
              }
              label=' خاص بالكروت ؟'
            />
          </Grid>
          <Grid item>
            <Button
              variant='contained'
              color='primary'
              onClick={SelectFilesButtonHandler}
              style={{
                color: '#FFF',
                padding: '10px',
                margin: '15px 0px',
                width: 220
              }}
            >
              ادخل صوره الصنف
            </Button>
          </Grid>

          <Grid item>
            <Button
              variant='contained'
              color='secondary'
              className={classes.button2}
              type='submit'
              style={{ width: '100%' }}
            >
              انشاء
            </Button>
          </Grid>
        </Grid>
      </form>
      <Divider />
      <ThirdCatagoriesView />
      <DroZone
        open={dropZoneState}
        setOpen={setDropZoneState}
        handleSave={handleDropZoneSave}
      />
    </React.Fragment>
  )
}
export default GetThirdCatagories
