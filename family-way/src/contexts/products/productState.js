import React, { useReducer, createContext } from 'react'
import productReducer from './productReducer'
import server from '../../api/server'

//initial State
const initialState = {
  nonPagenateProducts: [],
  products: null,
  currentProduct: null,
  productdata: [],
  allProducts: []
}
// create context
export const productContext = createContext()

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState)

  //actions

  // create products
  const addProducts = async (
    barCode,
    files,
    title,
    details,
    categories,
    price,
    increaseCount,
    unit,
    discount,
    variationId,
    discountEnds,
    isCard
  ) => {
    console.log(barCode, files, title, details, categories, price)
    const formData = new FormData()
    Array.from(files).forEach(file => {
      formData.append('files', file)
    })
    
    formData.append('isCard', isCard)
    formData.append('barCode', barCode)
    formData.append('title', title)
    formData.append('details', details)
    formData.append('categories', categories)
    formData.append('price', price)
    formData.append('increaseCount', increaseCount)
    formData.append('unit', unit)
    //formData.append('userMax',userMax);
    //formData.append('inStock',inStock);
    // formData.append('boxUnit',boxUnit);
    formData.append('discount', discount)
    // formData.append('sold',sold);
    formData.append('variationId', variationId)
    formData.append('discountEnds', discountEnds)
    console.log(formData)
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + localStorage.token
      }
    }
    try {
      const res = await server.post('/products', formData, config)
      dispatch({
        type: 'CREATE_NEW_ONE',
        payload: res.data
      })
    } catch (err) {
      console.log(err)
    }
  }

  // get all products
  const GetAllProducts = async () => {
    try {
      const res = await server.get('/allProducts')
      dispatch({
        type: 'GET_ALL',
        payload: res.data.products
      })
    } catch (err) {
      console.log(err)
    }
  }

  // get product by third
  const GetProductThird = async (id, page, limit) => {
    try {
      const res = await server.get(
        `/products/${id}?page=${page}&limit=${limit}`
      )
      dispatch({
        type: 'GET_THIRD_PRODUCTS',
        payload: res.data
      })
    } catch (err) {
      console.log(err)
    }
  }

  // get product by third
  const GetProductViaCat = async id => {
    try {
      const res = await server.get(`/products/${id}`)
      dispatch({
        type: 'GET_CAT_PRODUCTS',
        payload: res.data.products
      })
    } catch (err) {
      console.log(err)
    }
  }

  // update
  const updateProducts = async product => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.token
      }
    }
    try {
      const res = await server.put(
        `/oneProduct/${product._id}`,
        product,
        config
      )
      dispatch({
        type: 'UPATE_PRODUCTS',
        payload: res.data
      })
    } catch (err) {
      console.log(err)
    }
  }

  // set currentproduct
  const setCurrentProduct = product => {
    dispatch({
      type: 'Set_Current',
      payload: product
    })
  }

  //case search data
  const searchProducts = async name => {
    try {
      const res = await server.post(`/products/search?search=${name}`)
      dispatch({
        type: 'SEARCH_DATA',
        payload: res.data
      })
    } catch (err) {
      console.log(err)
    }
  }

  // delete
  const removeProducts = async id => {
    try {
      const res = await server.delete(`/oneProduct/${id}`)
      console.log(res, id)
      dispatch({
        type: 'REMOVE_PRODUCTS',
        payload: id
      })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <productContext.Provider
      value={{
        allProducts: state.allProducts,
        nonPagenateProducts: state.nonPagenateProducts,
        products: state.products,
        currentProduct: state.currentProduct,
        productdata: state.productdata,
        addProducts,
        GetProductThird,
        updateProducts,
        setCurrentProduct,
        removeProducts,
        searchProducts,
        GetAllProducts,
        GetProductViaCat
      }}
    >
      {children}
    </productContext.Provider>
  )
}
