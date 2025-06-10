import React, { Component } from "react";
import { connect } from "react-redux";
import "./style/footer.scss";
import "./style/base.scss";
class HomeFooter extends Component {
  render() {
    return (
      <div className="">
        <footer>
          <div className="footer-content container">
            <div className="footer-box">
              <a href="#" className="footer-logo">
                <img src="../img_restautant/logo.png" alt="" />
              </a>
              <p>925 Bald Hill St, Asheeville, NC 28803</p>
              <div className="social">
                <a href="#">
                  <i className="fas fa-instagram"></i>
                </a>
                <a href="#">
                  <i className="fas fa-linkedin"></i>
                </a>
                <a href="#">
                  <i className="fas fa-tiktok"></i>
                </a>
                <a href="#">
                  <i className="fas fa-pinterest-alt"></i>
                </a>
              </div>
            </div>
            <div className="footer-box">
              <h3>Opening Hours</h3>
              <p>
                <span>Mon</span>: 9:00 - 20:30
              </p>
              <p>
                <span>tue</span>: 9:00 - 20:30
              </p>
              <p>
                <span>wed</span>: 9:00 - 20:30
              </p>
              <p>
                <span>thu</span>: 9:00 - 20:30
              </p>
              <p>
                <span>fri</span>: 9:00 - 20:30
              </p>
              <p>
                <span>sat</span>: 9:00 - 20:30
              </p>
              <p>
                <span>sun</span>: Closed
              </p>
            </div>
            <div className="footer-box">
              <h3>Infomation</h3>
              <a href="#">About</a>
              <a href="#">Blog</a>
              <a href="#">Yummy's Gallery</a>
              <a href="#">Yummy's Talent Chefs</a>
              <a href="#">Testimonials</a>
            </div>
            <div className="footer-box">
              <h3>Contact Us</h3>
              <p>+8431321510321</p>
              <p>support@domain.com</p>
              <p>Address: nhà số 4 ngách 45 ngõ 325 kinm ngưu</p>
            </div>
          </div>
          <div className="copyright">BOongg QuanggH</div>
        </footer>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
