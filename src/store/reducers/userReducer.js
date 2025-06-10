import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoggedIn: false,
    userInfo: [],
    lv:""
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                userInfo: action.userInfo,
                lv:action.lv
                
            }
        case actionTypes.USER_LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: [],
                lv:""
            }
        case actionTypes.PROCESS_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: [],
                lv:""
            }
        case actionTypes.EDIT_USER_SUSSESS:
            return {
                ...state,
                userInfo: action.data,
            }
        default:
            return state;
    }
}

export default userReducer;