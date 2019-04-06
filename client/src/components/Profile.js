import React, { Component } from 'react';
import { Container, Row, Col, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, UncontrolledTooltip } from 'reactstrap';
import AuthService from './AuthService';

function formatName(user){
    return user.firstName + ' ' + user.lastName;
}

function Loading(props) {
    const user = props.user;
    if (user.likes !== undefined){
        console.log(user.likes === undefined);
        return (
            <div>
            <h4 className="mt-2"><strong>{formatName(user)}</strong></h4>
            <h6>{user.username}</h6>
            <span id="Likes">
                <span className="text-secondary">
                    <i className="fas fa-heart fa text-danger"></i>
                </span>
                <span className="font-weight-light pl-2">
                    {user.likes}
                </span>
            </span>
            <UncontrolledTooltip placement="top" target="Likes">
                Total Likes
            </UncontrolledTooltip>
            <hr className="mb-1"/>
            <p>
                <small>{user.bio}</small>
            </p>
            </div>
        )
    }
    return  <h6>Loading...</h6>;
}

export default class Profile extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            modal: false,
            bio: ''
        };
    
        this.toggle = this.toggle.bind(this);
        this.Auth = new AuthService();
    }
    
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }
    
    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    render() {
        const user = this.props;
        const { bio } = this.state;
        return (
        <div>
            <Container>
                <Row>
                    <Col className="col-10 offset-1">
                        <img className="profile-pic mx-auto d-block" src='../img/profile.png' alt="Profile"/> 
                    </Col>
                </Row>
            </Container>
            <Loading user={user} />
            <Button color="secondary" className="btn-sm btn-block" onClick={this.toggle}>Edit</Button>{' '}
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>Edit Bio</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="bio">Bio</Label>
                            <Input
                                type="textarea"
                                name="bio"
                                id="Bio"
                                rows="4"
                                value={bio}
                                onChange={this.handleChange}
                            ></Input>
                        </FormGroup>
                        <Button color="success">Submit</Button>{' '}
                    </Form>
                </ModalBody>
            </Modal>
        </div>
        )
    }
}
