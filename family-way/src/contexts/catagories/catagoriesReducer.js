export default (state, action) => {
    switch (action.type) {
      case "ADD_NEW_ONE":
        return {
          ...state,
         // catagories: [...state.catagories, action.payload],
          loading : false
        };
      case "GETALLCATAGORIES":
        return {
          ...state,
          catagories: action.payload,
          loading : false
        };
        case "GET_ONE_CATAGORY":
               return {
                   ...state,
                   onecatagory : action.payload,
                   loading :false
               }     
        case "REMOVE_ONE":
          return {
            ...state,
            catagories: state.catagories.filter((catagory) => catagory._id !== action.payload),
            loading : false
          }
      default:
        return state;
    }
  };
  