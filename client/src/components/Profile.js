import React, { Component } from 'react';
import { Container, Row, Col, Button} from 'reactstrap';

function formatName(user){
    return user.firstName + ' ' + user.lastName;
}

export default class Profile extends Component {
    render() {
        const user = this.props;
        return (
        <div>
            <Container>
                <Row>
                    <Col className="col-10 offset-1">
                        <img className="profilePic mx-auto d-block" src={user.img} alt="Profile"/> 
                    </Col>
                </Row>
            </Container>
            <h4 className="mt-2"><strong>{formatName(user)}</strong></h4>
            <h6>{user.userName}</h6>
            <div>
                <span className="text-secondary">
                    <i className="fas fa-heart fa text-danger"></i>
                </span>
                <span className="font-weight-light pl-2">
                    {user.likes}
                </span>
            </div>
            <hr className="mb-1"/>
            <p>
                <small>{user.bio}</small>
            </p>
            <Button color="secondary" className="btn-sm btn-block">Edit</Button>{' '}
        </div>
        )
    }
}
