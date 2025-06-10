import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "bootstrap/dist/css/bootstrap.min.css";
import "./FoodDetail.scss";
import Swal from "sweetalert2";

class CommentManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      CommentVS: [],
      filteredComments: [], // Danh sách bình luận đã lọc
      selectedStar: "ALL", // Giá trị sao được chọn
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
    if (prevProps.CommentVS !== this.props.CommentVS) {
      const { selectedStar } = this.state; // Lấy giá trị sao hiện tại
      const filteredComments =
        selectedStar === "ALL"
          ? this.props.CommentVS
          : this.props.CommentVS.filter(
              (comment) => comment.Comrate === parseInt(selectedStar)
            );

      this.setState({
        CommentVS: this.props.CommentVS,
        filteredComments,
      });
    }
  }

  loadData = async () => {
    await this.props.fetchComment("ALL", "ALL");

    const { selectedStar } = this.state; // Lấy trạng thái lọc hiện tại
    const filteredComments =
      selectedStar === "ALL"
        ? this.props.CommentVS
        : this.props.CommentVS.filter(
            (comment) => comment.Comrate === parseInt(selectedStar)
          );

    this.setState({
      CommentVS: this.props.CommentVS,
      filteredComments, // Cập nhật danh sách sau khi load
    });
  };

  handleStarFilter = (event) => {
    const selectedStar = event.target.value;

    const filteredComments =
      selectedStar === "ALL"
        ? this.state.CommentVS
        : this.state.CommentVS.filter(
            (comment) => comment.Comrate === parseInt(selectedStar)
          );

    this.setState({
      filteredComments,
      selectedStar,
    });
  };

  deleteComment = async (ComID) => {
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
      await this.props.deleteCom(ComID);
      await this.loadData();

      Swal.fire("Đã xóa!", "Comment đã bị xóa.", "success");
    }
  };

  render() {
    const { filteredComments, selectedStar,loading } = this.state;
    const stars = Array(5).fill("★");
    if (loading) {
        return (
          <div className="loading-container">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        );
      }
      if (filteredComments.length==0) {
        return(<div>
            Hiện đang không có đánh giá nào
        </div>)
      }
    return (
      <React.Fragment>
        <div className="filter-container">
          <select
            id="star-filter"
            value={selectedStar}
            onChange={this.handleStarFilter}
          >
            <option value="ALL">Tất cả</option>
            <option value="1">1 sao</option>
            <option value="2">2 sao</option>
            <option value="3">3 sao</option>
            <option value="4">4 sao</option>
            <option value="5">5 sao</option>
          </select>
        </div>

        <div className="food-comment">
          {filteredComments.map((item, index) => (
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
                    Mã hóa đơn: <span>{item.OrderID}</span>
                  </p>
                  <p>
                    Ngày comment: <span>{item.ComDate}</span>
                  </p>
                  <p>
                    Ngày đặt đồ: <span>{item.order.OrderDate}</span>
                  </p>
                </div>
                <div className="food-comment-center">
                  <p>{item.food.FoodName}</p>
                  <p>{item.foodsize.SizeName}</p>
                </div>
                <div className="food-comment-bottom">
                  <p className="food-ratting">
                    {stars.map((star, index) => (
                      <span
                        key={index}
                        className={
                          index + 1 <= item.Comrate ? "yellow star" : "star"
                        }
                      >
                        {star}
                      </span>
                    ))}
                  </p>
                  <p>
                    Đánh giá của người dùng: <span>{item.ComContent}</span>
                  </p>
                </div>
                <p
                  className="btn_comment"
                  onClick={() => {
                    this.deleteComment(item.ComID);
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
    CommentVS: state.food.CommentVS,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchComment: (CusID, OrderID) =>
      dispatch(actions.fetchComment(CusID, OrderID)),
    deleteCom: (data) => dispatch(actions.deleteCom(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentManage);
