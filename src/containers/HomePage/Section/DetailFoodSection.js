import React, { Component } from "react";
import { connect } from "react-redux";
import {path } from "../../../utils";
import { withRouter } from "react-router-dom";
import "../style/testimonials.scss";
import "../style/base.scss";
import * as actions from "../../../store/actions";
import { toast } from 'react-toastify';
class DetailFoodSection extends Component {
  constructor(props){
    super(props)
    this.state={
      Size:[],
      SizeID:2,
      quantity:1
    }
   
  }
  componentDidMount() {
    this.props.loadSize()

}
  componentDidUpdate(prevProps) {
    
    if (prevProps.Size !== this.props.Size) {
      
        this.setState({
          Size: this.props.Size
        });
    }

    
    
}
  handleAddToCart=()=>{
    const { selectedFood, addToCart } = this.props;
    let {quantity,SizeID}=this.state
    if (selectedFood) {
      // Truyền sản phẩm vào redux store
      addToCart(selectedFood,quantity,SizeID);
      toast.success("Thêm vào giỏ hàng thành công");
      this.props.history.push(path.MENUPAGE); 
    }
  }
  changeSize=(data)=>{
    this.setState({
      SizeID:data
    })
  }
  upQuantity = (data)=>{
    let sl= this.state.quantity+data
    this.setState({
      quantity: sl
    })
    
  }
  downQuantity = (data)=>{
    let sl= this.state.quantity - data
    if (sl>0) {
      this.setState({
        quantity: sl
      })
    }
  }
  render() {
    let {selectedFood}=this.props
    let {Size,SizeID,quantity}=this.state
    
    if (!selectedFood){
      return (
        <div >{this.props.history.push(path.HOMEPAGE)}</div>
      )
    }else{
      let imageBase64 = "";
              if (selectedFood.FoodPic) {
                imageBase64 = `data:image/jpeg;base64,${ Buffer.from(
                  selectedFood.FoodPic,
                  "base64"
                ).toString("base64")}`;
              }
              let price = selectedFood.FoodPrice-(selectedFood.FoodPrice*selectedFood.FoodSale/100)
    return (
      <React.Fragment>
        <a href="/menupage">
                            <p className="cart-back">
                                <i className="fas fa-chevron-left"></i> Menu
                            </p>
                        </a>
        <div class="food-details ">
        
            <div class="food-image">
                <img src={imageBase64} alt="Hình ảnh món ăn"/>
            </div>
            <div class="food-info">
                <h1 class="food-title">{selectedFood.FoodName}</h1>
                <p class="food-price">{price} VND</p>
                <div class="food-options">
                    <label for="size">Chọn size:</label>
                    <div class="sizes">
                    {Size && Size.length > 0 && Size.map((item, index) => {
                                    
                                    return (
                                      <button className={item.SizeID==SizeID?"size-btn active":"size-btn "} onClick={()=>{this.changeSize(item.SizeID)}} >{item.SizeName}</button>
                                    );
                                })}
                        
                        
                    </div>
                </div>
                <div class="quantity">
                    <label for="quantity">Số lượng:</label>
                    <button class="quantity-btn" onClick={()=>{this.downQuantity(1)}}>-</button>
                    <input type="text" id="quantity" value={quantity}/>
                    <button class="quantity-btn" onClick={()=>{this.upQuantity(1)}}>+</button>
                </div>
                <button class="add-to-cart" onClick={this.handleAddToCart} >Thêm vào giỏ hàng</button>
            </div>
        </div>
        <div class="food-detail-info">
            <h2>Chi tiết món ăn</h2>
            <p>{selectedFood.FoodInfo}</p>
        </div>
        
  

  {/* <div class="review-section">
    <h3>Đánh giá</h3>
    <div class="review-list">
      <div class="review-item">
        <div class="user-icon">
          <img src="user-icon.jpg" alt="User" />
        </div>
        <div class="review-content">
          <p class="review-stars">⭐⭐⭐⭐⭐</p>
          <p class="review-text">Đánh giá món ăn rất ngon...</p>
        </div>
      </div>

      <div class="review-item">
        <div class="user-icon">
          <img src="user-icon.jpg" alt="User" />
        </div>
        <div class="review-content">
          <p class="review-stars">⭐⭐⭐⭐⭐</p>
          <p class="review-text">Đánh giá món ăn rất ngon...</p>
        </div>
      </div>

      <div class="review-item">
        <div class="user-icon">
          <img src="user-icon.jpg" alt="User" />
        </div>
        <div class="review-content">
          <p class="review-stars">⭐⭐⭐⭐⭐</p>
          <p class="review-text">Đánh giá món ăn rất ngon...</p>
        </div>
      </div>
    </div>
    <button class="see-more">Xem thêm →</button>
  </div>

  <div class="suggestions">
    <h3>Gợi ý món ăn</h3>
    <div class="suggested-foods">
      <div class="food-item">
        <img src="food1.jpg" alt="Food" />
        <p class="food-name">Name Food</p>
        <p class="food-price">Price</p>
        <button class="add-to-cart">Thêm vào giỏ</button>
      </div>
      <div class="food-item">
        <img src="food2.jpg" alt="Food" />
        <p class="food-name">Name Food</p>
        <p class="food-price">Price</p>
        <button class="add-to-cart">Thêm vào giỏ</button>
      </div>
      <div class="food-item">
        <img src="food3.jpg" alt="Food" />
        <p class="food-name">Name Food</p>
        <p class="food-price">Price</p>
        <button class="add-to-cart">Thêm vào giỏ</button>
      </div>
      <div class="food-item">
        <img src="food4.jpg" alt="Food" />
        <p class="food-name">Name Food</p>
        <p class="food-price">Price</p>
        <button class="add-to-cart">Thêm vào giỏ</button>
      </div>
    </div>
  </div> */}

        </React.Fragment>
    );}
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    selectedFood:state.food.selectedFood,
    Size: state.cart.Size
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      addToCart: (Food,quantity,size) => dispatch(actions.addToCart(Food,quantity,size)),
    loadSize:()=>dispatch(actions.loadSize()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(DetailFoodSection));
