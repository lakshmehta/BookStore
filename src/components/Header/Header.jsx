import React, { Component } from 'react';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import { BrowserRouter as  Link } from 'react-router-dom';
import Book from '../../assets/education.svg'
import './Header.css'
import Badge from '@material-ui/core/Badge';
import ProfilePopper from '../Profile/Profile'
class Header extends Component{
    constructor(){
        super()
        this.state={
            searchedBook:""
        }
    }
    openClickOpen=() =>{
        this.props.openCart();
        console.log("in header");
    }
    // toDashboard=()=>{
    //     this.props.history.push("/dashboard")
    // }
    singOut=()=>{
        localStorage.removeItem('usertoken');
        window.location.href = "http://localhost:3000";
        this.props.history.push("/")
    }
    handleChange=(value)=>{
        this.setState({searchedBook:value})
        console.log("searched word",this.state.searchedBook)
        console.log("header value",this.props.searchBook)   
        this.props.handleSearchBook(value,true)      
    }
    
    render(){
        return(
        <>
            <div className="appbar">
                <div>
                    <img src={Book}  alt=""/>
                    <p style={{cursor:'pointer'}} onClick={()=>this.toDashboard()}><Link to ="/dashboard" style={{listStyleType:"none",color:'white',textDecoration:'none', }}>Bookstore</Link></p>
                    <div className="input">
                        < SearchOutlinedIcon className="searchicon" />   
                        <input type="text" placeholder="Search" onChange={(e)=>this.handleChange(e.target.value)}/>
                    </div>
                </div>
                <div>
                    <div className="pro">
                        {/* <PermIdentityIcon className="proicon"/> */}
                            <ProfilePopper/>
                            Profile
                    </div>
                    <div className="cart">
                        <Badge  color="white" badgeContent={this.props.cartBook} className="badge">
                            <ShoppingCartOutlinedIcon className="carticon" onClick={this.openClickOpen}/>
                        </Badge>
                                Cart
                       
                    </div>
                </div>
            </div>
        </>
        )
    }
}
export default Header;