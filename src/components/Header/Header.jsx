import React, { Component } from 'react';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import { BrowserRouter as  Link } from 'react-router-dom';
import Book from '../../assets/education.svg'
import './Header.css'
class Header extends Component{
    render(){
        return(
        <>
            <div className="appbar">
                <div>
                    <img src={Book}  alt=""/>
                    <p><Link to ="/dashboard" style={{listStyleType:"none",color:'white',textDecoration:'none'}}>Bookstore</Link></p>
                    <div className="input">
                        < SearchOutlinedIcon className="searchicon" />   
                        <input type="text" placeholder="Search"/>
                    </div>
                </div>
                <div>
                    <div className="pro">
                        <PermIdentityIcon className="proicon"/>
                            Profile
                    </div>
                    <div className="cart">
                        <ShoppingCartOutlinedIcon className="carticon" />
                            Cart
                    </div>
                </div>
            </div>
        </>
        )
    }
}
export default Header;