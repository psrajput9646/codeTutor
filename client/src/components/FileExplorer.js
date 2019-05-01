import React, { Component } from 'react'
import { Label, UncontrolledTooltip, DropdownMenu, DropdownItem, UncontrolledDropdown, DropdownToggle,
  Modal, ModalHeader, ModalBody, Form, Button, FormGroup, FormFeedback, Input} from 'reactstrap'
import ProjectFile from './ProjectFile'
import AuthService from './AuthService'
import { createProject, getProjects, updateProject, deleteProject, selectProject } from '../actions/projects'
import { selectFile } from '../actions/file'
import { connect } from 'react-redux'
import CreateScriptModal from './CreateScriptModal'
import CreateProjectModal from './CreateProjectModal'

class FileExplorer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      favoritedProjects: [],
      deleteModal: false,
      renameModal: false,
      newDescription: "",
      newProjectName: "",
      invalid: false,
      projectId: 0
    }
    
    this.Auth = new AuthService();
  }
  
  componentDidMount(){
    this.fetchFavProjects();
  }
  
  fetchFavProjects = () => {
    this.Auth.fetchAuth('/api/user/' + this.Auth.getProfile().id)
    .then(user => {
      this.setState({
        favoritedProjects: user.favoritedProjects
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  updateCurrentUser = projectId =>{
    this.Auth.fetchAuth('/api/user/update', {
      method: 'POST',
      body: JSON.stringify({
        projectId,
        fields: ["favoritedProjects"]
      })
    }
    )
    .then(user => {
      this.setState({
        favoritedProjects: user.favoritedProjects
      })
    })
    .catch(err => {
    })
  }

  updateFavProject = projectId =>{
    this.Auth.fetchAuth('/api/project/favorite/'+projectId, {
      method: "POST"
    })
    .catch(err => {
      console.log(err);
    })
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

  toggleRename = (event) =>{
    let newDescription = " ";
    let newProjectName = " ";
    let projectId = 0;
    if(event && event.target.tagName === "BUTTON"){
      newDescription = event.target.getAttribute("description");
      newProjectName = event.target.getAttribute("projectname");
      projectId = event.target.getAttribute("projectid");
    }
    this.setState(prevState =>({
        renameModal: !prevState.renameModal,
        newDescription,
        newProjectName,
        projectId
    }))
  }

  toggleDelete = (event) =>{
    let projectId = 0;
    if(event && event.target.tagName === "BUTTON"){
      projectId = parseInt(event.target.getAttribute("projectid"));
    }
    
    this.setState(prevState =>({
        deleteModal: !prevState.deleteModal,
        projectId
    }))
  }

  renameProject = () => {
    const { projectId, newDescription, newProjectName } = this.state;
    if (this.props.selectedFile && this.props.file.id === this.props.selectedFile.id){
        this.props.selectFile(null);
    }

    this.props.updateProject(projectId, newProjectName, newDescription);
    this.toggleRename();
  }

  deleteProject = () => {
    const { projectId } = this.state;
      if (this.props.selectedProject && projectId === this.props.selectedProject.id){
          this.props.selectFile(null);
          this.props.selectProject(this.props.projects, null);
      }
      
      this.props.deleteProject(projectId);
      this.toggleDelete();
  }

  toggleStar = (event) => {
    const projectId = parseInt(event.target.getAttribute("projectid"));

    this.updateCurrentUser(projectId);
    this.updateFavProject(projectId);
  }

  render() {
    const { favoritedProjects, newProjectName, newDescription } = this.state;
    const { user, selectedProject } = this.props;
    const owner = (user && this.props.currentUserId === this.props.user.id)? true : false;
    const classes = ["project-name-container", "project-name-container bg-success"];
    return (
      <div className="h-100">

        {/* Header */}
        <div className="flex">
          <Label for="scriptArea" className="mb-3">
            Explorer
          </Label>

          {/* Popup form to create a new project */}
          <CreateProjectModal/>
        </div>
  
        {/* Projects Area */}
        <div className="round-div border list-box list-box-outer">
          <div className="text-light bg-white">
            {this.props.projects.map(project => (
              <div key={project.id} className="file-name-container bg-dark">
                {/* Project name area */}
                <div className={(selectedProject && selectedProject.id === project.id)?classes[1]:classes[0]}>

                  {/* Project name text */}
                  <div className="name-cell">
                    <i className="fas fa-folder">{" " + project.name}</i>
                    {owner &&
                      <UncontrolledDropdown className="ml-1 inline">
                          <DropdownToggle tag="span" className="fas fa-cog">
                          </DropdownToggle>
                          
                          <DropdownMenu>

                            <DropdownItem 
                              projectid={project.id}
                              projectname={project.name}
                              description={project.description}
                              onClick={this.toggleRename} >
                              <i className="far fa-edit"></i> Rename
                            </DropdownItem>

                            <DropdownItem divider />

                            <DropdownItem projectid={project.id} onClick={this.toggleDelete}>
                              <i className="far fa-trash-alt"></i> Delete
                            </DropdownItem>

                          </DropdownMenu>
                      </UncontrolledDropdown>
                    }
                  </div>
                  
                  {/* Plus Icon next to project name */}
                  <span className="mt-1 button-cell">
                  {owner ?
                    <CreateScriptModal
                      key={project.id}
                      {...project}
                    />
                  :
                    <ToggleStar
                    toggleStar = {this.toggleStar}
                    projectId = {project.id}
                    favorited = {favoritedProjects.includes(project.id)}
                    />
                  }
                  </span>
                  <Modal
                    isOpen={this.state.deleteModal}
                    toggle={this.toggleDelete}>
                    <ModalHeader toggle={this.toggleDelete}>Delete Project</ModalHeader>
                    <ModalBody>
                        <Label>Are you sure?</Label>
                        <Form>
                            <Button color="danger" onClick={this.deleteProject}>
                                Yes
                            </Button>
                            <Button className="ml-3" color="secondary" onClick={this.toggleDelete}>
                                No
                            </Button>
                        </Form>
                    </ModalBody>
                  </Modal>
                  <Modal
                    isOpen={this.state.renameModal}
                    toggle={this.toggleRename}>
                    <ModalHeader toggle={this.toggleRename}>Rename Project</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.renameFile}>
                        <FormGroup>
                                <Label for="newProjectName">Project Name</Label>
                                <Input
                                invalid={this.state.invalid}
                                type="text"
                                name="newProjectName"
                                id="NewProjectName"
                                value={newProjectName}
                                onChange={this.handleChange}
                                placeholder="Project name"
                                />
                                <FormFeedback>Alphanumeric Characters Only!</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label for="newDescription">Description (optional)</Label>
                                <Input
                                type="textarea"
                                name="newDescription"
                                id="NewDescription"
                                rows="4"
                                value={newDescription}
                                onChange={this.handleChange}
                                placeholder="Short project description"
                                />
                            </FormGroup>
                            <Button color="success" onClick={this.renameProject}>
                                Submit
                            </Button>
                        </Form>
                    </ModalBody>
                </Modal>
                </div>
                
                {/* List of Files Belonging to Project */}
                {project.files.map(file => (
                  <ProjectFile key={file.id} name={file.name + file.type} file={file} projectId={project.id}/>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

const ToggleStar = (props) => {
  const classes = (props.favorited)? "fa-star fa text-warning" : "fa-star far";

  return(<div>
    <div>
      <i
        className={classes}
        aria-hidden="true"
        projectid={props.projectId}
        id={"FavoriteProjectStar"+props.projectId}
        onClick={props.toggleStar}
      />
    </div>

    <UncontrolledTooltip
      placement="left"
      target={"FavoriteProjectStar"+props.projectId}
    >Favorite Project!
    </UncontrolledTooltip>{' '}
  </div>
  )
}

const mapStateToProps = state => ({
  projects: state.projects,
  user: state.user,
  currentUserId: state.currentUserId,
  selectedProject: state.selectedProject
})

const mapDispatchToProps = dispatch => ({
  createProject: project => dispatch(createProject(project)),
  getProjects: userId => dispatch(getProjects(userId)),
  updateProject: (id, name, description) => dispatch(updateProject(id, name, description)),
  deleteProject: id => dispatch(deleteProject(id)),
  selectProject: (projects, id) => dispatch(selectProject(projects, id)),
  selectFile: id => dispatch(selectFile(id))
})

export default connect(mapStateToProps,mapDispatchToProps)(FileExplorer)