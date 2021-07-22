/* eslint-disable array-callback-return */
import React, { Component } from "react";
import Header from "../components/Header/header";
import DisplayBook from "../components/DisplayBook/displayBook";
import BookDetail from "../components/BookDetails/bookDetail";
import { Router, withRouter } from "react-router";
import UserService from "../Services/userService";
// const service= new UserService();
import { Route, Switch } from "react-router-dom";
import Futer from "../components/Footer/footer";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedBook: "",
      open: false,
      search: "",
      SearchedData: [],
      searchBook: false,
      showBooks: [],
      show: true,
      cartLength: "",
      cartbooks:[]
    };
  }
  componentDidMount(){
    this.gettingCart();
  }
  onClickBookDetails = (value) => {
    this.setState({ selectedBook: value });
    console.log(this.state.selectedBook, "selected book");
  };

  openCart = () => {
    this.setState({ open: true });
    console.log(this.state.open, "okay clixk");
    this.props.history.push("/cart");
  };

  gettingCart = () => {
    new UserService().getCartItems().then((res) => {
      console.log(res);
      this.setState({ cartbooks: res.data.result });
      console.log(this.state.cartbooks.length, "array length");
      // console.log(JSON.stringify(this.state._cartbooks));
    });
  };
  getBook = (books) => {
    this.setState({ showBooks: books });
    console.log("Get Books", books);
  };
  handleSearchBook = (value, status) => {
    this.setState({ search: value });
    console.log("Dashboard seaarch method", value);
    this.setState({ searchBook: status });
    console.log("search status", status);
    this.filterSearchBook(value);
  };
  filterSearchBook = (value) => {
    var array = [];
    this.state.showBooks
      .filter(
        (data) =>
          data.bookName.toLowerCase().includes(value.toLowerCase()) ||
          data.author.toLowerCase().includes(value.toLowerCase())
      )
      .map((searchedData) => {
        console.log("Filtered data : ", searchedData);
        array.push(searchedData);
        console.log("Array here", array);
        console.log("State here", this.state.SearchedData);
      });

    this.setState({ SearchedData: array });
    console.log("Array outside ", array);
  };
  handleShow = () => {
    this.setState({ show: !this.state.show });
  };
  // onClickHandle=(value)=>{
  //     console.log("on click handle",value);
  //     this.setState({selectedBook:value})
  //     this.props.history.push({pathname:"/bookDetails",
  //     state:{displayDetail:this.state.selectedBook}
  //   })
  // }
  render() {
    console.log(this.props.location, "props");
    return (
      <>
        <Header
          openCart={this.openCart}
          handleSearchBook={this.handleSearchBook}
          displayDetail={this.state.selectedBook}
          searchShow={this.state.show}
          searchBook={this.state.searchBook}
          cartBook={this.state.cartbooks.length}
        />
         <div style={{ minHeight: "80%" }}>
        {this.state.selectedBook ? (
          <BookDetail
            handleShow={this.handleShow}
            displayDetail={this.state.selectedBook}
          />
        ) : (
          <DisplayBook
            searchBook={this.state.searchBook}
            getBook={this.getBook}
            searchedData={this.state.SearchedData}
            search={this.state.search}
            bookDetail={this.onClickBookDetails}
          />
        )}
        </div>
        <div style={{ minHeight: "80%" }}>
          {/* <Route path="/dashboard">
            <DisplayBook
              onClickHandle={this.onClickHandle}
              searchBook={this.state.searchBook}
              getBook={this.getBook}
              searchedData={this.state.SearchedData}
              search={this.state.search}
              bookDetail={this.onClickBookDetails}
            />
          </Route>
          <Route path="/dashboard/bookDetails">
            <BookDetail
              handleShow={this.handleShow}
              displayDetail={this.state.selectedBook}
            />
          </Route> */}
          {/* <Router>
                    <Switch>
                        <Route exact path="/dashboard" component={DisplayBook} ></Route>
                        <Route path="/dashboard/bookdetail" component={BookDetail} ></Route>
                    </Switch>
            </Router> */}
        </div>
        {/* <Futer /> */}
      </>
    );
  }
}
export default withRouter(Dashboard);
