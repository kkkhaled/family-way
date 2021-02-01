import React, { useReducer, createContext } from 'react'
import adsReducer from './adsReducer'
import server from '../../api/server'

//initial State
const initialState = {
  Ads: null
}
// create context
export const adsContext = createContext()

export const AdsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(adsReducer, initialState)

  // actions

  // get Ads
  const getAds = async () => {
    try {
      const res = await server.get('/getAd', {
        headers: {
          Authorization: 'Bearer ' + localStorage.token
        }
      })
      console.log(res)
      dispatch({
        type: 'GET_ADD',
        payload: res.data[0].image
      })
    } catch (err) {
      console.log(err)
    }
  }

  // add ads
  const createAds = async image => {
    const formData = new FormData()
    Array.from(image).forEach(image => {
      formData.append('image', image)
    })
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + localStorage.token
      }
    }
    try {
      await server.post('/addAd', formData, config)
    } catch (err) {
      console.log(err)
    }
  }
  // remove add
  const removeOne = async () => {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + localStorage.token
      }
    }
    try {
      await server.delete('/getAd', config)
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <adsContext.Provider
      value={{
        Ads: state.Ads,
        getAds,
        createAds,
        removeOne
      }}
    >
      {children}
    </adsContext.Provider>
  )
}
