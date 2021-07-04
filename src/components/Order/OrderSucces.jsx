import React from 'react';
import Header from '../Header/Header';
import Button from 'react-bootstrap/Button';
import './OrderSucces.css';
import ContactTable from './contact';


export default class OrderSucess extends React.Component {
   toDashboard=()=>{
        this.props.history.push('/dashboard')
    }
    render() {
        return (
            <>  
            <Header/>
            <div className="books-wrapper">
            <div className="success-wrapper">
                <div className="success-decoration">
                    <h4>Order Placed Successfully</h4>
                </div>
            </div>
            <div className="success-wrapper">
                <div className="greet-text">
                hurray!!! your order is confirmed the order id is #123456 save the order id for further communication..
                </div>
            </div>
            <div className="success-wrapper contact-table-wrapper">
                <ContactTable></ContactTable>
            </div>
            <div className="success-wrapper">
                <Button className="basic-button" onClick={()=>this.toDashboard()}> CONTINUE SHOPPING </Button>
            </div>
        </div>
            {/* <Footer /> */}
            </>
        )
    }

}