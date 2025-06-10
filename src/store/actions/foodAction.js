import actionTypes from "./actionTypes";
import {
  handleGetFoodSale,
  getCategories,
  handleGetFood,
  handleGetOrderComment,
  handleCreatComment,
  handleGetComment,
  deleteComment,
  createFeedback,
  getFeedback,
  deleteFeed
} from "../../services/userService";
import { toast } from "react-toastify";
export const fetchFoodSaleStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await handleGetFoodSale();
      if (res) {
        dispatch(fetchFoodSaleSuccess(res.data));
      } else {
        dispatch(fetchFoodSaleFaild());
      }
    } catch (e) {
      dispatch(fetchFoodSaleFaild());
    }
  };
};
export const fetchCategoriesStart = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await getCategories(data);
      if (res) {
        dispatch(fetchCategoriesSuccess(res.data));
      } else {
        dispatch(fetchCategoriesFaild());
      }
    } catch (e) {
      dispatch(fetchCategoriesFaild());
    }
  };
};
export const fetchFoodStart = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await handleGetFood(data);
      if (res) {
        dispatch(fetchFoodSuccess(res.data));
      } else {
        dispatch(fetchFoodFaild());
      }
    } catch (e) {
      dispatch(fetchFoodFaild());
    }
  };
};
export const fetchCategoriesSuccess = (data) => ({
  type: actionTypes.FETCH_CATEGORIES_SUCCSESS,
  data: data,
});
export const fetchCategoriesFaild = () => ({
  type: actionTypes.FETCH_CATEGORIES_FAILD,
});
export const fetchFoodSaleSuccess = (FoodInfo) => ({
  type: actionTypes.FETCH_FOODSALE_SUCCSESS,
  data: FoodInfo,
});
export const fetchFoodSaleFaild = () => ({
  type: actionTypes.FETCH_FOODSALE_FAILD,
});
export const fetchFoodSuccess = (FoodInfo) => ({
  type: actionTypes.FETCH_FOOD_SUCCSESS,
  data: FoodInfo,
});
export const fetchFoodFaild = () => ({
  type: actionTypes.FETCH_FOOD_FAILD,
});
export const setSelectedFood = (food) => {
  return {
    type: actionTypes.SET_SELECTED_FOOD,
    payload: food,
  };
};
export const setSelectedOrder = (food) => {
  return {
    type: actionTypes.SET_SELECTED_ORDER,
    payload: food,
  };
};
export const setSelectedCat = (Cat) => {
  return {
    type: actionTypes.SET_SELECTED_CAT,
    payload: Cat,
  };
};
export const fetchFoodOrderAll = (CusID, OrderID) => {
  return async (dispatch, getState) => {
    try {
      let res = await handleGetOrderComment(CusID, OrderID);
      if (res) {
        dispatch(fetchOrderCommentSuccess(res.data));
      } else {
        dispatch(fetchOrderCommentFaild());
      }
    } catch (e) {
      dispatch(fetchOrderCommentFaild());
    }
  };
};
export const fetchOrderCommentSuccess = (FoodInfo) => ({
  type: actionTypes.FETCH_ORDERCOMMENT_SUCCSESS,
  data: FoodInfo,
});
export const fetchOrderCommentFaild = () => ({
  type: actionTypes.FETCH_ORDERCOMMENT_FAILD,
});

export const createComment = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await handleCreatComment(data);
      if (res && res.errCode === 0) {
        toast.success(res.message);
        dispatch(createNewCommentSuccess(res.data));
      } else {
        dispatch(createNewCommentFaild());
      }
    } catch (e) {
      dispatch(createNewCommentFaild());
    }
  };
};
export const createNewCommentSuccess = (data) => ({
  type: actionTypes.CREATE_COMMENT_SUCCSESS,
  data: data.data,
});
export const createNewCommentFaild = () => ({
  type: actionTypes.CREATE_COMMENT_FAILD,
});

export const fetchComment = (CusID, OrderID) => {
  return async (dispatch, getState) => {
    try {
      let res = await handleGetComment(CusID, OrderID);
      if (res) {
        dispatch(fetchCommentSuccess(res.data));
      } else {
        dispatch(fetchCommentFaild());
      }
    } catch (e) {
      dispatch(fetchCommentFaild());
    }
  };
};
export const fetchCommentSuccess = (FoodInfo) => ({
  type: actionTypes.FETCH_COMMENT_SUCCSESS,
  data: FoodInfo,
});
export const fetchCommentFaild = () => ({
  type: actionTypes.FETCH_COMMENT_FAILD,
});

export const deleteCom = (ComID) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteComment(ComID);
      if (res && res.errCode == 0) {
        toast.success(res.message);
        dispatch(deleteCommentSuccsess());
      } else {
        dispatch(deleteCommentFaild());
      }
    } catch (e) {
      dispatch(deleteCommentFaild());
    }
  };
};
export const deleteCommentSuccsess = (FoodInfo) => ({
  type: actionTypes.DELETE_COMMENT_SUCCSESS,
  data: FoodInfo,
});
export const deleteCommentFaild = () => ({
  type: actionTypes.DELETE_COMMENT_FAILD,
});
export const createFeed = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createFeedback(data);
      if (res && res.errCode === 0) {
        toast.success(res.message);
        dispatch(createNewFeedbackSuccess());
      } else {
        dispatch(createNewFeedbackFaild());
      }
    } catch (e) {
      dispatch(createNewFeedbackFaild());
    }
  };
};
export const createNewFeedbackSuccess = () => ({
  type: actionTypes.CREATE_COMMENT_SUCCSESS
});
export const createNewFeedbackFaild = () => ({
  type: actionTypes.CREATE_COMMENT_FAILD,
});
export const fetchFeedback = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getFeedback();
      if (res && res.errCode === 0) {
        dispatch(fetchFeedbackSuccsess(res.data));
      } else {
        dispatch(fetchFeedbackFaild());
      }
    } catch (e) {
      dispatch(fetchFeedbackFaild());
    }
  };
};
export const fetchFeedbackSuccsess = (data) => ({
  type: actionTypes.FETCH_FEEDBACK_SUCCSESS,
  data:data
});
export const fetchFeedbackFaild = () => ({
  type: actionTypes.FETCH_FEEDBACK_FAILD,
});
export const deleteFeedBack = (ComID) => {
    return async (dispatch, getState) => {
      try {
        let res = await deleteFeed(ComID);
        if (res && res.errCode == 0) {
          toast.success(res.message);
          dispatch(deleteFeedbackSuccsess());
        } else {
          dispatch(deleteFeedbackFaild());
        }
      } catch (e) {
        dispatch(deleteFeedbackFaild());
      }
    };
  };
  export const deleteFeedbackSuccsess = () => ({
    type: actionTypes.DELETE_FEEDBACK_SUCCSESS
  });
  export const deleteFeedbackFaild = () => ({
    type: actionTypes.DELETE_FEEDBACK_FAILD,
  });