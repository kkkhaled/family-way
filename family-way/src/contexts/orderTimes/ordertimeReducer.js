export default (state, action) => {
    switch (action.type) {
        case "CREATE_NEW_TIME":
            return {
                ...state,
            };
            case "GET_TIMES":
           return {
             ...state,
             ordertimes: action.payload
           };
           case "REMOVE_TIME":
            return {
              ...state,
              ordertimes: state.ordertimes.filter((time) => time._id !== action.payload),
            }
            case "SET_CURRENT":
              return{
                ...state,
                time: action.payload
              }
            default:
        return state;
    }
  };
  