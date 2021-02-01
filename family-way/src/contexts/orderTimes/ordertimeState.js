import React, { useReducer, createContext } from 'react'
import ordertimesReducer from './ordertimeReducer'
import server from '../../api/server'

//initial State
const initialState = {
  ordertimes: [],
  time : null
}
// create context
export const ordertimesContext = createContext()

export const OrdertimesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ordertimesReducer, initialState)
  // actions

  // get orderstime
  const getOrderstime = async () => {
    try {
      const res = await server.get('/orderTimes', {
        headers: {
          Authorization: 'Bearer ' + localStorage.token
        }
      })
      // console.log(res);
      dispatch({
        type: 'GET_TIMES',
        payload: res.data
      })
    } catch (err) {
      console.log(err)
    }
  }

  // case add orders time
  const addNewtime = async (from, to, day, isDisabled, maxCount) => {
    const data = {
      value: { from, to },
      day,
      isDisabled,
      maxCount
    }
    try {
      const res = await server.post('/orderTimes', data, {
        headers: {
          Authorization: 'Bearer ' + localStorage.token
        }
      })
      dispatch({
        type: 'CREATE_NEW_TIME',
        payload: res.data
      })
    } catch (err) {
      console.log(err)
    }
  }
  // update time
  const EditOrdertime = async (
    id,
    from,
    to,
    isDisabled,
    maxCount,
  ) => {
    const data = {
      value: { from, to },
      isDisabled,
      maxCount,
    }
    try {
      const res = await server.put(`/orderTimes/${id}`, data, {
        headers: {
          Authorization: 'Bearer ' + localStorage.token
        }
      })
      dispatch({
        type: 'EDIT_TIMES',
        payload: res.data
      })
    } catch (err) {
      console.log(err)
    }
  }

  // remove order times
  const removetime = async _id => {
    try {
      const res = await server.delete(`/orderTimes/${_id}`,{
        headers: {
          Authorization: 'Bearer ' + localStorage.token
        }
      })
      dispatch({
        type: 'REMOVE_TIME',
        payload: _id
      })
    } catch (err) {
      console.log(err)
    }
  }
  
  // set current ordertime
  const SetCurrnttime=(time)=>{
    dispatch({
     type :"SET_CURRENT",
     payload : time
    })
 }


  return (
    <ordertimesContext.Provider
      value={{
        ordertimes: state.ordertimes,
        time : state.time,
        getOrderstime,
        addNewtime,
        EditOrdertime,
        removetime,
        SetCurrnttime
      }}
    >
      {children}
    </ordertimesContext.Provider>
  )
}
