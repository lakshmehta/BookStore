import React, { Component } from 'react'
import { Redirect, Route } from 'react-router-dom'
export default class AuthRoute extends Component {
    render() {
        const Component = this.props.component;
        const isAuthenticated = localStorage.getItem('usertoken');
       
        return  (
            <Route render={props=>(
                isAuthenticated ?
                <Redirect to={{ pathname: '/dashboard' }} />
                :
                <Component {...props}/>
               
            )}/>
        )   

    }
}