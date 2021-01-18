export default (state, action) => {
  switch (action.type) {
    case 'CONFIRM_PHONE':
      return {
        ...state,
        phone: action.payload,
        loading: false
      }
    case 'USER_LOADED':
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload.user
      }
    case 'LOGIN_SUCCESS':
      localStorage.setItem('token', action.payload.token)
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false
      }
    case 'LOGIN_FAIL':
    case 'AUTH_ERROR':
    case 'LOGOUT':   
    {
      localStorage.removeItem('token')
      return {
        ...state,
        phone: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload
      }
    }
    case "SUCCESSFUL_USERS":
    case "GET_USERS":
      return{
        ...state,
        users : action.payload,
        loading : false
      }
    case "PHONE_SEARCH":
    case "Name_SEARCH":
      return{
        ...state,
        searchuser : action.payload,
        loading : false
      }
    default:
      return state
  }
}
