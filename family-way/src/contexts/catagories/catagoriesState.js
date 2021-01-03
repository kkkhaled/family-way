import React,{useReducer,createContext} from 'react';
import catagoriesReducer from './catagoriesReducer'
import server from '../../api/server'


//initial State
const initialState = {
    catagories:[],
    onecatagory:[],
    loading: true,
  }

  // create context
export const catagoriesContext = createContext();

//create provider
export const CatagoriesProvider =({children})=>{

    const [state, dispatch] = useReducer(catagoriesReducer, initialState);
    
    //actions
    
    //get all catagories
      const getAllCatagories=async()=>{
        try {
           const res =await server.get('/categories');  
             dispatch({
               type :"GETALLCATAGORIES",
               payload: res.data.categories
           }) 
          }
         catch (err) {
            console.log(err);
        }
      }

     // get catagories via id
     const getOneCatagory=async(id)=>{
        try {
          const res= await server.get(`/categories/${id}`);
          dispatch({
            type :"GET_ONE_CATAGORY",
            payload : res.data.category
          })   
        } catch (err) {
            console.log(err);
        }
     }

      //add catagories
    const addNewCategories =async(name,sort)=>{
        const data={name,sort}
        try {
            const res = await server.post('/categories',data,{'headers': {
                'Authorization': 'Bearer ' + localStorage.token }})
              dispatch({
                  type:"ADD_NEW_ONE",
                  payload:res.data
              })
        } catch (err) {
            console.log(err);
        }
    }

    //delete catagories
       const removeOne=async(_id)=>{
           try {
               const res = await server.delete(`/category/${_id}`);
               dispatch({
                  type :"REMOVE_ONE",
                  payload:_id 
               }) 
           } catch (err) {
               console.log(err);
           }
       }

    return(
        <catagoriesContext.Provider value={{
            catagories :state.catagories,
            loading : state.loading,
            onecatagory:state.onecatagory,
            getAllCatagories,
            addNewCategories,
            getOneCatagory,
            removeOne
        }}>
            {children}
        </catagoriesContext.Provider>
    )

}