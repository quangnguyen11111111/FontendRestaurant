import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "./HomeHeader";
import HomeFooter from "./HomeFooter";
import * as actions from "../../store/actions";
import "./style/CommentPage.scss";
import { withRouter } from "react-router-dom";
import { path } from "../../utils";
import CustomScrollbars from "../../components/CustomScrollbars";

class CommentPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      OrderComment: [],
      Comment: [],
    };
  }

  componentDidMount() {
   this.loadData()
  }
  loadData=()=>{
    let { selectedOrder } = this.props;

    if (!selectedOrder) {
      this.props.history.push(path.FOLLOWBILL);
    } else {
      let CusID = selectedOrder.CusID;
      let OrderID = selectedOrder.OrderID;
      console.log("hú hú");
      
      this.props.fetchFoodOrderAll(CusID, OrderID);
      this.props.fetchComment(CusID, OrderID);
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.OrderComment !== this.props.OrderComment) {
      const updatedOrderComment = this.props.OrderComment.map((item) => ({
        ...item,
        rating: 0, // Thêm thuộc tính rating mặc định
        ComContent: "", // Nội dung đánh giá mặc định rỗng
        change: true, // Đặt thuộc tính change là true cho tất cả
      }));

      // Đồng bộ dữ liệu từ mảng CommentVS với OrderComment
      const updatedOrderCommentWithComment = updatedOrderComment.map((item) => {
        const comment = this.props.CommentVS.find(
          (c) =>
            c.FoodID === item.FoodID && c.SizeID === item.SizeID&&c.OrderID===item.OrderID // Kiểm tra FoodID và SizeID
        );
        if (comment) {
          return {
            ...item,
            ComID: comment.ComID,
            rating: comment.Comrate,
            ComContent: comment.ComContent,
            change: false, // Đặt change là false nếu đã có đánh giá
          };
        }
        return item;
      });

      this.setState({
        OrderComment: updatedOrderCommentWithComment,
      });
    }

    if (prevProps.Comment !== this.props.Comment) {
      this.setState({
        Comment: this.props.Comment,
      });
    }
  }


  // Thay đổi đánh giá (rating)
  ChangeRating = (itemIndex, newRating, change) => {
    if (change === true) {
      const updatedOrderComment = [...this.state.OrderComment];
      updatedOrderComment[itemIndex].rating = newRating;
      this.setState({
        OrderComment: updatedOrderComment,
      });
    }
  };

  getCurrentTimeFormatted = (data) => {
    const now = new Date();
    if (data === 1) {
      now.setHours(now.getHours() + 15);
    }

    const hours = String(now.getHours()).padStart(2, '0'); // Giờ (2 chữ số)
    const minutes = String(now.getMinutes()).padStart(2, '0'); // Phút (2 chữ số)
    const date = String(now.getDate()).padStart(2, '0'); // Ngày
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Tháng (+1 vì tháng bắt đầu từ 0)
    const year = now.getFullYear(); // Năm

    return `${hours}:${minutes} ${date}/${month}/${year}`;
  };

  // Thay đổi nội dung đánh giá (ComContent)
  handleContentChange = (itemIndex, newContent) => {
    const updatedOrderComment = [...this.state.OrderComment];
    updatedOrderComment[itemIndex].ComContent = newContent;
    this.setState({
      OrderComment: updatedOrderComment,
    });
  };

  // Gửi đánh giá
  handleSubmitComment = async (itemIndex) => {
    const { OrderComment, Comment } = this.state;
    const item = OrderComment[itemIndex];
    let { selectedOrder } = this.props;
    // Kiểm tra nội dung và rating trước khi gửi
    if (item.rating === 0 || !item.ComContent.trim()) {
      alert("Vui lòng đánh giá và viết nội dung nhận xét!");
      return;
    }

    let CusID = this.props.selectedOrder.CusID;
    let ComDate = this.getCurrentTimeFormatted(0);

    // Logic gửi đánh giá (kết nối API hoặc Redux action)
    console.log("Đánh giá được gửi:", item, CusID, Comment);

    await this.props.createComment({
      CusID,
      FoodID: item.FoodID,
      Comrate: item.rating,
      ComDate,
      ComContent: item.ComContent,
      OrderID: item.OrderID,
      SizeID: item.SizeID,
    });

    const updatedOrderComment = [...OrderComment];

    updatedOrderComment[itemIndex].change = false;
    this.setState({
      OrderComment: updatedOrderComment,
    });
    this.loadData()
  };
  handleDeleteComment=async(ComID)=>{

    await this.props.deleteCom(ComID)
    this.loadData()
  }
  render() {
    let { OrderComment } = this.state;
    const stars = Array(5).fill("★");
    return (
      <CustomScrollbars style={{ width: "100%", height: "100vh" }}>
        <React.Fragment>
          <div >
            <div className="main">
            
              <div className="container">
              <a href="/followbill" className="prev">Quay lại</a>
                <h3 className="a1">Đánh giá món ăn</h3>
                {OrderComment.map((item, itemIndex) => {
                  let imageBase64 = "";
                  if (item.food.FoodPic) {
                    imageBase64 = `data:image/jpeg;base64,${new Buffer.from(
                      item.food.FoodPic,
                      "base64"
                    ).toString("base64")}`;
                  }

                  return (
                    <div className="item" key={itemIndex}>
                      <div className="header">
                        <div className="b2">
                          <span className="label">Mã đơn hàng: </span>
                          <span className="result">{item.OrderID}</span>
                        </div>
                        <span className="a4 span">
                          Ngày đặt hàng: {item.order.OrderDate}
                        </span>
                      </div>

                      <div className="order-details">
                        <div>
                          <img
                            src={imageBase64}
                            alt="Food"
                            width="100px"
                            height="100px"
                          />
                          <p>
                            {item.FoodName} <span> {item.foodsize.SizeName}</span>
                          </p>
                        </div>

                        <div>
                          <h5 className="span">
                            Giá món ăn: {item.OrdPrice} VND
                          </h5>
                        </div>
                      </div>

                      <div className="rating">
                        <h4>Đánh giá</h4>
                        {stars.map((star, index) => (
                          <span
                            key={index}
                            className={index + 1 <= item.rating ? "active" : ""}
                            onClick={() =>
                              this.ChangeRating(itemIndex, index + 1, item.change)
                            }
                          >
                            {star}
                          </span>
                        ))}
                      </div>

                      {item.change ? (
                        <textarea
                          placeholder="Viết đánh giá của bạn về món ăn này."
                          value={item.ComContent}
                          onChange={(e) =>
                            this.handleContentChange(itemIndex, e.target.value)
                          }
                        ></textarea>
                      ) : (
                        <div className="" ><h6>Đánh giá của bạn:</h6> <p>Mã đánh giá {item.ComID}: {item.ComContent} </p></div>
                      )}

                      {item.change ? (
                        <button onClick={() => this.handleSubmitComment(itemIndex)}>
                          Gửi
                        </button>
                      ) : (
                        <button onClick={() => this.handleDeleteComment(item.ComID)}>
                          Xóa
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </React.Fragment>
      </CustomScrollbars>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    selectedOrder: state.food.selectedOrder,
    OrderComment: state.food.OrderComment,
    Comment: state.food.Comment,
    CommentVS: state.food.CommentVS,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchFoodOrderAll: (CusID, OrderID) => dispatch(actions.fetchFoodOrderAll(CusID, OrderID)),
    fetchComment: (CusID, OrderID) => dispatch(actions.fetchComment(CusID, OrderID)),
    createComment: (data) => dispatch(actions.createComment(data)),
    deleteCom: (data) => dispatch(actions.deleteCom(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CommentPage));
