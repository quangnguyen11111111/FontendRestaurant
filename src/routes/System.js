import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import FoodManage from "../containers/System/admin/FoodManage";
import CustomerManage from "../containers/System/admin/CustomerManage";
import CategoriesManage from "../containers/System/admin/CategoriesManage";
import OrderManage from "../containers/System/admin/OrderManage";
import CommentManage from "../containers/System/admin/CommentManage";
import FeedBackManege from "../containers/System/admin/FeedBackManege";
import ListManage from "../containers/System/admin/ListManage";
import Header from "../containers/Header/Header";
class System extends Component {

  render() {
    const { isLoggedIn, systemMenuPath } = this.props;

    
    return (
      <React.Fragment>
        {isLoggedIn && <Header />}
        <div className="system-container">
          <div className="system-list">
            <Switch>
              <Route path="/system/customer-manage" component={CustomerManage} />
              <Route path="/system/categories-manage" component={CategoriesManage} />
              <Route path="/system/food-manage" component={FoodManage} />
              <Route path="/system/order-manage" component={OrderManage} />
              <Route path="/system/Comment-manage" component={CommentManage} />
              <Route path="/system/Feedback-manage" component={FeedBackManege} />
              <Route path="/system/list-manage" component={ListManage} />
              <Route
                component={() => {
                  return <Redirect to={systemMenuPath} />;
                }}
              />
            </Switch>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

// Sử dụng withRouter để inject location vào props
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(System));
