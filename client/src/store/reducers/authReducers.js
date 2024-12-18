import actionTypes from "../actions/actionTypes";

const initState = {
    isLoggedIn: false,
    token: null
}

const authReducers = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.REGISTER_SUCCESS:
            return {
                ...state,               
                token: action.data,
                isLoggedIn: true
            }
        case actionTypes.REGISTER_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                token: null
            }
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                token: action.data,
                isLoggedIn: true
            }
        case actionTypes.LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                token: null
            }
        case actionTypes.LOGOUT:
            return{
                ...state,
                isLoggedIn: false,
                token: null
            }
        default:
            return state;
    };
}


export default authReducers;