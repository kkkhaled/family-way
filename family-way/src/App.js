import React, { useEffect,useContext } from 'react'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import './App.css'
import { ThemeProvider, makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Alert from '@material-ui/lab/Alert';
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
import CreateCoupons from './pages/createCoupons'
import CouponsPage from './pages/couponview'
import { AuthProvider } from './contexts/auth/authstate'
import { CatagoriesProvider } from './contexts/catagories/catagoriesState'
import { SubCatagoriesProvider } from './contexts/subcatagories/subcatagoriesState'
import { ThirdCatagoriesProvider } from './contexts/thirdcatagories/thirdState'
import { ProductProvider } from './contexts/products/productState'
import { ConstantProvider } from './contexts/constants/constantState'
import { OrdertimesProvider } from './contexts/orderTimes/ordertimeState'
import {OrdersProvider} from './contexts/ordres/orderState'
import {CouponsProvider} from './contexts/coupons/couponState'
import setAuthToken from './api/setAuthToken'
import PrivateRoute from './routing/privateRoute'
import { useState } from 'react'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },

  content: {
    flexGrow: 1,
    margin: '0px 255px 0px 15px'
    // padding: "15px"
    // padding: theme.spacing(3),
  },
  // root2: {
  //   width: '80%',
  //   marginTop :"50px",
  //   marginLeft:"190px"
  // },
}))

export default function MiniDrawer () {
  //const [Authed,setAuthed]=useState(null)
  useEffect(() => {
    const isAuth = async () => {
      var token = await localStorage.token
      if (token) {
        setAuthToken(token)
       // setAuthed(1);
        console.log('isAuthed')
      } else {
        console.log('is not Authed')
      }
    }
    isAuth()
  }, [])
  const classes = useStyles()
  return (
    <AuthProvider>
      <CouponsProvider>
      <OrdersProvider>
      <OrdertimesProvider>
      <ConstantProvider>
        <ProductProvider>
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
                            <Route
                              exact
                              path='/addproducts'
                              component={Addproducts}
                            />
                            <Route
                              exact
                              path='/getproducts'
                              component={Getproducts}
                            />
                            <Route
                              exact
                              path='/constants'
                              component={ContantsPage}
                            />
                            <Route
                              exact
                              path='/ordertimes'
                              component={Ordertimes}
                            />
                            <Route
                              exact
                              path='/orders'
                              component={OrdersPage}
                            />
                            <Route
                              exact
                              path='/pushNot'
                              component={PushNotification}
                            /> 
                             <Route
                              exact
                              path='/create-coupons' 
                              component={CreateCoupons}
                            /> 
                                <Route
                              exact
                              path='/view-coupons' 
                              component={CouponsPage}
                            />
                          </Switch>
                           </main>
                      </RTL>
                    </div>
                  </BrowserRouter>
                </ThemeProvider>
              </ThirdCatagoriesProvider>
            </SubCatagoriesProvider>
          </CatagoriesProvider>
        </ProductProvider>
      </ConstantProvider>
      </OrdertimesProvider>
      </OrdersProvider>
      </CouponsProvider>
    </AuthProvider>
  )
}
