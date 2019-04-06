import React from 'react'
import AuthService from '../AuthService';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
    let authService = new AuthService();
    const isLoggedIn = authService.isLoggedIn();

    return (
        <Route
            {...rest}
            render={props => 
            isLoggedIn ? (
                <Component {...props} />
            ) : (
                <Redirect to='/signIn' />
            )}
        />
    )
}

export default PrivateRoute;