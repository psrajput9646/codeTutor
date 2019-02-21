import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

export default class Profile extends Component {
    render() {
        return (
        <div>
            <Container>
                <Row>
                    <Col className="col-10 offset-1">
                        <img className="profilePic mx-auto d-block" src="../img/profile.png" alt="Profile"/> 
                    </Col>
                </Row>
            </Container>
            <h4 className="mt-2"><strong>Peter Harlan</strong></h4>
            <h6>ptr35244</h6>
            <hr className="mb-1"/>
            <p>
                <small>
                    bio goes here Descrippsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially u
                </small>
            </p>
        </div>
        )
    }
}
