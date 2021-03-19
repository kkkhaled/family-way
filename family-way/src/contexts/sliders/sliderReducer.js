export default (state, action) => {
    switch (action.type) {
         case "GET_SLIDER":
           return {
             ...state,
             sliders: action.payload,
           };
           case "REMOVE_SLIDER":
            return {
              ...state,
              sliders: state.sliders.filter((slider) => slider._id !== action.payload),
            };
            case "GET_COMPANIES":
              return {
                ...state,
                companies : action.payload
              }
             case "REMOVE_COMPANIES":
              return {
                ...state,
                companies: state.companies.filter((company) => company._id !== action.payload),
              };  
              case "Set_Current":
                return{
                  ...state,
                  currentslider: action.payload,
                }                  
            default:
        return state;
    }
  };