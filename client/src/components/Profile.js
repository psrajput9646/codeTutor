import React, { Component } from 'react';
import { Container, Row, Col, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, UncontrolledTooltip } from 'reactstrap';
import AuthService from './AuthService';
import { connect } from 'react-redux'
import { updateUser } from '../actions/user';


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            bio: ''
        };
        
        this.toggle = this.toggle.bind(this);
        this.updateProfile = this.updateProfile.bind(this);
        this.Auth = new AuthService();
    }

    formatName = (user) => {
        return user.firstName + ' ' + user.lastName;
    }
    
    updateProfile = (event) => {
        event.preventDefault();
        this.props.updateUser(this.state.bio);
        this.toggle();
    }

    handleChange = (event) => {
        this.setState({ bio: event.target.value})
    }
    
    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal,
            bio: this.props.user.bio
        }));
    }

    render() {
        const user = this.props.user;
        const owner = (user && this.props.currentUserId === this.props.user.id)? true : false;
        return (
        <div>
            {/* Profile Picture*/}
            <Container>
                <Row>
                    <Col className="col-10 offset-1">
                        <img className="profile-pic mx-auto d-block" src='../img/profile.png' alt="Profile"/>
                    </Col>
                </Row>
            </Container>

            {/* User Information */}
            {user &&
                <div>
                    <h4 className="mt-2"><strong>{this.formatName(user)}</strong></h4>
                    <h6>{user.username}</h6>
                    <span id="Likes">
                        <span className="text-secondary">
                            <i className="fas fa-heart fa text-danger"/>
                        </span>
                        <span className="font-weight-light pl-2">{user.likes}</span>
                    </span>
                    <UncontrolledTooltip placement="right" target="Likes">
                        Total Likes
                    </UncontrolledTooltip>
                    <hr className="mb-1"/>
                    <p>
                        <small>{user.bio}</small>
                    </p>
                </div>
            }

            {/* Edit Button And Modal*/}
            {owner &&
                <Button color="secondary" className="btn-sm btn-block" onClick={this.toggle}>Edit</Button>
            }
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>Edit Bio</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.updateProfile}>
                        <FormGroup>
                            <Label for="bio">Bio</Label>
                            <Input
                                type="textarea"
                                name="bio"
                                id="Bio"
                                rows="4"
                                value={this.state.bio}
                                onChange={this.handleChange}
                                placeholder="Add your bio"
                            ></Input>
                        </FormGroup>
                        <Button color="success">Submit</Button>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    currentUserId: state.currentUserId
})

const mapDispatchToProps = dispatch => ({
    updateUser: (bio) => dispatch(updateUser(bio))
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile);