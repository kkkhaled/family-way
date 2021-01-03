export default (state, action) => {
    switch (action.type) {
          case "GET_ALL_THIRD_CATAGORIES":
            return {
                ...state,
                thirdcatagories: action.payload,
                isLoad : false
              };
          case "GET_FILTERED_THIRD":
              return {
                  ...state,
                  filteredthird: action.payload
              }   
          case "ADD_THIRD_IMAGES":
              return{
              ...state,
              isLoad:false
          }     
      default:
        return state;
    }
  };
  