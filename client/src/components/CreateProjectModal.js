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
import { createProject } from '../actions/projects'
import { connect } from 'react-redux'

class CreateProjectModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: false,
            invalid: false,
            projectName: '',
            description: ''
        };

        this.toggle = this.toggle.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    handleChange = event => {
        let name = event.target.value;
        let invalid = this.state.invalid;
        if(event.target.name === "projectName" && name){
            invalid = !/^[a-zA-Z0-9 ]+$/.test(name)
        }
        this.setState({
            [event.target.name]: event.target.value,
            invalid
        })
    }

    submitForm = (event) =>{
        event.preventDefault();
        this.props.createProject(this.state.projectName, this.state.description); 
        this.setState({
            projectName: '',
            description: ''
        });
        this.toggle();
    }

    render() {
        const { projectName, description} = this.state;
        const owner = (this.props.user && this.props.currentUserId === this.props.user.id)? true : false;
        
        if(!owner){
            return <div></div>
        }
        
        return (
            <div>
                <Button
                    id="CreateNewProject"
                    size="sm"
                    color="success"
                    onClick={this.toggle}>
                    {' '}
                    <i className="fas fa-plus"></i>
                </Button>
                <UncontrolledTooltip placement="top" target="CreateNewProject">
                Create New Project
                </UncontrolledTooltip>
                <Modal
                isOpen={this.state.modal}
                toggle={this.toggle}
                className={this.props.className}>
                <ModalHeader toggle={this.toggle}>Add a Project</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.submitForm}>
                        <FormGroup>
                            <Label for="projectName">Project Name</Label>
                            <Input
                            invalid={this.state.invalid}
                            type="text"
                            name="projectName"
                            id="ProjectName"
                            value={projectName}
                            onChange={this.handleChange}
                            placeholder="Add project name"
                            />
                            <FormFeedback>Alphanumeric Characters Only!</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="description">Description (optional)</Label>
                            <Input
                            type="textarea"
                            name="description"
                            id="Description"
                            rows="4"
                            value={description}
                            onChange={this.handleChange}
                            placeholder="Add short project description"
                            />
                        </FormGroup>
                        <Button color="success" onClick={this.submitForm}>
                            Submit
                        </Button>
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
    createProject: (projectName, description) => dispatch(createProject(projectName, description))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateProjectModal);