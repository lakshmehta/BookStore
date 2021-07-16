import React, { Component } from "react";
import "./bookDetail.css";
import Book from "../../assets/Image 11.png";
import image from "../../assets/Image 11@2x.png";
import CustomerFeedback from "./customerFeed";
import UserService from "../../Services/userService";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router";

const service = new UserService();
const styles = (theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
});
class BookDeatail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputQuantity: true,
      getCart: [],
      cartId: "",
      pen: false,
    };
  }
  componentDidMount() {
    this.handleGetCart();
  }
  handleGetCart = () => {
    service.getCartItems().then((res) => {
      console.log("getCart", res);
      // if(this.state.cartId === res.data.result.product_id._id){
      this.setState({ getCart: res.data.result });
      // }
      console.log("getCartdata", this.state.getCart);
    });
  };
  handleCartItem = (id) => {
    let bookInCart = this.state.getCart.find(function (value) {
      if (value.product_id._id === id) {
        console.log("book in bag method");
        return true;
      } else {
        return false;
      }
    });
    return bookInCart;
  };
  pushToCart = () => {
    this.props.history.push("/cart");
  };
  addedtoCart = (value) => {
    this.setState({ inputQuantity: !this.state.inputQuantity });
    let data = {
      isCart: true,
    };
    console.log(value);
    this.handleToggle();
    service
      .addToCartBook(data, value._id)
      .then((res) => {
        console.log(value);
        console.log(res);
        this.handleGetCart();
        this.setState({ cartId: value._id });
        console.log("cartId", this.state.cartId);
        this.handleClose();
        this.pushToCart();
      })
      .catch((err) => {
        this.handleClose();
        console.log(err);
      });
  };
  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ show: false, pen: false });
  };
  handleToggle = () => {
    this.setState({ pen: !this.state.pen });
  };
  addToWishList=(product_id)=>{
    service.addToWishList(product_id).then((result)=>{
      console.log(result,"add to wishlist");
    }).catch((error)=>{
      console.log(error,"error");
    })
  }
  render() {
    const { classes } = this.props;
    console.log(this.props.displayDetail, "display details");
    return (
      <>
        {this.state.pen ? (
          <Backdrop
            className={classes.backdrop}
            open={this.state.pen}
            onClick={this.handleClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : (
          <div className="mainContainer">
            <div className="container" style={{display:'flex',flexDirection:'column'}}>
              <div className="imgs-container">
                <div className="twoimg-comtainer">
                  <div className="imgsmall1">
                    <img src={Book} className="mediumimg" alt="" />
                  </div>
                  <div className="image2">
                    <img src={Book} className="mediumimg" alt="" />
                  </div>
                </div>
                <div className="mainimg">
                  <img src={image} className="bigimg" alt="" />
                </div>
              </div>
              <div className="wishlist">
                {this.handleCartItem(this.props.displayDetail._id) ? (
                  <button className="addtobag">Added To Bag</button>
                ) : (
                  <button
                    className="addtobag"
                    onClick={() => this.addedtoCart(this.props.displayDetail)}
                  >
                    Add To Bag
                  </button>
                )}
                <button className="addwishlist"  onClick={()=>this.addToWishList(this.props.displayDetail._id)}>
                <i class="zmdi zmdi-favorite"></i> <span>WishList</span>
              </button>
              </div>
            </div>
            <div className="details">
              <div className="bookdetail">
                <div className="cardcontainer">
                  <div className="titlebook">
                    {this.props.displayDetail.bookName}
                  </div>
                  <div className="author">
                    <span className="byauthor">by</span>
                    <span className="authorname">
                      {this.props.displayDetail.author}
                    </span>
                  </div>
                  <div className="card-rating">
                    <div className="star">
                      <div className="number">4.5</div>
                      <div className="rating-star">
                        <i class="zmdi zmdi-star"></i>
                      </div>
                    </div>

                    <span style={{ color: "grey", marginLeft: "8px" }}>
                      (20)
                    </span>
                  </div>
                  <div className="card-price">
                    <span className="discount-price">
                      Rs.{this.props.displayDetail.price}
                    </span>
                    <span className="price">
                      <strike></strike>
                    </span>
                  </div>
                </div>
              </div>
              <div className="horizoantalline">
                {" "}
                <hr></hr>
              </div>
              <div className="desc-book">
                <div className="desc-title">
                  <span className="dot"></span>
                  <span>Book Detail</span>
                </div>
                <div className="lorem">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Nobis assumenda minus libero minima ad, optio recusandae!
                  Laboriosam velit, labore nulla minima vel magni accusamus unde
                  ratione nostrum rerum! Voluptas asperiores ratione tempora
                  magni atque sunt doloribus velit molestias! Commodi blanditiis
                  hic sunt illo cum libero repellat voluptates quia sapiente
                  quos.
                </div>
              </div>
              <div className="horizoantalline">
                {" "}
                <hr></hr>
              </div>
              <div className="customer-feedback">
                <span className="feedback">Customer Feedback</span>
                <CustomerFeedback />
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}
export default withRouter(withStyles(styles)(BookDeatail));
