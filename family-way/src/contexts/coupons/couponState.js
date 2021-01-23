import React, { useReducer, createContext } from 'react'
import couponReducer from './couponReducer'
import server from '../../api/server'

//initial State
const initialState = {
  coupons: []
}
// create context
export const couponsContext = createContext()

export const CouponsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(couponReducer, initialState)
  // actions

  // get coupons
  const getCoupons = async () => {
    try {
      const res = await server.get('/coupon')
      dispatch({
        type: 'GET_COUPONS',
        payload: res.data.coupons
      })
    } catch (err) {
      console.log(err)
    }
  }

  // add coupons
  const createCoupon = async coupon => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.token
      }
    }
    try {
      const res = await server.post('/coupon', coupon[0], config)
      dispatch({
        type: 'CREATE_COUPON',
        payload: res.data
      })
    } catch (err) {
      console.log(err)
    }
  }

  // delete coupon
  const deleteCoupon = async id => {
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.token
      }
    }
    try {
      const res = await server.delete(`/coupon/${id}`, config)
      dispatch({
        type: 'REMOVE_ONE',
        payload: id
      })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <couponsContext.Provider
      value={{
        coupons: state.coupons,
        getCoupons,
        createCoupon,
        deleteCoupon
      }}
    >
      {children}
    </couponsContext.Provider>
  )
}
