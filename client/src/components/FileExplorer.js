import React, { Component } from 'react';
import { Label, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, UncontrolledTooltip } from 'reactstrap';
import ProjectFile from './ProjectFile';
import AuthService from './AuthService';

export default class FileExplorer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            projectName: '',
            description: '',
            projectList: []
        };
    
        this.getProjects = this.getProjects.bind(this);
        this.createProject = this.createProject.bind(this);
        this.toggle = this.toggle.bind(this);
        this.Auth = new AuthService();
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
        this.Auth.fetchAuth('/api/file/create', {
            method: 'POST',
            body: JSON.stringify({
                name: 'boogaloo',
                type: 'py',
                projectId: 1
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

    toggle = () => {
        this.setState(prevState => ({
        modal: !prevState.modal
        }));
    }

    render() {
        const { projectName, description, projectList } = this.state;
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

                <div className="round-div bg-white py-2 pl-2 border">
                    <div className="list-box">
                        <div className="bg-dark text-light mt-2">
                            {projectList.map((project)=>
                                <div key={project.id}>
                                    <i className="fas fa-folder pl-2" >{' '}{project.name}</i>
                                    <span className="float-right mr-2"><i className="fa fa-plus" aria-hidden="true"></i></span>
                                    {project.files.map(file =>
                                        <ProjectFile key={file.id} name={file.name+'.'+file.type}/>
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
