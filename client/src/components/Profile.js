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
            bio: "",
            firstName: "",
            lastName: ""
        };
        
        this.Auth = new AuthService();
    }

    formatName = (user) => {
        return user.firstName + ' ' + user.lastName;
    }
    
    updateProfile = (event) => {
        event.preventDefault();
        const { firstName, lastName, bio } = this.state;
        const user = Object.assign({},{firstName, lastName, bio});
        
        this.props.updateUser(user, ["firstName", "lastName", "bio"]);
        this.toggle();
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value})
    }
    
    toggle = () => {
        const { firstName, lastName, bio } = this.props.user;
        this.setState(prevState => ({
            firstName,
            lastName,
            bio: (bio !== null)? bio : "",
            modal: !prevState.modal
        }));
    }

    render() {
        const user = this.props.user;
        const { firstName, lastName, bio } = this.state;
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
                        <span className="font-weight-light pl-2">{user.points}</span>
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

            {/* Edit Profile Only If Owner */}
            {owner &&
                <Button color="secondary" className="btn-sm btn-block" onClick={this.toggle}>Edit</Button>
            }
            
            {/* Edit Modal*/}
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>Edit Bio</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.updateProfile}>
                        <FormGroup>
                            <Label for="firstName">Name</Label>
                            <Row>
                            <Col md={6} sm={12}>
                                <Input
                                type="text"
                                name="firstName"
                                id="firstName"
                                placeholder="First Name"
                                value={firstName}
                                onChange={this.handleChange}
                                />
                            </Col>
                            <Col md={6} sm={12}>
                                <Input
                                type="text"
                                name="lastName"
                                id="lastName"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={this.handleChange}
                                />
                            </Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Label for="bio">Bio</Label>
                            <Input
                                type="textarea"
                                name="bio"
                                id="Bio"
                                placeholder="Add your bio"
                                rows="4"
                                value={bio}
                                onChange={this.handleChange}
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
    updateUser: (user, fields) => dispatch(updateUser(user, fields))
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile);