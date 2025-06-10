import React, { Component } from "react";
import { connect } from "react-redux";
import Fuse from "fuse.js";
import * as actions from "../../../store/actions";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CustomerManege.scss";
import Swal from 'sweetalert2';
import ModalCategories from "./ModalCategories";

class CategoriesManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      isOpenSearch: false,
      currentPage: 1,
      usersPerPage: 4,
      searchTerm: "",
      isOpenModel: false,
      filterStatus: "", // Thêm trường trạng thái lọc
      selectedCategory:{},
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
    if (prevProps.categories !== this.props.categories) {
      const sortedCustomers = [...this.props.categories].sort((a, b) => {
        if (a.CatStatus === b.CatStatus) return 0;
        return a.CatStatus === 0 ? 1 : -1;
      });
  
      this.setState({
        categories: sortedCustomers,
      });
    }
  }

  componentDidMount() {
    this.setState({ loading: true });  // Bắt đầu loading
    this.props.getCategories("ALL")
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
      title: 'Bạn có chắc muốn mở khóa sản phẩm?',
      text: "Sau khi mở khóa, sản phẩm sẽ được hiển thị bên người dùng.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Mở khóa'
    });
  
    if (result.isConfirmed) {
      await this.props.deleteCategories({
        CatID: data,
        CatStatus: 1
      });
      this.props.getCategories("ALL")
      Swal.fire(
        'Mở khóa!',
        'Sản phẩm đã được mở khóa.',
        'success'
      );
    }
  };
  
  handleLockCus = async (data) => {
    const result = await Swal.fire({
      title: 'Bạn có chắc muốn khóa sản phẩm?',
      text: "Sau khi khóa, sản phẩm sẽ không hiển thị bên phía người dùng.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Khóa'
    });
  
    if (result.isConfirmed) {
      await this.props.deleteCategories({
        CatID: data,
        CatStatus: 0
      }); 
      this.props.getCategories("ALL")
      Swal.fire(
        'Đã khóa!',
        'Sản phẩm đã bị khóa.',
        'success'
      );
    }
  };

  handleIsOpenModle = () => {
    this.setState({
      isOpenModel: !this.state.isOpenModel,
    });
  };

  handleAddNewCat = () => {
    this.setState({
      isOpenModel: true,
    });
  };

  // Hàm xử lý lọc trạng thái
  handleStatusFilterChange = (event) => {
    this.setState({
      filterStatus: event.target.value,
      currentPage: 1,
    });
  };
  handleEditCategory = (category) => {
    this.setState({
      isOpenModel: true,
      selectedCategory: category, // Lưu dữ liệu của category được chọn
    });
  };
  editCategories = (data)=>{
    this.props.updateCategories(data);
    this.setState({
      isOpenModel: false,
    });
  }

  createCategories = async(data)=>{
   await this.props.createCategories(data);
    this.setState({
      isOpenModel: false,
    });
  }
  render() {
    const { categories, currentPage, usersPerPage, searchTerm, isOpenSearch, filterStatus, loading } =
      this.state;
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
      keys: [ `CatName`, `CatPic`, `CatStatus`],
      threshold: 0.3,
    };

    const fuse = new Fuse(categories, fuseOptions);

    // Dữ liệu lọc qua Fuse.js
    const filteredUsers = searchTerm
      ? fuse.search(searchTerm).map((result) => result.item)
      : categories;

    // Lọc theo trạng thái
    const filteredByStatus = filterStatus
      ? filteredUsers.filter((category) => category.CatStatus.toString() === filterStatus)
      : filteredUsers;

    // Tính toán dữ liệu cho trang hiện tại
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredByStatus.slice(indexOfFirstUser, indexOfLastUser);

    // Tạo các nút phân trang
    const totalPages = Math.ceil(filteredByStatus.length / usersPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
      <React.Fragment>
         <ModalCategories
          isOpen={this.state.isOpenModel}
          handleIsOpenModle={this.handleIsOpenModle}
          category={this.state.selectedCategory} 
          editCategories={this.editCategories}
          createCategories = {this.createCategories}
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
            <button
              className="btn btn-danger"
              id="search-icon"
              onClick={this.handleAddNewCat}
            >
              Thêm loại sản phẩm
            </button>
            <div className="filter-status">
          <select onChange={this.handleStatusFilterChange} value={filterStatus}>
            <option value="">Tất cả</option>
            <option value="1">Đang hoạt động</option>
            <option value="0">Đã khóa</option>
          </select>
        </div>
          </div>
          <div className={isOpenSearch ? "search-box active" : "search-box"}>
            <input
              type="search"
              placeholder="Search Here...."
              value={this.state.searchTerm}
              onChange={this.handleSearchInputChange}
            />
          </div>
        </div>

        

        <div className="all_table container" onClick={this.changeInputClose}>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Picture</th>
                <th>Status</th>
                <th>Edit</th>
                <th>Lock</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((item, index) => {
                let imageBase64 = "";
                if (item.CatPic) {    
                  imageBase64 = `data:image/png;base64,${new Buffer(
                    item.CatPic,
                    "base64"
                  ).toString("base64")}`;
                }
                return (
                    <tr key={index}>
                        <td>{item.CatName}</td>
                        <td><img src={imageBase64} alt="anh" /></td>
                        <td>{item.CatStatus === 1 ? "Đang hoạt động" : "Đã khóa"}</td>
                        <td><i className="fas fa-user-edit" onClick={()=>{this.handleEditCategory(item)}}></i></td>
                        <td>
                          <div className="circle_icon mt-1">
                            <i className={item.CatStatus === 1 ? "fas fa-circle green" : "fas fa-circle "} onClick={() => this.handleUnLockCus(item.CatID)}></i>
                            <i className={item.CatStatus === 0 ? "fas fa-circle red" : "fas fa-circle "} onClick={() => this.handleLockCus(item.CatID)}></i>
                          </div>
                        </td>
                    </tr>
                );
              })}
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
    categories: state.food.categories
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteCategories: (data) => dispatch(actions.deleteCategories(data)),
    updateCategories: (data) => dispatch(actions.updateCategories(data)),
    createCategories: (data) => dispatch(actions.createCategories(data)),
    getCategories: (data) => dispatch(actions.fetchCategoriesStart(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesManage);
