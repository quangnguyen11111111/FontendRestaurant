import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../store/actions";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDataLoaded: false, // Trạng thái chờ dữ liệu từ Redux
    };
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.isLoggedIn !== this.props.isLoggedIn ||
      prevProps.lv !== this.props.lv
    ) {
      // Cập nhật trạng thái khi dữ liệu Redux thay đổi
      this.setState({ isDataLoaded: true });
    }
  }

  render() {
    const { isLoggedIn, lv } = this.props;
    const { isDataLoaded } = this.state;

    console.log("check lv and isLoggedIn", lv, isLoggedIn);

    // Nếu chưa load xong dữ liệu, chờ
    if (!isDataLoaded) {
      return <div>Loading...</div>;
    }

    // Kiểm tra trạng thái và quyền để chuyển hướng
    let linkToRedirect = "/home"; // Mặc định là trang chủ

    if (isLoggedIn) {
      if (lv === 1) {
        linkToRedirect = "/system"; // Admin level 1
      } else {
        linkToRedirect = "/home"; // Quyền không hợp lệ
      }
    }

    return <Redirect to={linkToRedirect} />;
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn, // Lấy trạng thái đăng nhập từ Redux
    lv: state.user.lv, // Lấy quyền (level) từ Redux
  };
};

export default connect(mapStateToProps)(Home);
