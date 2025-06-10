import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "./HomeHeader";
import DetailFoodSection from "./Section/DetailFoodSection";
import HomeFooter from "./HomeFooter";
import * as actions from "../../store/actions";
import CustomScrollbars from "../../components/CustomScrollbars";
import CommentSection from "./Section/CommentSection";


class DetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenMenu: true
    };
    
  }
  componentDidMount() {
    this.menu();
    this.closeMenu();
 }

  menu = () => {
    let menu = document.querySelector(".menu-icon");
    let navbar = document.querySelector(".navbar");

    menu.onclick = () => {
      menu.classList.toggle("move");
      navbar.classList.toggle("open-menu");
    };
    this.setState({
      isOpenMenu:false
    })
  };
  closeMenu = () => {
    let menu = document.querySelector(".menu-icon");
    let navbar = document.querySelector(".navbar");
    menu.classList.remove("move");
    navbar.classList.remove("open-menu");
    this.setState({
      isOpenMenu:true
    })
  };
  render() {
    let {isOpenMenu}=this.state
    return (
      <CustomScrollbars style={{with: '100%'  , height:'100vh'}}>
      <React.Fragment> 
      <div onClick={ isOpenMenu ?this.menu:this.closeMenu}>
        <HomeHeader />
        <div class="food-container food-margin" id="detail">
        <DetailFoodSection />
        <CommentSection/>
        </div>
        <HomeFooter/>
      </div>
      </React.Fragment>
      </CustomScrollbars>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
   
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailPage);
