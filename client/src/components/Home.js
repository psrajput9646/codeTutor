import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import ProjectFeed from './ProjectFeed.js';

export default class Home extends Component {
    render() {
        return (
        <div>
            <Container>
                <Row>
                    <Col sm="10">
                        <div className="mt-5" flush>
                        <h1>Project Feed</h1>
                            <ProjectFeed/>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
        )
    }
}