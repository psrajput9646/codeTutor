import React, { Component } from 'react';
import { Container, Row, Col} from 'reactstrap';
import ScriptArea from './ScriptArea.js';
import Comment from './Comment.js';
import ScriptInput from './ScriptInput.js';
import ScriptOutput from './ScriptOutput.js';

export default class Editor extends Component {
    render() {
        return (
        <div className=" bg-warning" id="editorWindow" onload="resizeEditor()">
            <Container>
                <h3 className="pt-3">ScriptName.js</h3>
                <Row className="mt-3">
                    <Col sm="8 h6 bg-success" className="h-100">
                        <ScriptArea/>
                        <Row>
                            <Col sm="6">
                                <ScriptInput/>
                            </Col>
                            <Col sm="6">
                                <ScriptOutput/> 
                            </Col>
                        </Row>
                    </Col>
                    <Col sm="4" className="bg-danger">
                        <Comment/>
                    </Col>
                </Row>
                
            </Container>
        </div>
        )
    }
}
