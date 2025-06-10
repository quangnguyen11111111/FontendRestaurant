import React, { Component } from "react";
import { connect } from "react-redux";
import Fuse from "fuse.js";
import * as actions from "../../../store/actions";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CustomerManege.scss";
import Swal from 'sweetalert2';

class CustomerManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allcustomer: [],
      isOpenSearch: false,
      currentPage: 1,
      usersPerPage: 7,
      searchTerm: "",
      filterStatus: "all", // Trạng thái lọc
      loading: false,
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
        if (a.CusStatus === b.CusStatus) return 0;
        return a.CusStatus === 0 ? 1 : -1;
      });

      this.setState({
        allcustomer: sortedCustomers,
      });
    }
  }


  componentDidMount() {
    this.setState({ loading: true });  // Bắt đầu loading
    this.props.fetchAllCustomerStart()
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

  handleUnLockCus = async (data) => {
    const result = await Swal.fire({
      title: 'Bạn có chắc muốn mở khóa người dùng?',
      text: "Sau khi mở khóa, người dùng sẽ có thể truy cập vào tài khoản của họ.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Mở khóa'
    });

    if (result.isConfirmed) {
      await this.props.deleteUser({
        CusUser: data,
        CusStatus: 1
      });
      Swal.fire(
        'Mở khóa!',
        'Người dùng đã được mở khóa.',
        'success'
      );
    }
  };

  handleLockCus = async (data) => {
    const result = await Swal.fire({
      title: 'Bạn có chắc muốn khóa người dùng?',
      text: "Sau khi khóa, người dùng sẽ không thể truy cập vào tài khoản của họ.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Khóa'
    });

    if (result.isConfirmed) {
      await this.props.deleteUser({
        CusUser: data,
        CusStatus: 0
      });
      Swal.fire(
        'Đã khóa!',
        'Người dùng đã bị khóa.',
        'success'
      );
    }
  };

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
      keys: ["CusUser", "CusName", "CusPhone", "CusAdd", "CusMail", "CusStatus"],
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
      return user.CusStatus.toString() === filterStatus;
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
              onChange={(e) => this.setState({ filterStatus: e.target.value ,currentPage: 1 })}
            >
              <option value="all">Tất cả</option>
              <option value="1">Đang hoạt động</option>
              <option value="0">Đã khóa</option>
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
                <th>Account</th>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th>Email</th>
                <th>Status</th>
                <th>User Lock</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((item, index) => (
                <tr key={index}>
                  <td>{item.CusUser}</td>
                  <td>{item.CusName}</td>
                  <td>{item.CusPhone}</td>
                  <td>{item.CusAdd}</td>
                  <td>{item.CusMail}</td>
                  <td>{item.CusStatus === 1 ? "Đang hoạt động" : "Đã khóa"}</td>
                  <td>
                    <div className="circle_icon mt-1">
                      <i
                        className={item.CusStatus === 1 ? "fas fa-circle green" : "fas fa-circle"}
                        onClick={() => this.handleUnLockCus(item.CusUser)}
                      ></i>
                      <i
                        className={item.CusStatus === 0 ? "fas fa-circle red" : "fas fa-circle"}
                        onClick={() => this.handleLockCus(item.CusUser)}
                      ></i>
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
    allcustomer: state.admin.allcustomer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllCustomerStart: () => dispatch(actions.fetchAllCustomerStart()),
    deleteUser: (data) => dispatch(actions.deleteUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerManage);
