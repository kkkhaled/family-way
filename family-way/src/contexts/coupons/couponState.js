import React,{useReducer,createContext} from 'react';
import couponReducer from './ordertimeReducer';
import server from '../../api/server';

//initial State
const initialState = {
    coupons : [],
  }
  // create context
export const couponsContext = createContext();

export const CouponsProvider =({children})=>{

    const [state, dispatch] = useReducer(couponReducer, initialState);
    // actions
    
    // get coupons
    const getCoupons=async()=> {
      try {
        const res = await server.get('/coupon')
        dispatch({
            type:"GET_COUPONS",
            payload :res.data
        })
      } catch (err) {
          console.log(err);
      }
    }
     
    // add coupons
    const createCoupon =async(coupon)=>{
        const config = {
            headers: {
              "Content-Type": "application/json",
              'Authorization': 'Bearer ' + localStorage.token
            },
        }
          try {
            const res = await server.post('/coupon',coupon,config);
            dispatch({
                type :"CREATE_COUPON",
                payload : res.data  
            })
          } catch (err) {
              console.log(err);
          }
    } 

    return(
        <couponsContext.Provider value={{
           coupons : state.coupons, 
           getCoupons,
           createCoupon
        }} >
            {children}
        </couponsContext.Provider>
    )
}