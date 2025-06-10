import axios from '../axios';

const handleLoginAdmin = (data)=> {

  return axios.post(`/api/login`,data);

};
const getCustomer =(data) =>{
  return axios.get(`/api/getcustomer?CusUser=${data}`);
}
//CRUD Cat
const handleDeleteCat = (data)=>{
  return axios.put(`/api/delete-categories`, data)
}
const handleUpdateCat = (data)=>{
  return axios.put(`/api/update-categories`, data)
}
const handleCreatecat = (data)=>{{
  return axios.post(`/api/create-categories`,data)
}}
//CRUD Food
const handleDeleteFood = (data)=>{
  return axios.put(`/api/delete-food`, data)
}
const handleUpdateFood = (data)=>{
  return axios.put(`/api/update-food`, data)
}

const handleCreateFood = (data)=>{{
  return axios.post(`/api/create-food`,data)
}}
//CRUD order
const getOrder =(data) =>{
  return axios.get(`/api/getOrder?CusID=${data}`);
}
const getOrderDetail =(data) =>{
  return axios.get(`/api/getOrderDetail?OrderID=${data}`);
}
const handleUpdateOrder = (data)=>{
  return axios.put(`/api/update-order`, data)
}
  //Thống kê, báo cáo
  const getTotal=(data)=>{
    return axios.get(`/api/getTotal?OrderDate=${data}`)
  }
  const getTotalOrder=(data)=>{
    return axios.get(`/api/getTotalOrder?OrderDate=${data}`)
  }
  const getTotalCategory=(data)=>{
    return axios.get(`/api/getTotalCategory?OrderDate=${data}`)
  }
  const getTotalTime=(data)=>{
    return axios.get(`/api/getTotalTime?OrderDate=${data}`)
  }
  const deleteOrder = (comID) => {
    return axios.delete(`/api/deleteOrder?OrderID=${comID}`);
  }
export {
  handleLoginAdmin,
  getCustomer,
  handleDeleteCat,
  handleUpdateCat,
  handleCreatecat,
  handleDeleteFood,
  handleUpdateFood,
  handleCreateFood,
  getOrder,
  getOrderDetail,
  handleUpdateOrder,
  getTotal,
  getTotalOrder,
  getTotalCategory,
  getTotalTime,
  deleteOrder
};