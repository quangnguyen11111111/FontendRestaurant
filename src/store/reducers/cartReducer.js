import actionTypes from '../actions/actionTypes';
import { saveToIndexedDB ,clearIndexedDB} from '../../utils/indexedDB'; // Đảm bảo đã import
import { size } from 'lodash';

const initialState = {
    CartItems: [],
    PayMent:[],
    Size:[],
    Order:[],
    OrderDetail:[]
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
  const cartItems = Array.isArray(state.CartItems) ? state.CartItems : [];

  // Kiểm tra nếu sản phẩm đã tồn tại với cùng FoodID và size
  const existingItem = cartItems.find(
    item => item.FoodID === action.payload.FoodID && item.SizeID === action.size
  );

  let updatedCartItems;

  if (existingItem) {
    // Cập nhật số lượng cho sản phẩm nếu cùng FoodID và size
    updatedCartItems = cartItems.map(item =>
    (item.FoodID == action.payload.FoodID && item.SizeID == action.size)
        ? { ...item, quantity: item.quantity + action.quantity }
        : item
    );
  } else {
    // Thêm sản phẩm mới nếu khác FoodID hoặc khác size
    updatedCartItems = [
      ...cartItems,
      { ...action.payload, quantity: action.quantity, SizeID: action.size }
    ];
  }

  // Lưu lại mảng đã cập nhật vào IndexedDB
  saveToIndexedDB(updatedCartItems);

  console.log("Cart Items: add", updatedCartItems);

  return {
    ...state,
    CartItems: updatedCartItems,
  };

      case actionTypes.REMOVE_FROM_CART:
        const filteredCartItems = (Array.isArray(state.CartItems) ? state.CartItems : []).filter(
          item => item.FoodID !== action.payload || item.SizeID !== action.SizeID
        );
        
        clearIndexedDB()
        
          
        // Cập nhật lại giỏ hàng trong Redux
        saveToIndexedDB(filteredCartItems); 
      
        return {
          ...state,
          CartItems: filteredCartItems
        };
        
        case actionTypes.REMOVE_FROM_CART_ALL:
          // Xóa tất cả các phần tử trong giỏ hàng
          const clearedCartItems = [];
        
          // Xóa dữ liệu khỏi IndexedDB
          clearIndexedDB();
        
          // Lưu giỏ hàng trống vào IndexedDB
          saveToIndexedDB(clearedCartItems);
        
          return {
            ...state,
            CartItems: clearedCartItems
          };
        
        
    case actionTypes.UPDATE_CART_ITEM:
      const updatedItems = (Array.isArray(state.CartItems) ? state.CartItems : []).map(item =>
        (item.FoodID === action.payload.FoodID && item.SizeID === action.payload.SizeID)
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      console.log("check quan ti ty ", );
      
      saveToIndexedDB(updatedItems);

      return {
        ...state,
        CartItems: updatedItems
      };

    case actionTypes.SET_CART_ITEMS:
      console.log("Cart Items: load", action.payload);
      return {
        ...state,
        CartItems: action.payload, // Đảm bảo payload là mảng hợp lệ,
        
      };
    case actionTypes.LOADING_PAYMENT_SUCCSESS:
      
      return {
        ...state,
        PayMent: action.payload, // Đảm bảo payload là mảng hợp lệ,
        
      };
    case actionTypes.LOADING_SIZE_SUCCSESS:
      
      return {
        ...state,
        Size: action.payload, // Đảm bảo payload là mảng hợp lệ,
      };
    case actionTypes.FETCH_ORDER_SUCCSESS:
      
      return {
        ...state,
        Order: action.data, // Đảm bảo payload là mảng hợp lệ,
      };
    case actionTypes.FETCH_ORDERDETAIL_SUCCSESS:
      
      return {
        ...state,
        OrderDetail: action.data, // Đảm bảo payload là mảng hợp lệ,
      };

    default:
      return state;
  }
};


export default cartReducer;
