export default (state, action) => {
    switch (action.type) {
        case "GET_ALL_SUBCATAGORIES":
            return {
                ...state,
                subcatagories: action.payload,
                loader : false
              };
         case "GET_FILTERED_DATA":
             return {
                 ...state,
                 filterdata: action.payload
             }    
         case "ADD_IMAGES":
             return {
                 ...state,  
                 loader:false
             }
         case 'REMOVE_ONE_SUB' :  
         return {
            ...state,
            filterdata: state.filterdata.filter((subcatagory) => subcatagory._id !== action.payload),
          }
          case "Set_Current":
            return{
              ...state,
              currentSub: action.payload,
            }       
      default:
        return state;
    }
  };
  