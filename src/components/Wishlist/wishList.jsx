/* eslint-disable array-callback-return */
import React, { Component } from "react";
import "./wishList.scss";
import Header from "../Header/header";
import UserService from "../../Services/userService";
import Book from "../../assets/Image 11.png";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
export default class Wishlist extends Component {
  constructor() {
    super();
    this.state = {
      wishListBook: [],
      cartbook: [],
    };
  }
  componentDidMount() {
    this.getWishList();
  }
  getWishList = () => {
    new UserService()
      .getWishList()
      .then((res) => {
        console.log(res);
        let book = res.data.result;
        console.log(book);
        this.setState({ wishListBook: book });
        console.log(this.state.wishListBook);
      })
      .catch((error) => {
        console.log(error, "error");
      });
  };
  getCartBook = () => {
    new UserService()
      .getCartItems()
      .then((result) => {
        this.setState({ cartbook: result.data.result });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  moveToCart = () => {
    new UserService()
      .addToCartBook()
      .then((result) => {
        this.getCartBook();
        this.delete();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  delete = () => {
    new UserService()
      .removeFromWishList()
      .then((result) => {
        this.getWishList();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    console.log(this.state.wishListBook, "wishlist ki book");
    return (
      <div>
        <Header />
        <div className="main-container">
          <div className="title1">Home/My Wishlist</div>
          <div className="cartBag-content1">
            <div className="heading-wishlist">My Whislist</div>
            {this.state.wishListBook.map((value) => {
            return (
              <>
                <div>{value.product_id.bookName}</div>
                <div>{value.product_id.author}</div>
                <div>{value.product_id.price}</div>
              </>
            );
          })}
          </div>
        </div>
      </div>
    );
  }
}
