import React, { Component } from 'react';
import { Container, Row, Col, ListGroup } from 'reactstrap';
import Profile from './Profile.js';
import ScriptInfo from './ScriptInfo.js';

export default class Account extends Component {
    constructor(){
        super();
    }
    render() {
        return (
        <Container fluid>
            <Row> 
                <Col sm="3" className="mt-3">
                    <Profile/>
                </Col>
                <Col sm="9">
                    <ListGroup className="mt-3" flush>
                        <ScriptInfo/>
                        <ScriptInfo/>
                    </ListGroup>
                </Col>
            </Row>
        </Container>
        )
    }
}