import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "bootstrap/dist/css/bootstrap.min.css";
import "./FoodDetail.scss";
import Swal from "sweetalert2";

class FeedBackManege extends Component {
  constructor(props) {
    super(props);
    this.state = {
        FeedBack: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.loadData()
      .then(() => {
        this.setState({ loading: false });
      })
      .catch(() => {
        this.setState({ loading: false });
      });
   
  }

  componentDidUpdate(prevProps) {
    if (prevProps.FeedBack !== this.props.FeedBack) {
      this.setState({
        FeedBack:this.props.FeedBack
      })
    }
  }

  loadData = async () => {
    this.props.fetchFeedback()
  };


  deleteComment = async (FeedID) => {
    const result = await Swal.fire({
      title: "Bạn có chắc muốn xóa comment?",
      text: "Sau khi xóa dữ liệu sẽ mất.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xóa",
    });

    if (result.isConfirmed) {
        await this.props.deleteFeedBack(FeedID)
      await this.loadData();
        
      Swal.fire("Đã xóa!", "Comment đã bị xóa.", "success");
    }
  };

  render() {
    const { FeedBack,loading } = this.state;
    if (loading) {
        return (
          <div className="loading-container">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        );
      }
      if (FeedBack.length==0) {
        return(<div>
            Hiện đang không có đánh giá nào
        </div>)
      }
    return (
      <React.Fragment>

        <div className="food-comment">
          {FeedBack.map((item, index) => (
            <div className="food-comment-section" key={index}>
              <div className="food-comment-info-cus">
                <i className="fas fa-user"></i>
                <p className="name-cus">{item.customer.CusName}</p>
              </div>
              <div className="food-comment-info">
                <div className="food-comment-info-before">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none">
                    <path
                      d="M61.7742 8.27047C47.0651 37.8765 12.5634 36.4284 0.66626 37.2328C17.4304 43.669 67.182 54.1276 75.8345 46.0825C84.4869 38.0375 76.4834 -21.3355 61.7742 8.27047Z"
                      fill="#FEEDEC"
                    />
                  </svg>
                </div>
                <div className="food-comment-top">
                  <p>
                    Ngày comment: <span>{item.FeedDate}</span>
                  </p>
                </div>
                <div className="food-comment-bottom">
                  <p>
                    <span >{item.FeedContent}</span>
                  </p>
                </div>
                <p
                  className="btn_comment"
                  onClick={() => {
                    this.deleteComment(item.FeedID);
                  }}
                >
                  Xóa
                </p>
              </div>
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    FeedBack: state.food.FeedBack,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchFeedback: () =>dispatch(actions.fetchFeedback()),
    deleteFeedBack: (data) => dispatch(actions.deleteFeedBack(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedBackManege);
