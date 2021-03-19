import React, { useState, useEffect, useContext } from 'react'
import {
   Grid,
  Typography,
  Button,
  Card ,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper, } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import { makeStyles } from '@material-ui/core/styles'
import { sliderContext } from '../contexts/sliders/sliderstate'
import { authContext } from '../contexts/auth/authstate'
import Animations from './loader'
import Draggable from 'react-draggable'
import EditSlider from './editSlider'


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
  button: {
    color: 'white',
    width: '20em',
    border: 8,
    marginTop: '20px',
    marginLeft: '20px'
  },
  buttondelete: {
    color: 'white',
    width: '1em',
    border: 8,
    marginTop: '5px',
    marginBottom: '10px',
    backgroundColor: theme.palette.red.light
  },
  card: {
    width: "22em",
    //height: "22em",
    border: 8,
    marginTop: "15px",
    marginBottom: "15px",
    marginLeft: "10px",
    marginRight: "10px",
  },
  img: {
    width: 250,
    height: 130,
    marginLeft: "5px",
    marginRight: "5px",
    marginTop: "5px",
    objectFit:"cover"
  },
  title:{
    marginLeft:"6px",
    marginTop :"6px",
    marginBottom :"6px"
  },
  name : {
    marginRight:"6px",
    marginTop :"6px",
    marginBottom :"6px",
    color :theme.palette.red.light
  },
  delbtn:{
    marginLeft:"10px",
    marginRight:"7px",
    width:"9.5em"
  },
  editbtn :{
    marginLeft:"7px",
    marginRight :"10px",
    width:"9.5em"
  },
  buttondialogsubmit: {
    color: 'white',
    backgroundColor: theme.palette.green.main,
    border: 5
  },
}))

const GetSlider = () => {
  const classes=useStyles();
  const { loadUser } = useContext(authContext)
  const { getslider, sliders, removeslider ,setCurrent } = useContext(sliderContext)
  const [openDialog, setOpenDialog] = useState(false);


  useEffect(() => {
    loadUser();
    getslider();
    // eslint-disable-next-line
  }, [])
   console.log(sliders);
      // handle dialog open
      const handleOpen = slider => {
        setOpenDialog(true)
        setCurrent(slider)
      }
    // handle dialog closed
    const handleClose = () => {
      setOpenDialog(false)
    }

  return (
    <React.Fragment>
      <Typography variant='h4'>عرض سلايدرالاصناف</Typography>
      <Grid container direction="row">
            {sliders.length > 0  ?
            sliders.map((slider)=>(
              slider.category ?
              <Card 
              className={classes.card}
              key={slider._id}>
                <img 
                 className={classes.img}
                src={`https://familyway.sa/uploads/sliders/${slider.image}`}
                alt="sliderimg" 
                 />
                  <Grid container justify="space-between">
                   <Grid item>
                     <Typography variant="h4" className={classes.title}>
                         الترتيب 
                     </Typography>
                   </Grid>
                   <Grid item>
                     <Typography variant="h4" className={classes.name} >
                         {slider.sort} 
                     </Typography>
                   </Grid>
                 </Grid>
                 {/*
                 <Grid container justify="space-between">
                   <Grid item>
                     <Typography variant="h4" className={classes.title}>
                        اسم الصنف 
                     </Typography>
                   </Grid>
                   <Grid item>
                     <Typography variant="h4" className={classes.name} >
                         {slider.category.name} 
                     </Typography>
                   </Grid>
                 </Grid>*/}
                <Grid container direction="row"> 
                 <Grid item>
                <Button
                  className={classes.editbtn}
                  onClick={() => handleOpen(slider)}
                  variant='contained'
                  style={{
                    backgroundColor: '#ffd60a',
                    color: '#FFF',
                    marginBottom: 5
                  }}
                     >
                  تعديل
                     </Button>
                   </Grid> 
                  <Grid item>
                <Button
                 className={classes.delbtn}
                  onClick={() => removeslider(slider._id)}
                  variant='contained'
                  style={{
                    backgroundColor: '#E91E63',
                    color: '#FFF',
                    marginBottom: 5,
                   }}
                >
                  مسح
                </Button>
                </Grid> 
                </Grid>
              </Card>:""
            ))
            :<Animations />}
          </Grid> 
          <Divider />
          <Typography variant='h4'> عرض سلايدر المنتجات </Typography>
          <Grid container direction="row">
            {sliders.length > 0  ?
            sliders.map((slider)=>(
              slider.isProduct=== true ?
              <Card 
              className={classes.card}
              key={slider._id}>
                <img 
                 className={classes.img}
                src={`https://familyway.sa/uploads/sliders/${slider.image}`}
                alt="sliderimg" 
                 />
                  <Grid container justify="space-between">
                   <Grid item>
                     <Typography variant="h4" className={classes.title}>
                         الترتيب 
                     </Typography>
                   </Grid>
                   <Grid item>
                     <Typography variant="h4" className={classes.name} >
                         {slider.sort} 
                     </Typography>
                   </Grid>
                 </Grid>
                 <Grid container direction="row"> 
                 <Grid item>
                <Button
                  className={classes.editbtn}
                  onClick={() => handleOpen(slider)}
                  variant='contained'
                  style={{
                    backgroundColor: '#ffd60a',
                    color: '#FFF',
                    marginBottom: 5
                  }}
                     >
                  تعديل
                     </Button>
                   </Grid> 
                  <Grid item>
                <Button
                 className={classes.delbtn}
                  onClick={() => removeslider(slider._id)}
                  variant='contained'
                  style={{
                    backgroundColor: '#E91E63',
                    color: '#FFF',
                    marginBottom: 5,
                   }}
                >
                  مسح
                </Button>
                </Grid> 
                </Grid>
              </Card>:""
            ))
            :<Animations />}
          </Grid> 
          <Divider />
          <Typography variant='h4'> عرض باقي السلايدر  </Typography>
          <Grid container direction="row">
            {sliders.length > 0  ?
            sliders.map((slider)=>(
              slider.isProduct=== undefined && !slider.category?
              <Card 
              className={classes.card}
              key={slider._id}>
                <img 
                 className={classes.img}
                src={`https://familyway.sa/uploads/sliders/${slider.image}`}
                alt="sliderimg" 
                 />
                  <Grid container justify="space-between">
                   <Grid item>
                     <Typography variant="h4" className={classes.title}>
                         الترتيب 
                     </Typography>
                   </Grid>
                   <Grid item>
                     <Typography variant="h4" className={classes.name} >
                         {slider.sort} 
                     </Typography>
                   </Grid>
                 </Grid>
                 <Grid container direction="row"> 
                 <Grid item>
                <Button
                  className={classes.editbtn}
                  onClick={() => handleOpen(slider)}
                  variant='contained'
                  style={{
                    backgroundColor: '#ffd60a',
                    color: '#FFF',
                    marginBottom: 5
                  }}
                     >
                  تعديل
                     </Button>
                   </Grid> 
                  <Grid item>
                <Button
                 className={classes.delbtn}
                  onClick={() => removeslider(slider._id)}
                  variant='contained'
                  style={{
                    backgroundColor: '#E91E63',
                    color: '#FFF',
                    marginBottom: 5,
                   }}
                >
                  مسح
                </Button>
                </Grid> 
                </Grid>
              </Card>:""
            ))
            :<Animations />}
          </Grid> 
          <Dialog
        open={openDialog}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby='draggable-dialog-title'
      >
        <DialogTitle style={{ cursor: 'move' }} id='draggable-dialog-title'>
          <Typography variant='h5' color='primary'>
            تعديل بيانات  السلايدر
          </Typography>
        </DialogTitle>
        <DialogContent>
          <EditSlider />
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

export default GetSlider
