import React, { Component } from "react";
import "./displayBook.css";
// import Select from '@material-ui/core/Select';
// import MenuItem from '@material-ui/core/MenuItem';
// import InputLabel from '@material-ui/core/InputLabel';
// import FormControl from '@material-ui/core/FormControl';
import UserService from "../../Services/userService";
import BookOne from "../../assets/Image 11.png";
import PaginationBar from "./paginationBar";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";
// import Footer from "../Footer/Footer";

const service = new UserService();
const styles = theme => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  });

 class DisplayBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _books: [],
      _cartBooks: [],
      postsPerPage: "8",
      currentPage: "1",
      books: [],
      checkbook: false,
      pen:false,
      searchedBook: [],
      searchedData:[],
    };
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
  changepage = (e, newpage) => {
    console.log("imvdn");
    console.log(e.target.value);
    this.setState({ currentPage: newpage });
  };

  storeBooks = (books) => {
    this.books = books;
    return this.books;
  };
  getBooks = () => {
    return this.books;
  };
  handleChange = (event) => {
    this.setState({ age: event.target.value });
  };

  componentDidMount(){
    this.GetAllBooks();
  }
  
  GetAllBooks = () => {
    var books = [];
    this.handleToggle();
    service
      .getAllBooks()
      .then((res) => {
        books = res.data.result;
        var boo = this.storeBooks(books);
        this.setState({ _books: boo });
        this.props.getBook(books)
        this.handleClose()
      })
      .catch((err) => {
        this.handleClose();
        console.log(err);
      });
  };
  getBooks = () => {
    console.log("rerender");
    this.setState({
      _books: this.getBooks(),
    });
  };
  openBookDetails = (value) => {
    console.log(value, "select book");
    this.props.bookDetail(value);
  };
  search = () =>{
    if(this.props.searchedData !== []){
       this.setState({ _books:this.props.searchedData});
   }

}

  render() {
    const { classes } = this.props;
    const LastBook = this.state.currentPage * this.state.postsPerPage;
    const FirstBook = LastBook - this.state.postsPerPage;
    const currentBooks = this.props.searchBook? this.props.searchedData.slice(FirstBook, LastBook) : this.state._books.slice(FirstBook, LastBook);   
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
        <div className="usercontent">
          <div className="inlineheader">
            <div className="headers">Books</div>
             <div className="select">
             {/* <select style={{ width: '157px', height: '47px' }} onChange={(e) => this.sortByPrice(e)} >
                <option selected >Sort by relevance</option>
                <option value="dsec" >Price: high to low</option>
                <option value="asec"  >Price: low to high</option>
                <option value="alp-asec" >Sort By: (A-Z)</option>
              </select> */}
                            {/*<FormControl variant="outlined" >
                                <InputLabel id="demo-simple-select-filled-label">sortbyrelevance</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={this.state.age}
                                    onChange={this.handleChange}
                                    label="Age"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Price : low to high</MenuItem>
                                    <MenuItem value={20}>Price : high to low</MenuItem>
                                </Select>
                            </FormControl>*/}
              </div> 
          </div>
          <div className="books" onClick={this.redirect}>
            {currentBooks.map((book, index) => {
              return (
                <div
                  className="showbooks"
                  onClick={() => this.openBookDetails(book)}
                >
                  <div className="bookimage">
                    <img src={BookOne} alt="" />
                  </div>
                  <div className="content">
                    <div className="bookname">{book.bookName}</div>
                    <div className="author">by{book.author}</div>
                    <div className="rating">
                      <div className="rate">4.5 &#9733;</div>
                    </div>
                    <div className="price">Rs.{book.price}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <PaginationBar
            _books={this.state._books}
            postsPerPage={this.state.postsPerPage}
            currentPage={this.state.currentPage}
            changepage={this.changepage}
          />
           {/* <Footer/> */}
        </div>
       
  }
      </>
    );
  }
}
export default withStyles(styles)(DisplayBook)

































// sortByPrice=(e)=>{
  //   console.log("sort")
  //   if(e.target.value === "desc"){
  //     let sortData=[...this.state._books].sort(function(a,b){
  //       return b.price-a.price
  //     })
  //     this.setState({_books:sortData})
  //   }
  //   else if(e.target.value === "asec"){
  //   let sortData=[...this.state._books].sort(function(a,b){
  //     return a.price-b.price
  //   })
  //   this.setState({_books:sortData})
  //   }
  //   else if(e.target.value==="alp-asec"){
  //     let sortData=[...this.state._books].sort(function(a,b){
  //       if(a.bookName<b.bookName){
  //         return -1;
  //       }
  //       return 0;
  //     })
  //     this.setState({_books:sortData})
  //   }
  //