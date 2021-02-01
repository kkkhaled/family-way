export default (state, action) => {
    switch (action.type) {
          case "GET_ADD":
        return {
          ...state,
          Ads: action.payload,
        };
        default:
        return state;
    }
  };
  