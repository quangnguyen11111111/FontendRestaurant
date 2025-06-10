import actionTypes from '../actions/actionTypes';

const initialState = {
    FoodSale:[],
    categories:[],
    Food:[],
    selectedFood:null,
    selectedOrder:null,
    selectedCat:"ALL",
    OrderComment:[],
    Comment:[],
    CommentVS:[],
    FeedBack:[]
}

const foodReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_FOODSALE_SUCCSESS:
            return {
                ...state,
                FoodSale:action.data
            }
        case actionTypes.FETCH_FOODSALE_FAILD:
            return {
                ...state
            }
        case actionTypes.FETCH_CATEGORIES_SUCCSESS:
                return {
                    ...state,
                    categories:action.data
                }
        case actionTypes.FETCH_CATEGORIES_FAILD:
                return {
                    ...state,
                    categories:[]
                }
        case actionTypes.FETCH_FOOD_SUCCSESS:
                return {
                    ...state,
                    Food:action.data
                }
        case actionTypes.FETCH_FOOD_FAILD:
                return {
                    ...state,
                    Food:[]
                }
        case actionTypes.SET_SELECTED_FOOD:
            return {
                ...state,
                selectedFood: action.payload,
              };
        case actionTypes. SET_SELECTED_ORDER:
            return {
                ...state,
                selectedOrder: action.payload,
              };
        case actionTypes.SET_SELECTED_CAT:
            return {
                ...state,
                selectedCat: action.payload,
              };
        case actionTypes.FETCH_ORDERCOMMENT_SUCCSESS:
            return {
                ...state,
                OrderComment: action.data,
              };
        case actionTypes.CREATE_COMMENT_SUCCSESS:
            return {
                ...state,
                Comment: action.data,
              };
        case actionTypes.FETCH_COMMENT_SUCCSESS:
            return {
                ...state,
                CommentVS: action.data,
              };
        case actionTypes.FETCH_FEEDBACK_SUCCSESS:
            return {
                ...state,
                FeedBack: action.data,
              };
        default:
            return state;
    }
}


export default foodReducer;