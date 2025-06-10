import React, { Component } from "react";
import { connect } from "react-redux";
import "../style/menu.scss";
import "../style/base.scss";
import item from "../../../assets/images/menu.jpg";
import * as actions from "../../../store/actions";
import {path } from "../../../utils";
import { withRouter } from "react-router-dom";
class FeatureMenuSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: [],
    };
  }
  componentDidMount() {
    this.props.getCategories("ALL");
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.categories !== this.props.categories) {
      this.setState({
        arr: this.props.categories,
      });
    }
  }
  SelectedCat = (data)=>{
    if (window.location.pathname!=path.MENUPAGE) {
      this.props.history.push(path.MENUPAGE); 
    }
    this.props.setSelectedCat(data)
  }
  render() {
    let arr = this.state.arr.filter(item => item.CatStatus === 1);
    const currentPath = window.location.pathname;

    return (
       <div className="" id="featured">
        <section className="feature-menu container">
          {currentPath != path.MENUPAGE && <h2 className="heading ">Yummy's Feature Menu</h2>}
          <div className= {currentPath === path.MENUPAGE?"feature-menu-content small-size-image":"feature-menu-content "} >
          <div className="feature-menu-box">
                      <a onClick={()=>this.SelectedCat("ALL")}>
                        <img src={item} alt="anh" />
                        <h3>Tất cả</h3>
                      </a>
                    </div>
            {arr &&
              arr.length > 0 &&
              arr.map((item, index) => {
                let imageBase64 = "";
                if (item.CatPic) {
                  imageBase64 = `data:image/jpeg;base64,${new Buffer(
                    item.CatPic,
                    "base64"
                  ).toString("base64")}`;
                }

                  return (
                    <div className="feature-menu-box" key={index}>
                      <a onClick={()=>this.SelectedCat(item.CatID)}>
                        <img src={imageBase64} alt="anh" />
                        <h3>{item.CatName}</h3>
                      </a>
                    </div>
                  );
                
                
              })}
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    categories: state.food.categories,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCategories: (data) => dispatch(actions.fetchCategoriesStart(data)),
    setSelectedCat:(data)=>dispatch(actions.setSelectedCat(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FeatureMenuSection));
