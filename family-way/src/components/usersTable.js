import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  IconButton,
} from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import Draggable from "react-draggable";

const useStyle = makeStyles((theme) => ({
  head: {
    backgroundColor: "#fafafa",
  },
  editicon: {
    backgroundColor: theme.palette.yellow.main,
    color: "white",
    marginRight: "5px",
  },
  delIcon: {
    color: "white",
    backgroundColor: theme.palette.secondary.main,
  },
  buttondialogsubmit: {
    color: "white",
    backgroundColor: theme.palette.green.main,
    border: 5,
  },
  field: {
    width: "22em",
    marginTop: "8px",
    marginBottom: "8px",
  },
  formButton: {
    color: "white",
    border: 5,
    marginTop: "8px",
  },
}));

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

const UsersTable = () => {
  const classes = useStyle();
  //for hanle pop-up
  const [openDialog, setOpenDialog] = useState(false);
  const [users, setUsers] = useState([
    {
      name: "khaled fathi",
      role: "ADMIN",
      spins: 100,
      points: 150,
      wallet: 0,
    },
    {
      name: "khaled fathi",
      role: "ADMIN",
      spins: 100,
      points: 150,
      wallet: 0,
    },
    {
      name: "khaled fathi",
      role: "ADMIN",
      spins: 100,
      points: 150,
      wallet: 0,
    },
    {
      name: "khaled fathi",
      role: "ADMIN",
      spins: 100,
      points: 150,
      wallet: 0,
    },
    {
      name: "khaled fathi",
      role: "ADMIN",
      spins: 100,
      points: 150,
      wallet: 0,
    },
    {
      name: "khaled fathi",
      role: "ADMIN",
      spins: 100,
      points: 150,
      wallet: 0,
    },
    {
      name: "khaled fathi",
      role: "ADMIN",
      spins: 100,
      points: 150,
      wallet: 0,
    },
  ]);

  // handle dialog open
  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  // handle dialog closed
  const handleClose = () => {
    setOpenDialog(false);
  };

  const dialogContent = (
    <React.Fragment>
      <form>
        <Grid container direction="column">
          <Grid item>
            <TextField
              variant="outlined"
              label=" المحظه"
              className={classes.field}
            />
          </Grid>
          <Grid item>
            <TextField
              variant="outlined"
              label=" النقاط"
              className={classes.field}
            />
          </Grid>
          <Grid item>
            <TextField
              variant="outlined"
              label=" المحاولات المتاحه"
              className={classes.field}
            />
          </Grid>
          <Grid container justify="center">
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                className={classes.formButton}
              >
                حفظ
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <TableContainer elevation={0} component={Paper}>
        <Table aria-label="simple table">
          <TableHead className={classes.head}>
            <TableRow>
              <TableCell align="center">
                <Typography variant="h5">الترتيب</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h5">الاسم</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h5">الدور</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h5">المحفظه</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h5" align="center">
                  المحاولات المتاحه
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h5">النقاط</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h5">التعديل</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row" align="center">
                  1
                </TableCell>
                <TableCell align="center"> {row.name}</TableCell>
                <TableCell align="center"> {row.role}</TableCell>
                <TableCell align="center"> {row.wallet}</TableCell>
                <TableCell align="center"> {row.spins}</TableCell>
                <TableCell align="center"> {row.points}</TableCell>
                <TableCell align="center">
                  <Grid container direction="row" justify="center">
                    <Grid item>
                      <IconButton>
                        <EditIcon
                          className={classes.editicon}
                          onClick={handleClickOpen}
                        />
                      </IconButton>
                    </Grid>
                    <Grid item>
                      <IconButton>
                        <DeleteForeverIcon className={classes.delIcon} />
                      </IconButton>
                    </Grid>
                  </Grid>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          <Typography variant="h5" color="primary">
            تعديل بيانات المستخدم
          </Typography>
        </DialogTitle>
        <DialogContent>{dialogContent}</DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="contained"
            className={classes.buttondialogsubmit}
          >
            تم
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
export default UsersTable;
