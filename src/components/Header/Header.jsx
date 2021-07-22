import React, { Component } from "react";
// import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import { Link } from "react-router-dom";
import Book from "../../assets/education.svg";
import "./header.css";
import Badge from "@material-ui/core/Badge";
import ProfilePopper from "../Profile/profile";
class Header extends Component {
  constructor() {
    super();
    this.state = {
      searchedBook: "",
    };
  }
  handleClick = () => {
    this.props.openCart();
    console.log("in header");
  };
  singOut = () => {
    localStorage.removeItem("usertoken");
    window.location.href = "http://localhost:3000";
    this.props.history.push("/");
  };
  handleChange = (value) => {
    this.setState({ searchedBook: value });
    console.log("searched word", this.state.searchedBook);
    console.log("header value", this.props.searchBook);
    this.props.handleSearchBook(value, true);
  };

  render() {
    return (
      <>
        <div className="appbar">
          <div>
            <Link to="/dashboard"><img src={Book} alt="" /></Link>
              <p style={{ cursor: "pointer",color: "white", textDecoration: "none", listStyleType: "none", }}>
               <Link to="/dashboard" style={{ cursor: "pointer",color: "white", textDecoration: "none", listStyleType: "none", }}>Bookstore</Link>
              </p>
              {!this.props.displayDetail && 
              <div className="input">
                <SearchOutlinedIcon className="searchicon" />
              <input
                type="text"
                placeholder="Search"
                onChange={(e) => this.handleChange(e.target.value)}
              />
            </div>}
          </div>
          <div className="icons">
            <div className="pro">
               <ProfilePopper />
              Profile
            </div>
            <div className="cart">
              <Badge
                color="white"
                badgeContent={this.props.cartBook}
                className="badge"
              >
                <ShoppingCartOutlinedIcon
                  className="carticon"
                  onClick={this.handleClick}
                />
              </Badge>
              Cart 
            </div>
          </div> 
        </div>
      </>
    );
  }
}
export default Header;
