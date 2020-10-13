import React, { useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  Grid,
  Card,
  Typography,
  TextField,
  Button,
  Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ecommerce from "../assets/images/ecommerce.svg";

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
}));

const GetThirdCatagories = () => {
  const classes = useStyles();
  const [subcatagiories, setSubCatagories] = useState([
    { name: "منتج واحد", catgname: "صنف واحد", img: ecommerce },
    { name: "منتج واحد", catgname: "صنف واحد", img: ecommerce },
    { name: "منتج واحد", catgname: "صنف واحد", img: ecommerce },
    { name: "منتج واحد", catgname: "صنف واحد", img: ecommerce },
    { name: "منتج واحد", catgname: "صنف واحد", img: ecommerce },
    { name: "منتج واحد", catgname: "صنف واحد", img: ecommerce },
  ]);
  return (
    <React.Fragment>
      <Typography variant="h4" className={classes.head}>
        ادخل الاصناف الثالثه
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
                  options={subcatagiories}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="اختر الصنف الفرعي"
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
              <Button variant="contained" className={classes.button2}>
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
            عرض الاصناف الثالثه
          </Typography>
        </Grid>
        <Grid item>
          <Autocomplete
            className={classes.autocomplete2}
            id="combo-box-demo"
            options={subcatagiories}
            getOptionLabel={(option) => option.name}
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
      <Grid container direction="row">
        {subcatagiories.map((catag) => (
          <Grid item key={catag.name}>
            <Grid container direction="column">
              <Grid item container>
                <Card className={classes.card}>
                  <img
                    className={classes.img}
                    src={catag.img}
                    alt="third img"
                  />
                  <Grid item>
                    <Typography variant="h4" className={classes.font}>
                      اسم الصنف الفرعي: {catag.catgname}
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
export default GetThirdCatagories;
