import React, { useState, useContext } from 'react'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { Link } from 'react-router-dom'
import NavData from '../data/nav'
import { makeStyles, withStyles } from '@material-ui/core'
import { Button } from '@material-ui/core'
import { purple } from '@material-ui/core/colors'
import Collapse from '@material-ui/core/Collapse'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import { authContext } from '../contexts/auth/authstate'

const drawerWidth = 240

const useStyle = makeStyles(theme => ({
  List: {
    marginRight: '35px'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#1c2826'
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3)
  },
  nested: {
    paddingLeft: theme.spacing(4)
  },
  sideIcon: {
    color: '#FFF'
  },
  sideText: {
    color: '#FFF',
    fontSize: '15px'
  },
  Divider: {
    backgroundColor: '#999'
  },
  sideBarText: {
    color: '#999'
  }
}))

const CustomizedButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: theme.palette.red.light,
    '&:hover': {
      backgroundColor: theme.palette.red.light
    },
    padding: '10px',
    paddingLeft: '40px',
    display: 'inline-block',
    margin: '20px auto',
    width: '150px',
    borderRadius: 5
  }
}))(Button)

const SideBar = () => {
  const [subOrderList, setSideOrderList] = useState([
    'جميع الطلبات',
    'تم استلام الطلب',
    'مرحلة المراجعه',
    'جاري التجهيز',
    'في الطريق',
    'تم التوصيل',
    'تحت المراجعة للأسترجاع',
    'تم الأسترجاع',
    'لم يتم الأسترجاع',
    'تم الرفض'
  ])
  const classes = useStyle()

  const { logout } = useContext(authContext)

  const [selected, setSelected] = useState(false)
  const [open, setOpen] = useState(true)

  const handleClick = (e, id) => {
    setSelected(id)
  }

  // handle nested
  const handleNested = (e, id) => {
    setSelected(id)
    setOpen(!open)
  }

  // handle logout
  const handleLogout = () => {
    logout()
  }

  return (
    <Drawer
      className={classes.drawer}
      variant='permanent'
      classes={{
        paper: classes.drawerPaper
      }}
      anchor='left'
    >
      <Divider className={classes.Divider} />
      <List>
        {NavData.catagiories.map((item, index) => (
          <ListItem
            onClick={e => handleClick(e, item.id)}
            selected={selected === item.id}
            component={Link}
            to={item.to}
            button
            key={item.id}
          >
            <ListItemIcon className={classes.sideIcon}>
              {<item.icon />}
            </ListItemIcon>
            <ListItemText className={classes.sideText} primary={item.title} />
          </ListItem>
        ))}
      </List>
      <Divider className={classes.Divider} />
      <List>
        {NavData.getsubcagtiories.map((item, index) => (
          <ListItem
            onClick={e => handleClick(e, item.id)}
            selected={selected === item.id}
            component={Link}
            to={item.to}
            button
            key={item.id}
          >
            <ListItemIcon className={classes.sideIcon}>
              {<item.icon />}
            </ListItemIcon>
            <ListItemText className={classes.sideText} primary={item.title} />
          </ListItem>
        ))}
      </List>
      <Divider className={classes.Divider} />
      <List>
        {NavData.thirdcagtiories.map((item, index) => (
          <ListItem
            onClick={e => handleClick(e, item.id)}
            selected={selected === item.id}
            component={Link}
            to={item.to}
            button
            key={item.id}
          >
            <ListItemIcon className={classes.sideIcon}>
              {<item.icon />}
            </ListItemIcon>
            <ListItemText className={classes.sideText} primary={item.title} />
          </ListItem>
        ))}
      </List>
      <Divider className={classes.Divider} />
      <List>
        {NavData.users.map((item, index) => (
          <ListItem
            onClick={e => handleClick(e, item.id)}
            selected={selected === item.id}
            component={Link}
            to={item.to}
            button
            key={item.id}
          >
            <ListItemIcon className={classes.sideIcon}>
              {<item.icon />}
            </ListItemIcon>
            <ListItemText className={classes.sideText} primary={item.title} />
          </ListItem>
        ))}
      </List>

      <Divider className={classes.Divider} />
      <List>
        {NavData.notifcations.map((item, index) => (
          <ListItem
            onClick={e => handleClick(e, item.id)}
            selected={selected === item.id}
            component={Link}
            to={item.to}
            button
            key={item.id}
          >
            <ListItemIcon className={classes.sideIcon}>
              {<item.icon />}
            </ListItemIcon>
            <ListItemText className={classes.sideText} primary={item.title} />
          </ListItem>
        ))}
      </List>

      <Divider className={classes.Divider} />
      <List>
        {NavData.addproducts.map((item, index) => (
          <ListItem
            onClick={e => handleClick(e, item.id)}
            selected={selected === item.id}
            component={Link}
            to={item.to}
            button
            key={item.id}
          >
            <ListItemIcon className={classes.sideIcon}>
              {<item.icon />}
            </ListItemIcon>
            <ListItemText className={classes.sideText} primary={item.title} />
          </ListItem>
        ))}
      </List>
      <Divider className={classes.Divider} />
      <List>
        {NavData.getproducts.map((item, index) => (
          <ListItem
            onClick={e => handleClick(e, item.id)}
            selected={selected === item.id}
            component={Link}
            to={item.to}
            button
            key={item.id}
          >
            <ListItemIcon className={classes.sideIcon}>
              {<item.icon />}
            </ListItemIcon>
            <ListItemText className={classes.sideText} primary={item.title} />
          </ListItem>
        ))}
      </List>
      <Divider className={classes.Divider} />
      <List>
        {NavData.orders.map((item, index) => (
          <ListItem
            onClick={e => handleClick(e, item.id)}
            selected={selected === item.id}
            component={Link}
            to={item.to}
            button
            key={item.id}
          >
            <ListItemIcon className={classes.sideIcon}>
              {<item.icon />}
            </ListItemIcon>
            <ListItemText className={classes.sideText} primary={item.title} />
          </ListItem>
        ))}
      </List>

      <Divider className={classes.Divider} />
      <List>
        {NavData.ordersArchived.map((item, index) => (
          <ListItem
            onClick={e => handleClick(e, item.id)}
            selected={selected === item.id}
            component={Link}
            to={item.to}
            button
            key={item.id}
          >
            <ListItemIcon className={classes.sideIcon}>
              {<item.icon />}
            </ListItemIcon>
            <ListItemText className={classes.sideText} primary={item.title} />
          </ListItem>
        ))}
      </List>

      <Divider className={classes.Divider} />
      <List>
        {NavData.addcoupons.map((item, index) => (
          <ListItem
            onClick={e => handleClick(e, item.id)}
            selected={selected === item.id}
            component={Link}
            to={item.to}
            button
            key={item.id}
          >
            <ListItemIcon className={classes.sideIcon}>
              {<item.icon />}
            </ListItemIcon>
            <ListItemText className={classes.sideText} primary={item.title} />
          </ListItem>
        ))}
      </List>
      <Divider className={classes.Divider} />
      <List>
        {NavData.getcoupons.map((item, index) => (
          <ListItem
            onClick={e => handleClick(e, item.id)}
            selected={selected === item.id}
            component={Link}
            to={item.to}
            button
            key={item.id}
          >
            <ListItemIcon className={classes.sideIcon}>
              {<item.icon />}
            </ListItemIcon>
            <ListItemText className={classes.sideText} primary={item.title} />
          </ListItem>
        ))}
      </List>
      <Divider className={classes.Divider} />
      <List>
        {NavData.addslider.map((item, index) => (
          <ListItem
            onClick={e => handleClick(e, item.id)}
            selected={selected === item.id}
            component={Link}
            to={item.to}
            button
            key={item.id}
          >
            <ListItemIcon className={classes.sideIcon}>
              {<item.icon />}
            </ListItemIcon>
            <ListItemText className={classes.sideText} primary={item.title} />
          </ListItem>
        ))}
      </List>
      <Divider className={classes.Divider} />
      <List>
        {NavData.getslider.map((item, index) => (
          <ListItem
            onClick={e => handleClick(e, item.id)}
            selected={selected === item.id}
            component={Link}
            to={item.to}
            button
            key={item.id}
          >
            <ListItemIcon className={classes.sideIcon}>
              {<item.icon />}
            </ListItemIcon>
            <ListItemText className={classes.sideText} primary={item.title} />
          </ListItem>
        ))}
      </List>
      <Divider className={classes.Divider} />
      <List>
        {NavData.addslidercatagories.map((item, index) => (
          <ListItem
            onClick={e => handleClick(e, item.id)}
            selected={selected === item.id}
            component={Link}
            to={item.to}
            button
            key={item.id}
          >
            <ListItemIcon className={classes.sideIcon}>
              {<item.icon />}
            </ListItemIcon>
            <ListItemText className={classes.sideText} primary={item.title} />
          </ListItem>
        ))}
      </List>
      <Divider className={classes.Divider} />
      <List>
        {NavData.getslidercatagories.map((item, index) => (
          <ListItem
            onClick={e => handleClick(e, item.id)}
            selected={selected === item.id}
            component={Link}
            to={item.to}
            button
            key={item.id}
          >
            <ListItemIcon className={classes.sideIcon}>
              {<item.icon />}
            </ListItemIcon>
            <ListItemText className={classes.sideText} primary={item.title} />
          </ListItem>
        ))}
      </List>
      <Divider className={classes.Divider} />
      <List>
        {NavData.constants.map((item, index) => (
          <ListItem
            onClick={e => handleClick(e, item.id)}
            selected={selected === item.id}
            component={Link}
            to={item.to}
            button
            key={item.id}
          >
            <ListItemIcon className={classes.sideIcon}>
              {<item.icon />}
            </ListItemIcon>
            <ListItemText className={classes.sideText} primary={item.title} />
          </ListItem>
        ))}
      </List>
      <Divider className={classes.Divider} />
      <List>
        {NavData.ordertimes.map((item, index) => (
          <ListItem
            onClick={e => handleClick(e, item.id)}
            selected={selected === item.id}
            component={Link}
            to={item.to}
            button
            key={item.id}
          >
            <ListItemIcon className={classes.sideIcon}>
              {<item.icon />}
            </ListItemIcon>
            <ListItemText className={classes.sideText} primary={item.title} />
          </ListItem>
        ))}
      </List>
      <Divider className={classes.Divider} />
      <List>
        {NavData.Ads.map((item, index) => (
          <ListItem
            onClick={e => handleClick(e, item.id)}
            selected={selected === item.id}
            component={Link}
            to={item.to}
            button
            key={item.id}
          >
            <ListItemIcon className={classes.sideIcon}>
              {<item.icon />}
            </ListItemIcon>
            <ListItemText className={classes.sideText} primary={item.title} />
          </ListItem>
        ))}
      </List>

      <CustomizedButton component={Link} to='/login' onClick={handleLogout}>
        تسجيل الخروج
      </CustomizedButton>
    </Drawer>
  )
}
export default SideBar
