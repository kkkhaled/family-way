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
           }
            default:
        return state;
    }
  };
  