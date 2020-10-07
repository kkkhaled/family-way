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
} from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  head: {
    backgroundColor: "#fafafa",
  },
}));

const UsersTable = () => {
  const classes = useStyle();
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
};
export default UsersTable;
