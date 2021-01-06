import React, { useReducer, createContext } from 'react'
import authReducer from './authReducer'
import server from '../../api/server'
//import setAuthToken from '../../api/setAuthToken'
//initial State
const initialState = {
  phone: null,
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
  code: null,
  users :null
}

// create context
export const authContext = createContext()

// create provider
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  //actions

  //confirm phone number
  const addPhoneNumber = async phone => {
    try {
      const res = await server.post('/phonenumber', {
        phone
      })
      dispatch({
        type: 'CONFIRM_PHONE',
        payload: res.data
      })
     // alert(res.data.code)
    } catch (err) {
      console.log(err)
    }
  }

  //load user
  const loadUser = async () => {
   /* if (localStorage.token) {
      setAuthToken(localStorage.token)
    }
    console.log(localStorage.token);
    */
    try {
      const res = await server.get('/data',{'headers': {
        'Authorization': 'Bearer ' + localStorage.token
      }})
      
      dispatch({
        type: 'USER_LOADED',
        payload: res.data
      })
    } catch (err) {
      dispatch({
        type: 'AUTH_ERROR'
      })
    }
  }

  //send code
  const addCodeNumber = async (phone, code) => {
   // console.log(phone, code)
    try {
      const res = await server.post('/phonenumber/validate', {
        phone,
        code
      })
      localStorage.setItem('token', res.data.token)
      console.log(res.data)
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: res.data
      })
      loadUser();
    } catch (err) {
      console.log(err)
      dispatch({
        type: 'LOGIN_FAIL'
      })
    }
  }

  //logout
   const logout=()=>{
     dispatch({
      type:"LOGOUT"
     })
   }
  //get all users
  const getAllUsers = async () => {
    try {
      const res = await server.get('/users');
    //  console.log(res);
      dispatch({
        type: 'SUCCESSFUL_USERS',
        payload: res.data
      })
    } catch (err) {
      console.log(err)
    }
  }

  // edit users
  const EditUsers=async(id,wallet,points,spins,isBlocked)=>{
        const data={wallet,points,spins,isBlocked}
        try {
          const res = await server.put(`updateUser/${id}`,data,{'headers': {
            'Authorization': 'Bearer ' + localStorage.token
          }})
          console.log(res);
        } catch (err) {
          console.log(err);
        }
  }

  return (
    <authContext.Provider
      value={{
        phone: state.phone,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        users:state.users, 
        addCodeNumber,
        addPhoneNumber,
        loadUser,
        getAllUsers,
        EditUsers,
        logout
      }}
    >
      {children}
    </authContext.Provider>
  )
}
