// Allows the user to sign up for an account
import React, { Component } from 'react';
import { FormGroup, Label, Input, Button, Row, Col, Alert, UncontrolledTooltip} from 'reactstrap';
import AuthService from './AuthService';
import Form from '../../node_modules/reactstrap/lib/Form';
import { Redirect } from 'react-router-dom'
import { connect } from "react-redux"
import  { setUserLoggedIn, setCurrentUserId } from "../actions/user"

class SignUp extends Component {
    constructor(props){
        super(props)
        this.Auth = new AuthService();
    }

    state = {
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
        redirect: false
    }

    //Submits the form when Enter key is pressed
    onKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            event.stopPropagation();
            this.handleSubmit();
        }
    }

    // Handles values in form
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    // Submits form
    handleSubmit = () => {
        const {
            firstName,
            lastName,
            password,
            username,
            email,
        } = this.state;

        this.Auth.fetchAuth("/api/user/create", {
            method: "POST",
            body: JSON.stringify({
                firstName,
                lastName,
                password,
                username,
                email
            })
        })
        .then(res => {
            this.Auth.setToken(res.token);
            this.props.setUserLoggedIn(true)
            this.props.setCurrentUserId();
            this.setState({
                redirect: true
            })
        })
        .catch(err => {
            console.log(err)
            this.setState({
                err
            })
        })
    }

    render() {
        
        const { firstName, lastName, password, email, username, redirect, err} = this.state; 

        if (redirect) {
            return <Redirect to='/' />
        }

        return (
        <div className="mx-3">
            <Form>
                <h3 className="mt-3">Sign Up</h3>
                <FormGroup className="mt-3">
                    <Label for="firstname">Name</Label>
                    <Row>
                        <Col md={6} sm={12}>
                            <Input 
                                type="text" 
                                name="firstName" 
                                id="Fname" 
                                placeholder="First Name"
                                value={firstName}
                                onChange={this.handleChange}
                            />
                        </Col>
                        <Col md={6} sm={12}>
                            <Input
                                className="mt-3 mt-md-0"
                                type="text" 
                                name="lastName"
                                id="LastName"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={this.handleChange}
                                onKeyDown={this.onKeyDown}
                            />
                        </Col>
                    </Row>
                </FormGroup>
                <FormGroup className="mt-3">
                    <Label for="userName">Username</Label>
                    <Input 
                        type="text"
                        name="username"
                        id="SignUpUsername"
                        placeholder="Username"
                        value={username}
                        onChange={this.handleChange}
                        onKeyDown={this.onKeyDown}
                    />
                </FormGroup>
                <FormGroup className="mt-3">
                    <Label for="email">Email</Label>
                    <Input 
                        type="email"
                        name="email"
                        id="Email"
                        placeholder="Email"
                        value = {email}
                        onChange = {this.handleChange}
                        onKeyDown={this.onKeyDown}
                    />
                    <Input 
                        className = "mt-3" 
                        type="email" 
                        name="emailConfirm" 
                        id="EmailConfirm" 
                        placeholder="Email Confirm"
                    />
                </FormGroup>
                <FormGroup id="SignUpPasswordGroup">
                    <Label for="password">Password</Label>
                    <Input
                        type="password"
                        name="password" 
                        id="Password" 
                        placeholder="Password"
                        value={password}
                        onChange={this.handleChange}
                        onKeyDown={this.onKeyDown}
                    />
                    <Input
                        className = "mt-3"
                        type="password"
                        name="passwordConfirm"
                        id="PasswordConfirm"
                        placeholder="Password Confirm"
                    />
                </FormGroup>
                <UncontrolledTooltip placement="top" target="SignUpPasswordGroup">
                    Min. 8 char, max 100 char, 1 uppercase, 1 lowercase, 1 digit, 1 symbol, and no spaces
                </UncontrolledTooltip>
            </Form>
            {err && <Alert color="danger">{err}</Alert>}
            <Button     
                color="success"
                type="submit"
                className="float-right mb-5"
                onClick={this.handleSubmit}
            >Sign Up
            </Button>
        </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
  })
  
  const mapDispatchToProps = dispatch => ({
    setUserLoggedIn: (status) => dispatch(setUserLoggedIn(status)),
    setCurrentUserId: () => dispatch(setCurrentUserId())
  })
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(SignUp)
