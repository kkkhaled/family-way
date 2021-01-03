import React, { useState,useContext } from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";
import NavData from "../data/nav";
import { makeStyles,withStyles  } from "@material-ui/core";
import { Button } from "@material-ui/core";
import {  purple } from "@material-ui/core/colors";
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import {authContext} from '../contexts/auth/authstate'

const drawerWidth = 240;

const useStyle = makeStyles((theme) => ({
  List: {
    marginRight: "35px",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const CustomizedButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: theme.palette.red.light,
    "&:hover": {
      backgroundColor: theme.palette.red.light,
    },
    padding: "10px",
    paddingLeft:"40px",
    display: "inline-block",
    margin: "20px auto",
    width:"150px",
    borderRadius :5
  },
}))(Button);

const SideBar = () => {
  const classes = useStyle();

  const {logout} = useContext(authContext)

  const [selected, setSelected] = useState(false);
  const [open, setOpen] = useState(true);

  const handleClick = (e, id) => {
    setSelected(id);
  };

   // handle nested
   const handleNested = (e,id) => {
    setSelected(id);
    setOpen(!open);
  };

  // handle logout
  const handleLogout=()=>{
     logout()
  } 

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {NavData.catagiories.map((item, index) => (
          <ListItem
            onClick={(e) => handleClick(e, item.id)}
            selected={selected === item.id}
            component={Link}
            to={item.to}
            button
            key={item.id}
          >
            <ListItemIcon>{<item.icon />}</ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {NavData.getsubcagtiories.map((item, index) => (
          <ListItem
            onClick={(e) => handleClick(e, item.id)}
            selected={selected === item.id}
            component={Link}
            to={item.to}
            button
            key={item.id}
          >
            <ListItemIcon>{<item.icon />}</ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {NavData.thirdcagtiories.map((item, index) => (
          <ListItem
            onClick={(e) => handleClick(e, item.id)}
            selected={selected === item.id}
            component={Link}
            to={item.to}
            button
            key={item.id}
          >
            <ListItemIcon>{<item.icon />}</ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {NavData.users.map((item, index) => (
          <ListItem
            onClick={(e) => handleClick(e, item.id)}
            selected={selected === item.id}
            component={Link}
            to={item.to}
            button
            key={item.id}
          >
            <ListItemIcon>{<item.icon />}</ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {NavData.notifcations.map((item, index) => (
          <ListItem
            onClick={(e) => handleClick(e, item.id)}
            selected={selected === item.id}
            component={Link}
            to={item.to}
            button
            key={item.id}
          >
            <ListItemIcon>{<item.icon />}</ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {NavData.addproducts.map((item, index) => (
          <ListItem
            onClick={(e) => handleClick(e, item.id)}
            selected={selected === item.id}
            component={Link}
            to={item.to}
            button
            key={item.id}
          >
            <ListItemIcon>{<item.icon />}</ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {NavData.getproducts.map((item, index) => (
          <ListItem
            onClick={(e) => handleClick(e, item.id)}
            selected={selected === item.id}
            component={Link}
            to={item.to}
            button
            key={item.id}
          >
            <ListItemIcon>{<item.icon />}</ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {NavData.constants.map((item, index) => (
          <ListItem
            onClick={(e) => handleClick(e, item.id)}
            selected={selected === item.id}
            component={Link}
            to={item.to}
            button
            key={item.id}
          >
            <ListItemIcon>{<item.icon />}</ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItem>
        ))}
      </List>
      <Divider />

      <List>
        {NavData.ordertimes.map((item, index) => (
          <ListItem
            onClick={(e) => handleClick(e, item.id)}
            selected={selected === item.id}
            component={Link}
            to={item.to}
            button
            key={item.id}
          >
            <ListItemIcon>{<item.icon />}</ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItem>
        ))}
      </List>
      <Divider />

      <List>
        {NavData.orders.map((item, index) => (
          <ListItem
            onClick={(e) => handleNested(e, item.id)}
            selected={selected === item.id}
            component={Link}
            to={item.to}
            button
            key={item.id}
          >
            <ListItemIcon>{<item.icon />}</ListItemIcon>
            <ListItemText primary={item.title} />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
        ))}
         <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
          <ListItemText primary="متءب" />
         </ListItem>
         <ListItem button className={classes.nested}>
          <ListItemText primary="متءب" />
         </ListItem>
        </List>
      </Collapse>
      </List>
      <CustomizedButton 
        component={Link}
        to='/login'
        onClick={handleLogout}
      >
        تسجيل الخروج
      </CustomizedButton>
    </Drawer>
  );
};
export default SideBar;
