export default (state, action) => {
    switch (action.type) {
        case "ADD_CONSTANTS":
            return {
                ...state,
            };
            case "GET_CONTANT":
           return {
             ...state,
             constants: action.payload
           }
            default:
        return state;
    }
  };
  