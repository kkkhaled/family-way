import React,{useReducer,createContext} from 'react';
import subcatagoriesReducer from './subcatagoriesReducer'
import server from '../../api/server'


//initial State
const initialState = {
    subcatagories:[],
    filterdata:[],
    loader: true,
}

 // create context
 export const subcatagoriesContext = createContext();

 export const SubCatagoriesProvider =({children})=>{

    const [state, dispatch] = useReducer(subcatagoriesReducer, initialState);

     //actions
    
    //get all sub catagories
    const getAllSubCatagories=async()=>{
        try {
           const res =await server.get('/subCategory');  
             dispatch({
               type :"GET_ALL_SUBCATAGORIES",
               payload: res.data.categories
           }) 
          }
         catch (err) {
            console.log(err);
        }
      }

      // get sub-catagories by parent
      const getFilteredSubSatagories=async(id)=>{
          try {
              const res = await server.get(`/subCategory/${id}`)
              dispatch({
                  type:"GET_FILTERED_DATA",
                  payload : res.data.categories
              })
          } catch (err) {
              console.log(err);
          }
      }

      // add new one
      const addNewSubCatagories=async(file,name,parentCategory,wide)=>{
        const formData = new FormData();
        Array.from(file).forEach((file) => {
            formData.append("file", file);
          });
        formData.append('name',name);     
        formData.append('parentCategory',parentCategory);
        formData.append('wide',wide);
        const config = {
            headers: {
              "Content-Type": "multipart/form-data",
              'Authorization': 'Bearer ' + localStorage.token
            },
          };
          try {
             const res = await server.post("/subCategory",formData,config);
             alert('done');
             dispatch({
                type:"ADD_IMAGES",
                payload : res.data
             })  
          } catch (err) {
              console.log(err);
          }
      }
   
      return(
          <subcatagoriesContext.Provider value={{
            subcatagories :state.subcatagories,
            loader: state.loader,
            filterdata : state.filterdata,
            getAllSubCatagories,
            getFilteredSubSatagories,
            addNewSubCatagories
          }}>
           {children}
          </subcatagoriesContext.Provider>
      )

 }
