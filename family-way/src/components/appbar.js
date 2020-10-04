import React from "react";
import clsx from "clsx";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  MenuItem,
  Menu,
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/styles";

const Styles = makeStyles((theme) => ({
  title: {
    // flex: 1
    flexGrow: 1,
  },
  toolbarButtons: {
    // marginLeft: "auto"
  },
}));
const AppTopBar = ({ handleDrawerOpen, open, classes }) => {
  const styles = Styles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const profileOpen = Boolean(anchorEl);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // const classes = styles();
  return (
    <AppBar
      color="white"
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open,
      })}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          className={clsx(classes.menuButton, {
            [classes.hide]: open,
          })}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h4" className={styles.title}>
          لوحه تحكم
        </Typography>
        <div className={styles.toolbarButtons}>
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            open={profileOpen}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <Typography variant="h5">بروفايل</Typography>
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default AppTopBar;
