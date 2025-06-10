import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "./Login.scss";
import { Modal } from "reactstrap";
import { withRouter } from "react-router-dom";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isShowPass: false,
      userInfo: [],
      openRegister: false,
      CusUser: "",
      CusPass: "",
      CusName: "",
      CusPhone: "",
      CusAdd: "",
      CusMail: "",
      mess: "",
      edit: false,
    };
  }
  checkvalidateInput = () => {
    let isValue = true;
    const arrInput = ["email", "password"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValue = false;
        let messI = arrInput[i] == "email" ? "Account" : "Password";
        this.setState({
          mess: "Không được bỏ trống: " + messI,
        });
        break;
      }
    }
    return isValue;
  };
  checkvalidateInput1 = () => {
    let isValue = true;
    const arrInput = [`CusUser`, `CusPass`, `CusName`, `CusPhone`, `CusAdd`, `CusMail`];
    const arrInputVI = [`Account`,`Password`,"Name","PhoneNumber","Address","Email"]
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValue = false;
        alert("Không được bỏ trống "+ arrInputVI[i])
        break;
      }
    }
    return isValue;
  };

  resetValues = () => {
    this.setState({
      email: "",
      password: "",
      CusUser: "",
      CusPass: "",
      CusName: "",
      CusPhone: "",
      CusAdd: "",
      CusMail: "",
    });
  };
  componentDidUpdate(prevProps) {
    if (prevProps.userInfo !== this.props.userInfo) {
      this.setState({
        userInfo: this.props.userInfo,
        email: "",
        password: "",
      });
      console.log("1");
      
    }
  }

  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    copyState["mess"] = " ";
    this.setState({
      ...copyState,
    });
  };

  handleShowHidePass = () => {
    this.setState({
      isShowPass: !this.state.isShowPass,
    });
  };

  handleLogin = async () => {
    let check = this.checkvalidateInput();
    if (!check) return;
    await this.props.userLoginStart({
      email: this.state.email,
      password: this.state.password,
    });
  };
  handleRegiester = async () => {
    let check = this.checkvalidateInput1();
    if (!check) return;
    await this.props.createNewUser({
      CusUser: this.state.CusUser,
      CusPass: this.state.CusPass,
      CusName: this.state.CusName,
      CusPhone: this.state.CusPhone,
      CusAdd: this.state.CusAdd,
      CusMail: this.state.CusMail,
    });
    this.resetValues();
    this.setState({
      openRegister: !this.state.openRegister,
    });
  };
  toggle = () => {
    this.props.handleIsOpenModle();
    this.setState({
      openRegister: false,
      edit: false,
    });
  };
  handleChangeEdit = (data) => {
    this.setState({
      edit: !this.state.edit,
      CusPass:"hú hú",
      CusUser: data.CusUser,
      CusName: data.CusName,
      CusPhone:data.CusPhone,
      CusAdd:data.CusAdd,
      CusMail:data.CusMail,
    });
  };
  handleLogOut = async () => {
    await this.props.removeFromCartAll();
    await this.props.processLogout();
  };
  handleChangeRegister = async () => {
    this.setState({
      openRegister: !this.state.openRegister,
    });
  };
  handleEdit = async()=>{
    let check = this.checkvalidateInput1();
    if (!check) return;
    
    await this.props.editCustomer({
      CusUser: this.state.CusUser,
      CusName: this.state.CusName,
      CusPhone: this.state.CusPhone,
      CusAdd: this.state.CusAdd,
      CusMail: this.state.CusMail
    })
    this.resetValues();
    this.setState({
      edit:false
    })
  }
  render() {
    const {
      email,
      password,
      edit,
      userInfo,
      openRegister,
      CusUser,
      CusPass,
      CusName,
      CusPhone,
      CusAdd,
      CusMail,
    } = this.state;
    let { isLoggedIn } = this.props;
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={this.toggle}
        centered
        scrollable={false}
        className="login-modal"
      >
        {isLoggedIn && !openRegister ? (
          !edit ? (
            <div className="user-info">
              <p
                className="edit_cus"
                onClick={()=>this.handleChangeEdit(userInfo)}
                title="Edit"
              >
                <i className="fas fa-edit"></i>
              </p>
              <h2 className="welcome-text">Welcome, {userInfo.CusName}</h2>
              <p>Phone: {userInfo.CusPhone}</p>
              <p>Address: {userInfo.CusAdd}</p>
              <button className="btn btn-danger" onClick={this.handleLogOut}>
                Log Out
              </button>
            </div>
          ) : (
            <div className="login-container">
              <h2 className="login-title">Edit Now</h2>
              <div className="login-form">
                <div className="form-group">
                  <input
                    type="text"
                    id="CusName"
                    placeholder=" "
                    className="form-control"
                    value={CusName}
                    onChange={(event) =>
                      this.handleOnChangeInput(event, "CusName")
                    }
                  />
                  <label htmlFor="CusUser">Name</label>
                  <span className="icon">
                    <i className="fas fa-info"></i>
                  </span>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    id="CusPhone"
                    placeholder=" "
                    className="form-control"
                    value={CusPhone}
                    onChange={(event) =>
                      this.handleOnChangeInput(event, "CusPhone")
                    }
                  />
                  <label htmlFor="CusPhone">Phone Number</label>
                  <span className="icon">
                    <i className="fas fa-phone"></i>
                  </span>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    id="CusAdd"
                    placeholder=" "
                    className="form-control"
                    value={CusAdd}
                    onChange={(event) =>
                      this.handleOnChangeInput(event, "CusAdd")
                    }
                  />
                  <label htmlFor="CusAdd">Address</label>
                  <span className="icon">
                    <i className="fas fa-home"></i>
                  </span>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    id="CusMail"
                    placeholder=" "
                    className="form-control"
                    value={CusMail}
                    onChange={(event) =>
                      this.handleOnChangeInput(event, "CusMail")
                    }
                  />
                  <label htmlFor="CusMail">Email</label>
                  <span className="icon">
                    <i className="fas fa-envelope"></i>
                  </span>
                </div>

                <button className="btn-login" onClick={this.handleEdit}>
                  Update
                </button>

                <span className="edit_flex" onClick={this.handleChangeEdit}>
                  Quay lại
                </span>
              </div>
            </div>
          )
        ) : openRegister ? (
          <div className="login-container">
            <h2 className="login-title">Register Now</h2>
            <div className="login-form">
              <div className="form-group">
                <input
                  type="text"
                  id="CusUser"
                  placeholder=" "
                  className="form-control"
                  value={CusUser}
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "CusUser")
                  }
                />
                <label htmlFor="CusUser">Account</label>
                <span className="icon ">
                  <i className="fas fa-user"></i>
                </span>
              </div>

              <div className="form-group">
                <input
                  type={this.state.isShowPass ? "text" : "password"}
                  id="CusPass"
                  placeholder=" "
                  className="form-control"
                  value={CusPass}
                  name="CusPass"
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "CusPass")
                  }
                />
                <label htmlFor="password">Password</label>
                <span className="icon click">
                  <i
                    className={
                      this.state.isShowPass ? "fas fa-eye" : "fas fa-eye-slash"
                    }
                    onClick={this.handleShowHidePass}
                  ></i>
                </span>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  id="CusName"
                  placeholder=" "
                  className="form-control"
                  value={CusName}
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "CusName")
                  }
                />
                <label htmlFor="CusUser">Name</label>
                <span className="icon">
                  <i className="fas fa-info"></i>
                </span>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  id="CusPhone"
                  placeholder=" "
                  className="form-control"
                  value={CusPhone}
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "CusPhone")
                  }
                />
                <label htmlFor="CusPhone">Phone Number</label>
                <span className="icon">
                  <i className="fas fa-phone"></i>
                </span>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  id="CusAdd"
                  placeholder=" "
                  className="form-control"
                  value={CusAdd}
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "CusAdd")
                  }
                />
                <label htmlFor="CusAdd">Address</label>
                <span className="icon">
                  <i className="fas fa-home"></i>
                </span>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  id="CusMail"
                  placeholder=" "
                  className="form-control"
                  value={CusMail}
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "CusMail")
                  }
                />
                <label htmlFor="CusMail">Email</label>
                <span className="icon">
                  <i className="fas fa-envelope"></i>
                </span>
              </div>
              <button className="btn-login" onClick={this.handleRegiester}>
                Register
              </button>

              <span className="edit_flex" onClick={this.handleChangeRegister}>
                Quay lại Login
              </span>
            </div>
          </div>
        ) : (
          <div className="login-container">
            
            <h2 className="login-title">Login Now</h2>
            <div className="login-form">
              <div className="form-group">
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder=" "
                  className="form-control"
                  value={email}
                  onChange={(event) => this.handleOnChangeInput(event, "email")}
                />
                <label htmlFor="email">Account</label>
                <span className="icon">
                  <i className="fas fa-user"></i>
                </span>
              </div>

              <div className="form-group">
                <input
                  type={this.state.isShowPass ? "text" : "password"}
                  id="password"
                  placeholder=" "
                  name="password"
                  className="form-control"
                  value={password}
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "password")
                  }
                />
                <label htmlFor="password">Password</label>
                <span className="icon click">
                  <i
                    className={
                      this.state.isShowPass ? "fas fa-eye" : "fas fa-eye-slash"
                    }
                    onClick={this.handleShowHidePass}
                  ></i>
                </span>
              </div>
              <button className="btn-login" onClick={this.handleLogin}>
                Login
              </button>
              <p>{this.state.mess}</p>
              <p className="register">
                Nếu bạn chưa có tài khoản ấn vào đây{" "}
                <span onClick={this.handleChangeRegister}> register</span>
              </p>
            </div>
          </div>
        )}
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    userLoginStart: (data) => dispatch(actions.userLoginStart(data)),
    processLogout: () => dispatch(actions.processLogout()),
    removeFromCartAll: () => dispatch(actions.removeFromCartAll()),
    createNewUser: (data) => dispatch(actions.createNewUser(data)),
    editCustomer:(data)=>dispatch(actions.editCustomer(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
