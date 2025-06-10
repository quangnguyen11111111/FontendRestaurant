import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "./HomeHeader";
import HomeFooter from "./HomeFooter";
import * as actions from "../../store/actions";
import DetailBill from "./DetailBill";
import {path } from "../../utils";
import { withRouter } from "react-router-dom";
import "./style/FollowBill.scss";
import CustomScrollbars from "../../components/CustomScrollbars";
import Swal from 'sweetalert2';
class FollowBill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenMenu: true,
      Order: [],
      filterStatus:0,
      selectedOrderID: null, // Lưu OrderID để truyền vào DetailBill
      selectedStatus:0
    };
  }

  componentDidMount() {
    this.menu();
    this.closeMenu();
    this.props.fetchOrderrStart(this.props.userInfo.CusID); // Fetch danh sách hóa đơn
  }

  componentDidUpdate(prevProps) {
    if (prevProps.Order !== this.props.Order) {
      const sortedCustomers = [...this.props.Order].sort((a, b) => {
        if (a.OrderStatus === b.OrderStatus) return 0;
        return a.OrderStatus === 0 ? -1 : 1;
      });

      this.setState({
        Order: sortedCustomers,
      });
    }
  }

  menu = () => {
    let menu = document.querySelector(".menu-icon");
    let navbar = document.querySelector(".navbar");

    menu.onclick = () => {
      menu.classList.toggle("move");
      navbar.classList.toggle("open-menu");
    };
    this.setState({
      isOpenMenu: false,
    });
  };

  closeMenu = () => {
    let menu = document.querySelector(".menu-icon");
    let navbar = document.querySelector(".navbar");
    menu.classList.remove("move");
    navbar.classList.remove("open-menu");
    this.setState({
      isOpenMenu: true,
    });
  };

  handleShowDetail = (orderId) => {
    this.setState({
      selectedOrderID: orderId,
    });
  };
  onchangeStatus=(index)=>{
    this.setState({
      selectedStatus:index,
      filterStatus:index
    })
  }

  handleDelete=async(OrderID)=>{
     const result = await Swal.fire({
              title: 'Bạn có chắc muốn hủy đơn hàng?',
              text: "Sau khi hủy đơn hàng sẽ bị xóa khỏi hệ thống.",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Xác nhận'
            });
        
            if (result.isConfirmed) {
              await this.props.deleteOrderError(OrderID)
              this.props.fetchOrderrStart(this.props.userInfo.CusID);
              Swal.fire(
                'Đã hủy!',
                'Đơn hàng đã bị hủy.',
                'success'
              );
            }
  }

  handleComment=(CusID,OrderID)=>{
    console.log("check Cus and Or", CusID, OrderID);
    this.props.setSelectedOrder({
      CusID:CusID,
      OrderID:OrderID
    })
    this.props.history.push(path.COMMENT)
  }
  handleStatus=async(data)=>{
   await this.props.updateOrder({
      OrderID:data,
      OrderStatus:3
    })
    this.props.fetchOrderrStart(this.props.userInfo.CusID);
  }
  render() {
    let statusBill = ["Tất cả","Chờ xác nhận","Đã xác nhận","Đang giao","Đã giao"]
    let {userInfo}=this.props
    let { isOpenMenu, Order, selectedOrderID,selectedStatus,filterStatus } = this.state;
    const filteredByStatus = Order.filter((user) => {
      if (filterStatus == 0) {
        return true; // Không lọc
      }
      return user.OrderStatus == (filterStatus-1);
    });
    return (
      <CustomScrollbars style={{ with: "100%", height: "100vh" }}>
        <React.Fragment>
          <div onClick={isOpenMenu ? this.menu : this.closeMenu}>
            <HomeHeader />
            <section className="Follow__Bill">
              <div className="section">
                <h2 className="title">Theo dõi đơn hàng</h2>
                <div className="status__bill">
                  {statusBill.map((item,index)=>{ return(<p className={selectedStatus==index?"status_title activiti":"status_title"} onClick={()=>{this.onchangeStatus(index)}}>{item}</p>)})}
                </div>
                { filteredByStatus==0?<div className="card__bill" >Hiện tại không có đơn hàng nào</div>:
                  filteredByStatus.map((item, index) => {
                    return (
                      <div className="card__bill" key={index}>
                        <div className="card">
                          <div className="card__top">
                            <div className="card__top__left">
                              <p className="header_card " ><span className="span">Mã đơn hàng:</span> {item.OrderID}</p>
                              <p className="header_card green">
                                {item.OrderStatus === 1
                                  ? "Đã xác nhận"
                                  : item.OrderStatus === 2
                                  ? "Đang giao"
                                  : item.OrderStatus === 3
                                  ? "Đã giao"
                                  : "Chưa xác nhận"}
                              </p>
                            </div>
                            <div className="card__top__right">
                              <p className="header_card"><span className="span">Ngày đặt hàng: </span> {item.OrderDate}</p>
                              
                            </div>
                            <div className="card__top__right">
                            <p className="header_card"><span className="span">Ngày dự kiến giao: </span>{item.OrderShipDate}</p>
                              
                            </div>
                          </div>
                          <div className="card__contend">
                            <div className="item_left">
                              {selectedOrderID === item.OrderID ? (
                                <DetailBill OrderID={item.OrderID} />
                              ) : (
                                <p onClick={() => this.handleShowDetail(item.OrderID)}>
                                  Xem chi tiết hóa đơn
                                </p>
                              )}
                            </div>
                            <div className="item_right">
                              <p className="span">Tổng tiền: {item.OderAllPrice} VNĐ</p>
                              {item.OrderStatus==3?<p className="button" onClick={()=>{this.handleComment(userInfo.CusID,item.OrderID)}}>Phản hồi và đánh giá</p>:""}
                              {item.OrderStatus==2?<p className="button" onClick={()=>{this.handleStatus(item.OrderID)}}>Đã nhận</p>:""}
                              {item.OrderStatus==0?<p className="button" onClick={()=>{this.handleDelete(item.OrderID)}}>Hủy đơn</p>:""}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </section>
            <HomeFooter />
          </div>
        </React.Fragment>
      </CustomScrollbars>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    Order: state.cart.Order,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrderrStart: (data) => dispatch(actions.fetchOrderrStart(data)),
    setSelectedOrder: (data) => dispatch(actions.setSelectedOrder(data)),
        updateOrder: (data) => dispatch(actions.updateOrder(data)),
           deleteOrderError: (data) => dispatch(actions.deleteOrderError(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FollowBill));
