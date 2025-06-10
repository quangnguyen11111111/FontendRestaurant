import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./allModal.scss";
import {CommonUtils, manageActions} from "../../../utils"
class ModalCategories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      CatID:"",
      CatName: "",
      CatPic: "",
      action: manageActions.ADD,
      imgUpload: "",
    };
  }
  // componentDidUpdate(prevProps) {
  //   if (prevProps.editCat !== this.props.editCat) {
  //     let data = this.props.editCat;
  //     console.log("check Cat", data);
      
  //     let imageBase64 = '';
  //   if (data.image) {
      
  //      imageBase64 = new Buffer(data.image, 'base64').toString('binary');
  //   }
  //    this.setState({
  //     CatName: data.CatName,
  //     CatPic: "",
  //     action: manageActions.EDIT,
  //     imgUpload:imageBase64
  //   });

  //   }
  // }
  componentDidUpdate(prevProps) {
    if (prevProps.category !== this.props.category) {
      const { category } = this.props;
      if (category) {
        let imageBase64 = "";
                if (category.CatPic) {
                  imageBase64 = `data:image/png;base64,${new Buffer(
                    category.CatPic,
                    "base64"
                  ).toString("base64")}`; 
                }
        this.setState({
          CatName: category.CatName,
          action: manageActions.EDIT,
          CatID:category.CatID,
          CatPic:"",
          imgUpload:imageBase64
        });
      }
    }
  }
  toggle = () => {
    this.props.handleIsOpenModle();
    this.setState({
      CatID:"",
      CatName: "",
      CatPic: "",
      action: manageActions.ADD,
      imgUpload: "",
    })
  };
  handelOnChangInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };
  handleOnChangeImg = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objURL = URL.createObjectURL(file);
      this.setState({
        imgUpload: objURL,
        CatPic: `0x${base64}`,
      });
    }
  };
  checkvalidateInput1 = () => {
    let isValue = true;
    const arrInput = [`CatName`, `CatPic`];
    const arrInputVI = [`Name Categories`,`Image`]
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValue = false;
        alert("Không được bỏ trống "+ arrInputVI[i])
        break;
      }
    }
    return isValue;
  };

  createCat=()=>{
    let check = this.checkvalidateInput1();
    if (!check) return;
    let data={
      CatName: this.state.CatName,
      CatPic: this.state.CatPic
    }
    this.props.createCategories(data);
    this.setState({
      CatID:"",
      CatName: "",
      CatPic: "",
      action: manageActions.ADD,
      imgUpload: "",
    })
  }

  editCat=()=>{
    let Cat={
      CatName: this.state.CatName,
      CatPic: this.state.CatPic,
      CatID:this.state.CatID
    }
    console.log("check cat", Cat.CatPic);
    console.log("check cat sate", this.state.CatPic);
    console.log("check cat sate", this.state.imgUpload);
    
    this.props.editCategories(Cat);
    this.setState({
      CatID:"",
      CatName: "",
      CatPic: "",
      action: manageActions.ADD,
      imgUpload: "",
    })
  }
  render() {
    let { CatName,action } = this.state;
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={this.toggle}
        centered
        scrollable={false}
      >
        <ModalHeader toggle={this.toggle}>{action===manageActions.ADD?"Create Categories":"Edit Categories"}</ModalHeader>
        <ModalBody>
          <div className="row">
            <div className="form-group col-md-12">
              <label htmlFor="CatName">Name Categories</label>
              <input
                type="text"
                className="form-control "
                name="CatName"
                id="Catname"
                value={CatName}
                placeholder="Nhap name categories"
                onChange={(event) => {
                  this.handelOnChangInput(event, "CatName");
                }}
              />
            </div>
            <div className="form-group col-md-12">
              <label htmlFor="">Image categories</label>
              <div className="d-flex">
                <input
                  type="file"
                  id="upIMG"
                  hidden
                  name="CatPic"
                  onChange={(event) => {
                    this.handleOnChangeImg(event);
                  }}
                />
                <label
                  htmlFor="upIMG"
                  className="btn btn_down_image"
                >
                  <span>Tải ảnh</span>
                <i className="fas fa-upload"></i>
                </label>
                
                 <div className="fix_image">
                 <img className="block_image" src={this.state.imgUpload} alt="" />
                 </div>
                
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
        {action===manageActions.ADD? 
         <Button className="btn btn-danger " onClick={this.createCat}>Create</Button>:  
        <Button className="btn btn-danger " onClick={this.editCat}>Update</Button>}
        
          <Button className="btn btn-danger color_1 " onClick={this.toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default connect()(ModalCategories);
