// Allows the user to sign into their account
import React, { Component } from 'react';
import { FormGroup, Label, Input, Button } from 'reactstrap';

export default class SignIn extends Component {
    render() {
        return (
        <div className="mx-3">
            <form>
                <h3 className="mt-3">Sign In</h3>
                <FormGroup className="mt-3">
                    <Label for="exampleEmail">Email</Label>
                    <Input type="email" name="email" id="email" placeholder="Email" />
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Input type="password" name="password" id="password" placeholder="password" />
                </FormGroup>
            </form>
            <Button color="success" type="submit" className="float-right">Sign In</Button>{''}
        </div>
        )
    }
}
