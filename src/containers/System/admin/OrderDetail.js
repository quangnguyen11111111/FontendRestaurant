import React, { Component } from "react";
import { connect } from "react-redux";
import './OrderDetail.scss';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import * as actions from "../../../store/actions";
class OrderDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            OrderDetail:[]
        };
      }
      componentDidMount() {
       
      }
      componentDidUpdate(prevProps) {
        if (prevProps.OrderDetail !== this.props.OrderDetail) {
            
            this.setState({
                OrderDetail: this.props.OrderDetail,
            });
          }
      }
    toggle = () => {
        this.props.handleIsOpenDetail();}
  render() {
        let {OrderDetail}=this.state
        
    return (

          <Modal isOpen={this.props.isOpen} toggle={this.toggle} centered>
          <ModalHeader toggle={this.toggle} >Order Detail</ModalHeader>
          <ModalBody>
          <div class="food-order-container">

<table class="food-order-table">
  <thead>
    <tr>
      <th>Food Name</th>
      <th>Quantity</th>
      <th>Size</th>
      <th>Price</th>
    </tr>
  </thead>
  <tbody>
    {
        OrderDetail.map((item,index)=>{
            return (
<tr>
      <td>{item.FoodName}</td>
      <td>{item.OrdQuantity}</td>
      <td>{item.foodsize.SizeName}</td>
      <td>{item.OrdPrice}</td>
      
    </tr>
            );
        })
    }
    
    
  </tbody>
</table>
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
  return {
 
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);
