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
import { createFile } from '../actions/file'
import { connect } from 'react-redux'

class CreateScriptModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            fileName: "",
            fileType: ".java"
        };
        
        this.toggle = this.toggle.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    handleChange = event => {
        let name = event.target.value;
        let invalid = this.state.invalid;
    
        if(event.target.name === "fileName" && name){
            invalid = !/^[a-zA-Z]+$/.test(name)
        }
        this.setState({
          [event.target.name]: event.target.value,
          invalid
        })
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    submitForm(){
        this.props.createFile(this.props.id, this.state.fileName, this.state.fileType); 
        this.setState({
            fileName: "",
            fileType: ".java"
        });
        this.toggle();
    }

    render() {
        const {fileName, fileType} = this.state;
        const owner = (this.props.user && this.props.currentUserId === this.props.user.id)? true : false;

        if(!owner){
            return(<div></div>);
        }

        return (
            <div>
                <div onClick={this.toggle}
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
                                invalid={this.state.invalid}
                                type="text"
                                name="fileName"
                                id="fileName"
                                value={fileName}
                                onChange={this.handleChange}
                            />
                            <FormFeedback>Alphabet Characters Only!</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="fileType">File Type</Label>
                            <Input
                                type="select"
                                name="fileType"
                                value={fileType}
                                onChange={this.handleChange}>
                                <option value=".java">Java</option>
                                <option value=".py">Python</option>
                                </Input>
                                </FormGroup>
                            <Button color="success" onClick={this.submitForm} disabled={this.state.invalid}>Submit</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
    currentUserId: state.currentUserId
})

const mapDispatchToProps = dispatch => ({
    createFile: (id, name, type) => dispatch(createFile(id, name, type))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateScriptModal);