// Provides script information
import React, { Component } from 'react';
import { ListGroupItem, Button, Modal, ModalHeader, ModalBody, ModalFooter, Badge } from 'reactstrap';

export default class SolutionInfo extends Component {

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
        const solutionInfo = this.props;
        return (
        
        <ListGroupItem className="pb-0">
            
            {/* Popup form to view and approve solution */}
            <Button color="link" onClick={this.toggle} size="sm" id="ViewSolution">
                <span className="script-name">{solutionInfo.name}</span>
            </Button>
            {solutionInfo.author} <Badge pill>117</Badge>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>{solutionInfo.name}</ModalHeader>
                <ModalBody>
                    <p>Actual user code goes here?
                        <br/><br/>
                        Description about the script imply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                    </p>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={this.toggle}>Decline</Button>
                    <Button color="success" onClick={this.toggle}>Approve</Button>
                </ModalFooter>
            </Modal>
            <p>{solutionInfo.description}</p>
        </ListGroupItem>
        )
    }
}
