import actionTypes from "./actionTypes";
import {handleGetPayment,handleGetSize,handleCreatCart}from "../../services/userService"
import { saveToIndexedDB, loadFromIndexedDB } from '../../utils/indexedDB'; // Đảm bảo đã import
import {
  getOrder,getOrderDetail,handleUpdateOrder
} from "../../services/adminService";
import { toast } from "react-toastify";
export const addToCart = (Food,quantity,size) => ({
    type: actionTypes.ADD_TO_CART,
    payload: Food,
    quantity:quantity,
    size:size
  });
  
  export const removeFromCart = (FoodID,size) => ({
    type: actionTypes.REMOVE_FROM_CART,
    payload: FoodID,
    SizeID:size
  });
  export const removeFromCartAll = () => ({
    type: actionTypes.REMOVE_FROM_CART_ALL,
  });
  
  export const updateCartItem = (FoodID, quantity,SizeID) => ({
    type: actionTypes.UPDATE_CART_ITEM,
    payload: { FoodID, quantity,SizeID },
  });
  //payment
  export const loadPayment = () => {
    return async (dispatch, getState) => {
      try {
        let res = await handleGetPayment();
        if (res) {
          dispatch(fetchLoadPaymentSuccess(res.data))
        } else {
          dispatch(fetchPaymentFaild());
        }
      } catch (e) {
        dispatch(fetchPaymentFaild());
      }
    };
  };
  export const fetchLoadPaymentSuccess = (data) => ({
    type: actionTypes.LOADING_PAYMENT_SUCCSESS,
    payload: data,
  });
  export const fetchPaymentFaild = () => ({
    type: actionTypes.LOADING_PAYMENT_FAILD
  });
  //size
  export const loadSize = () => {
    return async (dispatch, getState) => {
      try {
        let res = await handleGetSize();
        if (res) {
          dispatch(fetchLoadSizeSuccess(res.data))
        } else {
          dispatch(fetchSizeFaild());
        }
      } catch (e) {
        dispatch(fetchSizeFaild());
      }
    };
  };
  export const fetchLoadSizeSuccess = (data) => ({
    type: actionTypes.LOADING_SIZE_SUCCSESS,
    payload: data,
  });
  export const fetchSizeFaild = () => ({
    type: actionTypes.LOADING_SIZE_FAILD
  });
  export const loadCartItems = () => {
    return async (dispatch) => {
      try {
        const data = await loadFromIndexedDB();
        if (Array.isArray(data)) {
          dispatch({
            type: actionTypes.SET_CART_ITEMS,
            payload: data,
          });
        } else {
          // Nếu dữ liệu không phải mảng, có thể set về mảng rỗng
          dispatch({
            type: actionTypes.SET_CART_ITEMS,
            payload:[],
          });
        }
      } catch (error) {
        console.error("Error loading cart items from IndexedDB:", error);
      }
    };
  };


  export const createCart = (data) => {
    return async (dispatch, getState) => {
      try {
        let res = await handleCreatCart(data);
        if (res && res.errCode === 0) {
          toast.success(res.message);
          await dispatch(removeFromCartAll());
          dispatch(createNewCartSuccess());
          
        } else {
          toast.error(res.message);
          dispatch(createNewCartFaild());
        }
      } catch (e) {
        dispatch(createNewCartFaild());
      }
    };
  };
  export const createNewCartSuccess = () => ({
    type: actionTypes.PAY_BILL_SUCCSESS,
  });
  export const createNewCartFaild = () => ({
    type: actionTypes.PAY_BILL_FAILD,
  });

  export const fetchOrderrStart = (data) => {
    return async (dispatch, getState) => {
      try {
        let res = await getOrder(data);
        if (res) {
          dispatch(fetchOrderSuccess(res.data.reverse()));
        } else {
          dispatch(fetchOrderFaild());
        }
      } catch (e) {
        dispatch(fetchOrderFaild());
      }
    };
  };
  export const fetchOrderSuccess=(data)=>({
    type:actionTypes.FETCH_ORDER_SUCCSESS,
    data: data
})
export const fetchOrderFaild=()=>({
    type:actionTypes.FETCH_ORDER_FAILD
})
  export const fetchoOrderdetailStart = (data) => {
    return async (dispatch, getState) => {
      try {
        let res = await getOrderDetail(data);
        if (res) {
          dispatch(fetchOrderdetailSuccess(res.data));
        } else {
          dispatch(fetchOrderdetailFaild());
        }
      } catch (e) {
        dispatch(fetchOrderdetailFaild());
      }
    };
  };
  export const fetchOrderdetailSuccess=(data)=>({
    type:actionTypes.FETCH_ORDERDETAIL_SUCCSESS,
    data: data
})
export const fetchOrderdetailFaild=()=>({
    type:actionTypes.FETCH_ORDERDETAIL_FAILD
})

export const updateOrder = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await handleUpdateOrder(data);
      if (res && res.errCode === 0) {
        toast.success(res.message);
        dispatch(updateOrderSuccess());
      } else {
        toast.error(res.message);
        dispatch(updateOrderFaild());
      }
    } catch (e) {
      dispatch(updateOrderFaild());
    }
  };
};
export const updateOrderSuccess = () => ({
  type: actionTypes.UPDATE_ORDER_STATUS_SUCCSESS,
});
export const updateOrderFaild = () => ({
  type: actionTypes.UPDATE_ORDER_STATUS_FAILD,
});