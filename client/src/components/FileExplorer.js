import React, { Component } from 'react';
import { Label, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, UncontrolledTooltip } from 'reactstrap';
import ProjectFile from './ProjectFile';
import AuthService from './AuthService';

export default class FileExplorer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
            secondModalIsOpen: false,
            projectName: '',
            description: '',
            projectList: [],
            fileName: ''
        };
    
        this.getProjects = this.getProjects.bind(this);
        this.createProject = this.createProject.bind(this);
        this.toggle = this.toggleModal.bind(this);
        this.Auth = new AuthService();
    }

    toggleModal = () => {
        this.setState(prevState => ({modalIsOpen: !prevState.modalIsOpen}));
    }

    toggleSecondModal = () => {
        this.setState(prevState => ({secondModalIsOpen: !prevState.secondModalIsOpen}));
    }

    componentDidMount(){
        this.getProjects()
    }

    createProject = () =>{
        const {projectName, description, projectList} = this.state;
        let newList = projectList;
        this.Auth.fetchAuth('/api/project/create', {
            method: 'POST',
            body: JSON.stringify({
                name: projectName,
                description
            })
        })
        .then(res => {
            res.files=[];
            newList.push(res);
            this.setState({
                projectList: newList
            });
        })
        .catch(err => {
            console.log(err)
        })
            this.toggle();
    }

    createFile = () =>{
        const {fileName} = this.state;
        this.Auth.fetchAuth('/api/file/create', {
            method: 'POST',
            body: JSON.stringify({
                name: fileName,
                type: 'py', // Is file type necessary? The compile script checks for type
                projectId: 1 // NEED TO MAKE THIS THE ACTUAL PROJECT ID
            })
        })
        .then(res => {
            if (!res.OK) {
                console.log("File Successfully Created");
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    getProjects = () =>{
        let user = this.Auth.getProfile();
        this.Auth.fetchAuth('/api/project/projects/'+user.id, {
            method: 'GET'
        })
        .then(res => {
            this.setState({
                projectList: res
            });
        })
        .catch(err => {
            console.log(err)
        })
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    render() {
        const { projectName, description, projectList, fileName } = this.state;
        return (
            <div className="h-100">
                <Label for="scriptArea" className="mb-3">Explorer</Label>
                {/* Popup form to create a new project */}
                <Button color="success" onClick={this.toggleModal} className="float-right" size="sm" id="CreateNewProject">
                    <i className="fa fa-plus" aria-hidden="true"></i>
                </Button>
                <UncontrolledTooltip placement="top" target="CreateNewProject">
                    Create New Project
                </UncontrolledTooltip>
                <Modal isOpen={this.state.modalIsOpen} toggle={this.toggleModal} className={this.props.className}>
                    <ModalHeader toggle={this.toggleModal}>Add a Project</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="projectName">Project Name</Label>
                                <Input 
                                    type="text"
                                    name="projectName"
                                    id="ProjectName"
                                    value={projectName}
                                    onChange={this.handleChange}
                                ></Input>
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
                                ></Input>
                            </FormGroup>
                            <Button color="success" onClick={this.createProject}>Submit</Button>{' '}
                        </Form>
                    </ModalBody>
                </Modal>

                <div className="round-div bg-white py-2 pl-2 border list-box-outer">
                    <div className="list-box">
                        <div className="bg-dark text-light mt-2">
                            {projectList.map((project)=>
                                <div key={project.id}>
                                    <i className="fas fa-folder pl-2" >{' '}{project.name}</i>
                                    {/* Popup form to add a file to project */}
                                    <span className="float-right mr-2" onClick={this.toggleSecondModal} id="AddFile">
                                        <i className="fa fa-plus" aria-hidden="true"></i>
                                    </span>
                                    <UncontrolledTooltip placement="top" target="AddFile">
                                        Add a File
                                    </UncontrolledTooltip>
                                    <Modal isOpen={this.state.secondModalIsOpen} toggle={this.toggleSecondModal} className={this.props.className}>
                                        <ModalHeader toggle={this.toggleSecondModal}>Add a File</ModalHeader>
                                        <ModalBody>
                                            <FormGroup>
                                                <Label for="fileName">File Name</Label>
                                                <Input
                                                    type="text"
                                                    name="fileName"
                                                    id="fileName"
                                                    value={fileName}
                                                    onChange={this.handleChange}
                                                ></Input>
                                            </FormGroup>
                                            <Button color="success" onClick={this.createFile}>Submit</Button>{' '}
                                        </ModalBody>
                                    </Modal>
                                    {project.files.map(file =>
                                        <ProjectFile key={file.id} name={file.name+'.'+file.type}/>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
