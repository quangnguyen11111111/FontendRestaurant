import React, { Component } from "react";
import { connect } from "react-redux";
import "./style/FollowBill.scss";
import * as actions from "../../store/actions";
class DetailBill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      OrderDetail: [],
    };
  }

  componentDidMount() {
    if (this.props.OrderID) {
      this.props.fetchoOrderdetailStart(this.props.OrderID); // Fetch chi tiết hóa đơn
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.OrderDetail !== this.props.OrderDetail) {
      this.setState({
        OrderDetail: this.props.OrderDetail,
      });
    }
  }

  render() {
    let { OrderDetail } = this.state;
    return (
      <div className="detail-bill">
          {OrderDetail && OrderDetail.length > 0 ? (
            OrderDetail.map((item, index) => (
              <div key={index} className="scroll">
                <p>{item.FoodName}</p>
                <p>Số lượng: {item.OrdQuantity}</p>
                <p>Kích thước: {item.foodsize.SizeName}</p>
                <p>Giá: {item.OrdPrice} VNĐ</p>
              </div>
            ))
          ) : (
            <p>Không có dữ liệu chi tiết hóa đơn.</p>
          )}
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    OrderDetail: state.cart.OrderDetail,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchoOrderdetailStart: (orderId) => dispatch(actions.fetchoOrderdetailStart(orderId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailBill);
