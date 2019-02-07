import React, { Component } from 'react';
import { Container, Row, Col} from 'reactstrap';
import TextArea from './TextArea.js';
import Comment from './Comment.js';
import ScriptInput from './ScriptInput.js';
import ScriptOutput from './ScriptOutput.js';

export default class Editor extends Component {
    render() {
        return (
        <div className="full-content-height">
            <Container>
                <h3 className="mt-3">ScriptName.js</h3>
                <Row className="mt-3">
                    <Col sm="8 h6">
                        <TextArea/>
                    </Col>
                    <Col sm="4">
                        <Comment/>
                    </Col>
                    <Col sm="6">
                        <ScriptInput/>
                    </Col>
                    <Col sm="6">
                        <ScriptOutput/>
                    </Col>
                </Row>
                
            </Container>
        </div>
        )
    }
}
