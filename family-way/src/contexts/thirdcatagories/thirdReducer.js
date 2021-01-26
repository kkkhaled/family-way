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
          case 'REMOVE_ONE_THIRD' :  
          return {
             ...state,
             filteredthird: state.filteredthird.filter((thirdcatagory) => thirdcatagory._id !== action.payload),
           }       
      default:
        return state;
    }
  };
  