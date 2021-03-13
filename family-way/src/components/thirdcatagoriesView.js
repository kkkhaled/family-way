import React, { useState,useEffect,useContext } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  Grid,
  Card,
  Typography,
  TextField,
  Button,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from "@material-ui/core/styles";
import {thirdcatagoriesContext} from '../contexts/thirdcatagories/thirdState';
import {subcatagoriesContext} from '../contexts/subcatagories/subcatagoriesState';
import Draggable from 'react-draggable'
import EditThird from "./editThird";

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
const useStyles = makeStyles((theme) => ({
  card: {
    width: "22em",
    height: "18em",
    border: 8,
    marginTop: "20px",
    marginBottom: "20px",
    marginLeft: "10px",
    marginRight: "10px",
  },
  img: {
    width: "10em",
    height: "8em",
    marginTop: "15px",
    marginLeft: "5.5em",
  },
  font: {
    marginLeft: "10px",
    marginTop: "8px",
    marginBottom: "8px",
  },

  field: {
    width: "60em",
    marginTop: "10px",
    marginBottom: "15px",
  },
    head: {
    marginTop: "20px",
    marginLeft: "10px",
  },
  autocomplete2: {
    width: "38.5em",
    marginBottom: "15px",
    marginTop: "15px",
    marginLeft: "50px",
  },
  itemSpace :{
    marginTop : "12px",
    marginBottom :"12px"
  },
  spacerRight :{
    paddingRight :"8px",
    color : theme.palette.red.light
  },
  spacerLeft :{
    paddingLeft:"8px"
  },
  buttondelete: {
    color: 'white',
    width: '0.8em',
    border: 7,
    marginTop: '2px',
    marginBottom: '5px',
    backgroundColor: theme.palette.red.light
  },
  root: {
    width: '78.7%',
    '& > * + *': {
      marginTop: theme.spacing(10),
    },
  },
  delbtn:{
    marginLeft:"10px",
    marginRight:"7px",
    width:"7.5em",
    backgroundColor: '#E91E63',
    color: '#FFF',
  },
  editbtn :{
    marginLeft:"7px",
    marginRight :"10px",
    width:"7.5em"
  },
  buttondialogsubmit: {
    color: 'white',
    backgroundColor: theme.palette.green.main,
    border: 5
  },
}))

const ThirdCatagoriesView = () => {
    const classes = useStyles();
       // for pop up
    const [openDialog, setOpenDialog] = useState(false);
           // define component state
           const [text,setText]=useState({name:"انتظر تحميل البيانات"})
           const [name,setName]=useState("");
     
             // render subcatagories state && func
       const {getAllSubCatagories,subcatagories}=useContext(subcatagoriesContext);
       const {
         filteredthird
         ,getFilteredThirdData,removeThird
           ,setCurrent} =useContext(thirdcatagoriesContext); 
       //loading subcatagories 
       useEffect(() => {
         getAllSubCatagories();
         // eslint-disable-next-line
     }, [])
     
         // handle dialog open
    const handleOpen = third => {
      setOpenDialog(true);
      setCurrent(third);
    }
  // handle dialog closed
  const handleClose = () => {
    setOpenDialog(false)
  }
      // handle filter input
      const handleFilter=(event,item)=>{
       if(item){
         getFilteredThirdData(item._id);
         setName(item.name);
         }
     } 

       const thirdCatagView=(
        <React.Fragment>
          <Grid container direction='row'>
            {filteredthird.length > 0 ?
            filteredthird.map((catag)=>(
              <Card style={{ margin: 10 ,textAlign:"center"}} key={catag._id}>
                <img  style={{ width: 50, height: 50 }}
                 src={`https://familyway.sa/uploads/thirdCategory/${catag.image}`} 
                  alt="subimg" />
               <h5 style={{textAlign:"center",margin:10}}>{catag.name}</h5>
               <Grid container direction="row"> 
                 <Grid item>
                <Button
                  className={classes.editbtn}
                  onClick={() => handleOpen(catag)}
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
                   <Button variant="contained"
                    className={classes.delbtn}
                    onClick={()=>removeThird(catag._id)}
                   >
                     مسح
                   </Button>
                   </Grid>
                </Grid>   
              </Card>
            )):
            <div style={{ margin: "15px 0px", width: "100%" }}><Alert severity="info">
            <Typography variant='h5'>
            ادخل الصنف الفرعي من فضلك
            </Typography>
            </Alert>
            </div>}
          </Grid>
        </React.Fragment>
      )
    return(
        <React.Fragment>
          <Grid container direction="column">
        <Typography variant="h4" className={classes.head}>
          عرض الاصناف الثالثه
        </Typography>
        {thirdCatagView}
        <Grid item>
          <Autocomplete
            id="combo-box-demo"
            style={{ width: "100%", margin: '15px 0' }}
            options={subcatagories}
            getOptionLabel={(option) => option.name}
            onChange={handleFilter}
            renderInput={(params) => (
              <TextField
                {...params}
                label="اختر الصنف الفرعي"
                variant="outlined"
              />
            )}
          />
        </Grid>
      </Grid>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby='draggable-dialog-title'
      >
        <DialogTitle style={{ cursor: 'move' }} id='draggable-dialog-title'>
          <Typography variant='h5' color='primary'>
            تعديل بيانات الصنف الثالث
          </Typography>
        </DialogTitle>
        <DialogContent>
          <EditThird />
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
export default ThirdCatagoriesView;