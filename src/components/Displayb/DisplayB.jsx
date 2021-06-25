import React, { Component } from 'react';
import './DisplayB.css';
// import Select from '@material-ui/core/Select';
// import MenuItem from '@material-ui/core/MenuItem';
// import InputLabel from '@material-ui/core/InputLabel';
// import FormControl from '@material-ui/core/FormControl';
import UserService from '../../Services/userService';
import BookOne from '../../assets/Image 11.png';
import PaginationBar from './PaginationBar';
// import BookDeatail from '../BookDetails/BookDeatail';
// import { useHistory } from 'react-router-dom';

// import { Link } from "react-router-dom";

const service = new UserService();

export default class DisplayBook extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            _books: [],
            _cartBooks: [],
            postsPerPage: "8",
            currentPage: "1",
            books: [],
            checkbook: false,

        })
    }
   
    changepage = (e, newpage) => {
        console.log("imvdn");
        console.log(e.target.value);
        this.setState({ currentPage: newpage });
    };

    storeBooks = (books) => {
        this.books = books;
        return this.books;
    }
    getBooks = () => {
        return this.books;
    }
    handleChange = (event) => {
        this.setState({ age: event.target.value });
    };

    componentDidMount() {
        this.GetAllBooks();
    }

    GetAllBooks = () => {
        var books = [];
        service.getAllBooks().then((res) => {
            books = res.data.result;
            var boo = this.storeBooks(books);
            this.setState({ _books: boo });
        }).catch((err) => {
            console.log(err);
        })
    }
    getBooks = () => {
        console.log("rerender");
        this.setState({
            _books: this.getBooks(),
        })
    }

    render() {
        const LastBook = this.state.currentPage * this.state.postsPerPage;
        const FirstBook = LastBook - this.state.postsPerPage;
        console.log(this.state._books);
        console.log('vfvc', this.state._books);
        const currentBooks = this.state._books.slice(FirstBook, LastBook);
        return (
            <>
                <div className="usercontent">
                    <div className="inlineheader">
                        <div className="headers">
                            Books
                        </div>
                        {/* <div className="select">
                            <FormControl variant="outlined" >
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
                            </FormControl>
                        </div> */}
                    </div>
                    <div className="books" onClick={this.redirect}>
                        {currentBooks.map((book, index) => {
                            return <div className="showbooks">
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
                        })
                        }
                    </div>

                    <PaginationBar _books={this.state._books}
                        postsPerPage={this.state.postsPerPage}
                        currentPage={this.state.currentPage}
                        changepage={this.changepage}
                    />

                </div>
            </>
        )
    }
}
