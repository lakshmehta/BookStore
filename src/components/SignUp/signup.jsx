import React, { Component } from 'react'
import { TextField,  Button, InputAdornment } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import UserService from '../../Services/userService';
import '../../App.css'
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
});
const service =new UserService();

const name = React.createRef();
const email = React.createRef();
const pass = React.createRef();
const phone = React.createRef();
const save = React.createRef();


 class Signup extends Component {
    constructor(){
        super()
        this.state={
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
            open:false
        }
    }
    handleClose = (event, reason) => {
        if (reason === "clickaway") {
          return;
        }
        this.setState({ show: false, open:false});
      };
      handleToggle = () => {
        this.setState({ open: !this.state.open });
       
      };
changeState = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({ [name]: value })
}
checkValidation=()=>{
    this.setState({
        fullNameError:false,
        fullNameErrormsg: '',
        emailError: false,
        emailErrormsg: '',
        passwordError: false,
        passwordErrormsg: '',
        mobileError:false,
        mobileErrormsg:''
    })
    var valid = true;
    if(this.state.fullName.length == 0){
        this.setState({ fullNameError: true })
        this.setState({ fullNameErrormsg: "Enter full name " })
        valid = false;
    }
    let patt = "^[0-9a-zA-Z]+([.\\-_+][0-9a-zA-Z]+)*@[a-z0-9A-Z]+.[a-z]{2,4}([.][a-zA-Z]{2,})*$";
    let pattern = new RegExp(patt);
    if (!pattern.test(this.state.email)) {
        this.setState({ emailError: true })
        this.setState({ emailErrormsg: "Invalid Email address" })
        valid = false;
    }
    if (this.state.email.length == 0) {
        this.setState({ emailError: true })
        this.setState({ emailErrormsg: "Choose Email address" })
        valid = false;
    }

    if (this.state.password.length < 8) {
        this.setState({ passwordError: true })
        this.setState({ passwordErrormsg: "password should be atleast 8 characters" })
        valid = false;
    }

    if (this.state.password.length == 0) {
        this.setState({ passwordError: true })
        this.setState({ passwordErrormsg: "Enter a password" })
        valid = false;
    }

    if (this.state.mobile.length == 0) {
        this.setState({ mobileError: true })
        this.setState({ mobileErrormsg: "Enter a mobile" })
        valid = false;
    }

    return valid;
}

changeVisibility = () => {
    this.setState({ visibility: !this.state.visibility });
}
handleSignUp=(e)=>{
    e.preventDefault();
    if(this.checkValidation()){
        let data = {
            "fullName": this.state.fullName,
            "email": this.state.email,
            "password": this.state.password,
            "phone":this.state.mobile
        }
        this.handleToggle()
        service.userRegistration(data).then((result) => {
            console.log(result,"SignUp  method");
            this.handleClose()
            
        }).catch((error) => {
            this.handleClose()
            console.log(error);
        }) 
    }
}
    render() {
        const {classes} = this.props
        return (
            <>
                <TextField
                   id="outlined-basic"
                   label="Fullname"
                   className="textField"
                   variant="outlined"
                   margin='dense'
                   name="fullName"
                   error={this.state.fullNameError}
                   helperText={this.state.fullNameErrormsg}
                   onChange={(e) => this.changeState(e)}
                />
                <TextField 
                    id="outlined-basic"
                    label="Email "
                    className="textField"
                    variant="outlined"
                    margin='dense'
                    name="email"
                    onChange={(e) => this.changeState(e)}
                    error={this.state.emailError}
                    helperText={this.state.emailErrormsg}
                />
                <TextField
                    id="outlined-basic"
                    label="Password"
                    className="textField"
                    variant="outlined"
                    margin='dense'
                    name="password"
                    onChange={(e) => this.changeState(e)}
                    error={this.state.passwordError}
                    helperText={this.state.passwordErrormsg}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">
                            {this.state.visibility ? <Visibility className="end" onClick={this.changeVisibility} />
                            :
                            <VisibilityOff className="end" onClick={this.changeVisibility} />}
                        </InputAdornment>
                    }}
                /> 
                <TextField
                    id="outlined-basic"
                    label="mobile"
                    variant="outlined"
                    margin='dense'
                    className="textField"
                    name="mobile"
                    onChange={(e) => this.changeState(e)}
                    error={this.state.mobileError}
                    helperText={this.state.mobileErrormsg}
                />
                <Button
                    variant="contained" 
                    onClick={(e)=>this.handleSignUp(e)}>
                        Signup
                </Button>
                {this.state.open ?
        <Backdrop
          className={classes.backdrop}
          open={this.state.open}
          onClick={this.handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>:<></>}
            </>
        )
    }
}
export default withStyles(styles)(Signup)