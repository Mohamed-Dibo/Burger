import * as actionTypes from "../action/actionTypes";
const initialState = {
    token:null,
    userId:null,
    error:null,
    loading:false,
    authRedirect : '/'
}

const Authreducer = (state = initialState, action) => {
    switch (action.type) {
    case actionTypes.AUTH_START:
        return { ...state, loading:true , error:null }
    case actionTypes.AUTH_SUCCESS:
        return { ...state,token:action.token,userId:action.userId ,loading:false , error:null }
    case actionTypes.AUTH_FAIL:
        return { ...state,loading:false , error:action.error }
    case actionTypes.AUTH_LOGOUT:
        return { ...state,token:null , userId:null}
    case actionTypes.AUTH_REDIRCT:
        return { ...state,authRedirect:action.path}
    default:
        return state
    }
}

export default Authreducer