import React, { Component } from 'react';
import { Container, Row, Col} from 'reactstrap';
import Profile from './Profile.js';
import ScriptCollection from './ScriptCollection.js';

export default class Accounts extends Component {
    render() {
        return (
        <Container>
            <Row> 
                <Col sm="3" className="mt-3">
                    <Profile/>
                </Col>
                <Col sm="9">
                    <div className="mt-5">
                        <ScriptCollection/>
                    </div>
                </Col>
            </Row>
        </Container>
        )
    }
}