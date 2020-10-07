import React, { useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Grid, Card, Typography } from "@material-ui/core";
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
});

const GetProducts = () => {
  const classes = useStyles();
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
      <Grid container direction="row">
        {products.map((catag) => (
          <Grid item>
            <Grid container direction="column">
              <Grid item>
                <Card className={classes.card}>
                  <img className={classes.img} src={catag.img} alt="subimg" />
                  <Grid item>
                    <Typography variant="h4" className={classes.font}>
                      اسم الصنف : {catag.catgname}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h4" className={classes.font}>
                      اسم المنتج: {catag.name}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h4" className={classes.font}>
                      السعر: {catag.price}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography className={classes.font} variant="h4">
                      التفاصيل : {catag.details}
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
