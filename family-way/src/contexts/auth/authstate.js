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
  users: null,
  editUser: null,
  searchuser: []
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
      const res = await server.get('/data', {
        headers: {
          Authorization: 'Bearer ' + (await localStorage.token)
        }
      })

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
      loadUser()
    } catch (err) {
      console.log(err)
      dispatch({
        type: 'LOGIN_FAIL'
      })
    }
  }

  //logout
  const logout = () => {
    dispatch({
      type: 'LOGOUT'
    })
  }
  //get all users
  const getAllUsers = async (page, limit) => {
    try {
      const res = await server.get(`/users?page=${page}&limit=${limit}`, {
        headers: {
          Authorization: 'Bearer ' + (await localStorage.token)
        }
      })
      //  console.log(res);
      dispatch({
        type: 'SUCCESSFUL_USERS',
        payload: res.data
      })
    } catch (err) {
      console.log(err)
    }
  }

  // get unpagenated users
  const getUnpagenatedUsers = async () => {
    try {
      const res = await server.get(`/users`)
      //  console.log(res);
      dispatch({
        type: 'GET_USERS',
        payload: res.data
      })
    } catch (err) {
      console.log(err)
    }
  }
  // getUser for edit
  const getUser = async user => {
    dispatch({
      type: 'SET_CURRENT_USER',
      payload: user
    })
  }

  // edit users
  const EditUsers = async (phone, wallet, points, role) => {
    const data = { wallet, points, role }
    try {
      const res = await server.put(`updateUser/${phone}`, data, {
        headers: {
          Authorization: 'Bearer ' + localStorage.token
        }
      })
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }

  // search users
  const searchviaPhone = async phone => {
    try {
      const res = await server.get(`/users?phoneSearch=${phone}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.token
        }
      })
      // console.log(res);
      dispatch({
        type: 'PHONE_SEARCH',
        payload: res.data.users
      })
    } catch (err) {
      console.log(err)
    }
  }

  const searchviaName = async name => {
    try {
      const res = await server.get(`/users?nameSearch=${name}`,{
        headers: {
          Authorization: 'Bearer ' + localStorage.token
        }
      })
      // console.log(res);
      dispatch({
        type: 'Name_SEARCH',
        payload: res.data.users
      })
    } catch (err) {
      console.log(err)
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
        users: state.users,
        editUser: state.editUser,
        searchuser: state.searchuser,
        addCodeNumber,
        addPhoneNumber,
        loadUser,
        getAllUsers,
        getUnpagenatedUsers,
        getUser,
        EditUsers,
        searchviaName,
        searchviaPhone,
        logout
      }}
    >
      {children}
    </authContext.Provider>
  )
}
