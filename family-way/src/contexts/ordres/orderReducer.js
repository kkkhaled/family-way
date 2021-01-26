export default (state, action) => {
    switch (action.type) {
          case "GET_ORDERS":
           return {
             ...state,
             orders: action.payload
           }
           case "SET_CURRENT":
             return{
               ...state,
               currentOrder: action.payload
             }
            case "GET_ONE_ORDER":
              return {
                ...state,
                order : action.payload
              } 
           default:
        return state;
    }
  };
  