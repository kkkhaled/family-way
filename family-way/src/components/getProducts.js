import React, { useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  Grid,
  Card,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ecom from "../assets/images/ecom.jpg";

const useStyles = makeStyles((theme) => ({
  card: {
    width: "22em",
    height: "30em",
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
    marginRight: "8px",
    marginTop: "8px",
    color: "red",
  },
  name: { marginLeft: "8px" },
  details: {
    marginLeft: "8px",
    color: theme.palette.gray,
  },
  autocomplete: {
    width: "38.5em",
    marginBottom: "15px",
    marginLeft: "50px",
  },
  button: {
    color: theme.palette.green.dark,
    backgroundColor: theme.palette.green.light,
    width: "10em",
    height: "2.6em",
    marginTop: "12px",
    marginLeft: "8px",
    marginRight: "5px",
  },
  delbutton: {
    color: "red",
    backgroundColor: theme.palette.red.light,
    width: "10em",
    height: "2.6em",
    marginTop: "12px",
    marginLeft: "8px",
    marginRight: "5px",
  },
}));

const GetProducts = () => {
  const classes = useStyles();
  const [third, setThird] = useState([
    { id: 1, name: "صنف ثالث" },
    { id: 2, name: "صنف ثالث" },
    { id: 3, name: "صنف ثالث" },
    { id: 4, name: "صنف ثالث" },
    { id: 5, name: "صنف ثالث" },
    { id: 6, name: "صنف ثالث" },
  ]);
  const [products, setProducts] = useState([
    {
      name: "منتج واحد",
      catgname: "صنف واحد",
      img: ecom,
      price: "20$",
      details: "منتج جيد جدا ",
    },
    {
      name: "منتج واحد",
      catgname: "صنف واحد",
      img: ecom,
      price: "20$",
      details: "منتج جيد جدا ",
    },
    {
      name: "منتج واحد",
      catgname: "صنف واحد",
      img: ecom,
      price: "20$",
      details:
        " لدرجه غريبه حقا انه يقضي علي الصلع  يا له من منتج منتج جيد جدا ",
    },
    {
      name: "منتج واحد",
      catgname: "صنف واحد",
      img: ecom,
      price: "20$",
      details:
        " hkjgghgjgj لدرجه غريبه حقا انه يقضي علي الصلع  يا له من منتج منتج جيد جدا ",
    },
    {
      name: "منتج واحد",
      catgname: "صنف واحد",
      img: ecom,
      price: "20$",
      details: "منتج جيد جدا ",
    },
    {
      name: "منتج واحد",
      catgname: "صنف واحد",
      img: ecom,
      price: "20$",
      details: "منتج جيد جدا ",
    },
  ]);

  return (
    <React.Fragment>
      <Grid container direction="row">
        <Grid item>
          <Typography variant="h4">اختر الصنف الثالث</Typography>
        </Grid>
        <Grid item>
          <Autocomplete
            className={classes.autocomplete}
            id="combo-box-demo"
            options={third}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField
                {...params}
                label="اختر الصنف الثالث"
                variant="outlined"
              />
            )}
          />
        </Grid>
      </Grid>

      <Grid container direction="row">
        {products.map((product) => (
          <Grid item key={product.name}>
            <Grid container direction="column">
              <Grid item>
                <Card className={classes.card}>
                  <img className={classes.img} src={product.img} alt="subimg" />
                  <Grid container direction="column">
                    <Typography
                      variant="h5"
                      align="right"
                      className={classes.font}
                    >
                      {product.price}
                    </Typography>
                    <Grid item>
                      <Typography variant="h4" className={classes.name}>
                        {product.name}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="h5" className={classes.details}>
                        {product.details}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Grid container direction="row">
                        <Button variant="contained" className={classes.button}>
                          <Typography variant="h5">تعديل</Typography>
                        </Button>
                        <Button
                          variant="contained"
                          className={classes.delbutton}
                        >
                          <Typography variant="h5"> مسح</Typography>
                        </Button>
                      </Grid>
                    </Grid>
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
export default GetProducts;
