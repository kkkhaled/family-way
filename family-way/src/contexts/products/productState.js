import React,{useReducer,createContext} from 'react';
import productReducer from './productReducer';
import server from '../../api/server';

//initial State
const initialState = {
    products : [],
  }
  // create context
export const productContext = createContext();

export const ProductProvider =({children})=>{

    const [state, dispatch] = useReducer(productReducer, initialState);

     //actions

     // create products
     const addProducts=async(barCode,files,title,details,categories,price,increaseCount,unit,userMax,inStock,boxUnit)=>{
        const formData = new FormData();
        Array.from(files).forEach((file) => {
            formData.append("file", file);
          });
          formData.append('barCode',barCode);
          formData.append('title',title);
          formData.details('details',details);
          formData.append('categories',categories);
          formData.append('price',price);
          formData.append('increaseCount',increaseCount);
          formData.append('unit',unit);
          formData.append('userMax',userMax);
          formData.append('inStock',inStock);
          formData.append('boxUnit',boxUnit);

          const config = {
            headers: {
              "Content-Type": "multipart/form-data",
              'Authorization': 'Bearer ' + localStorage.token
            },
        }
         try {
             const res = await server.post('/products',formData,config);
             dispatch({
                 type:"CREATE_NEW_ONE",
                 payload:res.data
             })
         } catch (err) {
             console.log(err);
         } 
     }

     // get product by third
     const GetProductThird=async(id)=>{
        try {
            const res = await server.get(`/products/${id}`)
            dispatch({
                type :"GET_THIRD_PRODUCTS",
                payload : res.data
            })
        } catch (err) {
            console.log(err);
        }
     } 

     // update
    const updateProducts=async(product)=>{
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
      
        try {
            const res = await server.put(`/oneProduct/${product._id}`,config)
            dispatch({
                type :"UPATE_PRODUCTS",
                payload : res.data
            })
        } catch (err) {
            console.log(err);
        }
    }

       // delete
       const removeProducts=async(id)=>{
        try {
            const res = await server.delete(`/oneProduct/${id}`)
            dispatch({
                type :"REMOVE_PRODUCTS",
                payload : id 
            })
        } catch (err) {
            console.log(err);
        }
    }

     return(
         <productContext.Provider value={{
             products:state.products,
            addProducts,
            GetProductThird,
            updateProducts,
            removeProducts 
         }}>

         </productContext.Provider>
     )
}