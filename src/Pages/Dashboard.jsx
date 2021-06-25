import React, { Component } from 'react'
import Header from '../components/Header/Header'
import DisplayBook from '../components/Displayb/DisplayB'
// import BookDeatail from '../components/BookDetails/BookDeatail'



export default class Dashboard extends Component {
    constructor(){
        super()
        this.state={
            show:false
        }
    }

    render() {
        return (
            <div>
                <Header/>
                <DisplayBook/>
                {/* <BookDeatail/> */}
            </div>
        )
    }
}
