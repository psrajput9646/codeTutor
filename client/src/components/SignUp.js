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
        this.submitForm = this.submitForm.bind(this);
        this.createAccount = this.createAccount.bind(this);
    }

    state = {
        username: "",
        password: "",
        passwordConfirm: "",
        firstName: "",
        lastName: "",
        email: "",
        emailConfirm: "",
        err: [],
        redirect: false
    }

    //Submits the form when Enter key is pressed
    onKeyDown = (event) => {
    }

    // Handles values in form
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    // Submits form
    submitForm = (event) => {
        event.preventDefault();
        const { password, passwordConfirm,
            email, emailConfirm } = this.state;
        let err = [];
        if(password !== passwordConfirm){
            err.push("Passwords Do Not Match");
        }
        if(email !== emailConfirm){
            err.push("Emails Do Not Match");
        };
        this.setState({
            err
        })
        if(err.length === 0){
            this.createAccount()
        }
    }

    createAccount = () =>{
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
            console.log(res);
            if(typeof res.token !== "undefined"){
                this.Auth.setToken(res.token);
                this.props.setUserLoggedIn(true)
                this.props.setCurrentUserId();
                this.setState({
                    redirect: true
                })
            }else{
                this.setState({
                    err: ["Server Error: Token unsuccesfully created."]
                })
            }
        })
        .catch(err => {
            if(typeof err === "undefined"){
                this.setState({
                    err: ["An undefined error has occurred."]
                })
            }else{
                this.setState({
                    err: [err]
                })
            }
        })
    }

    render() {
        const { firstName, lastName, password, email, username,
            passwordConfirm, emailConfirm, redirect, err} = this.state;
        const passMatch = password === passwordConfirm;
        const emailMatch = email.toLowerCase() === emailConfirm.toLowerCase();
        
        if (redirect) {
            return <Redirect to='/' />
        }

        return (
        <div className="mx-3">
            <Form onSubmit={this.submitForm}>
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
                    />
                    <Input 
                        className = {emailMatch? "mt-3" : "mt-3 invalid"}
                        type="email" 
                        name="emailConfirm" 
                        id="EmailConfirm" 
                        placeholder="Email Confirm"
                        value = {emailConfirm}
                        onChange = {this.handleChange}
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
                    />
                    <Input
                        className = {passMatch? "mt-3" : "mt-3 invalid"}
                        type="password"
                        name="passwordConfirm"
                        id="PasswordConfirm"
                        placeholder="Password Confirm"
                        value={passwordConfirm}
                        onChange={this.handleChange}
                    />
                </FormGroup>
                <UncontrolledTooltip placement="top" target="SignUpPasswordGroup">
                    Min. 8 char, max 100 char, 1 uppercase, 1 lowercase, 1 digit, 1 symbol, and no spaces
                </UncontrolledTooltip>
                {err.map(e => <Alert key={e} color="danger">{e}</Alert>) }
                <Button     
                    color="success"
                    type="submit"
                    className="float-right mb-5"
                    onClick={this.submitForm}
                >Sign Up
                </Button>
            </Form>
            
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

export default connect(mapStateToProps,mapDispatchToProps)(SignUp)