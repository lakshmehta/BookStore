import React from 'react'
import "./bookDetail.css";

class CustomerFeedback extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <>
                <div className="customer-feedback-container">
                    <div className="overall-rating">Overall rating</div>
                    <div className="rating-stars-container">
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star"></span>
                        <span class="fa fa-star"></span>
                    </div>
                    <div className="textarea-customerfeedback"><textarea className="textarea-actual-cutomerfeedback" rows="4" cols="72" placeholder="Write your review..."></textarea> </div>
                    <div className="submit-button-container-feedback"><button className="button"> Submit</button> </div>
                </div>
            </>
        )
    }
}

export default CustomerFeedback;