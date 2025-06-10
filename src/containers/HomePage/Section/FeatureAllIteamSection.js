import React, { Component } from "react";
import { connect } from "react-redux";
import "../style/item.scss";
import "../style/base.scss";
import * as actions from "../../../store/actions";
import {path } from "../../../utils";
import Fuse from "fuse.js";
import { toast } from 'react-toastify';
import { withRouter } from "react-router-dom";
class FeatureAllIteamSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrFoodAll: [],
      currentPage: 1, // page mặc định là 1
      usersPerPage: 8, // số lượng sản phẩm trên 1 page
      loading:false,
      selectedCat:null,
      searchTerm: "",
    };
   
  }
  handelDetailFood = async (food)=>{
    this.props.history.push(path.DETAILPAGE); 
    this.props.setSelectedFood (food)
  }
  loadingdata=()=>{
    this.setState({ loading: true });
    this.props.getFood(this.props.selectedCat)
      .then(() => {
        this.setState({ loading: false });
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  }
  componentDidMount() {
    this.loadingdata()
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.Food !== this.props.Food) {
      this.setState({
        arrFoodAll: this.props.Food,
        currentPage:1
      });
    }
    if (prevProps.selectedCat !== this.props.selectedCat) {
      this.setState({
        selectedCat: this.props.selectedCat,
      });
      this.loadingdata();
    }
  }
  handlePageChange = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
  };
  handleSearchInputChange = (event) => {
    this.setState({
      searchTerm: event.target.value,
    });
  };
      handleAddToCart=(food)=>{
        const {  addToCart } = this.props;
  
          addToCart(food,1,2);
          toast.success("Thêm vào giỏ hàng thành công")
      }
  render() {
    const { arrFoodAll, currentPage, usersPerPage,loading,searchTerm } = this.state;
     // danh sách lọc
     const fuseOptions = {
      keys: ["FoodName"],
      threshold: 0.3,
    };
        //dữ liệu lọc qua fuse
    const fuse = new Fuse(arrFoodAll, fuseOptions);
    const filteredUsers = searchTerm
      ? fuse.search(searchTerm).map((result) => result.item)
      : arrFoodAll;
    let arrFood = filteredUsers.filter(item => item.category.CatStatus == 1 && item.FoodStatus == 1);
    // Tính toán dữ liệu cho trang hiện tại
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = arrFood.slice(indexOfFirstUser, indexOfLastUser);
   
    // Tạo các nút trang
    const totalPages = Math.ceil(arrFood.length / usersPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    //lấy đường dẫn
    const currentPath = window.location.pathname;
    console.log("check path", currentPath);
    //chờ load dữ liệu
    if (loading) {
      return (
        <div className="loading-container">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    }
    return (
      <React.Fragment>
        
        <section className="items" id="items">
        
          <div className="search-item">
            <input
              type="search"
              placeholder="Search Here...."
              value={this.state.searchTerm}
              onChange={this.handleSearchInputChange}
            />
          </div>
          {/* {currentPath != path.MENUPAGE && <h2 className="heading ">Our Feature Items</h2>} */}
          <div className="item-content container">
            {currentUsers.map((item, index) => {
              let imageBase64 = "";
              if (item.FoodPic) {
                imageBase64 = `data:image/jpeg;base64,${new Buffer(
                  item.FoodPic,
                  "base64"
                ).toString("base64")}`;
              }
              let price = item.FoodPrice-(item.FoodPrice*item.FoodSale/100)
              return (
                <div className="item-box" key={index}>
                  {item.FoodSale!=0 && <span className="sale">{"Sale "+ item.FoodSale + " %"}</span>}
                  
                  <img src={imageBase64} alt="" />
                  <h2>{item.FoodName}</h2>
                  <div className="price">
                    <h3>Giá {price} VND</h3>
                    {item.FoodSale!=0 && <p>{item.FoodPrice} VND</p>}
                    
                  </div>
                  <div className="action_btn">
                  <div className="a" onClick={()=>this.handelDetailFood(item)}>
                    Xem chi tiết
                  </div>
                  <div className="" onClick={()=>{this.handleAddToCart(item)}}>
                    <i className="fas fa-shopping-cart " title="Thêm vào giỏ hàng"></i>
                  </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="pagination">
            {pageNumbers.map((number) => (
              <span
                key={number}
                className={`btn_ ${
                  number === currentPage ? "btn_primary" : ""
                }`}
                onClick={() => this.handlePageChange(number)}
              >
                {number}
              </span>
            ))}
          </div>
        </section>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    Food: state.food.Food,
    selectedCat:state.food.selectedCat
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFood: (data) => dispatch(actions.fetchFoodStart(data)),
    setSelectedFood :(data)=>dispatch(actions.setSelectedFood (data)),
     loadCartItems: () => dispatch(actions.loadCartItems()),  // Gọi action loadCartItems
     addToCart: (Food,quantity,size) => dispatch(actions.addToCart(Food,quantity,size)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(FeatureAllIteamSection));
