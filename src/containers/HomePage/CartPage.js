// CartPage.js
import React, { Component } from "react";
import { connect } from "react-redux";
import "./style/base.scss";
import "./style/cart.scss";
import Swal from 'sweetalert2';
import item from "../../assets/images/f71ecaee-1abc-4742-951e-dbe3935d0ad4.png";
import {path } from "../../utils";
import * as actions from "../../store/actions";
import { toast } from 'react-toastify';
import { withRouter } from "react-router-dom";
import CustomScrollbars from "../../components/CustomScrollbars";
class CartPage extends Component {
    constructor(props) {
        super(props);
        let {userInfo,CartItems}=this.props
        this.state = {
            CartItems:CartItems,
            CusUser:userInfo.CusUser,
            CusID:userInfo.CusID,
            CusName:userInfo.CusName,
            CusPhone:userInfo.CusPhone,
            CusAdd:userInfo.CusAdd,
            edit:0,
            PayMent:[],
            PayID:"",
            PayNote:""
        };
    }

    componentDidMount() {
      
            this.props.loadCartItems(); 
            this.props.loadPayment();
            this.props.loadSize();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.CartItems !== this.props.CartItems) {
          
            this.setState({
                CartItems: this.props.CartItems,
            });
        }
        if (prevProps.PayMent !== this.props.PayMent) {
          
            this.setState({
              PayMent: this.props.PayMent,
            });
        }
        if (prevProps.userInfo !== this.props.userInfo) {
          let {userInfo}=this.props
            this.setState({
              CusUser:userInfo.CusUser,
              CusName:userInfo.CusName,
              CusPhone:userInfo.CusPhone,
              CusAdd:userInfo.CusAdd ,
              CusID:userInfo.CusID,
            });
        }
        
    }

    upQuantity = (id, quantity,SizeID) => {
        let quantity1 = quantity + 1;
        console.log("check quan ", quantity1);
        
        this.props.updateCart(id, quantity1,SizeID);
    };

    downQuantity = (id, quantity,SizeID) => {
        let quantity1 = quantity - 1;
        if (quantity1 > 0) {
            this.props.updateCart(id, quantity1,SizeID);
        }
    };

    removeCartItem = (id,size) => {
        this.props.removeCart(id,size);
    };
    handelOnChangeInput = (event, id) => {
      let copyState = { ...this.state };
      copyState[id] = event.target.value;
      this.setState(
        {
          ...copyState,
        },
        () => {
          console.log(this.state);
        }
      );
    };
    editUser=()=>{
      console.log(this.props.userInfo.CusID);
      
      if (!this.props.userInfo.CusID) {
        alert("Vui lòng đăng nhập trước khi thanh toán")
        this.props.history.push(path.HOMEPAGE)
      }
      this.setState({
        edit:1
      })
    }
    checkvalidateInput1 = () => {
      let isValue = true;
      const arrInput = [ `CusName`, `CusPhone`, `CusAdd`,`PayID`];
      const arrInputVI = ["tên người dùng","số điện Thoai","địa chỉ","phương thức thanh toán"]
      for (let i = 0; i < arrInput.length; i++) {
        if (!this.state[arrInput[i]]) {
          isValue = false;
          toast.error("Không được bỏ trống "+ arrInputVI[i])
          break;
        }
      }
      return isValue;
    };
    checkvalidateInput = () => {
      let isValue = true;
      const arrInput = [ `CusName`, `CusPhone`, `CusAdd`];
      const arrInputVI = ["tên người dùng","số điện Thoai","địa chỉ"]
      for (let i = 0; i < arrInput.length; i++) {
        if (!this.state[arrInput[i]]) {
          isValue = false;
          toast.error("Không được bỏ trống "+ arrInputVI[i])
          break;
        }
      }
      return isValue;
    };
    handleEdit = async()=>{
      
      let check = this.checkvalidateInput();
      if (!check) return;
      
      await this.props.editCustomer({
        CusUser: this.state.CusUser,
        CusName: this.state.CusName,
        CusPhone: this.state.CusPhone,
        CusAdd: this.state.CusAdd
      })
      this.setState({
        edit:0
      })
    }
    onchangePayment=(data)=>{
      this.setState({
        PayID:data
      }) 
      
      
    }
     getCurrentTimeFormatted = (data) => {
      const now = new Date();
      if (data==1) {
        now.setHours(now.getHours() + 15);
      }
      
      const hours = String(now.getHours()).padStart(2, '0'); // Giờ (2 chữ số)
      const minutes = String(now.getMinutes()).padStart(2, '0'); // Phút (2 chữ số)
      const date = String(now.getDate()).padStart(2, '0'); // Ngày
      const month = String(now.getMonth() + 1).padStart(2, '0'); // Tháng (+1 vì tháng bắt đầu từ 0)
      const year = now.getFullYear(); // Năm
    
      return `${hours}:${minutes} ${date}/${month}/${year}`;
    };
    
    
    PayBil=async(quantity,priceAll)=>{
      if (quantity==0) {
        toast.error("Giỏ hàng hiện tại đang trống!!")
        toast.error("Vui lòng chọn món ăn muốn thanh toán!!")
        return
      }
      if (!this.props.userInfo.CusID) {
        alert("Vui lòng đăng nhập trước khi thanh toán")
        this.props.history.push(path.HOMEPAGE)
      }
      let check = this.checkvalidateInput1();
      if (!check) return;
      let {CartItems,CusName,CusPhone,CusAdd,PayID,PayNote,CusID}=this.state
      let OrderDate = this.getCurrentTimeFormatted(0)
      let OrderShipDate = this.getCurrentTimeFormatted(1)
      console.log("check OrderDate"+OrderDate +"OrderShipDate"+CusID);
          const result = await Swal.fire({
            title: "Bạn có chắc muốn thanh toán?",
            text: "Sau khi thanh toán sản phẩm sẽ được giao trong vòng 1 tiếng.(Lưu ý nếu đặt hàng sau 23h đơn hàng sữ được giao vào 7h hôm sau)",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Thanh toán",
          });
      
          if (result.isConfirmed) {
            if (PayID==2) {
              const result_2 = await Swal.fire({
                text: "Chuyển khoản ghi rõ họ tên và số điện thoại",
                imageUrl: item, // URL hình ảnh
                imageWidth: 200, // Chiều rộng của hình ảnh (tùy chỉnh)
                imageHeight: 200, // Chiều cao của hình ảnh (tùy chỉnh)
                imageAlt: "Ảnh qr", // Văn bản thay thế nếu hình ảnh không tải được
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Thanh toán",
              });
              if (result_2.isConfirmed) {
                await this.props.createCart({
                  CartDetail:CartItems,
                  CusID,
                  OrderDate,
                  OrderShipDate,
                  CusName,
                  CusPhone,
                  CusAdd,
                  PayID,
                  PayNote,
                  priceAll
                })
                
              }
            } else {
              await this.props.createCart({
                CartDetail:CartItems,
                CusID,
                OrderDate,
                OrderShipDate,
                CusName,
                CusPhone,
                CusAdd,
                PayID,
                PayNote,
                priceAll
              })
             
            }
            
            setTimeout(() => {
              window.location.href = '/home';
            }, 1500); // 2000ms = 2 giây
          
        };
      // console.log("check data api",CartItems,"name:",CusName,"phone: ",CusPhone,"add: ",CusAdd, "thah taon: ",PayID,"ghi chú: ",PayNote,priceAll);
      
      
    }
    render() {
        let { CartItems,CusName,CusPhone,CusAdd,edit ,PayMent,PayNote,CusID} = this.state;
        let priceAll = 0;
        let provisionalAll=0;
        let saleAll=0;
        
        return (
          <CustomScrollbars style={{with: '100%'  , height:'100vh'}}> 
            <React.Fragment>
                <div className="cart-container">
                    <div className="cart-header">
                        <a href="/home">
                            <p className="cart-back">
                                <i className="fas fa-chevron-left"></i> Trang chủ
                            </p>
                        </a>
                    </div>

                    <div className="cart-content">
                        <div className="cart-left">
                            <h3 className="cart-title">Giỏ hàng của bạn</h3>
                            <div className="cart-items">
                                {CartItems && CartItems.length > 0 && CartItems.map((item, index) => {
                                    let imageBase64 = "";
                                    if (item.FoodPic) {
                                        imageBase64 = `data:image/jpeg;base64,${new Buffer.from(item.FoodPic, "base64").toString("base64")}`;
                                    }
                                    let price = item.FoodPrice * item.quantity *(item.SizeID*1/2) - ((item.FoodPrice * item.FoodSale) / 100);
                                    priceAll += price;
                                    let provisional  = item.FoodPrice * item.quantity *(item.SizeID*1/2)
                                    provisionalAll+=provisional
                                    let sale = ((item.FoodPrice * item.FoodSale) / 100)
                                    saleAll +=sale
                                    let size =item.SizeID
                                    let sizeName=""
                                     this.props.Size.map((item,index)=>{
                                      if (size == item.SizeID) {
                                        sizeName = item.SizeName
                                        
                                      }
                                     })
                                      
                                      
                                    return (
                                        <div className="cart-item" key={index}>
                                            <div className="cart-item-contend">
                                                <img src={imageBase64} alt="Sản phẩm" className="cart-item-img" />
                                                <div className="cart-item-info">
                                                    <h6 className="cart-item-name">{item.FoodName}</h6>
                                                    <p className="cart-item-desc">{sizeName}</p>
                                                </div>
                                            </div>
                                            <div className="cart-item-actions">
                                                <button className="cart-btn" onClick={() => { this.upQuantity(item.FoodID, item.quantity,item.SizeID) }}>+</button>
                                                <span className="cart-quantity">{item.quantity}</span>
                                                <button className="cart-btn" onClick={() => { this.downQuantity(item.FoodID, item.quantity,item.SizeID) }}>-</button>
                                            </div>
                                            <p className="cart-price">{price} VNĐ</p>
                                            <button className="cart-delete" onClick={() => this.removeCartItem(item.FoodID,item.SizeID)}>
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="cart-right">
                            <div className="cart-note">
                                <label htmlFor="order-note">Ghi chú cho đơn hàng</label>
                                <textarea id="order-note" placeholder="Thêm ghi chú cho đơn hàng của bạn" value={PayNote} name="PayNote" onChange={(event) =>
                      this.handelOnChangeInput(event, "PayNote")} ></textarea>
                            </div>

                            <div className="cart-customer">
                                <h4>Thông tin khách hàng</h4>
                                {edit == 0 ? <p>Tên người nhận: <input type="text" value={CusName} id="CusName" disabled /></p>: <p>Tên người nhận: <input type="text" value={CusName} className="edit" name="CusName" onChange={(event) =>
                      this.handelOnChangeInput(event, "CusName")}/></p>}
                                {edit == 0 ? <p>Số điện thoại: <input type="text" value={CusPhone} disabled /></p>: <p>Số điện thoại: <input type="text" value={CusPhone} className="edit"  name="CusPhone" onChange={(event) =>
                      this.handelOnChangeInput(event, "CusPhone")}  /></p>}
                                {edit == 0 ? <p>Địa chỉ: <input type="text" value={CusAdd} disabled /></p>:<p>Địa chỉ: <input type="text" value={CusAdd} name="CusAdd" className="edit"  onChange={(event) =>
                      this.handelOnChangeInput(event, "CusAdd")}  /></p>}
                                {edit ==1 ?<button className="cart-edit" onClick={this.handleEdit}>Lưu</button>:<button className="cart-edit" onClick={this.editUser}>Chỉnh sửa</button>}
                            </div>

                            <div className="cart-payment">
                                <h4>Chọn phương thức thanh toán</h4>
                                {PayMent && PayMent.length > 0 && PayMent.map((item, index) => {
                                    
                                    return (
                                      <div>
                                      <input type="radio" name="payment" value={item.PayID} onChange={()=>{this.onchangePayment(item.PayID)}} />
                                      <label htmlFor="cod">Thanh toán {item.PayType}</label>
                                  </div>
                                    );
                                })}
                                
                               
                            </div>

                            <div className="cart-summary">
                                <p>Tạm tính: <span>{provisionalAll} VNĐ</span></p>
                                <p>Khuyến mãi: <span>-{saleAll} VNĐ</span></p>
                                <p className="cart-total">Tổng tiền: <span>{priceAll} VNĐ</span></p>
                                <button className="cart-checkout" onClick={()=>{this.PayBil(CartItems.length,priceAll)}}>Thanh toán</button>
                            </div>
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
        language: state.app.language,
        CartItems: state.cart.CartItems,
        userInfo: state.user.userInfo,
        PayMent:state.cart.PayMent,
        Size: state.cart.Size
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadCartItems: () => dispatch(actions.loadCartItems()), 
        updateCart: (id, quantity,SizeID) => dispatch(actions.updateCartItem(id, quantity,SizeID)),
        removeCart: (id,size) => dispatch(actions.removeFromCart(id,size)),
        editCustomer:(data)=>dispatch(actions.editCustomer(data)),
        loadPayment:()=>dispatch(actions.loadPayment()),
        loadSize:()=>dispatch(actions.loadSize()),
        createCart:(data)=>dispatch(actions.createCart(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CartPage));
