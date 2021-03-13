import React, { useReducer, createContext } from 'react'
import subcatagoriesReducer from './subcatagoriesReducer'
import server from '../../api/server'

//initial State
const initialState = {
  subcatagories: [],
  filterdata: [],
  loader: true,
  currentSub:null
}

// create context
export const subcatagoriesContext = createContext()

export const SubCatagoriesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(subcatagoriesReducer, initialState)

  //actions

  //get all sub catagories
  const getAllSubCatagories = async () => {
    try {
      const res = await server.get('/subCategory')
      dispatch({
        type: 'GET_ALL_SUBCATAGORIES',
        payload: res.data.categories
      })
    } catch (err) {
      console.log(err)
    }
  }

  const removeSubCategory = async id => {
    try {
      await server.delete(`/subCategory/${id}`)
      dispatch({
        type: 'REMOVE_ONE_SUB',
        payload: id
      })
    } catch (err) {
      console.log(err)
    }
  }

  // get sub-catagories by parent
  const getFilteredSubSatagories = async id => {
    try {
      const res = await server.get(`/subCategory/${id}`)
      dispatch({
        type: 'GET_FILTERED_DATA',
        payload: res.data.categories
      })
    } catch (err) {
      console.log(err)
    }
  }

  // add new one
  const addNewSubCatagories = async (
    file,
    name,
    parentCategory,
    wide,
    forSmoking,
    bio,
    sort
  ) => {
    const formData = new FormData()
    Array.from(file).forEach(file => {
      formData.append('file', file)
    })
    console.log(forSmoking)
    formData.append('bio', bio)
    formData.append('forSmoking', forSmoking)
    formData.append('name', name)
    formData.append('parentCategory', parentCategory)
    formData.append('wide', wide)
    formData.append('sort',sort);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + localStorage.token
      }
    }
    try {
      const res = await server.post('/subCategory', formData, config)
      dispatch({
        type: 'ADD_IMAGES',
        payload: res.data
      })
    } catch (err) {
      console.log(err)
    }
  }

  // edit sub catagories
  const editSubCatagories=async (id,name,sort,bio,wide)=>{
    try {
       const data={name,sort,bio,wide};
       const config ={
        headers: {
          "Content-Type": "application/json",
        }
       }
       const res=await server.put(`/subCategory/${id}`,data,config);
       console.log(res);
    } catch (err) {
      console.log(err);
    }
  }

  //delete sub catagories
  const removeOne = async _id => {
    try {
      const res = await server.delete(`/subCategory/${_id}`)
      dispatch({
        type: 'REMOVE_ONE_SUB',
        payload: _id
      })
    } catch (err) {
      console.log(err)
    }
  }
  // set current
  const setCurrentSub=(sub)=> {
    dispatch({
      type: 'Set_Current',
      payload: sub
    })
  } 
  return (
    <subcatagoriesContext.Provider
      value={{
        subcatagories: state.subcatagories,
        loader: state.loader,
        filterdata: state.filterdata,
        currentSub :state.currentSub,
        getAllSubCatagories,
        removeSubCategory,
        getFilteredSubSatagories,
        addNewSubCatagories,
        editSubCatagories,
        setCurrentSub,
        removeOne
      }}
    >
      {children}
    </subcatagoriesContext.Provider>
  )
}
