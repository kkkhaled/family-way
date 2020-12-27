import { Grid } from "@material-ui/core";
import React, { useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  Card,
  Typography,
  TextField,
  Button,
  Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ecom from "../assets/images/ecom.jpg";

const useStyles = makeStyles((theme) => ({
  card: {
    width: "22em",
    height: "22em",
    border: 8,
    marginTop: "20px",
    marginBottom: "20px",
    marginLeft: "10px",
    marginRight: "10px",
  },
  img: {
    width: "20em",
    height: "13em",
    marginLeft: "15px",
    marginRight: "15px",
    marginTop: "15px",
  },
  font: {
    marginLeft: "10px",
    marginTop: "8px",
    marginBottom: "8px",
  },

  autocomplete: {
    width: "35em",
    marginRight: "15px",
  },
  button: {
    width: "22.5em",
    marginRight: "15px",
    marginLeft: "15px",
    color: "white",
    border: 8,
    marginTop: "10px",
  },
  field: {
    width: "60em",
    marginTop: "10px",
    marginBottom: "15px",
  },
  button2: {
    color: "white",
    width: "22em",
    marginTop: "12px",
    marginBottom: "22px",
    backgroundColor: theme.palette.green.main,
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
}));

const GetSubCatagories = () => {
  const classes = useStyles();
  const [catagiories, setCatagories] = useState([
    { name: "منتج واحد", catgname: "صنف واحد", img: ecom },
    { name: "منتج واحد", catgname: "صنف واحد", img: ecom },
    { name: "منتج واحد", catgname: "صنف واحد", img: ecom },
    { name: "منتج واحد", catgname: "صنف واحد", img: ecom },
    { name: "منتج واحد", catgname: "صنف واحد", img: ecom },
    { name: "منتج واحد", catgname: "صنف واحد", img: ecom },
  ]);

  const subCatagView=(
    <React.Fragment>
      <Grid container direction='row'>
        {catagiories.map((catag)=>(
          <Card className={classes.card}>
            <img className={classes.img} src={catag.img} alt="subimg" />
            <Grid container justify='space-between' className={classes.itemSpace} >
              <Grid item >
                <Typography variant='h4' className={classes.spacerLeft}>اسم الصنف</Typography>
              </Grid>
              <Grid item>
                <Typography variant='h4' className={classes.spacerRight}>{catag.catgname}</Typography>
              </Grid>
            </Grid>
            <Grid container justify='space-between' className={classes.itemSpace}>
              <Grid item >
                <Typography variant='h4' className={classes.spacerLeft}   >اسم المنتج</Typography>
              </Grid>
              <Grid item>
                <Typography variant='h4' className={classes.spacerRight}  >{catag.name}</Typography>
              </Grid>
            </Grid>
          </Card>
        ))}
      </Grid>
    </React.Fragment>
  )

  return (
    <React.Fragment>
      <Typography variant="h4" className={classes.head}>
        ادخل الاصناف الفرعيه
      </Typography>
      <form>
        <Grid container direction="column">
          <Grid item>
            <TextField
              variant="outlined"
              label="ادخل الاسم"
              className={classes.field}
            />
          </Grid>
          <Grid item>
            <Grid container direction="row">
              <Grid item>
                <Autocomplete
                  className={classes.autocomplete}
                  id="combo-box-demo"
                  options={catagiories}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="اختر الصنف الرئيسى"
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                >
                  ادخل صوره الصنف
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid container justify="center">
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button2}
              >
                تم
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>

      <Divider />
      <Grid container direction="row">
        <Grid item>
          <Typography variant="h4" className={classes.head}>
            عرض الاصناف الفرعيه
          </Typography>
        </Grid>
        <Grid item>
          <Autocomplete
            className={classes.autocomplete2}
            id="combo-box-demo"
            options={catagiories}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField
                {...params}
                label="اختر الصنف الرئيسى"
                variant="outlined"
              />
            )}
          />
        </Grid>
      </Grid>
     {subCatagView}
    </React.Fragment>
  );
};
export default GetSubCatagories;
