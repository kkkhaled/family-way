import React, { useReducer, createContext } from 'react'
import thirdcatagoriesReducer from './thirdReducer'
import server from '../../api/server'

//initial State
const initialState = {
  thirdcatagories: [],
  filteredthird: [],
  isLoad: true,
  third:null
}

// create context
export const thirdcatagoriesContext = createContext()

export const ThirdCatagoriesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(thirdcatagoriesReducer, initialState)

  // actions

  //get all third catagories
  const getAllThirdCatagories = async () => {
    try {
      const res = await server.get('/thirdCategory')
      dispatch({
        type: 'GET_ALL_THIRD_CATAGORIES',
        payload: res.data.categories
      })
    } catch (err) {
      console.log(err)
    }
  }

  // get sub-catagories by parent
  const getFilteredThirdData = async id => {
    try {
      const res = await server.get(`/thirdCategory/${id}`)
      dispatch({
        type: 'GET_FILTERED_THIRD',
        payload: res.data.categories
      })
    } catch (err) {
      console.log(err)
    }
  }

  // add new one
  const addNewThirdCatagories = async (file, name, subCategory,forCards) => {
    const formData = new FormData()
    Array.from(file).forEach(file => {
      formData.append('file', file)
    })
    formData.append('forCards', forCards)
    formData.append('name', name)
    formData.append('subCategory', subCategory)
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + localStorage.token
      }
    }
    try {
      const res = await server.post('/thirdCategory', formData, config)
      dispatch({
        type: 'ADD_THIRD_IMAGES',
        payload: res.data
      })
    } catch (err) {
      console.log(err)
    }
  }

    // edit sub catagories
    const editThirdCatagories=async (id,name)=>{
      try {
         const data={name};
         const config ={
          headers: {
            "Content-Type": "application/json",
          }
         }
         const res=await server.put(`/thirdCategory/${id}`,data,config);
         console.log(res);
      } catch (err) {
        console.log(err);
      }
    }
  

  //delete sub catagories
  const removeThird = async _id => {
    try {
      const res = await server.delete(`/thirdCategory/${_id}`)
      dispatch({
        type: 'REMOVE_ONE_THIRD',
        payload: _id
      })
    } catch (err) {
      console.log(err)
    }
  }
  // set current
  const setCurrent=(third)=> {
    dispatch({
      type: 'Set_Current',
      payload: third
    })
  } 
  return (
    <thirdcatagoriesContext.Provider
      value={{
        thirdcatagories: state.thirdcatagories,
        isLoad: state.isLoad,
        filteredthird: state.filteredthird,
        third:state.third,
        editThirdCatagories,
        getAllThirdCatagories,
        getFilteredThirdData,
        addNewThirdCatagories,
        removeThird,
        setCurrent
      }}
    >
      {children}
    </thirdcatagoriesContext.Provider>
  )
}
