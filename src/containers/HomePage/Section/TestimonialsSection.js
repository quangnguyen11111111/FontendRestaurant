import React, { Component } from "react";
import { connect } from "react-redux";
import item from "../../../assets/profile-1.png";
import "../style/testimonials.scss";
import "../style/base.scss";
import * as actions from "../../../store/actions";
class TestimonialsSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FeedContent: "",
      mess: "",
    };
  }
  componentDidMount() {}
  componentDidUpdate(prevProps) {}

  handelOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };
  getCurrentTimeFormatted = (data) => {
    const now = new Date();
    if (data == 1) {
      now.setHours(now.getHours() + 15);
    }

    const hours = String(now.getHours()).padStart(2, "0"); // Giờ (2 chữ số)
    const minutes = String(now.getMinutes()).padStart(2, "0"); // Phút (2 chữ số)
    const date = String(now.getDate()).padStart(2, "0"); // Ngày
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Tháng (+1 vì tháng bắt đầu từ 0)
    const year = now.getFullYear(); // Năm

    return `${hours}:${minutes} ${date}/${month}/${year}`;
  };
  createFeedback = async () => {
    if (this.state.FeedContent == "") {
      this.setState({
        mess: "Hãy cho tôi biết ý kiến của bann trước khi gửi nhó",
      });
      return;
    }
    if (!this.props.userInfo.CusID) {
      this.setState({
        mess: "Hãy đăng nhập trước nhé",
      });
      return;
    }
    let FeedDate = this.getCurrentTimeFormatted(0);
    await this.props.createFeed({
      CusID: this.props.userInfo.CusID,
      FeedDate,
      FeedContent: this.state.FeedContent,
    });
    this.setState({
      FeedContent: "",
      mess: "",
    });
  };
  render() {
    let { FeedContent } = this.state;
    return (
      <div className="comment" id="feedback">
        <section class="newsletter container" id="Blog">
          <h2>Feedback about the website</h2>
          <p>
            Would you like to give us any feedback on your experience using the
            website or service?{" "}
          </p>
          <form>
            <textarea
              placeholder=" "
              value={FeedContent}
              name="FeedContent"
              className="email"
              onChange={(event) =>
                this.handelOnChangeInput(event, "FeedContent")
              }
            ></textarea>

            <label for="email">Feedback</label>
            <p className="s-btn" onClick={this.createFeedback}>
              Feedback
            </p>
          </form>
        </section>
        <p className="exp">{this.state.mess}</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createFeed: (data) => dispatch(actions.createFeed(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestimonialsSection);
