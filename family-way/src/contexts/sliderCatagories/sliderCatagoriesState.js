import React,{useReducer,createContext} from 'react';
import Reducer from './sliderCatagoriesReducer';
import server from '../../api/server';

//initial State
const initialState = {
    sliders : [],
  }
  // create context
export const sliderContext = createContext();

export const SliderCatagoryProvider =({children})=>{

    const [state, dispatch] = useReducer(Reducer, initialState);
    // actions

    // get sliders
     const getslider =async(id)=>{
        try {
            const res = await server.get(`/sliderCategory/${id}`);
            dispatch({
                type :"GET_SLIDER_Catagories",
                payload : res.data.sliderCategory
            })
        } catch (err) {
            console.log(err);
        }
     }

     // case add slider 
     const addNewSliderCatagories = async(ref,file,isProduct,sort,action)=>{
        const formData = new FormData();
        Array.from(file).forEach((file) => {
            formData.append("file", file);
          });
       formData.append('ref',ref);
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
          const res = await server.post('/sliderCategory',formData,config);
          //console.log(res); 
       } catch (err) {
           console.log(err);
       }
     }

          // case add slider 
          const addNewSlider = async(ref,file,sort)=>{
            const formData = new FormData();
            Array.from(file).forEach((file) => {
                formData.append("file", file);
              });
           formData.append('ref',ref);
            formData.append('sort',sort);
              const config = {
                headers: {
                  "Content-Type": "multipart/form-data",
                  'Authorization': 'Bearer ' + localStorage.token
                },
            }
           try {
              const res = await server.post('/sliderCategory',formData,config);
              //console.log(res); 
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
    

    return(
        <sliderContext.Provider value={{
            sliders:state.sliders,
            getslider,
            addNewSliderCatagories,
            removeslider,
           addNewSlider 
           }}>
            {children}
        </sliderContext.Provider>
    )
}