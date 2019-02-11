// Allows the user to sign up for an account
import React, { Component } from 'react';
import { FormGroup, Label, Input, Button, Row, Col} from 'reactstrap';

export default class SignUp extends Component {
    render() {
        return (
        <div className="mx-3">
            <form>
                <h3 className="mt-3">Sign Up</h3>
                <FormGroup className="mt-3">
                    <Label for="firstname">Name</Label>
                    <Row>
                        <Col md={6} sm={12}>
                            <Input type="text" name="firstName" id="fname" placeholder="First Name"/>
                        </Col>
                        <Col md={6} sm={12}>
                            <Input type="text" className="mt-3 mt-md-0" name="lastname" id="lname" placeholder="Last Name"/>
                        </Col>
                    </Row>
                </FormGroup>
                <FormGroup className="mt-3">
                    <Label for="userName">Username</Label>
                    <Input type="text" name="userName" id="userName" placeholder="Username"/>
                </FormGroup>
                <FormGroup className="mt-3">
                    <Label for="email">Email</Label>
                    <Input type="email" name="email" id="email" placeholder="Email"/>
                    <Input className = "mt-3" type="email" name="emailConfirm" id="emailConfirm" placeholder="Email Confirm"/>
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input type="password" name="password" id="password" placeholder="Password"/>
                    <Input className = "mt-3" type="password" name="passwordConfirm" id="passwordConfirm" placeholder="Password Confirm"/>
                </FormGroup>
                <FormGroup>
                    <Label>Account Status</Label>
                    <Row>
                        <Col sm={6}>
                            <FormGroup check>
                                <Label check>
                                <Input type="radio" name="accountStatus" value="Student"/>{' '}
                                    Student
                                </Label>
                            </FormGroup>
                        </Col>
                        <Col sm={6}>
                            <FormGroup check>
                                <Label check>
                                <Input type="radio" name="accountStatus" value="Teacher"/>{' '}
                                    Teacher
                                </Label>
                            </FormGroup>
                        </Col>
                    </Row>
                </FormGroup>
            </form>
            <Button color="success" type="submit" className="float-right mb-5">Sign Up</Button>{' '}
        </div>
        )
    }
}
