export default (state, action) => {
    switch (action.type) {
          case "GET_ORDERS":
           return {
             ...state,
             orders: action.payload
           }
           case "REMOVE_ORDER":
               return {
                   ...state,
                   orders: state.orders.filter((orders) => orders._id !== action.payload),
               }
            default:
        return state;
    }
  };
  