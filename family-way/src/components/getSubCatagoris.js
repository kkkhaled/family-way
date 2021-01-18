import { Grid } from '@material-ui/core'
import React, { useState, useEffect, useContext } from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { Typography, TextField, Button, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { catagoriesContext } from '../contexts/catagories/catagoriesState'
import { subcatagoriesContext } from '../contexts/subcatagories/subcatagoriesState'
import SubCatagoryView from './subcatagoriesView'
import DroZone from './DropZone'
import { Switch } from '@material-ui/core'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { authContext } from '../contexts/auth/authstate'
import { Alert } from "@material-ui/lab";

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
  img: {
    width: '20em',
    height: '13em',
    marginLeft: '15px',
    marginRight: '15px',
    marginTop: '15px'
  },
  font: {
    marginLeft: '10px',
    marginTop: '8px',
    marginBottom: '8px'
  },

  autocomplete: {
    width: '100%',
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

const GetSubCatagories = () => {
  // define component state
  const [alertData, setAlertData] = useState({ open: false });
  const [text, setText] = useState({ name: 'انتظر تحميل البيانات' })
  const [isWide, setIsWide] = useState(false)
  const [files, setFiles] = useState([])
  const [dropZoneState, setDropZoneState] = useState(false)
  const [name, setName] = useState('')
  const [parentId, setParentId] = useState(null)
  // render catagories state && func
  const { getAllCatagories, catagories, loading, getOneCatagory } = useContext(catagoriesContext)

  // render subcatagories state && func
  const { addNewSubCatagories } = useContext(subcatagoriesContext)
  const { loadUser } = useContext(authContext)


  // loading catagories
  useEffect(
    () => {
      loadUser();
      getAllCatagories();
    },
    // eslint-disable-next-line
    []
  )

  const classes = useStyles()

  // handle filter input
  const handleFilter = (event, item) => {
    if (item) {
      getOneCatagory(item._id)
      setParentId(item._id)
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
    if (parentId === null) {
      setAlertData({
        open: true,
        message: "تاكد من ادخال القسم الرئيسي",
        type: "error",
      });
    } else if (name === '') {
      setAlertData({
        open: true,
        message: "تاكد من ادخال اسم الصنف الفرعي",
        type: "error",
      });
    } else if (files.length === 0) {
      setAlertData({
        open: true,
        message: "تاكد من رفع الصوره  ",
        type: "error",
      });
    }
    else {
      addNewSubCatagories(files, name, parentId, isWide);
      setAlertData({
        open: true,
        message: "تم اضافه الصنف ",
        type: "success",
      });
    }
  }

  return (
    <React.Fragment>
      {alertData.open ? (
        <Alert severity={alertData.type}>{alertData.message}</Alert>
      ) : null}
      <Typography variant='h4' style={{margin:"15px 0px"}}>
        ادخل الاصناف الفرعيه
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container direction='column'>
          <Grid item style={{ display: 'flex', gridGap: '10px' }}>
            <Autocomplete
              style={{ flex: 1 }}
              id='combo-box-demo'
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
            <TextField
              style={{ flex: 1 }}
              variant='outlined'
              label='اسم الصنف'
              onChange={e => setName(e.target.value)}
            />
          </Grid>

          <Grid item style={{ marginTop: 10 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={isWide}
                  onChange={() => setIsWide(value => !value)}
                  name='checkedA'
                />
              }
              label='عرض الشاشه بالكامل ؟'
            />
          </Grid>
          <Grid item>
            <Button
              variant='contained'
              color='primary'
              onClick={SelectFilesButtonHandler}
              style={{color:"#FFF",padding:'10px',margin:"15px 0px",width:220}}
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
              style={{width:"100%"}}
            >
              انشاء
              </Button>
          </Grid>
        </Grid>
      </form>
      <Divider />
      <DroZone
        open={dropZoneState}
        setOpen={setDropZoneState}
        handleSave={handleDropZoneSave}
      />
      <SubCatagoryView />
    </React.Fragment>
  )
}
export default GetSubCatagories
