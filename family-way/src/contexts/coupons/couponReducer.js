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
           case "REMOVE_ONE":
            return {
              ...state,
              coupons: state.coupons.filter((coupon) => coupon._id !== action.payload),
            }
            default:
        return state;
    }
  };
  