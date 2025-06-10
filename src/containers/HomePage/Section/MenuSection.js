import React, { Component } from "react";
import { connect } from "react-redux";
import feature from "../../../assets/feature-1.svg";
import "../style/menu.scss";
import "../style/base.scss";
class MenuSection extends Component {
  render() {
    return (
      <div className="">
        {" "}
        <section className="features container" id="featured">
          <div className="feature-box">
            <img src={feature} alt="" className="feature-img" />
            <div className="feature-text">
              <h3>Premium Material</h3>
              <p>Made from premium materials</p>
            </div>
          </div>
          <div className="feature-box">
            <img src={feature} alt="" className="feature-img" />
            <div className="feature-text">
              <h3>Fast Delivery</h3>
              <p>Receive goods in 45 minutes</p>
            </div>
          </div>
          <div className="feature-box">
            <img src={feature} alt="" className="feature-img" />
            <div className="feature-text">
              <h3>Timely Delivery</h3>
              <p>Professional & Friendly service</p>
            </div>
          </div>
          <div className="feature-box">
            <img src={feature} alt="" className="feature-img" />
            <div className="feature-text">
              <h3>Secure Payments</h3>
              <p>Car Parking</p>
            </div>
          </div>
        </section>{" "}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuSection);
