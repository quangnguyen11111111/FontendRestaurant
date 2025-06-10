import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./allModal.scss";
import { CommonUtils, manageActions } from "../../../utils";
class ModalFood extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FoodID: "",
      FoodName: "",
      FoodPic: "",
      CatID: "",
      FoodPrice: "",
      FoodInfo: "",
      FoodSale: 0,
      action: manageActions.ADD,
      imgUpload: "",
      categories:this.props.categories,
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
    if (prevProps.food !== this.props.food) {
      const { food } = this.props;
      if (food) {
        let imageBase64 = "";
        if (food.FoodPic) {
          imageBase64 = `data:image/png;base64,${new Buffer(
            food.FoodPic,
            "base64"
          ).toString("base64")}`;
        }
        this.setState({
          FoodID: food.FoodID,
          FoodName: food.FoodName,
          FoodPic: "",
          CatID: food.CatID,
          FoodPrice: food.FoodPrice,
          FoodInfo: food.FoodInfo,
          FoodSale: food.FoodSale,
          action: manageActions.EDIT,
          imgUpload: imageBase64,
          
        });
      }
    }
    
  }
  toggle = () => {
    this.props.handleIsOpenModle();
    this.setState({
      FoodName: "",
      FoodPic: "",
      CatID: "",
      FoodPrice: "",
      FoodInfo: "",
      FoodSale: "",
      action: manageActions.ADD,
      imgUpload: "",
    });
  };
  handelOnChangInput = (event, id) => {
    let copyState = { ...this.state };
    let value = event.target.value;
  
    if (id === "FoodSale" && value > 50) {
      alert("Giảm giá không được vượt quá 50%");
      value = 50; // Giới hạn giá trị giảm giá
    }
    if (id === "FoodSale" && value < 0) {
      alert("Giảm giá không được thấp hơn 0%");
      value = 0; // Giới hạn giá trị giảm giá
    }
  
    copyState[id] = value;
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
        FoodPic: `0x${base64}`,
      });
    }
  };
  checkvalidateInput1 = () => {
    let isValue = true;
    const arrInput = [
      `FoodName`,
      `CatID`,
      `FoodPrice`,
      `FoodInfo`,
      `FoodPic`,
      `FoodSale`,
    ];
    const arrInputVI = [
      `Name Food`,
      `Category`,
      `Food Price`,
      `Image Food`,
      `Sale`,
    ];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValue = false;
        alert("Không được bỏ trống " + arrInputVI[i]);
        break;
      }
    }
    return isValue;
  };

  createFood = () => {
    let check = this.checkvalidateInput1();
    if (!check) return;
    let data = {
      FoodName: this.state.FoodName,
      FoodPic: this.state.FoodPic,
      CatID: this.state.CatID,
      FoodPrice: this.state.FoodPrice,
      FoodInfo: this.state.FoodInfo,
      FoodSale: this.state.FoodSale,
    };
    this.props.createFood(data);
    this.setState({
        FoodName: "",
        FoodPic: "",
        CatID: "",
        FoodPrice: "",
        FoodInfo: "",
        FoodSale: "",
        action: manageActions.ADD,
        imgUpload: "",
      });
  };

  editFood = () => {
    let Food = {
      FoodID: this.state.FoodID,
      FoodName: this.state.FoodName,
      FoodPic: this.state.FoodPic,
      CatID: this.state.CatID,
      FoodPrice: this.state.FoodPrice,
      FoodInfo: this.state.FoodInfo,
      FoodSale: this.state.FoodSale,
    };

    this.props.editFood(Food);
    this.setState({
        FoodName: "",
        FoodPic: "",
        CatID: "",
        FoodPrice: "",
        FoodInfo: "",
        FoodSale: "",
        action: manageActions.ADD,
        imgUpload: "",
      });
  };
  render() {
    let { FoodName, FoodSale, FoodPrice, FoodPic, FoodInfo, CatID, action } =
      this.state;
      let arr = this.state.categories
      console.log("cehck cate",arr);
      console.log("cehck cate1",this.state.categories);
      
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={this.toggle}
        centered
        scrollable={false}
      >
        <ModalHeader toggle={this.toggle}>
          {action === manageActions.ADD
            ? "Create Categories"
            : "Edit Categories"}
        </ModalHeader>
        <ModalBody>
          <div className="row">
            <div className="form-group col-md-12">
              <label htmlFor="FoodName">Name Food</label>
              <input
                type="text"
                className="form-control"
                name="FoodName"
                id="FoodName"
                value={FoodName}
                placeholder="Nhập FoodName"
                onChange={(event) => {
                  this.handelOnChangInput(event, "FoodName");
                }}
              />
            </div>

            <div className="form-group col-md-12">
              <label htmlFor="FoodPrice">Food Price</label>
              <input
                type="number"
                className="form-control"
                name="FoodPrice"
                id="FoodPrice"
                value={FoodPrice}
                placeholder="Nhập giá thực phẩm"
                onChange={(event) => {
                  this.handelOnChangInput(event, "FoodPrice");
                }}
              />
            </div>

            <div className="form-group col-md-12">
              <label htmlFor="FoodSale">Food Sale</label>
              <input
                type="number"
                className="form-control"
                name="FoodSale"
                id="FoodSale"
                value={FoodSale}
                placeholder="Nhập khuyến mãi (%)"
                onChange={(event) => {
                  this.handelOnChangInput(event, "FoodSale");
                }}
              />
            </div>

            <div className="form-group col-md-12">
              <label htmlFor="FoodCategory">Category</label>
              <select
                className="form-control"
                name="CatID"
                id="CatID"
                value={CatID}
                onChange={(event) => {
                  this.handelOnChangInput(event, "CatID");
                }}
              >
                {arr &&
              arr.length > 0 &&
              arr.map((item, index) => {
                
                return (
                    <option value={item.CatID} key={index}>{item.CatName}</option>
                );
              })}
              </select>
            </div>

            <div className="form-group col-md-12">
              <label htmlFor="FoodDescription">Food Description</label>
              <textarea
                className="form-control"
                name="FoodInfo"
                id="FoodInfo"
                value={FoodInfo}
                placeholder="Nhập mô tả về món ăn"
                onChange={(event) => {
                  this.handelOnChangInput(event, "FoodInfo");
                }}
              />
            </div>

            <div className="form-group col-md-12">
              <label htmlFor="FoodPic">Image food</label>
              <div className="d-flex">
                <input
                  type="file"
                  id="upIMG"
                  hidden
                  name="FoodPic"
                  onChange={(event) => {
                    this.handleOnChangeImg(event);
                  }}
                />
                <label htmlFor="upIMG" className="btn btn_down_image">
                  <span>Tải ảnh</span>
                  <i className="fas fa-upload"></i>
                </label>

                <div className="fix_image">
                  <img
                    className="block_image"
                    src={this.state.imgUpload}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          {action === manageActions.ADD ? (
            <Button className="btn btn-danger " onClick={this.createFood}>
              Create
            </Button>
          ) : (
            <Button className="btn btn-danger " onClick={this.editFood}>
              Update
            </Button>
          )}

          <Button className="btn btn-danger color_1 " onClick={this.toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default connect()(ModalFood);
