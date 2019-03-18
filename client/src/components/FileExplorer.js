import React, { Component } from 'react';
import { Label, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, UncontrolledTooltip } from 'reactstrap';
import ProjectFile from './ProjectFile';

export default class FileExplorer extends Component {

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
        const projectList = [
            {
                id: 'ProjectID1',
                name : 'Project 1',
                fileList: [
                    {
                        id : 'p1f1',
                        name : 'p1file1',
                    },
                    {
                        id: 'p1f2',
                        name : 'p1file2',
                    }
                ]
                    
            },
            {
                id: 'ProjectID2',
                name : 'Project 2',
                fileList: [
                    {
                        id : 'p2f1',
                        name : 'p2file2',
                    },
                    {
                        id: 'p2f2',
                        name : 'p2file2',
                    },
                    {
                        id: 'p2f3',
                        name : 'p2file3',
                    }
                ]
                    
            }
        ]
        return (
        
        <div>
            <div>
                <Label for="scriptArea" className="mb-3">Explorer</Label>

                {/* Popup form to create a new project */}
                <Button color="success" onClick={this.toggle} className="float-right" size="sm" id="CreateNewProject">
                    <i className="fa fa-plus" aria-hidden="true"></i>
                </Button>
                <UncontrolledTooltip placement="top" target="CreateNewProject">
                    Create New Project
                </UncontrolledTooltip>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Add a Project</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="projectName">Project Name</Label>
                                <Input type="text" id="ProjectName"></Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="description">Description (optional)</Label>
                                <Input type="textarea" rows="4" id="Description"></Input>
                            </FormGroup>
                            <Button color="primary" onClick={this.toggle}>Submit</Button>{' '}
                        </Form>
                    </ModalBody>
                </Modal>

                <div className="round-div bg-white py-2 pl-2 border">
                    <div className="list-box">
                        <div className="bg-dark text-light mt-2">
                            {projectList.map((project)=>
                                <div key={project.id}>
                                    <i className="fas fa-folder pl-2" >{' '}{project.name}</i>
                                    <span className="float-right mr-2"><i className="fa fa-plus" aria-hidden="true"></i></span>
                                    {project.fileList.map((file)=>
                                        <ProjectFile key={file.id} name={file.name}/>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}
