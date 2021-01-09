import React,{useReducer,createContext} from 'react';
import ordertimesReducer from './ordertimeReducer';
import server from '../../api/server';

//initial State
const initialState = {
    ordertimes : null,
  }
  // create context
export const ordertimesContext = createContext();

export const OrdertimesProvider =({children})=>{

    const [state, dispatch] = useReducer(ordertimesReducer, initialState);
    // actions

    // get orderstime
     const getOrderstime =async()=>{
        try {
            const res = await server.get('/orderTimes',{'headers': {
                'Authorization': 'Bearer ' + localStorage.token }});
           // console.log(res);
            dispatch({
                type :"GET_TIMES",
                payload : res.data
            })
        } catch (err) {
            console.log(err);
        }
     }

     // case add orders time
     const addNewtime = async(from,to,day,isDisabled,maxCount)=>{
       const data ={
           value:{from,to}, 
           day,
           isDisabled,
           maxCount
       }
       try {
           const res = await server.post('/orderTimes',data,{'headers': {
            'Authorization': 'Bearer ' + localStorage.token }})
            dispatch(
                {
                    type :"CREATE_NEW_TIME",
                    payload : res.data
                }
            )
       } catch (err) {
           console.log(err);
       }
     }
     // update time 
     const EditOrdertime=async(id,from,to,day,isDisabled,maxCount,currentCount)=>{
        const data ={
            value:{from,to}, 
            day,
            isDisabled,
            maxCount,
            currentCount
        }
        try {
            const res = await server.put(`/orderTimes/${id}`,data,{'headers': {
                'Authorization': 'Bearer ' + localStorage.token }})
            dispatch({
                type :"EDIT_TIMES",
                payload : res.data
            })
        } catch (err) {
            console.log(err);
        }   
     } 
     
     // remove order times
     const removetime = async(_id)=>{
        try {
            const res = await server.delete(`/orderTimes/${_id}`)
            dispatch({
                type :"REMOVE_TIME",
                payload : _id 
            })
        } catch (err) {
            console.log(err);
        }
     }

    return(
        <ordertimesContext.Provider value={{
            ordertimes : state.ordertimes,
            getOrderstime,
            addNewtime,
            EditOrdertime,
            removetime
        }} >
            {children}
        </ordertimesContext.Provider>
    )
}