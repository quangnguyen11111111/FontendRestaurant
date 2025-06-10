import React, { Component } from "react";
import { connect } from "react-redux";
import home from "../../../assets/home.png";
import "../style/home.scss";
import "../style/base.scss";
class HomeSection extends Component {
  render() {
    return (
      <div className="">
        {" "}
        <section className="home" id="home">
          <div className="home-content container">
            <div className="home-text">
              <h1>
                Hamburger<br/>
                thơm ngon
              </h1>
              <p>Bạn có muốn có những món ăn nóng hổi thơm ngon</p>
              <h3>Xem ngay menu</h3>
              <a href="/menupage" className="btn">
                Menu
              </a>
            </div>

            <img src={home} alt="" className="home-img" />
          </div>
          <div className="home-mask"></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeSection);
