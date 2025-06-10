import React, { Component } from "react";
import { connect } from "react-redux";
import "../style/item.scss";
import "../style/base.scss";
import { toast } from 'react-toastify';
import * as actions from "../../../store/actions";
import {path } from "../../../utils";
import { withRouter } from "react-router-dom";
class FeatureItemsSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrFoodSaleAll: [],
      currentPage: 1, // page mặc định là 1
      usersPerPage: 9, // số lượng sản phẩm trên 1 page
    };
    
  }
  handelDetailFood = async (food)=>{
    this.props.history.push(path.DETAILPAGE); 
    this.props.setSelectedFood (food)
    
  }
  componentDidMount() {
    this.props.getFoodSale();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.FoodSale !== this.props.FoodSale) {
      this.setState({
        arrFoodSaleAll: this.props.FoodSale,
      });
    }
  }
  handlePageChange = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
  };
    handleAddToCart=(food)=>{
      const {  addToCart ,loadCartItems} = this.props;

        addToCart(food,1,2);
        toast.success("Thêm vào giỏ hàng thành công")
    }
  render() {
    const { arrFoodSaleAll, currentPage, usersPerPage } = this.state;
    let arrFoodSale = arrFoodSaleAll.filter(item => item.category.CatStatus == 1);
    // Tính toán dữ liệu cho trang hiện tại
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = arrFoodSale.slice(indexOfFirstUser, indexOfLastUser);

    // Tạo các nút trang
    const totalPages = Math.ceil(arrFoodSale.length / usersPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    //lấy đường dẫn
    const currentPath = window.location.pathname;
    console.log("check path", currentPath);
    
    return (
      <React.Fragment>
        <section className="items" id="items">
          {/* <h2 className="heading container">Our Feature Items</h2> */}
          {currentPath != path.MENUPAGE && <h2 className="heading ">Discounted items</h2>}
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
                  <span className="sale">{item.category.CatStatus>0?"Sale "+ item.FoodSale + " %":""}</span>
                  <img src={imageBase64} alt="" />
                  <h2>{item.FoodName}</h2>
                  <div className="price">
                    <h3>Giá {price} VND</h3>
                    <p>{item.FoodPrice} VND</p>
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
    FoodSale: state.food.FoodSale,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFoodSale: () => dispatch(actions.fetchFoodSaleStart()),
    setSelectedFood :(data)=>dispatch(actions.setSelectedFood (data)),
    addToCart: (Food,quantity,size) => dispatch(actions.addToCart(Food,quantity,size)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(FeatureItemsSection));
