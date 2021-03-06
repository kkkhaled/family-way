import React,{useReducer,createContext} from 'react';
import sliderReducer from './sliderReducer';
import server from '../../api/server';

//initial State
const initialState = {
    sliders : [],
    companies :[],
    currentslider : null
  }
  // create context
export const sliderContext = createContext();

export const SliderProvider =({children})=>{

    const [state, dispatch] = useReducer(sliderReducer, initialState);
    // actions

    // get sliders
     const getslider =async()=>{
        try {
            const res = await server.get('/homeSlider');
          // console.log(res);
            dispatch({
                type :"GET_SLIDER",
                payload : res.data
            })
        } catch (err) {
            console.log(err);
        }
     }

     // case add slider product
     const addNewSliderProduct = async(file,isProduct,sort,action)=>{
        const formData = new FormData();
        Array.from(file).forEach((file) => {
            formData.append("file", file);
          });
        formData.append('isProduct',isProduct);
        formData.append('sort',sort);
        formData.append('action',action)   
          const config = {
            headers: {
              "Content-Type": "multipart/form-data",
              'Authorization': 'Bearer ' + localStorage.token
            },
        }
       try {
          const res = await server.post('/homeSlider',formData,config);
          console.log(res); 
       } catch (err) {
           console.log(err);
       }
     }
     // add new slider catag

     const addNewSliderCatag = async(file,category,sort)=>{
        const formData = new FormData();
        Array.from(file).forEach((file) => {
            formData.append("file", file);
          });
        formData.append("category",category)  
        formData.append('sort',sort);
        const config = {
            headers: {
              "Content-Type": "multipart/form-data",
              'Authorization': 'Bearer ' + localStorage.token
            },
        }
       try {
          const res = await server.post('/homeSlider',formData,config);
           console.log(res); 
       } catch (err) {
           console.log(err);
       }
     }
        
     // add new slider 
     const addNewSlider = async(file,sort)=>{
        const formData = new FormData();
        Array.from(file).forEach((file) => {
            formData.append("file", file);
          });
        formData.append('sort',sort);
        const config = {
            headers: {
              "Content-Type": "multipart/form-data",
              'Authorization': 'Bearer ' + localStorage.token
            },
        }
       try {
          const res = await server.post('/homeSlider',formData,config);
         console.log(res); 
       } catch (err) {
           console.log(err);
       }
     }
     // remove slider
     const removeslider = async(_id)=>{
        try {
            const res = await server.delete(`/homeSlider/${_id}`)
            dispatch({
                type :"REMOVE_SLIDER",
                payload : _id 
            })
        } catch (err) {
            console.log(err);
        }
     }
    // edit sliders 
    const EditSliders=async(id,sort)=>{
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          'Authorization': 'Bearer ' + localStorage.token
        },
    }
      try {
        const res = await server.put(`/homeSlider/${id}`,{sort},config)
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    }

    // create camponies 
     const createCompanies=async(name,image)=>{
      const formData = new FormData();
      Array.from(image).forEach((image) => {
          formData.append("image", image);
        });
      formData.append('name',name);
      const config = {
          headers: {
            "Content-Type": "multipart/form-data",
            'Authorization': 'Bearer ' + localStorage.token
          },
      }
      try {
         await server.post('/companies',formData,config)
      } catch (err) {
         console.log(err);
      }
     }

     const getCompanies=async()=>{
      const config = {
        headers: {
          'Authorization': 'Bearer ' + localStorage.token
        },
    }
      try {
        const res = await server.get('/getCompanies',config);
          dispatch({
              type :"GET_COMPANIES",
              payload : res.data
          })
      } catch (err) {
        console.log(err);
      }
     }

         // remove slider
         const removecompanies = async(_id)=>{
          const config = {
            headers: {
              'Authorization': 'Bearer ' + localStorage.token
            },
        }
          try {
               await server.delete(`/companies/${_id}`,config)
              dispatch({
                  type :"REMOVE_COMPANIES",
                  payload : _id 
              })
          } catch (err) {
              console.log(err);
          }
       }
    
         // set current
  const setCurrent=(slider)=> {
    dispatch({
      type: 'Set_Current',
      payload: slider
    })
  } 


    return(
        <sliderContext.Provider value={{
            sliders:state.sliders,
            companies :state.companies,
            currentslider : state.currentslider,
            getslider,
            addNewSliderProduct,
            addNewSlider,
            addNewSliderCatag,
            removeslider,
            createCompanies,
            getCompanies,
            removecompanies,
            EditSliders,
            setCurrent
        }} >
            {children}
        </sliderContext.Provider>
    )
}