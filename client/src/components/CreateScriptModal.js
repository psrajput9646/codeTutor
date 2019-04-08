import React, { Component } from 'react';

import { 
    Label,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Input,
    UncontrolledTooltip,
    FormFeedback
} from 'reactstrap';

class CreateScriptModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };
        
        this.toggle = this.toggle.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }
        
    toggle() {
        this.setState(prevState => ({
        modal: !prevState.modal
        }));
    }

    submitForm(){
        this.props.createFile(this.props.id); 
        this.toggle();
    }
    render() {
        return (
            <div>
                <div className="text-center" onClick={this.toggle}
                    id={"AddFile"+ this.props.id}
                >
                    <i className="fa fa-plus" aria-hidden="true"></i>
                </div>
                <UncontrolledTooltip placement="top" target={"AddFile"+ this.props.id}>
                    Add a File +
                </UncontrolledTooltip>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="fileName">File Name</Label>
                            <Input
                                invalid={this.props.invalid}
                                type="text"
                                name="fileName"
                                id="fileName"
                                value={this.props.fileName}
                                onChange={this.props.handleFileName}
                            />
                            <FormFeedback>Alphabet Characters Only!</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="fileType">File Type</Label>
                            <Input
                                type="select"
                                name="fileType"
                                value={this.props.fileType}
                                onChange={this.props.handleChange}>
                                <option value=".java">Java</option>
                                <option value=".py">Python</option>
                                </Input>
                                </FormGroup>
                            <Button color="success" onClick={this.submitForm}>Submit</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default CreateScriptModal;