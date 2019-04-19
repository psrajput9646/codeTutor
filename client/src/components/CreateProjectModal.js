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
        this.setState({ [event.target.name]: event.target.value })
    }

    submitForm(){
        this.props.createProject(this.state.projectName, this.state.description); 
        this.toggle();
    }

    render() {
        if(!this.props.owner){
            return <div></div>
        }
        const { projectName, description} = this.state;
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
                    <Form onSubmit={this.createProject}>
                        <FormGroup>
                            <Label for="projectName">Project Name</Label>
                            <Input
                            type="text"
                            name="projectName"
                            id="ProjectName"
                            value={projectName}
                            onChange={this.handleChange}
                            placeholder="Add project name"
                            />
                            <FormFeedback>Alphabet Characters Only!</FormFeedback>
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
})

const mapDispatchToProps = dispatch => ({
    createProject: (projectName, description) => dispatch(createProject(projectName, description))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateProjectModal);