import { Grid } from "@material-ui/core";
import React, { useState, useEffect, useContext } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  Card,
  Typography,
  TextField,
  Button
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { catagoriesContext } from '../contexts/catagories/catagoriesState';
import { subcatagoriesContext } from '../contexts/subcatagories/subcatagoriesState';
import Alert from '@material-ui/lab/Alert';

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
  font: {
    marginLeft: "10px",
    marginTop: "8px",
    marginBottom: "8px",
  },

  field: {
    width: "60em",
    marginTop: "10px",
    marginBottom: "15px",
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
  itemSpace: {
    marginTop: "12px",
    marginBottom: "12px"
  },
  spacerRight: {
    paddingRight: "8px",
    color: theme.palette.red.light
  },
  spacerLeft: {
    paddingLeft: "8px"
  },
  buttondelete: {
    color: 'white',
    width: '0.8em',
    border: 7,
    marginTop: '2px',
    marginBottom: '5px',
    backgroundColor: theme.palette.red.light
  },
  root: {
    width: '78.7%',
    '& > * + *': {
      marginTop: theme.spacing(10),
    },
  },
}));

const SubCatagoryView = () => {
  const classes = useStyles();
  // define component state
  const [text, setText] = useState({ name: "انتظر تحميل البيانات" })
  const [name, setName] = useState('')
  const {
    getAllCatagories
    , catagories,
  } = useContext(catagoriesContext);


  // render subcatagories state && func
  const {
    getFilteredSubSatagories,
    filterdata,
    removeOne
  } = useContext(subcatagoriesContext)

  // loading catagories
  useEffect(() => {
    getAllCatagories();
  }
    // eslint-disable-next-line
    , []);

  // handle filter input
  const handleFilter = (event, item) => {
    if (item) {
      getFilteredSubSatagories(item._id);
      setName(item.name)
    }
  }

  const subCatagView = (
    <React.Fragment>
      <Grid container direction='row'>
        {filterdata.length > 0 ?
          filterdata.map((item) => (
            <Card key={item._id} style={{ margin: 10 ,textAlign:"center"}}>
              <img
                style={{ width: 200, height: 100 }}
                src={`https://familyway.sa/uploads/subCategories/${item.image}`}
                alt="sub_img" />
              <h5 style={{textAlign:"center",margin:10}}>{item.name}</h5>
                   <Button variant="contained"
                    className={classes.buttondelete}
                    onClick={()=>removeOne(item._id)}
                   >
                     مسح
                   </Button>
            </Card>
          )) : <div style={{ margin: "15px 0px", width: "100%" }}><Alert severity="info">
            <Typography variant='h5'>
              ادخل الصنف الرئيسى من فضلك
          </Typography>
          </Alert>
          </div>}
      </Grid>
    </React.Fragment>
  )
  return (
    <React.Fragment>
      <Grid container direction="column">
        <Typography variant="h4" className={classes.head}>
          عرض الاصناف الفرعيه
        </Typography>
        {subCatagView}
        <Grid item>
          <Autocomplete
            id="combo-box-demo"
            style={{ width: "100%", margin: '15px 0' }}
            options={catagories}
            getOptionLabel={(option) => option.name}
            onChange={handleFilter}
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

    </React.Fragment>
  )
}
export default SubCatagoryView;