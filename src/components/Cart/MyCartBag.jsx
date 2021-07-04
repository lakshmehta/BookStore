/* eslint-disable array-callback-return */
import React from "react";
import Header from "../Header/Header";
import "./MyCartBag.css";
import UserService from "../../Services/userService";
import AddCircleOutlineTwoToneIcon from "@material-ui/icons/AddCircleOutlineTwoTone";
import RemoveCircleOutlineTwoToneIcon from "@material-ui/icons/RemoveCircleOutlineTwoTone";
import { TextField, Button } from "@material-ui/core";
import Dont from "../../assets/Image 11.png";
import Footer from "../Footer/Footer";

const service = new UserService();

class MyCartBag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _cartbooks: [],
      name: "",
      phno: "",
      pincode: "",
      locality: "",
      address: "",
      city: "",
      state: "",
      show: false,
      showOs: false,
      reload: true,
      nameError: false,
      phnoError: false,
      pincodeError: false,
      localityError: false,
      addressError: false,
      cityError: false,
      stateError: false,
    };
  }
  validationCheck = () => {
    this.setState({
      nameError: false,
      nameErrormsg: "",
      phnoError: false,
      phnoErrormsg: "",
      pincodeError: false,
      pincodeErrormsg: "",
      localityError: false,
      localityErrormsg: "",
      addressError: false,
      addressErrormsg: "",
      cityError: false,
      cityErrormsg: "",
      stateError: false,
      stateErrormsg: "",
    });
    var valid = true;
    if (this.state.name.length === 0) {
      this.setState({ nameError: true });
      this.setState({ nameErrormsg: "Enter your name " });
      valid = false;
    }

    let patter = /^[0-9]{10}$/;
    let pattern = new RegExp(patter);
    if (!pattern.test(this.state.phno)) {
      this.setState({ phnoError: true });
      this.setState({ phnoErrormsg: " enter your 10 digit mobile number" });
      valid = false;
    }
    let pincodePattern = /^[0-9]{6}$/;
    let pincodeNo = new RegExp(pincodePattern);
    if (!pincodeNo.test(this.state.pincode)) {
      this.setState({ pincodeError: true });
      this.setState({ pincodeErrormsg: "please enter your pin code" });
      valid = false;
    }
    let localityPattern = /[a-zA-Z][a-zA-Z ]*/;
    let local = new RegExp(localityPattern);
    if (!local.test(this.state.locality)) {
      this.setState({ localityError: true });
      this.setState({ localityErrormsg: "please enter your locality" });
      valid = false;
    }
    let addressPattern = /[a-zA-Z][a-zA-Z ]*/;
    let localaddress = new RegExp(addressPattern);
    if (!localaddress.test(this.state.address)) {
      this.setState({ addressError: true });
      this.setState({ addressErrormsg: "please enter  your address " });
      valid = false;
    }
    if (this.state.city.length === 0) {
      this.setState({ cityError: true });
      this.setState({ cityErrormsg: "Enter your  city " });
      valid = false;
    }
    let statePattern = /[a-zA-Z][a-zA-Z ]*/;
    let stateName = new RegExp(statePattern);
    if (!stateName.test(this.state.state)) {
      this.setState({ stateError: true });
      this.setState({ stateErrormsg: "please enter your state name" });
      valid = false;
    }
    return valid;
  };

  componentDidMount() {
    this.gettingCart();
  }
  gettingCart = () => {
    service.getCartItems().then((res) => {
      console.log(res);
      this.setState({ _cartbooks: res.data.result });
      console.log(this.state._cartbooks.length, "array length");
      // console.log(JSON.stringify(this.state._cartbooks));
    });
  };
  changeState = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({ [name]: value });
  };

  order = () => {
    let store = [];
    this.state._cartbooks.map((val) => {
      let arr = {
        product_id: val.product_id._id,
        product_name: val.product_id.bookName,
        product_quantity: val.quantityToBuy,
        product_price: val.product_id.price,
      };
      store.push(arr);
    });

    let data = {
      orders: store,
    };
    service
      .order(data)
      .then((res) => {
        console.log(res);
        this.props.history.push("/ordersucess");
      })
      .catch((err) => {
        console.log(err);
      });
    this.state._cartbooks.map((val) => {
      this.removeCartId(val._id);
    });
  };
  increment = (productid, quantity) => {
    let data = {
      quantityToBuy: quantity + 1,
    };
    console.log(data, productid);
    console.log("Quantity", quantity);
    service
      .cartIncrementDecrement(data, productid)
      .then((res) => {
        this.gettingCart();
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  changeStates = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({ [name]: value });
  };
  decrement = (productid, quantity) => {
    let data = {
      quantityToBuy: quantity - 1,
    };
    if (data.quantityToBuy > 1) {
      service
        .cartIncrementDecrement(data, productid)
        .then((res) => {
          this.gettingCart();
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("The Rock");
    }
  };
  submitUserDetails = () => {
    if (this.validationCheck()) {
      let data = {
        addressType: "Home",
        fullAddress: `${this.state.name},${this.state.address},${this.state.locality},${this.state.pincode},${this.state.phno}`,
        city: this.state.city,
        state: this.state.state,
      };

      service
        .userDetails(data)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      this.setState({ showOs: true });
    }
  };
  showCD = () => {
    this.setState({ show: true });
  };
  removeCartId = (id) => {
    service
      .removeCartItem(id)
      .then((res) => {
        console.log(res);
        this.setState({ reload: !this.state.reload });
        this.componentDidMount();
        // this.props.history.push('/home')
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    return (
      <>
        <Header show={false} cartBook={this.state._cartbooks.length} />

        <div className="cartcontent">
          {" "}
          <span className="Home">Home/MyCart</span>
          <div className="cartitems box">
            <div className="mycart">
              {" "}
              My Cart({this.state._cartbooks.length})
            </div>

            {this.state._cartbooks.map((val, index) => {
              return (
                <div className="part1">
                  <div className="container">
                    {" "}
                    <div>
                      <img src={Dont} alt="" />
                    </div>
                    <div className="items">
                      <div>{val.product_id.bookName}</div>
                      <div className="author"> by{val.product_id.author}</div>
                      <div className="price">
                        Rs.{val.product_id.price * val.quantityToBuy}
                      </div>
                      <div className="inlineicons">
                        <AddCircleOutlineTwoToneIcon
                          style={{ opacity: 0.4, cursor: "pointer" }}
                          onClick={() =>
                            this.increment(val._id, val.quantityToBuy)
                          }
                        />
                        <div className="quantity">{val.quantityToBuy}</div>
                        <RemoveCircleOutlineTwoToneIcon
                          style={{ opacity: 0.4, cursor: "pointer" }}
                          onClick={() =>
                            this.decrement(val._id, val.quantityToBuy)
                          }
                        />
                        <div
                          className="remove"
                          style={{ cursor: "pointer" }}
                          onClick={() => this.removeCartId(val._id)}
                        >
                          Remove
                        </div>
                      </div>
                    </div>
                  </div>
                  {this.state._cartbooks.length - 1 === index ? (
                    this.state.show ? null : (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.showCD}
                      >
                        Place Order
                      </Button>
                    )
                  ) : null}
                </div>
              );
            })}
          </div>
          <div className="customerdetails box">
            <div>Customer Details </div>
            {this.state.show ? (
              <>
                {" "}
                <div className="addressfield">
                  <TextField
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    name="name"
                    margin="dense"
                    // onChange={this.changeStates}
                    // eslint-disable-next-line react/jsx-no-duplicate-props
                    onChange={(e) => this.changeState(e)}
                    error={this.state.nameError}
                    helperText={this.state.nameErrormsg}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Phone number"
                    variant="outlined"
                    name="phno"
                    onChange={(e) => this.changeState(e)}
                    error={this.state.phnoError}
                    helperText={this.state.phnoErrormsg}
                    margin="dense"
                    // onChange={this.changeStates}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Pin Code"
                    variant="outlined"
                    name="pincode"
                    onChange={(e) => this.changeState(e)}
                    error={this.state.pincodeError}
                    helperText={this.state.pincodeErrormsg}
                    margin="dense"
                    //  onChange={this.changeStates}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Locality"
                    variant="outlined"
                    name="locality"
                    margin="dense"
                    onChange={this.changeStates}
                    error={this.state.localityError}
                    helperText={this.state.localityErrormsg}
                    // onChange={this.changeStates}
                  />
                  <TextField
                    id="outlined-basic"
                    label="address"
                    variant="outlined"
                    name="address"
                    fullWidth
                    className="address"
                    margin="dense"
                    // onChange={this.changeStates}
                    onChange={(e) => this.changeState(e)}
                    error={this.state.addressError}
                    helperText={this.state.addressErrormsg}
                  />
                  <TextField
                    id="outlined-basic"
                    label="city/town"
                    variant="outlined"
                    name="city"
                    margin="dense"
                    // onChange={this.changeStates}
                    onChange={(e) => this.changeState(e)}
                    error={this.state.cityError}
                    helperText={this.state.cityErrormsg}
                  />
                  <TextField
                    id="outlined-basic"
                    label="state"
                    variant="outlined"
                    name="state"
                    margin="dense"
                    // onChange={this.changeStates}
                    onChange={(e) => this.changeState(e)}
                    error={this.state.stateError}
                    helperText={this.state.stateErrormsg}
                  />
                </div>
                {this.state.showOs ? null : (
                  <Button variant="contained" onClick={this.submitUserDetails}>
                    Continue
                  </Button>
                )}{" "}
              </>
            ) : null}
          </div>
          <div className="cartitems box">
            <div className="mycart"> Ordersummary</div>
            {this.state.showOs ? (
              <>
                {" "}
                {this.state._cartbooks.map((val, index) => {
                  return (
                    <div className="part1">
                      <div className="container">
                        {" "}
                        <div>
                          <img src={Dont} alt="" />
                        </div>
                        <div className="items">
                          <div>{val.product_id.bookName}</div>
                          <div className="author">
                            {" "}
                            by{val.product_id.author}
                          </div>
                          <div className="price">
                            Rs.{val.product_id.price * val.quantityToBuy}
                          </div>
                        </div>
                      </div>
                      {this.state._cartbooks.length - 1 === index ? (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={this.order}
                        >
                          CHECKOUT{" "}
                        </Button>
                      ) : null}
                    </div>
                  );
                })}{" "}
              </>
            ) : null}
          </div>
        </div>
        <div style={{ marginTop: "50px", height: "50px" }}>
          <br></br>
          <br></br>
        </div>
        <Footer style={{ position: "absolute" }} />
      </>
    );
  }
}
export default MyCartBag;
