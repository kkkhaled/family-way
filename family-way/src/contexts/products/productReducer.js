export default (state, action) => {
    switch (action.type) {
        case "CREATE_NEW_ONE":
            return {
                ...state,
              };
         case "GET_THIRD_PRODUCTS":
           return {
             ...state,
             products: action.payload
           }
           case "REMOVE_PRODUCTS":
            return {
              ...state,
              products: state.products.filter((product) => product._id !== action.payload),
            }
            case "SET_CURRENT_PRODUCT":
              return{
                ...state,
                currentProduct: action.payload,
              }
             case "SEARCH_DATA":
                return{
                  ...state,
                  filterProducts : action.payload
                }  
      default:
        return state;
    }
  };
  