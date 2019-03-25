import React, { Component } from 'react';
import { Container, Row, Col, UncontrolledTooltip, Modal, ModalBody, FormGroup, Label, Input , Button } from 'reactstrap';
import ScriptArea from './ScriptArea.js';
import ScriptFeedback from './ScriptFeedback.js';
import ScriptInput from './ScriptInput.js';
import ScriptOutput from './ScriptOutput.js';
import FileExplorer from './FileExplorer.js';

export default class Editor extends Component {

    constructor(props) {
        super(props);
        this.state = {
        modal: false
        };
    
        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.setState(prevState => ({
        modal: !prevState.modal
        }));
    }

    render() {
        const scriptInfo = {
            name: "ScriptName.java"
        }
        return (
        <div id="EditorWindow">
            <Container fluid>
                <Row>
                    <h3 className="pt-3" id="EditorName">
                        {scriptInfo.name}{' '}
                        <i className="far fa-star" aria-hidden="true" id="FavoriteProjectStar"></i>
                        <UncontrolledTooltip placement="left" target="FavoriteProjectStar">
                            Favorite Project!
                        </UncontrolledTooltip>{' '}
                        <Button outline color="secondary" onClick={this.toggle} size="sm" id="EditScriptInfo">
                            Rename
                        </Button>
                    </h3>
                </Row>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalBody>
                        <FormGroup>
                            <Label for="projectName">Script Name</Label>
                            <Input type="text" id="projectName" placeholder={scriptInfo.name}></Input>
                        </FormGroup>
                        <Button color="primary" onClick={this.toggle}>Submit</Button>{' '}
                    </ModalBody>
                </Modal>
                <Row className="mt-3 mb-0 editor-content-height">
                    <Col sm="12" md="2" className="h-100">
                        <FileExplorer/>
                    </Col>
                    <Col sm="12" md="7">
                        <Row className="script-area-height">
                            <Col sm="12">
                                <ScriptArea/>
                            </Col>
                        </Row>
                        <Row className="io-area-height">
                            <Col sm="12" md="6">
                                <ScriptInput/>
                            </Col>
                            <Col sm="12" md="6">
                                <ScriptOutput/> 
                            </Col>
                        </Row>
                    </Col>
                    <Col sm="12" md="3" className="h-100">
                        <ScriptFeedback/>
                    </Col>
                </Row>
            </Container>
        </div>
        )
    }
}
