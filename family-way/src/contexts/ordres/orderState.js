import React,{useReducer,createContext} from 'react';
import orderReducer from './orderReducer';
import server from '../../api/server';

//initial State
const initialState = {
    orders : [],
  }
  // create context
export const ordersContext = createContext();

export const OrdersProvider =({children})=>{

    const [state, dispatch] = useReducer(orderReducer, initialState);
    // actions
    
    // get All Orders
    const getOrders=async()=>{
        try {
           const res = await server.get('/order')
           dispatch({
            type: "GET_ORDERS",
            payload : res.data
           }) 
        } catch (err) {
            console.log(err);
        }
    }
    
    // apply order 
    const applyOrder =async(id,phone)=>{
        try {
            const res = await server.post(`/applyOrder/${id}`);
            dispatch({
                type :"ACCEPT_ORDER",
                payload : res.data
            })
        } catch (err) {
            console.log(err);
        }
    }

    // remove order
    const removeOrder=async(_id)=>{
        try {
            const res = await server.delete(`/order/${_id}`)
            dispatch({
                type : "REMOVE_ORDER",
                payload :_id
            })
        } catch (err) {
            console.log(err);
        }
    }

    return(
        <ordersContext.Provider value={{
            orders : state.orders,
            getOrders,
            applyOrder,
            removeOrder
        }} >
            {children}
        </ordersContext.Provider>
    )
}