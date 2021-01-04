export default (state, action) => {
    switch (action.type) {
        case "ADD_CONSTANTS":
            return {
                ...state,
                constants :[...state.constants,action.payload]
            } 
      default:
        return state;
    }
  };
  