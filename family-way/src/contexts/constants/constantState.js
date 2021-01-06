import React,{useReducer,createContext} from 'react';
import constantsReducer from './constantReducer';
import server from '../../api/server';

//initial State
const initialState = {
    constants : null,
  }
  // create context
export const constantsContext = createContext();

export const ConstantProvider =({children})=>{

    const [state, dispatch] = useReducer(constantsReducer, initialState);

    // actions

    //get constants
    const getConstant=async()=>{
        try {
            const res = await server.get('/constants',{'headers': {
                'Authorization': 'Bearer ' + localStorage.token }})
            console.log(res);
            dispatch({
                type:"GET_CONTANT",
                payload :res.data
            });
        } catch (err) {
            console.log(err);
        }
    }

    // add constants
    const AddConstants=async(high,low,freeOrder,midOrder,minimum,pointsToMoney,daysForReturns,mobileNumber)=>{
          const data = {
            deliveryPrice:{high,low},
            order : {freeOrder,midOrder,minimum},
            convertorMoney :{pointsToMoney},
            daysForReturns,mobileNumber 
        }
         try {
            const res = await server.put('/constants',data,{'headers': {
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
            AddConstants,
            getConstant
        }} >
            {children}
        </constantsContext.Provider>
    )
}