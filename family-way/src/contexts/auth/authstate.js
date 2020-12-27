import React, { useReducer, createContext } from "react";
import authReducer from './authReducer';
import server from '../../api/server';
import setAuthToken from '../../api/setAuthToken'
//initial State
const initialState = {
    phone:null,
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null,
}

// create context 
export const authContext=createContext();

// create provider
export const AuthProvider =({children })=>{

    const [state,dispatch]=useReducer(authReducer,initialState);

    //actions

    //confirm phone number 
    const addPhoneNumber=async(phone)=>{
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
          try {
             const res = await server.post('/phonenumber',phone,config);  
              dispatch({
                  type :"CONFIRM_PHONE",
                  payload:res.data
                })
                console.log(res);
          } catch (err) {
              console.log(err);
          }
    }
    //load user
     const loadUser=async()=>{
        if (localStorage.token) {
            setAuthToken(localStorage.token);
          }
       try {
            const res = await server.get("/data");
            dispatch({
              type: "USER_LOADED",
              payload: res.data,
            });
          } catch (err) {
            dispatch({
              type: "AUTH_ERROR",
            });
          }
        };
     
    //verify phone number and login
     const login=async(formData)=>{
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
          try {
              const res=await server.post('phonenumber/validate',formData,config);
              dispatch({
                type :"LOGIN_SUCCESS",
                payload:res.data
              }) 
          } catch (err) {
              dispatch({
                type :"LOGIN_FAIL"}
              )
              console.log(err);
          }
     }
      
    //logout 

    //get all users
    const getAllUsers=async()=>{
      try {
         const res = await server.get('/users');
         console.log(res);
         dispatch({
          type :"SUCCESSFUL_USERS",
          payload : res.data
         }) 
      } catch (err) {
        console.log(err);
      }
    }

    // clean errors

    return(
        <authContext.Provider value={{
            phone :state.phone,
            token :state.token,
            isAuthenticated :state.isAuthenticated,
            loading :state.loading,
            user :state.user,
            error :state.error,
            addPhoneNumber,
            login,
            loadUser,
            getAllUsers
        }}>
            {children}
        </authContext.Provider>
    ) 

}

