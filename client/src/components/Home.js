import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import ProjectFeed from './ProjectFeed.js';

export default class Home extends Component {
    render() {
        
        return (
        <div>
            <Container>
                <Row>
                    <Col sm="12">
                        <div className="mt-5">
                        <h1>Help New Projects </h1>
                            <ProjectFeed/>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
        )
    }
}