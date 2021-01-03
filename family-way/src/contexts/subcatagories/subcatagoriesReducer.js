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
      default:
        return state;
    }
  };
  