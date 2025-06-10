import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter as Router } from "connected-react-router";
import { history } from "../redux";
import { ToastContainer } from "react-toastify";
import {
  userIsAuthenticated,
  userIsNotAuthenticated,
} from "../hoc/authentication";
import { path } from "../utils";
import Login from "./Auth/Login";
import System from "../routes/System";
import Home from "../routes/Home";
import ConfirmModal from "../components/ConfirmModal";
import HomePage from './HomePage/HomePage'
import MenuPage from "./HomePage/MenuPage";
import CartPage from "./HomePage/CartPage";
import CustomScrollbars from "../components/CustomScrollbars";
import DetailPage from "./HomePage/DetailPage";
import FollowBill from "./HomePage/FollowBill";
import CommentPage from "./HomePage/CommentPage";
import * as actions from "../store/actions"
class App extends Component {
  handlePersistorState = () => {
    const { persistor } = this.props;
    let { bootstrapped } = persistor.getState();
    if (bootstrapped) {
      if (this.props.onBeforeLift) {
        Promise.resolve(this.props.onBeforeLift())
          .then(() => this.setState({ bootstrapped: true }))
          .catch(() => this.setState({ bootstrapped: true }));
      } else {
        this.setState({ bootstrapped: true });
      }
    }
  };

  componentDidMount() {
    this.handlePersistorState();
    this.props.loadCartItems();
  }

  render() {
    let {isLoggedIn,lv}= this.props;
    
    return (
      <Fragment>
        <CustomScrollbars style={{with: '100%'  , height:'100vh'}}>
        <Router history={history}>
          <div className="main-container" >
            <ConfirmModal />
            

            <span className="content-container container">
              <Switch>
              <Route
                  path={path.SYSTEM}
                  component={userIsAuthenticated(System)}
                />
                <Route path={path.HOME} exact component={Home} />
                <Route
                  path={path.LOGIN}
                  component={userIsNotAuthenticated(Login)}
                />
               
                <Route
                  path={path.HOMEPAGE}
                  exact component={(HomePage)}
                />
                <Route
                  path="/"
                  exact component={(HomePage)}
                />
                 <Route
                  path={path.DETAILPAGE}
                  exact component={(DetailPage)}
                />
                <Route
                  path={path.MENUPAGE}
                  exact component={(MenuPage)}
                />
                <Route
                  path={path.CARTPAGE}
                  exact component={(CartPage)}
                />
                <Route
                  path={path.FOLLOWBILL}
                  exact component={(FollowBill)}
                />
                <Route
                  path={path.COMMENT}
                  exact component={(CommentPage)}
                />

              </Switch>
            </span>

            {/* <ToastContainer
              className="toast-container"
              toastClassName="toast-item"
              bodyClassName="toast-item-body"
              autoClose={false} 
              hideProgressBar={true}
              pauseOnHover={false}
              pauseOnFocusLoss={true}
              closeOnClick={false}
              draggable={false}
              closeButton={<CustomToastCloseButton />}
            /> */}
            <ToastContainer
position="bottom-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
          </div>
        </Router>
        </CustomScrollbars>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    started: state.app.started,
    isLoggedIn: state.user.isLoggedIn,
    lv:state.user.lv,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
     loadCartItems: () => dispatch(actions.loadCartItems()),  // Gọi action loadCartItems
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
