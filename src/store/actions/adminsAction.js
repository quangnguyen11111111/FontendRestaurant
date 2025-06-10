import actionTypes from "./actionTypes";
import { getAllUsers, handleDeleteNewUser } from "../../services/userService";
import {
  getCustomer,
  handleDeleteCat,
  handleUpdateCat,
  handleCreatecat,
  handleDeleteFood,
  handleUpdateFood,
  handleCreateFood,
  getTotal,
  getTotalOrder,
  getTotalCategory,
  getTotalTime,
  deleteOrder
} from "../../services/adminService";
import { toast } from "react-toastify";
import { fetchCategoriesStart,fetchFoodStart } from "./foodAction";
export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUsers("ALL");
      if (res) {
        dispatch(fetchGenderSuccess(res.user.reverse()));
      } else {
        dispatch(fetchGenderFaild());
      }
    } catch (e) {
      dispatch(fetchGenderFaild());
    }
  };
};
export const fetchGenderSuccess = (user) => ({
  type: actionTypes.FETCH_GENDER_SUCCSESS,
  data: user,
});
export const fetchGenderFaild = () => ({
  type: actionTypes.FETCH_GENDER_FAILD,
});
// export const createNewUser = (data)=>{
//     return async(dispatch, getState)=>{
//         try {
//            let res=await handleCreatNewUser(data);
//            if (res && res.data === 0) {
//             toast.success("Thêm mới người dùng thành công!!")
//                 dispatch(createNewUserSuccess())
//            } else {
//             toast.error("Người dùng đã tồn tại")
//             dispatch(createNewUserFaild())
//            }

//         } catch (e) {
//             dispatch(createNewUserFaild())
//         }
//     }
// }
// export const createNewUserSuccess=()=>({
//     type: actionTypes.CREATE_USER_SUSSESS,
// })
// export const createNewUserFaild=()=>({
//     type: actionTypes.CREATE_USER_FAILD,
// })

export const deleteUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await handleDeleteNewUser(data);
      if (res && res.errCode === 0) {
        toast.success(res.message);
        dispatch(deleteUserSuccess());
        dispatch(fetchAllCustomerStart());
      } else {
        toast.error(res.message);
        dispatch(deleteUserFaild());
      }
    } catch (e) {
      dispatch(deleteUserFaild());
    }
  };
};
export const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUSSESS,
});
export const deleteUserFaild = () => ({
  type: actionTypes.DELETE_USER_FAILD,
});
// export const editUser=(data)=>{
//     return async(dispatch, getState)=>{
//         try {
//             let res = await handleEditUser(data);
//             if (res && res.errCode === 0) {
//                 toast.success("Sửa người dùng thành công!!")
//                 dispatch(editUserSuccess())
//             }else{
//                 dispatch(editUserFaild())
//             }
//         } catch (e) {
//             dispatch(editUserFaild())
//         }
//     }
// }
// export const editUserSuccess=()=>({
//     type:actionTypes.EDIT_USER_SUSSESS
// })
// export const editUserFaild=()=>({
//     type:actionTypes.EDIT_USER_FAILD
// })
export const fetchAllCustomerStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getCustomer("ALL");
      if (res) {
        dispatch(fetchCustomerSuccess(res.data.reverse()));
      } else {
        dispatch(fetchCustomerFaild());
      }
    } catch (e) {
      dispatch(fetchCustomerFaild());
    }
  };
};
export const fetchCustomerSuccess = (data) => ({
  type: actionTypes.FETCH_CUSTOMER_SUCCSESS,
  data: data,
});
export const fetchCustomerFaild = () => ({
  type: actionTypes.FETCH_CUSTOMER_FAILD,
});

export const deleteOrderError = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteOrder(data);
      if (res && res.errCode === 0) {
        toast.success(res.message);
        dispatch(deleteOrderErrorSuccsess());
      } else {
        toast.error(res.message);
        dispatch(deleteOrderErrorFaild());
      }
    } catch (e) {
      dispatch(deleteOrderErrorFaild());
    }
  };
};
export const deleteOrderErrorFaild=()=>({
  type:actionTypes.DELETE_COMMENT_FAILD
})
export const deleteOrderErrorSuccsess=()=>({
  type:actionTypes.DELETE_COMMENT_SUCCSESS
})
export const deleteCategories = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await handleDeleteCat(data);
      if (res && res.errCode === 0) {
        toast.success(res.message);
        dispatch(deleteUserSuccess());
        dispatch(fetchCategoriesStart());
      } else {
        toast.error(res.message);
        dispatch(deleteUserFaild());
      }
    } catch (e) {
      dispatch(deleteUserFaild());
    }
  };
};
export const deleteCategoriesSuccess = () => ({
  type: actionTypes.DELETE_CATEGORIES_SUCCSESS,
});
export const deleteCategoriesFaild = () => ({
  type: actionTypes.DELETE_CATEGORIES_FAILD,
});
export const updateCategories = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await handleUpdateCat(data);
      if (res && res.errCode === 0) {
        toast.success(res.message);
        dispatch(updateCategoriesSuccess());
        dispatch(fetchCategoriesStart());
      } else {
        toast.error(res.message);
        dispatch(updateCategoriesFaild());
      }
    } catch (e) {
      dispatch(updateCategoriesFaild());
    }
  };
};
export const updateCategoriesSuccess = () => ({
  type: actionTypes.UPDATE_CATEGORIES_SUCCSESS,
});
export const updateCategoriesFaild = () => ({
  type: actionTypes.UPDATE_CATEGORIES_FAILD,
});

export const createCategories = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await handleCreatecat(data);
      if (res && res.errCode === 0) {
        toast.success(res.message);
        dispatch(createNewCategoriesSuccess());
        dispatch(fetchCategoriesStart());
      } else {
        toast.error(res.message);
        dispatch(createNewCategoriesFaild());
      }
    } catch (e) {
      dispatch(createNewCategoriesFaild());
    }
  };
};
export const createNewCategoriesSuccess = () => ({
  type: actionTypes.CREATE_CATEGORIES_SUSSESS,
});
export const createNewCategoriesFaild = () => ({
  type: actionTypes.CREATE_CATEGORIES_FAILD,
});

export const deleteFood = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await handleDeleteFood(data);
      if (res && res.errCode === 0) {
        toast.success(res.message);
        dispatch(deleteUserSuccess());
        dispatch(fetchFoodStart("ALL"));
      } else {
        toast.error(res.message);
        dispatch(deleteUserFaild());
      }
    } catch (e) {
      dispatch(deleteUserFaild());
    }
  };
};
export const deleteFoodSuccess = () => ({
  type: actionTypes.DELETE_FOOD_SUCCSESS,
});
export const deleteFoodFaild = () => ({
  type: actionTypes.DELETE_FOOD_FAILD,
});
export const updateFood = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await handleUpdateFood(data);
      if (res && res.errCode === 0) {
        toast.success(res.message);
        dispatch(updateFoodSuccess());
        dispatch(fetchFoodStart("ALL"));
      } else {
        toast.error(res.message);
        dispatch(updateFoodFaild());
      }
    } catch (e) {
      dispatch(updateFoodFaild());
    }
  };
};
export const updateFoodSuccess = () => ({
  type: actionTypes.UPDATE_FOOD_SUCCSESS,
});
export const updateFoodFaild = () => ({
  type: actionTypes.UPDATE_FOOD_FAILD,
});

export const createFood = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await handleCreateFood(data);
      if (res && res.errCode === 0) {
        toast.success(res.message);
        dispatch(createNewFoodSuccess());
        dispatch(fetchFoodStart("ALL"));
      } else {
        toast.error(res.message);
        dispatch(createNewFoodFaild());
      }
    } catch (e) {
      dispatch(createNewFoodFaild());
    }
  };
};
export const createNewFoodSuccess = () => ({
  type: actionTypes.CREATE_FOOD_SUSSESS,
});
export const createNewFoodFaild = () => ({
  type: actionTypes.CREATE_FOOD_FAILD,
});
//
export const fetchTotalStart = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await getTotal(data);
      if (res) {
        dispatch(fetchTotalSuccess(res.data));
      } else {
        dispatch(fetchTotalFaild());
      }
    } catch (e) {
      dispatch(fetchTotalFaild());
    }
  };
};
export const fetchTotalSuccess = (user) => ({
  type: actionTypes.FETCH_GETTOTAL_SUCCSESS,
  data: user,
});
export const fetchTotalFaild = () => ({
  type: actionTypes.FETCH_GETTOTAL_FAILD,
});
//
export const fetchTotalOrderStart = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await getTotalOrder(data);
      if (res) {
        dispatch(fetchTotalOrderSuccess(res.data));
      } else {
        dispatch(fetchTotalOrderFaild());
      }
    } catch (e) {
      dispatch(fetchTotalOrderFaild());
    }
  };
};
export const fetchTotalOrderSuccess = (user) => ({
  type: actionTypes.FETCH_GETTOTALORDER_SUCCSESS,
  data: user,
});
export const fetchTotalOrderFaild = () => ({
  type: actionTypes.FETCH_GETTOTALORDER_SUCCSESS,
});
//
export const fetchTotalCategoryStart = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await getTotalCategory(data);
      if (res) {
        dispatch(fetchTotalCategorySuccess(res.data));
      } else {
        dispatch(fetchTotalCategoryFaild());
      }
    } catch (e) {
      dispatch(fetchTotalCategoryFaild());
    }
  };
};
export const fetchTotalCategorySuccess = (user) => ({
  type: actionTypes.FETCH_GETTOTALCATEGORY_SUCCSESS,
  data: user,
});
export const fetchTotalCategoryFaild = () => ({
  type: actionTypes.FETCH_GETTOTALCATEGORY_SUCCSESS,
});
//
export const fetchTotalTimeStart = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await getTotalTime(data);
      if (res) {
        dispatch(fetchTotalTimeSuccess(res.data));
      } else {
        dispatch(fetchTotalTimeFaild());
      }
    } catch (e) {
      dispatch(fetchTotalTimeFaild());
    }
  };
};
export const fetchTotalTimeSuccess = (user) => ({
  type: actionTypes.FETCH_GETTOTALTIME_SUCCSESS,
  data: user,
});
export const fetchTotalTimeFaild = () => ({
  type: actionTypes.FETCH_GETTOTALTIME_SUCCSESS,
});