import actionTypes from './actionTypes';
import {handleLoginAdmin} from '../../services/adminService';
import {handleCreatCustomer,handleEditCus} from '../../services/userService'
import { toast } from 'react-toastify';
export const addUserSuccess = () => ({
    type: actionTypes.ADD_USER_SUCCESS
})
export const userLoginFail = () => ({
    type: actionTypes.USER_LOGIN_FAIL
})

export const processLogout = () => ({
    type: actionTypes.PROCESS_LOGOUT
})
export const userLoginSuccess = (userInfo,lv) => ({
    type: actionTypes.USER_LOGIN_SUCCESS,
    userInfo:userInfo,
    lv:lv
})
export const userLoginStart = (data) => {
    return async(dispatch, getState)=>{
        try {
            let res = await handleLoginAdmin(data);
            console.log("check data",res);
            if (!res) {
                dispatch(userLoginFail());
                toast.error("Sever error!!");
            }
            if(res && res.errCode===0){
                dispatch(userLoginSuccess(res.user,res.lv));
                toast.success(res.message)
            }else{
                dispatch(userLoginFail());
                toast.error(res.message);
            }
        } catch (e) {
            dispatch(userLoginFail());
    }
    

}}
export const createNewUser = (data)=>{
    return async(dispatch, getState)=>{
        try {
           let res=await handleCreatCustomer(data);
           if (res && res.errCode === 0) {
            toast.success(res.message)
                dispatch(createNewUserSuccess())
           } else {
            toast.error(res.message)
            dispatch(createNewUserFaild())
           }

        } catch (e) {
            dispatch(createNewUserFaild())
        }
    }
}
export const createNewUserSuccess=()=>({
    type: actionTypes.CREATE_USER_SUSSESS,
})
export const createNewUserFaild=()=>({
    type: actionTypes.CREATE_USER_FAILD,
})
export const editCustomer=(data)=>{
    return async(dispatch, getState)=>{
        try {
            let res = await handleEditCus(data);
            if (res && res.errCode === 0) {
                toast.success(res.message)
                dispatch(editUserSuccess(res.user))
            }else{
                toast.error(res.message)
                dispatch(editUserFaild())
            }
        } catch (e) {
            dispatch(editUserFaild())
        }
    }
}
export const editUserSuccess=(user)=>({
    type:actionTypes.EDIT_USER_SUSSESS,
    data:user
})
export const editUserFaild=()=>({
    type:actionTypes.EDIT_USER_FAILD
})