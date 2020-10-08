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

const useStyles = makeStyles({
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
  },
  head: {
    marginTop: "20px",
    marginLeft: "10px",
  },
  autocomplete2: {
    width: "60em",
    marginBottom: "15px",
    marginTop: "15px",
  },
});

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
      <Typography variant="h4" className={classes.head}>
        اختر الصنف الرئيسى
      </Typography>
      <form>
        <Grid container direction="column">
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
          <Grid item>
            <Grid container justify="center">
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

      <Typography variant="h4" className={classes.head}>
        عرض الاصناف الفرعيه
      </Typography>
      <Grid container direction="row">
        {catagiories.map((catag) => (
          <Grid item key={catag.name}>
            <Grid container direction="column">
              <Grid item key={catag.name}>
                <Card className={classes.card}>
                  <img className={classes.img} src={catag.img} alt="subimg" />
                  <Grid item>
                    <Typography variant="h4" className={classes.font}>
                      اسم الصنف : {catag.catgname}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography className={classes.font} variant="h4">
                      اسم المنتج: {catag.name}
                    </Typography>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
};
export default GetSubCatagories;
