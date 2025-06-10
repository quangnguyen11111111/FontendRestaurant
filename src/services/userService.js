import axios from '../axios';
//login
const handleLogin = (email,password)=> {
    return axios.post('/api/login', {email,password});
};
//user
const handleCreatCustomer = (data)=>{
    return axios.post(`/api/create-new-customer`,data);
}

const handleCreatCart = (data)=>{
    return axios.post(`/api/create-cart`,data);
}
const handleEditCus = (data)=>{
    return axios.put(`/api/update-customer`, data)
}
const getAllUsers =(id) =>{
    return axios.get(`/api/getall-users?id=${id}`);
}
const handleDeleteNewUser = (data)=>{
    return axios.put(`/api/delete-customer`,data);
}
//Categories
const getCategories = (CatID)=>{
    return axios.get(`/api/getcategories?CatID=${CatID}`)
}

//Food
const handleGetFood = (data)=>{
    return axios.get(`/api/getfood?FoodName=${data}`)
}

const handleGetFoodSale = ()=>{
    return axios.get(`/api/getFoodSale`)
}
//payment
const handleGetPayment = ()=>{
    return axios.get(`/api/getpayment`)
}
//sizze
const handleGetSize = ()=>{
    return axios.get(`/api/getsize`)
}
const handleGetOrderComment = (CusID,OrderID)=>{
    return axios.get(`/api/getAllOrder?CusID=${CusID}&OrderID=${OrderID}`)
}
const handleGetComment = (CusID,OrderID)=>{
    return axios.get(`/api/getComment?CusID=${CusID}&OrderID=${OrderID}`)
}


// comment
const handleCreatComment = (data)=>{
    return axios.post(`/api/create-comment`,data);
}
const deleteComment = (comID) => {
    return axios.delete(`/api/deleteComment?ComID=${comID}`);
  }
const deleteFeed = (comID) => {
    return axios.delete(`/api/delete-feedback?FeedID=${comID}`);
  }

  //feedback
  const createFeedback = (data)=>{
    return axios.post('/api/create-feedback',data)
  }
  const getFeedback=()=>{
    return axios.get('/api/getFeedback')
  }

export {handleLogin,
    getAllUsers,
    handleDeleteNewUser,
    handleCreatCustomer,
    handleEditCus,
    handleGetFood,
    getCategories,
    handleGetFoodSale,
    handleGetPayment,
    handleGetSize,
    handleCreatCart,
    handleGetOrderComment,
    handleCreatComment,
    handleGetComment,
    deleteComment,
    createFeedback,
    getFeedback,
    deleteFeed,

};