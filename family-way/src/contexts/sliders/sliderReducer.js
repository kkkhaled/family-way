export default (state, action) => {
    switch (action.type) {
         case "GET_SLIDER":
           return {
             ...state,
             sliders: action.payload
           };
           case "REMOVE_sLIDER":
            return {
              ...state,
              sliders: state.sliders.filter((slider) => slider._id !== action.payload),
            }
            default:
        return state;
    }
  };