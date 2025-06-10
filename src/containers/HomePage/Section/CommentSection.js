import React, { Component } from "react";
import { connect } from "react-redux";
import { path } from "../../../utils";
import * as actions from "../../../store/actions";
import { withRouter } from "react-router-dom";
import "../style/testimonials.scss";
import "../style/base.scss";
class CommentSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      CommentVS: [],
    };
  }
  componentDidMount() {
    let { selectedFood } = this.props;
    this.props.fetchComment("ALL", selectedFood.FoodID);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.CommentVS !== this.props.CommentVS) {
      this.setState({
        CommentVS: this.props.CommentVS,
      });
    }
  }
  render() {
    let { CommentVS } = this.state;
    console.log("check CommentVS", CommentVS);
    const stars = Array(5).fill("★");
    return (
      <React.Fragment>
        <div class="food-comment">
          <h2 class="food-comment-title">Đánh giá</h2>
          {CommentVS.length>0 ? CommentVS.map((item,index)=>{return(   
            <div class="food-comment-section">
            <div class="food-comment-info-cus">
              <i class="fas fa-user"></i>
              <p class="name-cus">{item.customer.CusName}</p>
            </div>
            <div class="food-comment-info">
              <div class="food-comment-info-before">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none">
                  <path
                    d="M61.7742 8.27047C47.0651 37.8765 12.5634 36.4284 0.66626 37.2328C17.4304 43.669 67.182 54.1276 75.8345 46.0825C84.4869 38.0375 76.4834 -21.3355 61.7742 8.27047Z"
                    fill="#FEEDEC"
                  />
                </svg>
              </div>
              <p class="food-ratting">
              {stars.map((star, index) => (
                          <span
                            key={index}
                            className={index + 1 <= item.Comrate ? "yellow star" : "star"}
                           
                          >
                            {star}
                          </span>
                        ))}
              </p>
              <p class="food-info">
                {item.ComContent}
              </p>
            </div>
          </div>)}):<p class="food-info">Sản phẩm hiện chưa được đánh giá</p>}

          
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedFood: state.food.selectedFood,
    CommentVS: state.food.CommentVS,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchComment: (CusID, OrderID) =>
      dispatch(actions.fetchComment(CusID, OrderID)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CommentSection));
