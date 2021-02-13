import React, { useEffect, useContext } from 'react'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import './App.css'
import { ThemeProvider, makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Alert from '@material-ui/lab/Alert'
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
import OrdersDetail from './pages/orderDetails'
import RTL from './components/rtl'
import PushNotification from './pages/pushNotification'
import PhoneNumber from './components/phoneNumber'
import CreateCoupons from './pages/createCoupons'
import CouponsPage from './pages/couponview'
import AddSliders from './pages/addslider'
import SliderPage from './pages/getSlider'
import AddSliderCatagories from './pages/addSliderCatagories'
import SliderCatagoriesPage from './pages/sliderCatagories'
import Adss from './pages/Ads'
import { AuthProvider } from './contexts/auth/authstate'
import { CatagoriesProvider } from './contexts/catagories/catagoriesState'
import { SubCatagoriesProvider } from './contexts/subcatagories/subcatagoriesState'
import { ThirdCatagoriesProvider } from './contexts/thirdcatagories/thirdState'
import { ProductProvider } from './contexts/products/productState'
import { ConstantProvider } from './contexts/constants/constantState'
import { OrdertimesProvider } from './contexts/orderTimes/ordertimeState'
import { OrdersProvider } from './contexts/ordres/orderState'
import { CouponsProvider } from './contexts/coupons/couponState'
import { SliderProvider } from './contexts/sliders/sliderstate'
import { SliderCatagoryProvider } from './contexts/sliderCatagories/sliderCatagoriesState'
import { AdsProvider } from './contexts/Ads/adsState'
import setAuthToken from './api/setAuthToken'
import PrivateRoute from './routing/privateRoute'
import OrderArchived from './pages/orderArchived'
import Userdetails from './pages/userDetails'
import Additaton from './pages/additatons'
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
      <AdsProvider>
        <SliderCatagoryProvider>
          <SliderProvider>
            <CouponsProvider>
              <OrdersProvider>
                <OrdertimesProvider>
                  <ConstantProvider>
                    <ProductProvider>
                      <CatagoriesProvider>
                        <SubCatagoriesProvider>
                          <ThirdCatagoriesProvider>
                            <ThemeProvider theme={AppTheme}>
                            <RTL>
                              <BrowserRouter>
                                <Route
                                  exact
                                  path='/login'
                                  component={PhoneNumber}
                                />
                                <div className={classes.root}>
                                  <CssBaseline />
                                    <main className={classes.content}>
                                      <Switch>
                                        <PrivateRoute
                                          exact
                                          path='/'
                                          component={Addcatagiories}
                                        />
                                        <PrivateRoute
                                          exact
                                          path='/Getsubcatagiories'
                                          component={Getsubcatagiories}
                                        />
                                        <PrivateRoute
                                          exact
                                          path='/Getthirdcatagiories'
                                          component={Getthirdcatagiories}
                                        />
                                        <PrivateRoute
                                          exact
                                          path='/users'
                                          component={Userstable}
                                        />
                                         <PrivateRoute
                                          exact
                                          path='/user-details/:id'
                                          component={Userdetails}
                                        />
                                        <PrivateRoute
                                          exact
                                          path='/addproducts'
                                          component={Addproducts}
                                        />
                                        <PrivateRoute
                                          exact
                                          path='/getproducts'
                                          component={Getproducts}
                                        />
                                        <PrivateRoute
                                          exact
                                          path='/orders-archived'
                                          component={OrderArchived}
                                        />
                                        <PrivateRoute
                                          exact
                                          path='/constants'
                                          component={ContantsPage}
                                        />
                                        <PrivateRoute
                                          exact
                                          path='/ordertimes'
                                          component={Ordertimes}
                                        />
                                        <PrivateRoute
                                          exact
                                          path='/orders'
                                          component={OrdersPage}
                                        />
                                        <PrivateRoute
                                          exact
                                          path='/order-details/:id'
                                          component={OrdersDetail}
                                        />
                                        <PrivateRoute
                                          exact
                                          path='/pushNot'
                                          component={PushNotification}
                                        />
                                        <PrivateRoute
                                          exact
                                          path='/create-coupons'
                                          component={CreateCoupons}
                                        />
                                        <PrivateRoute
                                          exact
                                          path='/view-coupons'
                                          component={CouponsPage}
                                        />
                                        <PrivateRoute
                                          exact
                                          path='/add-slider'
                                          component={AddSliders}
                                        />
                                        <PrivateRoute
                                          exact
                                          path='/sliders-view'
                                          component={SliderPage}
                                        />
                                        <PrivateRoute
                                          exact
                                          path='/add-slider-catagories'
                                          component={AddSliderCatagories}
                                        />
                                        <PrivateRoute
                                          exact
                                          path='/sliders-catagories-view'
                                          component={SliderCatagoriesPage}
                                        />
                                        <PrivateRoute
                                          exact
                                          path='/ads'
                                          component={Adss}
                                        />
                                         <PrivateRoute
                                          exact
                                          path='/additations'
                                          component={Additaton}
                                        />
                                      </Switch>
                                    </main>
                                   </div>
                              </BrowserRouter>
                              </RTL>
                            </ThemeProvider>
                          </ThirdCatagoriesProvider>
                        </SubCatagoriesProvider>
                      </CatagoriesProvider>
                    </ProductProvider>
                  </ConstantProvider>
                </OrdertimesProvider>
              </OrdersProvider>
            </CouponsProvider>
          </SliderProvider>
        </SliderCatagoryProvider>
      </AdsProvider>
    </AuthProvider>
  )
}
