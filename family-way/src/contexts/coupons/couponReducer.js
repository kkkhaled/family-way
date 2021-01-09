export default (state, action) => {
    switch (action.type) {
        case "CREATE_COUPON":
            return {
                ...state,
            };
            case "GET_COUPONS":
           return {
             ...state,
             coupons: action.payload
           }
            default:
        return state;
    }
  };
  