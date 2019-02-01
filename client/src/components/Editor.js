import React, { Component } from 'react';
import { Container, Row, Col} from 'reactstrap';
import TextArea from './TextArea.js';
import Comment from './Comment.js';
import ScriptInput from './ScriptInput.js';
import ScriptOutput from './ScriptOutput.js';

export default class Editor extends Component {
    render() {
        return (
        <div>
            <Container className="mt-3">
                <h3>ScriptName.js</h3>
                <Row className="mt-3">
                    <Col sm="6">
                        <TextArea/>
                    </Col>
                    <Col sm="6">
                        <Comment/>
                    </Col>
                </Row>
                <div>
                    <ScriptInput/>
                </div>
                <div>
                    <ScriptOutput/>
                </div>
            </Container>
        </div>
        )
    }
}
