import React, { Component } from "react";
import { connect } from "react-redux";
import './FoodDetail.scss';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class FoodDetail extends Component {
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
          imgUpload: ""
        };
      }
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
              imgUpload: imageBase64,
              
            });
          }
        }
        
      }
    toggle = () => {
        this.props.handleIsOpenDetail();}
  render() {
    let { FoodName, FoodSale, FoodPrice, FoodPic, FoodInfo, CatID,imgUpload } =
      this.state;
      let price = FoodPrice - (FoodSale*FoodPrice/100)
    return (
        
          <Modal isOpen={this.props.isOpen} toggle={this.toggle} centered>
          <ModalHeader toggle={this.toggle} >Food Detail</ModalHeader>
          <ModalBody>
            <div class="food-container ">
        <div class="food-details">
            <div class="food-image">
              <h1 class="food-title">{FoodName}</h1>
                <img src={imgUpload} alt="Hình ảnh món ăn"/>
            </div>
            
        </div><div class="food-info">
                
                <p class="food-price">Giảm {FoodSale} %</p>
                <h3 class="food-title">Giá gốc { price} VND</h3>
                <p class="food-price">Giá bán {price +  " VND"}</p>
            </div>
        <div class="food-detail-info">
            <h2>Chi tiết món ăn</h2>
            <p>{FoodInfo}</p>
        </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button className="btn btn-danger color_1" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(FoodDetail);
