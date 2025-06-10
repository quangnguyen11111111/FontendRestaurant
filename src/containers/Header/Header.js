import React, { Component } from "react";
import { connect } from "react-redux";
import { languages } from "../../utils";
import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { userMenu } from "./menuApp";
import "./Header.scss";
import { withRouter } from "react-router-dom";
import { path } from "../../utils";
import { changeLanguageApp } from "../../store/actions";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opendetail: false,
      isMenuOpen: false, // Trạng thái menu mở
    };
  }

  changeLangues = (lang) => {
    this.props.changeLanguageApp(lang);
  };

  handleNavigateToUser = () => {
    let { history } = this.props;
    history.push(path.HOMEPAGE);
  };

  processLogout1 = async () => {
    const { processLogout } = this.props;
    await processLogout();
    this.props.history.push(path.HOMEPAGE);
  };

  toggleMenu = () => {
    this.setState((prevState) => ({
      isMenuOpen: !prevState.isMenuOpen,
    }));
  };

  render() {
    let language = this.props.language;
    const { isMenuOpen } = this.state;

    return (
      <div className="header-container">
        {/* thanh navigator */}
        <div
          className={`header-tabs-container ${isMenuOpen ? "menu-open" : ""}`}
        >
          <Navigator menus={userMenu} />
        </div>

        <div className="lang">
          <span className="btn btn-logout" onClick={this.handleNavigateToUser}>
            View Customer
          </span>
        </div>

        {/* Icon mở menu */}
        <div className="menu-toggle-icon" onClick={this.toggleMenu}>
          <i className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"}`}></i>
        </div>

        {/* nút logout */}
        <div className="btn btn-logout" onClick={this.processLogout1} title="Log out">
          <i className="fas fa-sign-out-alt"></i>
        </div>
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
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguageApp: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
