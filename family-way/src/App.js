import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { ThemeProvider, makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppTheme from './Theme'
import Addcatagiories from './pages/addcatagiories'
import Getsubcatagiories from './pages/getsubCatagories'
import Getthirdcatagiories from './pages/thirdcatagories'
import Userstable from './pages/userstable'
import Addproducts from './pages/addproducts'
import Getproducts from './pages/getproducts'
import ContantsPage from './pages/constants'
import Ordertimes from './pages/ordertimes'
import OrdersPage from './pages/orders'
import RTL from './components/rtl'
import PushNotification from './pages/pushNotification'
import PhoneNumber from './components/phoneNumber'
import { AuthProvider } from './contexts/auth/authstate'
import {CatagoriesProvider} from './contexts/catagories/catagoriesState'
import {SubCatagoriesProvider} from './contexts/subcatagories/subcatagoriesState'
import{ThirdCatagoriesProvider} from './contexts/thirdcatagories/thirdState'
import setAuthToken from './api/setAuthToken'
import PrivateRoute from './routing/privateRoute'
 


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },

  content: {
    flexGrow: 1,
    margin: '0px 255px 0px 15px'
    // padding: "15px"
    // padding: theme.spacing(3),
  }
}))
 
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

export default function MiniDrawer () {
  const classes = useStyles()
  return (
  <AuthProvider>
  <CatagoriesProvider>
    <SubCatagoriesProvider>
      <ThirdCatagoriesProvider>
      <ThemeProvider theme={AppTheme}>
        <BrowserRouter>
          <Route exact path='/login' component={PhoneNumber} />
          <div className={classes.root}>
            <CssBaseline />
            <RTL>
              <main className={classes.content}>
                <Switch>
                  <PrivateRoute
                    exact
                    path='/'
                    component={Addcatagiories}
                  />
                  <Route
                    exact
                    path='/Getsubcatagiories'
                    component={Getsubcatagiories}
                  />
                  <Route
                    exact
                    path='/Getthirdcatagiories'
                    component={Getthirdcatagiories}
                  />
                  <Route exact path='/users' component={Userstable} />
                  <Route exact path='/addproducts' component={Addproducts} />
                  <Route exact path='/getproducts' component={Getproducts} />
                  <Route exact path='/constants' component={ContantsPage} />
                  <Route exact path='/ordertimes' component={Ordertimes} />
                  <Route exact path='/orders' component={OrdersPage} />
                  <Route exact path='/pushNot' component={PushNotification} />
                </Switch>
              </main>
            </RTL>
          </div>
        </BrowserRouter>
      </ThemeProvider>
      </ThirdCatagoriesProvider>
      </SubCatagoriesProvider>
      </CatagoriesProvider>
 </AuthProvider>
  
  )
}
