import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { languages, path } from "../../utils";
import { changeLanguageApp } from "../../store/actions";
import * as actions from "../../store/actions";
import { withRouter } from "react-router-dom";
import Login from "../Auth/Login";
import "./style/HomeHeader.scss";

class HomeHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenModel: false,
      Order:[]
    };
  }
   componentDidUpdate(prevProps) {
      if (prevProps.Order !== this.props.Order) {
       
          this.setState({
            Order:this.props.Order
            
          });
        }
        if (prevProps.userInfo !== this.props.userInfo && this.props.userInfo) {
          // Khi userInfo thay đổi và có giá trị, gọi fetchOrderrStart
          this.props.fetchOrderrStart(this.props.userInfo.CusID);
        }
      }
      
      
      
    
  changeLangues = (lang) => {
    this.props.changeLanguageApp(lang);
  };

  handleLogOut = async () => {
    await this.props.processLogout();
    console.log(this.props.isLoggedIn);
  };

  handleIsOpenModle = () => {
    this.setState({
      isOpenModel: !this.state.isOpenModel,
    });
  };

  handleLogin = () => {
    this.setState({
      isOpenModel: true,
    });
  };

  // handleNavigateToAdmin = () => {
  //   // const { lv, isLoggedIn, history } = this.props;

  //   // // Kiểm tra quyền truy cập
  //   // if (isLoggedIn && lv === 1) {
  //   //   history.push(path.SYSTEM); // Chuyển hướng đến trang admin
  //   // } else {
  //   //   alert("Bạn không có quyền truy cập trang admin!");
  //   // }
  //   this.props.history.push(path.DETAILPAGE) 
  // };
  componentDidMount() {

 }
  render() {
    let language = this.props.language;
    let { isLoggedIn, lv } = this.props;
    
    return (
      <div>
        <header>
          <Login
            isOpen={this.state.isOpenModel}
            handleIsOpenModle={this.handleIsOpenModle}
          />
          <div className="nav container">
            <a href="/home" className="logo">
              <div className="img"></div>
            </a>

            <div className="navbar">
              <a href="/home" className="nav-link">
                <FormattedMessage id="HOMEPAGE.home" />
              </a>
              <a href="/home#featured" className="nav-link">
                categories
              </a>
              <a href="/home#items" className="nav-link">
                foods sale
              </a>
              <a href="/menupage" className="nav-link">
                menu
              </a>
              <a href="/home#feedback" className="nav-link">
                feedback
              </a>
              {isLoggedIn && lv === 1 && (
              // <span className="nav-link" onClick={this.handleNavigateToAdmin}>
              //   admin
              // </span>
              <a href="/system" className="nav-link">
                Admin
              </a>
            )}
            </div>

            <div className="nav-icons" title="Tài khoản">
              <i className="fas fa-user" onClick={this.handleLogin}></i>

              <div className="cart" title="Giỏ hảng">
                <a href={path.CARTPAGE}>
                <i className="fas fa-shopping-bag"></i>
                <span>{this.props.CartItems.length}</span>
                
                </a>
              </div>
              <div className="cart" title="Đơn hàng">
                <a href={path.FOLLOWBILL}>
                <i className="fas fa-shipping-fast"></i>
                <span>{this.state.Order.filter(item => item.OrderStatus !== 3).length}</span>
                </a>
              </div>

              {/* <div
                className={
                  language === languages.VI
                    ? "changeLangues action"
                    : "changeLangues"
                }
              >
                <span onClick={() => this.changeLangues(languages.VI)}>VN</span>
              </div>
              <div
                className={
                  language === languages.EN
                    ? "changeLangues action"
                    : "changeLangues"
                }
              >
                <span onClick={() => this.changeLangues(languages.EN)}>EN</span>
              </div> */}
              <div className="menu-icon">
                <div className="line1"></div>
                <div className="line2"></div>
                <div className="line3"></div>
              </div>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    language: state.app.language,
    lv: state.user.lv,
    CartItems:state.cart.CartItems,
    Order:state.cart.Order,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageApp: (language) => dispatch(changeLanguageApp(language)),
    fetchOrderrStart: (data) => dispatch(actions.fetchOrderrStart(data))
  };
};

// Sử dụng withRouter để truy cập history
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HomeHeader));
