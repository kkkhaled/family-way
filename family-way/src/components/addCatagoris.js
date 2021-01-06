import React, { useState, useEffect, useContext } from 'react'
import {
  Grid,
  TextField,
  Button,
  Typography,
  Card,
  Divider,
  } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
//import EditIcon from '@material-ui/icons/Edit'
import { authContext } from '../contexts/auth/authstate'
import { catagoriesContext } from '../contexts/catagories/catagoriesState'
import Animations from './loader'
import { Switch } from '@material-ui/core'
import FormControlLabel from '@material-ui/core/FormControlLabel'

const useStyles = makeStyles(theme => ({
  button: {
    width: '22em',
    color: 'white',
    border: 5,
    marginTop: '8px',
    marginBottom: '15px',
    backgroundColor: theme.palette.green.main
  },

  input: {
    marginLeft: '10px',
    marginRight: '10px',
    width: '70em',
    marginTop: '40px'
  },
  input2: {
    marginLeft: '10px',
    marginRight: '10px',
    width: '70em',
    marginBottom: '10px',
    marginTop: '20px'
  },
  card: {
    margin: '8px',
    width: '260px',
    padding:"6px"
  },
  name: {
    marginLeft: '10px',
    marginRight: '15px'
  },
  editicon: {
    backgroundColor: theme.palette.yellow.main,
    color: 'white',
    marginLeft:"5px"
    //marginRight: "5px",
    //marginTop: "5px",
  },
  delIcon: {
    color: 'white',
    marginLeft:"5px",
    backgroundColor: theme.palette.secondary.main
    //marginRight :"5px"
  }
}))
const AddCatagiories = () => {
  const classes = useStyles()

  const [name, setName] = useState('')
  const [sort, setSort] = useState('')
  const [isCompany, setIsCompany] = useState(false)
  const { loadUser } = useContext(authContext)
  const {
    getAllCatagories,
    addNewCategories,
    removeOne,
    catagories,
    loading
  } = useContext(catagoriesContext)

  useEffect(
    () => {
      getAllCatagories()
    },
    // eslint-disable-next-line
    []
  )

  //load user data
  useEffect(() => {
    loadUser()
    // eslint-disable-next-line
  }, [])

  // handle add new catagories
  const handleSubmit = e => {
    e.preventDefault()
    addNewCategories(name, sort, isCompany)
  }

  const catagView = (
    <React.Fragment>
      {//console.log(catagories)
      }
      <Grid container direction='row'>
        {catagories.length > 1 && !loading ? (
          catagories.map(catag => (
            <Card className={classes.card} key={catag._id}>
              <Grid container justify='space-between'>
                <Typography variant='h5' className={classes.name}>
                  {catag.name}
                </Typography>
                <Grid item>
                <DeleteForeverIcon
                      className={classes.delIcon}
                      onClick={() => {
                        removeOne(catag._id)
                      }}
                    />
                </Grid>
              </Grid>
            </Card>
          ))
        ) : (
          <Animations />
        )}
      </Grid>
    </React.Fragment>
  )

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <Grid container direction='column'>
          <Grid item>
            <TextField
              className={classes.input}
              variant='outlined'
              label='ادخال اسم الصنف'
              onChange={e => setName(e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              className={classes.input2}
              variant='outlined'
              label='  الترتيب'
              onChange={e => setSort(e.target.value)}
            />
          </Grid>
          <Grid item>
            <FormControlLabel
              control={
                <Switch
                  checked={isCompany}
                  onChange={() => setIsCompany(value => !value)}
                  name='checkedA'
                />
              }
              label='هل هوا خاص بشركه ؟'
            />
          </Grid>

          <Grid container justify='center'>
            <Grid item>
              <Button
                variant='contained'
                className={classes.button}
                type='submit'
              >
                تم
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
      <Divider />
      <Typography variant='h4' color='primary'>
        عرض الاصناف الرئسيه
      </Typography>
      {catagView}
    </React.Fragment>
  )
}
export default AddCatagiories
