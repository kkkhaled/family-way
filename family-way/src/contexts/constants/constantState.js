import React,{useReducer,createContext} from 'react';
import constantsReducer from './constantReducer';
import server from '../../api/server';

//initial State
const initialState = {
    constants : [],
  }
  // create context
export const constantsContext = createContext();

export const ConstantProvider =({children})=>{

    const [state, dispatch] = useReducer(constantsReducer, initialState);

    // actions

    // add constants
    const AddConstants=async(high,low,freeOrder,midOrder,minimum,pointsToMoney)=>{
          const data = {
            deliveryPrice:{high,low},
            order : {freeOrder,midOrder,minimum},
            convertorMoney :{pointsToMoney} 
        }
         try {
            const res = await server.post('/constants',data,{'headers': {
                'Authorization': 'Bearer ' + localStorage.token }});
            console.log(res);
            dispatch({
                type :"ADD_CONSTANTS",
                payload:res.data
            })
        } catch (err) {
            console.log(err);
        }
    }  
    return(
        <constantsContext.Provider value={{
            constants:state.constants,
            AddConstants
        }} >
            {children}
        </constantsContext.Provider>
    )
}