import React, { Component } from "react";
import { connect } from "react-redux";
import Fuse from "fuse.js";
import * as actions from "../../../store/actions";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CustomerManege.scss";
import { toast } from "react-toastify";
import OrderDetail  from "./OrderDetail";
import Swal from 'sweetalert2';
class OrderManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allcustomer: [],
      isOpenSearch: false,
      isOpenModel:false,
      currentPage: 1,
      usersPerPage: 4,
      searchTerm: "",
      filterStatus: "all", // Trạng thái lọc
      loading: false,
      OrderDetail:[]
    };
  }

  changeInputOpen = () => {
    this.setState({
      isOpenSearch: true,
    });
  };

  changeInputClose = () => {
    this.setState({
      isOpenSearch: false,
    });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.allcustomer !== this.props.allcustomer) {
      const sortedCustomers = [...this.props.allcustomer].sort((a, b) => {
        if (a.OrderStatus === b.OrderStatus) return 0;
        return a.OrderStatus === 0 ? -1 : 1;
      });

      this.setState({
        allcustomer: sortedCustomers,
      });
    }
    if (prevProps.OrderDetail !== this.props.OrderDetail) {
  

      this.setState({
        OrderDetail: this.props.OrderDetail,
      });
    }
  }

    loadData=()=>{return this.props.fetchOrderrStart("ALL")}
  componentDidMount() {
    this.setState({ loading: true });  // Bắt đầu loading
    this.loadData()
      .then(() => {
        this.setState({ loading: false });  // Dừng loading khi lấy xong dữ liệu
      })
      .catch(() => {
        this.setState({ loading: false });  // Dừng loading nếu có lỗi
      });
  }
  handleSearchInputChange = (event) => {
    this.setState({
      searchTerm: event.target.value,
    });
  };

  handlePageChange = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
  };
  getCurrentTimeFormatted = (data) => {
    const now = new Date();
    if (data==1) {
      now.setHours(now.getHours() + 15);
    }
    
    const hours = String(now.getHours()).padStart(2, '0'); // Giờ (2 chữ số)
    const minutes = String(now.getMinutes()).padStart(2, '0'); // Phút (2 chữ số)
    const date = String(now.getDate()).padStart(2, '0'); // Ngày
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Tháng (+1 vì tháng bắt đầu từ 0)
    const year = now.getFullYear(); // Năm
  
    return `${hours}:${minutes} ${date}/${month}/${year}`;
  };

  handleLockCus = async (data) => {
    // const result = await Swal.fire({
    //   title: 'Bạn có chắc muốn khóa người dùng?',
    //   text: "Sau khi khóa, người dùng sẽ không thể truy cập vào tài khoản của họ.",
    //   icon: 'warning',
    //   showCancelButton: true,
    //   confirmButtonColor: '#3085d6',
    //   cancelButtonColor: '#d33',
    //   confirmButtonText: 'Khóa'
    // });

    // if (result.isConfirmed) {
    //   await this.props.deleteUser({
    //     CusUser: data,
    //     CusStatus: 0
    //   });
    //   Swal.fire(
    //     'Đã khóa!',
    //     'Người dùng đã bị khóa.',
    //     'success'
    //   );
    // }
  };
  handleIsOpenDetail= () => {
    this.setState({
      isOpenModel: !this.state.isOpenModel,
    });
  };
  handleOpenDetail=async(data)=>{
    await this.props.fetchoOrderdetailStart(data)
    this.setState({
        isOpenModel:true
    })
  }
  handleStatusChange = async(e, orderId,OrderPosition) => {
    const newStatus = e.target.value;
    console.log("check OrderPosition ", OrderPosition);
    
    if(newStatus>=OrderPosition){
      await this.props.updateOrder({
        OrderID: orderId,
        OrderStatus: newStatus,
      });
      this.loadData()
    }else{
      toast.error("Không thể thay đổi trạng thái đơn hàng đơn hàng ");
      return
    }
    // Gửi hành động cập nhật trạng thái
    
  
  };
   parseDate = (dateString) => {
    const [time, date] = dateString.split(" ");
    const [hours, minutes] = time.split(":").map(Number);
    const [day, month, year] = date.split("/").map(Number);
  
    // Tạo đối tượng Date
    return new Date(year, month - 1, day, hours, minutes);
  };
  handleDeleteOrder=async(OrderID)=>{
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
          this.loadData()
          Swal.fire(
            'Đã hủy!',
            'Đơn hàng đã bị hủy.',
            'success'
          );
        }

  }
  render() {
    const { allcustomer, currentPage, usersPerPage, searchTerm, isOpenSearch, filterStatus,loading } = this.state;
    //loading
    if (loading) {
      return (
        <div className="loading-container">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    }
    // Cấu hình Fuse.js
    const fuseOptions = {
      keys: ["OrderCustomer"],
      threshold: 0.3,
    };

    const fuse = new Fuse(allcustomer, fuseOptions);

    // Dữ liệu lọc qua Fuse.js
    const filteredUsers = searchTerm
      ? fuse.search(searchTerm).map((result) => result.item)
      : allcustomer;

    // Lọc người dùng theo trạng thái (Đã khóa/Đang hoạt động)
    const filteredByStatus = filteredUsers.filter((user) => {
      if (filterStatus === "all") {
        return true; // Không lọc
      }
      return user.OrderStatus.toString() === filterStatus;
    });

    // Tính toán dữ liệu cho trang hiện tại
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredByStatus.slice(indexOfFirstUser, indexOfLastUser);

    // Tạo các nút phân trang
    const totalPages = Math.ceil(filteredByStatus.length / usersPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  
    return (
      <React.Fragment>
        <OrderDetail
                  isOpen={this.state.isOpenModel}
                  OrderDetail={this.state.OrderDetail}
                  handleIsOpenDetail={this.handleIsOpenDetail}
                  
                />
        <div className="header container">
          <div className="header-icon">
            <button
              className="btn btn-danger"
              id="search-icon"
              onClick={this.changeInputOpen}
            >
              Tìm Kiếm
            </button>
          </div>
          {/* Thêm Select Box để chọn trạng thái */}
          <div className="filter-status">
            <select
              value={filterStatus}
              onChange={(even) => this.setState({ filterStatus: even.target.value ,currentPage: 1 })}
            >
              <option value="all">Tất cả</option>
              <option value="0">Chưa xác nhận</option>
                <option value="1">Đã xác nhận</option>
                <option value="2">Đang giao</option>
                <option value="3">Đã giao</option>
            </select>
          </div>

          <div className={isOpenSearch ? "search-box active" : "search-box"}>
            <input
              type="search"
              placeholder="Search Here...."
              value={searchTerm}
              onChange={this.handleSearchInputChange}
            />
          </div>
        </div>
      
        <div className="all_table container" onClick={this.changeInputClose}>
          <table className="table">
            <thead>
              <tr>
                <th>Invoice Code</th>
                <th>User name</th>
                <th>Ordering Time</th>
                <th>Address</th>
                <th>Phone Number</th>
                <th>Total amount</th>
                <th>Payment</th>
                <th>Note</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((item, index) => (
                <tr key={index}>
                  <td>{item.OrderID}</td>
                  <td>{item.OrderCustomer}</td>
                  <td>{item.OrderDate}</td>
                  <td>{item.OrderAdd}</td>
                  <td>{item.OrderPhone}</td>
                  <td>{item.OderAllPrice}</td>
                  <td>{item.PayID ==1 ? "Trực tiếp":"Online"}</td>
                  <td>{item.OrderNote}</td>
                  <td className="ma">
                    <select
                        value={item.OrderStatus}
                        onChange={(e) => this.handleStatusChange(e, item.OrderID, item.OrderPosition)}
                    >
                        <option  value="0">Chưa xác nhận</option>
                        <option  value="1">Đã xác nhận</option>
                        <option  value="2">Đang giao</option>
                        <option  value="3">Đã giao</option>
                    </select>
                    </td>
                    
                  <td>
                    <div className="circle_icon mt-3">
                        <p onClick={()=>{this.handleOpenDetail(item.OrderID)}}>Xem hóa đơn</p>
                        {this.parseDate(item.OrderShipDate) < this.parseDate(this.getCurrentTimeFormatted(0)) &&item.OrderStatus!==3 ? (
 <p onClick={() => this.handleDeleteOrder(item.OrderID)}>Hủy</p>
  
) : (
  ""
)}
                        
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            <div className="next_page">
              {pageNumbers.map((number) => (
                <button
                  key={number}
                  className={`btn_ ${number === currentPage ? "btn_primary" : "btn_light"}`}
                  onClick={() => this.handlePageChange(number)}
                >
                  {number}
                </button>
              ))}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allcustomer: state.cart.Order,
    OrderDetail:state.cart.OrderDetail
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrderrStart: (data) => dispatch(actions.fetchOrderrStart(data)),
    fetchoOrderdetailStart: (data) => dispatch(actions.fetchoOrderdetailStart(data)),
    updateOrder: (data) => dispatch(actions.updateOrder(data)),
    
    deleteOrderError: (data) => dispatch(actions.deleteOrderError(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderManage);
