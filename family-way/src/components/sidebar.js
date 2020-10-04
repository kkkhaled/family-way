import React, { useState } from "react";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";
import NavData from "../data/nav";
import { makeStyles } from "@material-ui/core";

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
}));

const SideBar = () => {
  const classes = useStyle();
  const [selected, setSelected] = useState(false);
  const handleClick = (e, id) => {
    setSelected(id);
  };
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
            key={item.title}
          >
            <ListItemIcon>{<item.icon />}</ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {NavData.getsubcagiories.map((item, index) => (
          <ListItem
            onClick={(e) => handleClick(e, item.id)}
            selected={selected === item.id}
            component={Link}
            to={item.to}
            button
            key={item.title}
          >
            <ListItemIcon>{<item.icon />}</ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </Drawer>
  );
};
export default SideBar;
