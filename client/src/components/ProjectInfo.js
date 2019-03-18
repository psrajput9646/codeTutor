// Provides script information
import React, { Component } from 'react';
import { ListGroupItem, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';

export default class ProjectInfo extends Component {
    
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
        const projectInfo = this.props;
        return (
        
        <ListGroupItem className="pb-0">
            <a href="/editor/">{projectInfo.name} </a>
            <Button outline color="secondary" onClick={this.toggle} size="sm" id="EditProjectInfo">
                Edit Description
            </Button>
            <p>{projectInfo.description}</p>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>{projectInfo.name}</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="projectName">Project Name</Label>
                            <Input type="text" id="projectName" placeholder={projectInfo.name}></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="description">Description</Label>
                            <Input type="textarea" rows="4" id="description" placeholder={projectInfo.description}></Input>
                        </FormGroup>
                        <Button color="primary" onClick={this.toggle}>Submit</Button>{' '}
                    </Form>
                </ModalBody>
            </Modal>
            
        </ListGroupItem>
        )
    }
}
