// Allows the user to sign up for an account
import React, { Component } from 'react';
import { FormGroup, Label, Input, Button } from 'reactstrap';

export default class SignUp extends Component {
    render() {
        return (
        <div className="mx-3">
            <form>
                <h3 className="mt-3">Sign Up</h3>
                <FormGroup className="mt-3">
                    <Label for="exampleEmail">Email</Label>
                    <Input type="email" name="email" id="email" placeholder="Email"/>
                    <Input className = "mt-3" type="email" name="emailConfirm" id="emailConfirm" placeholder="Email Confirm"/>
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Input type="password" name="password" id="password" placeholder="password"/>
                    <Input className = "mt-3" type="password" name="passwordConfirm" id="passwordConfirm" placeholder="Password Confirm"/>
                </FormGroup>
            </form>
            <Button color="success" type="submit" className="float-right mb-5">Sign Up</Button>{' '}
        </div>
        )
    }
}
