import React,{useReducer,createContext} from 'react';
import orderReducer from './orderReducer';
import server from '../../api/server';

//initial State
const initialState = {
    orders : null,
    currentOrder : null
  }
  // create context
export const ordersContext = createContext();

export const OrdersProvider =({children})=>{

    const [state, dispatch] = useReducer(orderReducer, initialState);
    // actions
    
    // get All Orders
    const getOrders=async(page,limit)=>{
        try {
           const res = await server.get(`/getOrdersForAdmin?page=${page}&limit=${limit}`);
           dispatch({
            type: "GET_ORDERS",
            payload : res.data
           }) 
        } catch (err) {
            console.log(err);
        }
    }
    
    // update orders

    const updateOrders=async(id,files,status)=>{
        const formData = new FormData();
        Array.from(files).forEach((file) => {
            formData.append("files", file);
          });
          formData.append('status',status);
          
          const config = {
            headers: {
              "Content-Type": "multipart/form-data",
              'Authorization': 'Bearer ' + localStorage.token
            },
        }
          try {
             const res = await server.put(`/order/${id}`,formData,config); 
             console.log(res);
          } catch (err) {
              console.log(err);
          }
    }

    // set current order
    const SetCurrntOrder=(order)=>{
       dispatch({
        type :"SET_CURRENT",
        payload : order
       })
    }
       
    //  apply order 
    // const applyOrder =async(id,phone)=>{
    //     try {
    //         const res = await server.post(`/applyOrder/${id}`);
    //         dispatch({
    //             type :"ACCEPT_ORDER",
    //             payload : res.data
    //         })
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    // // remove order
    // const removeOrder=async(_id)=>{
    //     try {
    //         const res = await server.delete(`/order/${_id}`)
    //         dispatch({
    //             type : "REMOVE_ORDER",
    //             payload :_id
    //         })
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    return(
        <ordersContext.Provider value={{
            orders : state.orders,
            currentOrder:state.currentOrder,
            getOrders,
            updateOrders,
            SetCurrntOrder
          }} >
            {children}
        </ordersContext.Provider>
    )
}