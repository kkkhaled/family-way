import { Grid } from "@material-ui/core";
import React, { useState } from "react";
import { Card, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ecommerce from "../assets/images/ecommerce.svg";
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
      <Grid container direction="row">
        {catagiories.map((catag) => (
          <Grid item>
            <Grid container direction="column">
              <Grid item>
                <Card className={classes.card}>
                  <img className={classes.img} src={catag.img} />
                  <Grid item>
                    <Typography variant="h4" className={classes.font}>
                      {catag.catgname}:اسم الصنف
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography className={classes.font} variant="h4">
                      {catag.name}:اسم المنتج
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
