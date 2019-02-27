import React, { Component } from 'react';
import { Label, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
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
        return (
        <div>
            <div>
                <Label for="scriptArea" className="mb-3">Script Input</Label>

                {/* Buttons for script inputs */}
                <div>
                Add a Project
                <Button color="success" size="sm" className="float-right" onClick={this.toggle}>
                    <i className="fa fa-plus" aria-hidden="true"></i>
                </Button>{' '}
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Create a New Project</ModalHeader>
                    <ModalBody>
                        Insert some form here
                    </ModalBody>
                    <ModalFooter>
                        Insert submit and cancel buttons here
                    </ModalFooter>
                </Modal>
                </div>
                <br/>
                <div className="round-div bg-white py-2 pl-2 border">
                    <div className="list-box">
                        <div id="projectOne">
                            <div className="bg-dark text-light">
                                <div>
                                    <i className="fas fa-folder pl-2"> Project 1</i>
                                    <Button color="link" size="sm" className="float-right">
                                        <i className="fa fa-plus" aria-hidden="true"></i>
                                    </Button>{' '}
                                    <ProjectFile/>
                                </div>
                                <div>
                                    <i className="fas fa-folder pl-2"> Project 2</i>
                                    <Button color="link" size="sm" className="float-right">
                                        <i className="fa fa-plus" aria-hidden="true"></i>
                                    </Button>{' '}
                                    <ProjectFile/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}
