import React, { useState } from "react";
import { Grid, TextField, Button } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  field: {
    width: "32em",
    marginRight: "15px",
    marginBottom: "15px",
    marginTop: "15px",
  },
  button: {
    color: "white",
    width: "20em",
    border: 8,
    marginTop: "20px",
    marginLeft: "20px",
  },
  buttonsubmit: {
    color: "white",
    width: "20em",
    border: 8,
    marginTop: "20px",
    marginLeft: "20px",
    backgroundColor: theme.palette.green.main,
  },
  detailsfield: {
    width: "65em",
    marginTop: "10px",
    marginBottom: "10px",
  },
}));

const AddProducts = () => {
  const classes = useStyles();

  const [units, setUnits] = useState([
    { id: 1, name: "كيلو" },
    { id: 2, name: "حبه" },
    { id: 3, name: "كرتونه" },
  ]);
  const [third, setThird] = useState([
    { name: "واحد" },
    { name: "واحد" },
    { name: "واحد" },
    { name: "واحد" },
  ]);
  return (
    <form>
      <Grid container direction="column">
        <Grid item>
          <Autocomplete
            className={classes.detailsfield}
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
          <Grid container direction="row">
            <Grid item>
              <TextField
                className={classes.field}
                variant="outlined"
                label="باركود"
              />
            </Grid>
            <Grid item>
              <Button
                color="primary"
                variant="contained"
                className={classes.button}
              >
                ادخل الصور
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <TextField
            variant="outlined"
            label="ادخل العنوان"
            className={classes.detailsfield}
          />
        </Grid>
        <Grid item>
          <TextField
            variant="outlined"
            label="ادخل التفاصيل"
            className={classes.detailsfield}
          />
        </Grid>
        <Grid item>
          <TextField
            variant="outlined"
            label="ادخل السعر"
            className={classes.detailsfield}
          />
        </Grid>
        <Grid item>
          <TextField
            variant="outlined"
            label=" التخفيض"
            className={classes.detailsfield}
          />
        </Grid>
        <Grid item>
          <Grid container justify="center">
            <TextField
              id="datetime-local"
              label="موعد انتهاء التخفيض"
              type="datetime-local"
              defaultValue="2017-05-24T10:30"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </Grid>
        <Grid item>
          <TextField
            variant="outlined"
            label=" مقدار الزياده"
            className={classes.detailsfield}
          />
        </Grid>
        <Grid item>
          <TextField
            variant="outlined"
            label="  اعلي قيمه للمستخدم"
            className={classes.detailsfield}
          />
        </Grid>
        <Grid item>
          <Autocomplete
            className={classes.detailsfield}
            id="combo-box-demo"
            options={units}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField {...params} label="   الوحده" variant="outlined" />
            )}
          />
        </Grid>
        <Grid item>
          <TextField
            variant="outlined"
            label="    المخزون"
            className={classes.detailsfield}
          />
        </Grid>
        <Grid item>
          <TextField
            variant="outlined"
            label="   مقدار الوحده "
            className={classes.detailsfield}
          />
        </Grid>
        <Grid item>
          <Grid container justify="center">
            <Button variant="contained" className={classes.buttonsubmit}>
              تم
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};
export default AddProducts;
