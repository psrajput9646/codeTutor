import React, { Component } from 'react';
import { Container, Row, Col} from 'reactstrap';
import ScriptArea from './ScriptArea.js';
import Comment from './Comment.js';
import ScriptInput from './ScriptInput.js';
import ScriptOutput from './ScriptOutput.js';

export default class Editor extends Component {
    render() {
        return (
        <div id="editorWindow" onload="resizeEditor()">
            <Container>
                <h3 className="pt-3" id="editorName">ScriptName.js</h3>
                <Row className="mt-3 mb-0">
                    <Col sm="12" md="8" className="h-100" id="editorRight">
                        <ScriptArea/>
                        <Row className ="" id="ioField">
                            <Col sm="12" md="6">
                                <ScriptInput/>
                            </Col>
                            <Col sm="12" md="6">
                                <ScriptOutput/> 
                            </Col>
                        </Row>
                    </Col>
                    <Col sm="12" md="4">
                        <Comment/>
                    </Col>
                </Row>
            </Container>
        </div>
        )
    }
}
