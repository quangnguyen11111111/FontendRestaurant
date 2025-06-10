import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../HomePage/style/base.scss";
import TableUser from "./TableUser";
import * as actions from "../../../store/actions";
import Lightbox from "react-image-lightbox";
import {CommonUtils, manageActions} from "../../../utils"
import "react-image-lightbox/style.css";

class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrGender: [],
      imgUpload: "",
      isOpen: false,
      email:'',
      password:'',
      firstname:'',
      lastname:'',
      phonenumber:'',
      address:'',
      Position:'',
      RoleID:'',
      gender:'',
      image:'',
      action: manageActions.ADD,
      id:""
    };
  }
  componentDidMount() {
    this.props.getFirstName();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.fistname !== this.props.fistname) {
      this.setState({
        arrGender: this.props.fistname,
        email:'',
      password:'',
      firstname:'',
      lastname:'',
      phonenumber:'',
      address:'',
      Position:'',
      RoleID:'',
      gender:'',
      imgUpload:'',
      image:''
      });
    }
  }
  checkValidateInput=()=>{
    let check = true;
    let arrCheck = ['email','password','firstname','lastname','phonenumber','address','Position','RoleID','gender'];
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        check = false;
        alert("khong duoc bo trong "+ arrCheck[i]);
        break
      }
      
    } 
    return check;
  }
  handleOnChangeImg = async(event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file)
      let objURL = URL.createObjectURL(file);
      this.setState({
        imgUpload: objURL,
        image:base64
      });
    }
  };
  openImg = () => {
    if (this.state.imgUpload=="") return
    this.setState({
      isOpen: true,
    });
  };
  handelOnChangInput=(event,id)=>{
    let copyState = {...this.state}
    copyState[id]=event.target.value;
    this.setState({
      ...copyState
    })

  }
  handleSaveUser=async()=>{
    // let check = this.checkValidateInput();
    // if (!check) return
    // if (this.state.action === manageActions.ADD) {
    //    await this.props.createNewUser({
    //   email:this.state.email,
    //   password:this.state.password,
    //   firstname:this.state.firstname,
    //   lastname:this.state.lastname,
    //   phonenumber:this.state.phonenumber,
    //   address:this.state.address,
    //   Position:this.state.Position,
    //   RoleID:this.state.RoleID,
    //   gender:this.state.gender,
    //   image:this.state.image
      
    // })
    // }else{
    //   await this.props.editUser({
    //     id:this.state.id,
    //     email:this.state.email,
    //   firstname:this.state.firstname,
    //   lastname:this.state.lastname,
    //   phonenumber:this.state.phonenumber,
    //   address:this.state.address,
    //   Position:this.state.Position,
    //   RoleID:this.state.RoleID,
    //   gender:this.state.gender,
    //   image:this.state.image
    //   })
    //   this.setState({
    //     action:manageActions.ADD
    //   })
    // } 
     
    // this.props.getFirstName();
  }
  handleEditUser = async(data)=>{
    let imageBase64 = '';
    if (data.image) {
      
       imageBase64 = new Buffer(data.image, 'base64').toString('binary');
    }
    await this.setState({
      email:data.email,
      password:"data.password",
      firstname:data.firstname,
      lastname:data.lastname,
      phonenumber:data.phonenumber,
      address:data.address,
      Position:data.positionId,
      RoleID:data.roleId,
      gender:data.gender,
      action: manageActions.EDIT,
      id:data.id,
      image:"",
      imgUpload:imageBase64
    });
    
    
  }
  render() {
    let arrGender = this.state.arrGender;
    let {email,password,firstname,lastname,phonenumber,address,Position,RoleID,gender} = this.state;
    return (
      <React.Fragment>
        
        <div className="user-redux-container container">
          <div className="title">User Redux Quang</div>
          <div className="user-redux-body">
            <div className=" row">
              <div className="form-group col-md-6">
                <label htmlFor="email">email</label>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  id="email"
                  placeholder="Nhap email"
                  value={email}
                  onChange={(event)=>{this.handelOnChangInput(event,"email")}}
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="password">password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={(event)=>{this.handelOnChangInput(event,"password")}}
                />
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="firstname">firstname</label>
                <input
                  type="text"
                  className="form-control"
                  name="firstname"
                  placeholder="Nhap firstname"
                  value={firstname}
                  onChange={(event)=>{this.handelOnChangInput(event,"firstname")}}
                />
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="lastname">lastname</label>
                <input
                  type="text"
                  className="form-control"
                  name="lastname"
                  placeholder="Nhap lastname"
                  value={lastname}
                  onChange={(event)=>{this.handelOnChangInput(event,"lastname")}}
                />
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="phoneNumber">phone number</label>
                <input
                  type="text"
                  className="form-control"
                  name="phonenumber"
                  placeholder="Nhap phone number"
                  value={phonenumber}
                  onChange={(event)=>{this.handelOnChangInput(event,"phonenumber")}}
                />
              </div>
              <div className="form-group col-md-12">
                <label htmlFor="address">
                address
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  placeholder="Nhap address"
                  value={address}
                  onChange={(event)=>{this.handelOnChangInput(event,"address")}}
                />
              </div>
              <div className="form-group col-md-3">
                <label htmlFor="Position">Position</label>
                <select name="Position" value={Position} className="form-control " onChange={(event)=>{this.handelOnChangInput(event,"Position")}}>
                  <option value= "" >choose.....</option>
                  <option value="1">Khoa sản</option>
                </select>
              </div>
              <div className="form-group col-md-3">
                <label htmlFor="RoleID">RoleID</label>
                <select name="RoleID" value={RoleID} className="form-control " onChange={(event)=>{this.handelOnChangInput(event,"RoleID")}}>
                  <option value="">choose.....</option>
                  <option value="1">Bệnh nhân</option>
                </select>
              </div>
              <div className="form-group col-md-3">
                <label htmlFor="gender">Gender</label>
                <select name="gender" value={gender} className="form-control " onChange={(event)=>{this.handelOnChangInput(event,"gender")}}>
                  <option value="">choose.....</option>
                  {arrGender &&
                    arrGender.length > 0 &&
                    arrGender.map((item, index) => {
                      return (
                        <option value={item.gender}>
                          {item.gender == 1 ? "nam" : "nữ"}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="form-group col-md-3">
                <label htmlFor="">Ảnh đại diện</label>
                <div className="d-flex">
                  <input
                    type="file"
                    id="upIMG"
                    hidden
                    name="img"
                    onChange={(event) => {
                      this.handleOnChangeImg(event);
                    }}
                  />
                  <label
                    htmlFor="upIMG"
                    className="btn btn-danger mt-2 border d-flex align-items-center gap-1"
                  >
                    Tải ảnh <i className="fas fa-upload"></i>
                  </label>
                  <div
                    style={{
                      backgroundImage: `url(${this.state.imgUpload})`,
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "contain",
                      width: "150px",
                      height: "60px",
                    }}
                    onClick={() => this.openImg()}
                  ></div>
                </div>
              </div>
              <button className="btn btn-danger mt-3 col-1 py-3 " onClick={()=>{this.handleSaveUser()}}>{this.state.action === manageActions.ADD?"Save":"Update"}</button>
            </div>
          </div>
          {this.state.isOpen === true && (
            
              <Lightbox
                mainSrc={this.state.imgUpload}
                onCloseRequest={() => this.setState({ isOpen: false })}
                
              />
          )}
          <TableUser 
          handleEditUser={this.handleEditUser}
          />
        </div>
        
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    fistname: state.admin.firstname,
    create: state.admin.createUser
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFirstName: () => dispatch(actions.fetchGenderStart()),
    createNewUser:(data)=>dispatch(actions.createNewUser(data)),
    // editUser:(data)=>dispatch(actions.editUser(data))
    // processLogout: () => dispatch(actions.processLogout()),
    // changeLanguageApp: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
