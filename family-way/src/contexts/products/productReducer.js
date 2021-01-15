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
           case "GET_CAT_PRODUCTS":
             return{
            ...state,
            nonPagenateProducts: action.payload
           }
           case "REMOVE_PRODUCTS":
            return {
              ...state,
              products: state.products.products.filter((product) => product._id !== action.payload),
            }
            case "Set_Current":
              return{
                ...state,
                currentProduct: action.payload,
              }
             case "SEARCH_DATA":
                return{
                  ...state,
                  filterProducts : action.payload
                };   
                case "UPATE_PRODUCTS":
                return {
                  ...state,
                }; 
      default:
        return state;
    }
  };
  