import React, { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Typography,
  Card,
  Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
  button: {
    width: "22em",
    color: "white",
    border: 5,
    marginTop: "8px",
    marginBottom: "15px",
    backgroundColor: theme.palette.green.main,
  },

  input: {
    marginLeft: "10px",
    marginRight: "10px",
    width: "70em",
    marginTop: "40px",
  },
  input2: {
    marginLeft: "10px",
    marginRight: "10px",
    width: "70em",
    marginBottom: "10px",
    marginTop: "20px",
  },
  card: {
    marginLeft: "20px",
    marginRight: "20px",
    marginTop: "25px",
    marginBottom: "25px",
    width: "305px",
  },
   name : {
    marginLeft :"10px",
    marginRight :"40px"
  },
  editicon: {
    backgroundColor: theme.palette.yellow.main,
    color: "white",
    marginRight: "10px",
    marginLeft: "10px",
    marginTop: "5px",
  },
  delIcon: {
    color: "white",
    backgroundColor: theme.palette.secondary.main,
    marginRight :"10px"
  },
 
}));
const AddCatagiories = () => {
  const classes = useStyles();
  const [recentCatag, setRecentcatag] = useState([
    { name: "الصنف الاول", num: 1 },
    { name: "الصنف الثاني", num: 2 },
    { name: "  الصنف الثالث", num: 3 },
    { name: "الصنف الرابع", num: 4 },
    { name: "الصنف الخامس", num: 5 },
    { name: " الصنف السادس", num: 6 },
    { name: "الصنف السابع", num: 7 },
    { name: "الصنف الثامن", num: 8 },
    { name: "الصنف التاسع", num: 9 },
    { name: "الصنف الهاشر", num: 10 },
  ]);


  const catagView=(
    <React.Fragment>
        <Grid container direction='row'>
           {recentCatag.map(onecatag=>(
             <Card className={classes.card}>
             <Grid container justify='space-between'>
                <Typography variant="h4"  className={classes.name}>
                   {onecatag.name}
                </Typography>
                <Grid item>
                  <EditIcon className={classes.editicon} />
                  <DeleteForeverIcon className={classes.delIcon} />
                </Grid>
             </Grid>  
              </Card>
           ))}
        </Grid>
    </React.Fragment>
  )

  return (
    <React.Fragment>
      <form>
        <Grid container direction="column">
          <Grid item>
            <TextField
              className={classes.input}
              variant="outlined"
              label="ادخال اسم الصنف"
            />
          </Grid>
          <Grid item>
            <TextField
              className={classes.input2}
              variant="outlined"
              label="  الترتيب"
            />
          </Grid>
          <Grid container justify="center">
            <Grid item>
              <Button variant="contained" className={classes.button}>
                تم
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
      <Divider />
      <Typography variant="h4" color="primary">
        عرض الاصناف الرئسيه
      </Typography>
       {catagView}
    </React.Fragment>
  );
};
export default AddCatagiories;
