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
import ecom from "../assets/images/ecom.jpg";

const useStyles = makeStyles({
  card: {
    width: "22em",
    height: "40em",
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
    width: "60em",
    marginBottom: "15px",
    marginTop: "15px",
  },
  button: {
    color: "white",
    width: "22em",
    marginTop: "12px",
    marginBottom: "22px",
  },
});

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
        " لدرجه غريبه حقا انه يقضي علي الصلع  يا له من منتج منتج جيد جدا ",
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
      <Typography variant="h4">اختر الصنف الثالث</Typography>
      <form>
        <Grid container direction="column">
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
          <Grid item>
            <Grid container justify="center">
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
              >
                تم
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
      <Divider />
      <Grid container direction="row">
        {products.map((product) => (
          <Grid item key={product.name}>
            <Grid container direction="column">
              <Grid item>
                <Card className={classes.card}>
                  <img className={classes.img} src={product.img} alt="subimg" />
                  <Grid item>
                    <Typography variant="h4" className={classes.font}>
                      اسم الصنف : {product.catgname}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h4" className={classes.font}>
                      اسم المنتج: {product.name}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h4" className={classes.font}>
                      السعر: {product.price}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography className={classes.font} variant="h4">
                      التفاصيل : {product.details}
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
export default GetProducts;
