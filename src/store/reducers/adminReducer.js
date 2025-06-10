import actionTypes from '../actions/actionTypes';

const initialState = {
    allcustomer:[],
    Total:[],
    TotalOrder:"",
    TotalCategory:[],
    TotalTime:[],
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_CUSTOMER_SUCCSESS:
            return {
                ...state,
                allcustomer:action.data
            }
        case actionTypes.FETCH_GETTOTAL_SUCCSESS:
            return {
                ...state,
                Total:action.data
            }
        case actionTypes.FETCH_GETTOTALORDER_SUCCSESS:
            return {
                ...state,
                TotalOrder:action.data
            }
        case actionTypes.FETCH_GETTOTALCATEGORY_SUCCSESS:
            return {
                ...state,
                TotalCategory:action.data
            }
        case actionTypes.FETCH_GETTOTALTIME_SUCCSESS:
            return {
                ...state,
                TotalTime:action.data
            }
        case actionTypes.FETCH_CUSTOMER_FAILD:
            return {
                ...state,
                allcustomer:[]
            }
        
        default:
            return state;
    }
}


export default adminReducer;