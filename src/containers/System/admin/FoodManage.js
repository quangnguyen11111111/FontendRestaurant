import React, { Component } from "react";
import { connect } from "react-redux";
import Fuse from "fuse.js";
import * as actions from "../../../store/actions";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CustomerManege.scss";
import Swal from 'sweetalert2';
// import {path } from "../../../utils";//chuyển trang
import ModalFood from "./ModalFood";
import FoodDetail from "./FoodDetail"
// import { withRouter } from "react-router-dom";//chuyển trang
class FoodManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Food: [],
      isOpenSearch: false,
      currentPage: 1,
      usersPerPage: 4,
      searchTerm: "",
      isOpenModel: false,
      isOpenModelDetail: false,
      filterStatus: "",
      filterCategory: "", // Thêm trạng thái lọc theo danh mục
      selectedFood: {},
      selectedCat: [],
      loading: false,
    };
  }
  //chuyển trang detail food
  handleViewFoodDetail = (food) => {
    // this.props.history.push(path.DETAIL, { state: { food } }); // chuyển trang bằng history
    this.setState({
      isOpenModelDetail: true,
      selectedFood: food,
    });
  };


  componentDidUpdate(prevProps) {
    if (prevProps.Food !== this.props.Food) {
      const sortedCustomers = [...this.props.Food].sort((a, b) => {
        if (a.FoodStatus === b.FoodStatus && a.category.CatStatus === b.category.CatStatus) return 0;
        return a.FoodStatus === 0 || a.category.CatStatus === 0 ? 1 : -1;
      });

      this.setState({
        Food: sortedCustomers,
      });
    }
    if (prevProps.categories !== this.props.categories) {
      const activeCategories = this.props.categories.filter(
        (category) => category.CatStatus === 1
      );

      this.setState({
        selectedCat: activeCategories,
      });
    }
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.props
      .getFood("ALL")
      .then(() => {
        this.setState({ loading: false });
      })
      .catch(() => {
        this.setState({ loading: false });
      });
    this.props.getCategories("ALL");
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
      title: "Bạn có chắc muốn mở khóa sản phẩm?",
      text: "Sau khi mở khóa, sản phẩm sẽ được hiển thị bên người dùng.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Mở khóa",
    });

    if (result.isConfirmed) {
      await this.props.deleteFood({
        FoodID: data.FoodID,
        CatID: data.CatID,
        FoodStatus: 1,
      });
      Swal.fire("Mở khóa!", "Sản phẩm đã được mở khóa.", "success");
    }
  };

  handleLockCus = async (data) => {
    const result = await Swal.fire({
      title: "Bạn có chắc muốn khóa sản phẩm?",
      text: "Sau khi khóa, sản phẩm sẽ không hiển thị bên phía người dùng.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Khóa",
    });

    if (result.isConfirmed) {
      await this.props.deleteFood({
        FoodID: data.FoodID,
        CatID: data.CatID,
        FoodStatus: 0,
      });
      Swal.fire("Đã khóa!", "Sản phẩm đã bị khóa.", "success");
    }
  };

  handleIsOpenModle = () => {
    this.setState({
      isOpenModel: !this.state.isOpenModel,
    });
  };
  handleIsOpenModleDetail = () => {
    this.setState({
      isOpenModelDetail: !this.state.isOpenModelDetail,
    });
  };

  handleAddNewFood = () => {
    this.setState({
      isOpenModel: true,
    });
  };

  handleStatusFilterChange = (event) => {
    this.setState({
      filterStatus: event.target.value,
      currentPage: 1,
    });
  };

  handleCategoryFilterChange = (event) => {
    this.setState({
      filterCategory: event.target.value,
      currentPage: 1,
    });
  };

  handleEditFood = (food) => {
    this.setState({
      isOpenModel: true,
      selectedFood: food,
    });
  };

  editFood = (data) => {
    this.props.updateFood(data);
    this.setState({
      isOpenModel: false,
    });
  };

  createFood = async (data) => {
    await this.props.createFood(data);
    this.setState({
      isOpenModel: false,
    });
  };
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
  render() {
    const {
      currentPage,
      usersPerPage,
      searchTerm,
      isOpenSearch,
      filterStatus,
      filterCategory,
      loading,
      Food,
      selectedCat,
    } = this.state;

    if (loading) {
      return (
        <div className="loading-container">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    }

    const fuseOptions = {
      keys: ["FoodName"],
      threshold: 0.3,
    };
        //dữ liệu lọc qua fuse
    const fuse = new Fuse(Food, fuseOptions);
    const filteredUsers = searchTerm
      ? fuse.search(searchTerm).map((result) => result.item)
      : Food;
    //lọc theo trạng thái
    const filteredByStatus = filterStatus
      ? filterStatus === "0"
        ? filteredUsers.filter(
            (Food) =>
              Food.FoodStatus.toString() === filterStatus ||
              Food.category.CatStatus.toString() === filterStatus
          )
        : filteredUsers.filter(
            (Food) =>
              Food.FoodStatus.toString() === filterStatus &&
              Food.category.CatStatus.toString() === filterStatus
          )
      : filteredUsers;
          //lọc theo category
    const filteredByCategory = filterCategory
      ? filteredByStatus.filter((Food) => Food.CatID.toString() === filterCategory)
      : filteredByStatus;

    // Tính toán dữ liệu cho trang hiện tại
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredByCategory.slice(indexOfFirstUser, indexOfLastUser);
//tính toán nút phân trang
    const totalPages = Math.ceil(filteredByCategory.length / usersPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
      <React.Fragment>
         <ModalFood
          isOpen={this.state.isOpenModel}
          handleIsOpenModle={this.handleIsOpenModle}
          food={this.state.selectedFood}
          editFood={this.editFood}
          createFood = {this.createFood}
          categories={this.state.selectedCat}
        />
        <FoodDetail
        isOpen={this.state.isOpenModelDetail}
        handleIsOpenDetail={this.handleIsOpenModleDetail}
        food={this.state.selectedFood}
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
              onClick={this.handleAddNewFood}
            >
              Thêm sản phẩm
            </button>
            <div className="d_flex">
            <div className="filter-status">
          <select onChange={this.handleStatusFilterChange} value={filterStatus}>
            <option value="">Tất cả</option>
            <option value="1">Đang hoạt động</option>
            <option value="0">Đã khóa</option>
          </select>
            </div>
            <div className="filter-status">
            <select onChange={this.handleCategoryFilterChange} value={filterCategory}>
                <option value="">Tất cả danh mục</option>
                {selectedCat.map((cat) => (
                  <option key={cat.CatID} value={cat.CatID}>
                    {cat.CatName}
                  </option>
                ))}
              </select>
            </div>
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
                <th>Categories</th>
                <th>Picture</th>
                <th>Sale</th>
                <th>Status</th>
                <th>Detail</th>
                <th>Edit</th>
                <th>Lock</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((item, index) => {
                let imageBase64 = "";
                if (item.FoodPic) {    
                  imageBase64 = `data:image/png;base64,${ Buffer.from(
                    item.FoodPic,
                    "base64"
                  ).toString("base64")}`;
                }
                return (
                    <tr key={index}>
                        <td>{item.FoodName}</td>
                        <td>{item.category.CatName}</td>
                        <td><img src={imageBase64} alt="anh" /></td>
                        <td>{item.FoodSale == 0 ? "Không giảm" :`Giảm ${item.FoodSale}%`}</td>
                        <td>{item.FoodStatus === 1 && item.category.CatStatus===1 ? "Đang hoạt động" : "Đã khóa"}</td>
                        <td><i className="fas fa-tv"  onClick={() => this.handleViewFoodDetail(item)} ></i></td>
                        <td><i className="fas fa-user-edit" onClick={()=>{this.handleEditFood(item)}}></i></td>
                        <td>
                          <div className="circle_icon mt-1">
                            <i className={item.FoodStatus === 1 && item.category.CatStatus==1 ? "fas fa-circle green" : "fas fa-circle "} onClick={() => this.handleUnLockCus(item)}></i>
                            <i className={item.FoodStatus === 0 || item.category.CatStatus == 0? "fas fa-circle red" : "fas fa-circle "} onClick={() => this.handleLockCus(item)}></i>
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
    Food: state.food.Food,
    categories: state.food.categories
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteFood: (data) => dispatch(actions.deleteFood(data)),
    updateFood: (data) => dispatch(actions.updateFood(data)),
    createFood: (data) => dispatch(actions.createFood(data)),
    getFood: (data) => dispatch(actions.fetchFoodStart(data)),
    getCategories: (data) => dispatch(actions.fetchCategoriesStart(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FoodManage);//cần thêm withRouter(FoodMânge) ddeeer chuyển trang
