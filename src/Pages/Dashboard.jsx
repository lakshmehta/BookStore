/* eslint-disable array-callback-return */
import React, { Component } from 'react'
import Header from '../components/Header/Header'
import DisplayBook from '../components/Displayb/DisplayB'
import BookDeatail from '../components/BookDetails/BookDeatail'
import { withRouter } from 'react-router'
import UserService from '../Services/userService'

// const service= new UserService();
 class Dashboard extends Component {
    constructor(props){
        super(props)
        this.state={
            selectedBook:"",
            open:false,
            search: "",
            SearchedData:[],
            searchBook:false,
            showBooks:[],
        }
    }
    onClickBookDetails=(value)=>{
        this.setState({selectedBook:value})
        console.log(this.state.selectedBook,"selected book");
    }
    
    openCart=()=>{
        this.setState({open:true})
        console.log(this.state.open,"okay clixk");
        this.props.history.push("/cart")
  }
 
  getCartBook=()=>{
      new UserService().getCartItems().then((result)=>{
          
      })
  }
  getBook = (books) =>{
    this.setState({showBooks: books});
     console.log("Get Books",books)
  }
  handleSearchBook = (value,status) => {
    this.setState({search: value});
    console.log("Dashboard seaarch method",value);  
    this.setState({searchBook: status})
    console.log("search status",status)
    this.filterSearchBook(value)
  }
  
  
  filterSearchBook = (value)=>{   
    var array = []
    this.state.showBooks.filter(data => data.bookName.toLowerCase().includes(value.toLowerCase()) || data.author.toLowerCase().includes(value.toLowerCase())).map((searchedData)=>{
        console.log("Filtered data : ", searchedData);
        array.push(searchedData);
        console.log("Array here", array)
        console.log("State here", this.state.SearchedData)
      })
     
      this.setState({SearchedData: array })
      console.log("Array outside ", array)
  }
    render() {
        return (
            <div>
                <Header openCart={this.openCart} handleSearchBook={this.handleSearchBook} searchBook={this.state.searchBook}/>
                {this.state.selectedBook ? <BookDeatail displayDetail={this.state.selectedBook}/>
                :    <DisplayBook searchBook={this.state.searchBook} getBook={this.getBook} searchedData={this.state.SearchedData} search={this.state.search} bookDetail={this.onClickBookDetails}/>
                }
            </div>
        )
    }
}
export default withRouter(Dashboard)