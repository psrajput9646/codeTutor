import React, { Component } from 'react';
import { Container, Row, Col, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, UncontrolledTooltip } from 'reactstrap';
import AuthService from './AuthService';

function formatName(user){
    return user.firstName + ' ' + user.lastName;
}

export default class Profile extends Component {
  
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            bio: '',
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
        return (
        <div>
            <Container>
                <Row>
                    <Col className="col-10 offset-1">
                        <img className="profile-pic mx-auto d-block" src='../img/profile.png' alt="Profile"/> 
                    </Col>
                </Row>
            </Container>
            <h4 className="mt-2"><strong>{formatName(user)}</strong></h4>
            <h6>{user.userName}</h6>
            <span id="likes">
                <span className="text-secondary">
                    <i className="fas fa-heart fa text-danger"></i>
                </span>
                <span className="font-weight-light pl-2">
                    {user.likes}
                </span>
            </span>
            <UncontrolledTooltip placement="top" target="likes">
                Total Likes
            </UncontrolledTooltip>
            <hr className="mb-1"/>
            <p>
                <small>{user.bio}</small>
            </p>
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
                                value={user.bio}
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
