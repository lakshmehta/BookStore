import React, { Component } from 'react'
import '../App.css'
import Picture from '../assets/2766594.png'
import Login from '../components/Login/login';
import UserService from '../Services/userService';
import Signup from '../components/SignUp/signup';

const service =new UserService();

export default class DispalyLoginAndSignUp extends Component {
    constructor(props) {
        super(props);
        this.state={
            login: false,
            fullName: "",
            email: "",
            password: "",
            mobile: "",
            fullNameError: false,
            emailError: false,
            passwordError: false,
            mobileError: false,
            fullNameErrormsg: "",
            emailErrormsg: "",
            passwordErrormsg: "",
            mobileErrormsg: "",
        }
    }
    switchToSignUp=()=>{
        this.setState({ login: true })
    }
    switchToLogin=()=>{
        this.setState({ login: false })
    }
  
    handleLogin=(e)=>{
        e.preventDefault();
        let data ={
            "email":"",
            "password":""
        }
        service.userlogin(data).then((result) => {
            console.log(result,"login method");
        }).catch((error) => {
            console.log(error);
        })
    }
    render() {
        return (<>
            <div className="image">
                <img src={Picture} alt="" style={{borderRadius:'50%', width:'215px', height:'215px'}}/>
                <div className="slogan"><strong>ONLINE BOOK SHOPPING</strong></div>
            </div>
            <div className="form">
                <div className="inlinelinks">
                    <div className={this.state.login === true ? "links":"links2" } onClick={this.switchToSignUp}><strong>LOGIN</strong></div>
                    <div className={this.state.login === false ? "links":"links2" } onClick={this.switchToLogin}><strong>SIGNUP</strong></div>
                </div>
                {this.state.login ? <Login/>:
                <>
                <Signup/>
                </>
                }
            </div>
            </>
        )
    }
}
