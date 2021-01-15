import React,{useState,useEffect,useContext} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Typography,
  Paper,
  Button,
  Card,
  Grid,
  Divider,
  Box,
  ListItemText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { Alert } from "@material-ui/lab";
import { authContext } from '../contexts/auth/authstate';
import {ordersContext} from '../contexts/ordres/orderState';
import Draggable from 'react-draggable'
import DroZone from './DropZone'
import Animations from './loader';

const useStyle = makeStyles(theme => ({
    h5: {
        fontFamily: 'Releway',
        fontSize: '1.44rem',
        fontWeight: 600
      },
      h6 :{
        fontSize: '1.3rem',
        fontWeight: 'bold',
        color :"#6c5ce7"  
      },
      listtext :{
        fontSize: '25px',
        marginLeft:"10px",
        fontWeight :350
      },
      img : {
          width :"70px",
          height:"70px"
      },
      payment :{        
        fontSize: '20px',
        fontWeight :'normal'
    },
    button:{
        width:"100%",
        color:'white',
        backgroundColor:theme.palette.green.main,
        marginTop :"5px"
    },
    autocomplete: {
        width: '15em',
        margin:"15px 0px",
        display: 'flex',
        justifyContent: 'space-between'
      },
    buttondialogsubmit: {
        color: 'white',
        backgroundColor: theme.palette.green.main,
        border: 5
      },
      field: {
        width: '22em',
        marginTop: '8px',
        marginBottom: '8px'
      },
      formButton: {
        marginTop :"22px",
        marginLeft :"8px",
        color: 'white',
        border: 5,
      },
}));

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

const OrdersDetails = () => {
    const classes = useStyle();
    const [openDialog, setOpenDialog] = useState(false)
    const [alertData, setAlertData] = useState({ open: false });
    const [dropZoneState, setDropZoneState] = useState(false)
    const [files,setFiles]=useState([]);
    const [status, setstaus] = useState([
        {id : 0 , text: 'تم استلام الطلب'},
        {id : 1 , text:'مرحلة المراجعه'},
        {id : 2 , text:'جاري التجهيز'},
        {id : 3 , text:   'في الطريق'},
        {id : 4 , text:'تم التوصيل'},
        {id : 5 , text:'تحت المراجعة للأسترجاع'},
        {id : 6 , text:'تم الأسترجاع'},
        {id : 7 , text:'لم يتم الأسترجاع'},
        {id : 8 , text:'تم الرفض'},
       ]);
      
       const [statusId,setstatusId]=useState(null);
       
    const {loadUser } = useContext(authContext);
    const {currentOrder , updateOrders}=useContext(ordersContext);

    useEffect(() => {
       if(currentOrder !== null){
          console.log(currentOrder);
       }  
       loadUser();
        // eslint-disable-next-line
    }, [currentOrder,ordersContext]);

      // handle dropzone state
  const SelectFilesButtonHandler = () => {
    setDropZoneState(true)
  }


    const handleDropZoneSave = files => {
        setFiles(files)
      }

      
      // handle dialog open
      const handleOpen=()=>{
        setOpenDialog(true)
       } 

       // handle dialog closed
     const handleClose = () => {
        setOpenDialog(false)
      }
      // handle status id
     const handleStatus=(event,item)=>{
         if(item){
           setstatusId(item.id) 
         }
     }
     console.log(statusId);

     const handleSubmit=(e)=>{
         e.preventDefault();
         if(statusId===null){
            setAlertData({
                open: true,
                message: "تاكد من اختيار الحاله  ",
                type: "error",
              });
            }else if(files.length === 0){
              setAlertData({
                open: true,
                message: "تاكد من رفع الصوره  ",
                type: "error",
              });
            }else{
                updateOrders(currentOrder._id,files,statusId);
                setAlertData({
                    open: true,
                    message: "تم تعديل الطلب ",
                    type: "success",
                  })
            } 
     }

      const editOrder=(
          <React.Fragment>
               {alertData.open ? (
              <Alert severity={alertData.type}>{alertData.message}</Alert>
                ) : null}
              <form onSubmit={handleSubmit}>
                  <Grid container direction="row">
                      <Grid item>
                      <Autocomplete
                      onChange={handleStatus}
                      className={classes.autocomplete}
                      style={{ marginRight: 10,flex: 1 }}
                        id='combo-box-demo'
                        options={status}
                         getOptionLabel={option => option.text}
                        renderInput={params => (
                      <TextField {...params} label='ادخل الحاله  ' variant='outlined' />
                       )}
                       />
                      </Grid>
                      <Grid item>
                        <Button 
                        variant="contained"
                        onClick={SelectFilesButtonHandler}
                        color="primary"
                        className={classes.formButton}>ارفع الصوره</Button>
                       </Grid>
                  </Grid>
                  <Grid container justify="center">
                  <Button 
                  color="primary"
                  variant="contained"
                  type='submit'
                  className={classes.formButton}
                  >حفظ</Button>
                  </Grid>
              </form>
                <DroZone
                  open={dropZoneState}
                  setOpen={setDropZoneState}
                  handleSave={handleDropZoneSave}
                 />
          </React.Fragment>
      )

      

    return (
        <React.Fragment>
            {currentOrder !== null ?
            <Card>
                <Grid container direction="row">
                <Typography variant="h5" className={classes.h5}>
                    الطلب رقم {currentOrder.id}#
                </Typography>  
                <Typography variant="h5" className={classes.h5} style={{paddingRight:"9px"}}>
                    الحاله{currentOrder.status} 
                </Typography> 
                </Grid>
                <Divider />
                <Typography variant="h6" className={classes.h6}>
                    المنتجات
                </Typography> 
                <Box border={0.1}  borderColor="grey.500"  >
               <Grid container direction="row">
                  {currentOrder.items.map(item=>(
                     <Grid item>
                    <ListItemText 
                     className={classes.listtext}
                     key={item._id} >
                   - {item.title}
                      </ListItemText>
                      </Grid>
                   ))}
                   </Grid>

                   <Grid container direction="row">
                       {currentOrder.items.map(item=>(
                           <img 
                            key={item._id}
                           className={classes.img}
                            src={`https://familyway.sa/uploads/products/${item.image}`} 
                            alt="order img" />
                       ))}
                   </Grid>
                    </Box>
                <Box border={0.1}  borderColor="grey.500" style={{marginTop:5,padding:5}}  >
                <Typography variant="h6" className={classes.h6}>
                    وسيله الدفع
                </Typography>
                <Typography variant="h6" className={classes.payment}>
                    وسيله {currentOrder.paymentMethod}
                </Typography>
                </Box>
                <Box border={0.1}  borderColor="grey.500" style={{marginTop:5,padding:5}}  >
                <Typography variant="h6" className={classes.h6}>
                     اجمالي التكلفه
                </Typography>
                <Typography variant="h6" className={classes.payment}>
                     :المبلغ {currentOrder.totalCost}
                </Typography>
                </Box>
                <Box border={0.1}  borderColor="grey.500" style={{marginTop:5,padding:5}}  >
                <Typography variant="h6" className={classes.h6}>
                      ميعاد الوصول 
                </Typography>
                <Typography variant="h6" className={classes.payment}>
                      {currentOrder.arriveAt}
                </Typography>
                </Box>
                <Button
                  variant="contained"
                  onClick={handleOpen}
                 className={classes.button}>
                    تعديل
                </Button>
            </Card> :
            <Animations /> }
              <Dialog
        open={openDialog}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby='draggable-dialog-title'
      >
        <DialogTitle style={{ cursor: 'move' }} id='draggable-dialog-title'>
          <Typography variant='h5' color='primary'>
            تعديل بيانات المستخدم
          </Typography>
        </DialogTitle>
        <DialogContent>{editOrder}</DialogContent>
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

export default OrdersDetails
