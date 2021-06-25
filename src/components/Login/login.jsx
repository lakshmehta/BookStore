import React from "react";
import "./login.css";
import { TextField, Button, InputAdornment } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import UserService from "../../Services/userService";
import { withRouter } from "react-router";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
});
const service = new UserService();

function Alert(props) {
  return <MuiAlert variant="filled" {...props} />;
}
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: true,
      email: "",
      password: "",
      emailError: false,
      passwordError: false,
      emailErrormsg: "",
      passwordErrmsg: "",
      visibility: true,
      key: "user",
      open: false,
      pen:false,
      snackMessage: "",
      snackType: "",
      isLoading:true
    };
  }
  componentDidMount(){
    this.login();
  }
  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ show: false});
    this.props.history.push("/dashboard");
  };
  handleToggle = () => {
    this.setState({ pen: !this.state.pen });
    if(this.state.pen === false){

     return this.props.history.push("/dashboard");
    }
  };
  changeVisibility = () => {
    this.setState({ visibility: !this.state.visibility });
  };
  validationCheck = () => {
    this.setState({
      emailError: false,
      emailErrormsg: "",
      passwordError: false,
      passwordErrormsg: "",
    });
    var valid = true;

    let patter =
      "^[0-9a-zA-Z]+([.\\-_+][0-9a-zA-Z]+)*@[a-z0-9A-Z]+.[a-z]{2,4}([.][a-zA-Z]{2,})*$";
    let pattern = new RegExp(patter);
    if (!pattern.test(this.state.email)) {
      this.setState({ emailError: true });
      this.setState({ emailErrormsg: "Invalid Email address" });
      valid = false;
    }
    if (this.state.email.length == 0) {
      this.setState({ emailError: true });
      this.setState({ emailErrormsg: "Choose Email address" });
      valid = false;
    }

    if (this.state.password.length == 0) {
      this.setState({ passwordError: true });
      this.setState({ passwordErrormsg: "Enter a password" });
      valid = false;
    }

    return valid;
  };
  changeState = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({ [name]: value });
  };

  changeLogin = () => {
    console.log("im working");
    this.setState({ login: !this.state.login });
  };
  login = () => {
    let data = {
      email: this.state.email,
      password: this.state.password,
    };
    // this.setState({pen:true})
    service
      .userlogin(data)
      .then((res) => {
        this.handleToggle();
        console.log(res);
        this.setState({
          snackType: "success",
          snackMessage: "Login successful",
          open: true,
          setOpen: true,
        });
        localStorage.setItem("usertoken", res.data.result.accessToken);
        console.log(localStorage.getItem("usertoken"));
        this.setState({pen:false})
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          snackType: "error",
          snackMessage: "Login Failed",
          open: true,
          setOpen: true,
        });
      });
  };
  handleSnackClose = () => {
    this.setState({
      open: false,
      setOpen: false,
    });
  };
//   const {classes} = useStyle();
  render() {
    const { classes } = this.props;
    return (
      <>
        <TextField
          id="outlined-basic"
          label="Email Id"
          variant="outlined"
          onChange={this.changeState}
          name="email"
          margin="dense"
          helperText={this.state.emailErrormsg}
          error={this.state.emailError}
        />
        <div>
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            name="password"
            margin="dense"
            helperText={this.state.passwordErrormsg}
            fullWidth
            error={this.state.passwordError}
            type={this.state.visibility ? "text" : "password"}
            onChange={this.changeState}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {this.state.visibility ? (
                    <Visibility
                      className="end"
                      onClick={this.changeVisibility}
                    />
                  ) : (
                    <VisibilityOff
                      className="end"
                      onClick={this.changeVisibility}
                    />
                  )}
                </InputAdornment>
              ),
            }}
          />
        </div>
        <Button variant="contained" color="secondary" onClick={this.login}>
          Login
        </Button>
        {this.state.pen &&
        <Backdrop
          className={classes.backdrop}
          open={this.state.pen}
          onClick={this.handleClose}
          transitionDuration={3000}
          pen={this.state.pen}
        >
          <CircularProgress color="inherit" />
        </Backdrop>}
        <div
          style={{
            textAlign: "center",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <div className="line"></div>OR<div className="line"></div>
        </div>

        <div className="inlineButtons1">
          <Button variant="contained" className="button1" color="primary">
            Facebook
          </Button>
          <Button variant="contained" className="button2" color="default">
            {" "}
            Google
          </Button>
        </div>
        <div>
          <Snackbar
            style={{ width: "250px" }}
            open={this.state.open}
            autoHideDuration={3000}
            onClose={this.handleSnackClose}
          >
            <Alert severity={this.state.snackType}>
              {this.state.snackMessage}
            </Alert>
          </Snackbar>
        </div>
      </>
    );
  }
}

export default  withRouter(withStyles(styles)(Login));
