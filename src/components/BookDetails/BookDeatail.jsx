import React, { Component } from "react";
import "./BookDetail.css";
import Book from "../../assets/Image 11.png";
import image from "../../assets/Image 11@2x.png";
import CustomerFeedback from "./CustomerFeed";
import UserService from "../../Services/userService";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";


const service= new UserService();
const styles = theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
});
 class BookDeatail extends Component {
  constructor(props) {
    super(props);
    this.state = {
        inputQuantity: true,
        getCart: [],
        cartId:""
    }
}
  componentDidMount() {
    this.gtCart();
}
gtCart=()=>{
  service.getCartItems().then((res) => {
    console.log("getCart",res);
    // if(this.state.cartId === res.data.result.product_id._id){
        this.setState({ getCart: res.data.result });
    // }
    console.log("getCartdata",this.state.getCart);
})
}
addedtoCart = (value) => {
  this.setState({ inputQuantity: !this.state.inputQuantity })
  let data = {
    isCart: true
  }
  // let token = localStorage.getItem('Token')
  console.log(value);
  this.handleToggle();
  service.addToCartBook(data, value._id).then((res) => {
    console.log(value);
    console.log(res);
    this.setState({ cartId: value._id })
    console.log("cartId", this.state.cartId);
    this.handleClose();
  })
    .catch((err) => {
      this.handleClose();
      console.log(err);
    })
}
handleClose = (event, reason) => {
  if (reason === "clickaway") {
    return;
  }
  this.setState({ show: false, pen: false });
};
handleToggle = () => {
  this.setState({ pen: !this.state.pen });
};
increment = (productid, quantity) => {
  let data = {
      "quantityToBuy": quantity + 1
  }
  console.log(data, productid);
  console.log("Quantity",quantity);
  service.cartIncrementDecrement(data, productid).then((res) => {
      this.gtCart();
      console.log(res);
  }).catch((err) => {
      console.log(err);
  })
}
decrement = (productid, quantity) => {
  let data = {
      "quantityToBuy": quantity - 1
  }
  if(data.quantityToBuy>1){
  service.cartIncrementDecrement(data, productid).then((res) => {
      this.gtCart();
      console.log(res);
  }).catch((err) => {
      console.log(err);
  })}
  else{
      console.log("The Rock")
  }
}
  render() {
    const { classes } = this.props;
    console.log(this.props.displayDetail, "display details");
    return (
      <>
      {this.state.pen ?
        <Backdrop
          className={classes.backdrop}
          open={this.state.pen}
          onClick={this.handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>:
        <div className="mainContainer">
          <div className="container">
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
              {this.state.inputQuantity ? <button
              className="addtobag" onClick={()=>this.addedtoCart(this.props.displayDetail)}
              >
                Add To Bag
              </button> : <><div className="addOrRemove">
              {/* {this.state.getCart.map((value,index)=>{ */}
              {/* return ( <> */}
              {/* {value._id === this.props.displayBookDetails._id ? <> */}
              <button
                className="addbtn" 
                style={{ opacity: 0.4, cursor:"pointer" }} onClick={()=>this.increment(this.props.displayDetail._id, this.props.displayDetail.quantityToBuy)}
                >
                +
              </button>
              <button
                className="addbtn" 
                onClick={() => this.decrement(this.props.displayDetail._id, this.props.displayDetail.quantityToBuy)} 
                >
                -
              </button>
              {/* </>: null */}
              {/* } */}
              {/* </>) */}
              {/* })} */}
              </div></>
              }
              <button className="addwishlist">
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

                  <span style={{ color: "grey", marginLeft: "8px" }}>(20)</span>
                </div>
                <div className="card-price">
                  <span className="discount-price">
                    Rs.{this.props.displayDetail.price}
                  </span>
                  <span className="price">
                    <strike>
                      {/* Rs.{this.props.displayDetail.price} */}
                    </strike>
                  </span>
                </div>
              </div>
            </div>
            <div className="horizoantalline">
              <hr></hr>
            </div>
            <div className="desc-book">
              <div className="desc-title">
                <span className="dot"></span>
                <span>Book Detail</span>
              </div>
              <div className="lorem">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis
                assumenda minus libero minima ad, optio recusandae! Laboriosam
                velit, labore nulla minima vel magni accusamus unde ratione
                nostrum rerum! Voluptas asperiores ratione tempora magni atque
                sunt doloribus velit molestias! Commodi blanditiis hic sunt illo
                cum libero repellat voluptates quia sapiente quos.
              </div>
            </div>

            <div className="horizoantalline">
              {" "}
              <hr></hr>
            </div>
            <div className="customer-feedback">
              <span className="feedback">Customer Feedback</span>
                <CustomerFeedback/>
            </div>
            <div className="reviews">
              
            </div>
          </div>
        </div>
  }
      </>
    );
  }
}
export default withStyles(styles)(BookDeatail)