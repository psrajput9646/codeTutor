import React, { Component } from 'react'
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
} from 'reactstrap'
import ProjectFile from './ProjectFile'
import AuthService from './AuthService'
import { createProject } from '../actions/projects'
import { connect } from 'react-redux'
import CreateScriptModal from './CreateScriptModal'

class FileExplorer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalIsOpen: false,
      secondModalIsOpen: false,
      projectName: '',
      description: '',
      projectList: [],
      fileName: '',
      fileType: '.java',
      invalid: false
    }
    this.toggle = this.toggleModal.bind(this)
    this.Auth = new AuthService()
  }

  toggleModal = () => {
    this.setState(prevState => ({ modalIsOpen: !prevState.modalIsOpen }))
  }

  createProject = () => {
    const { projectName, description } = this.state
    this.props.createProject({
      name: projectName,
      description
    })
    this.toggleModal();
  }

  createFile = projectId => {
      const { fileName, fileType } = this.state
      this.Auth.fetchAuth('/api/file/create', {
        method: 'POST',
        body: JSON.stringify({
          name: fileName,
          type: fileType,
          projectId: projectId
        })
      })
      .then(res => {
        console.log(res)
        // this.getProjects()
      })
        .catch(err => {
          console.log(err)
      })
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleFileName = event => {
    console.log("handle file name");
    let name = event.target.value
    let valid = /^[a-zA-Z]+$/.test(name)
    this.setState({
      [event.target.name]: event.target.value,
      invalid: !valid
    })
  }

  render() {
    const projectInfo = this.props;

    return (
      <div className="h-100">
        <Label for="scriptArea" className="mb-3">
          Explorer
        </Label>
        {/* Popup form to create a new project */}
        <Button
          color="success"
          onClick={this.toggleModal}
          className="float-right"
          size="sm"
          id="CreateNewProject">
          <i className="fa fa-plus" aria-hidden="true" />
        </Button>
        <UncontrolledTooltip placement="top" target="CreateNewProject">
          Create New Project
        </UncontrolledTooltip>
        <Modal
          isOpen={this.state.modalIsOpen}
          toggle={this.toggleModal}
          className={this.props.className}>
          <ModalHeader toggle={this.toggleModal}>Add a Project</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.createProject}>
              <FormGroup>
                <Label for="projectName">Project Name</Label>
                <Input
                  type="text"
                  name="projectName"
                  id="ProjectName"
                  value={projectInfo.projectName}
                  onChange={this.handleChange}
                  placeholder="Add project name"
                />
              </FormGroup>
              <FormGroup>
                <Label for="description">Description (optional)</Label>
                <Input
                  type="textarea"
                  name="description"
                  id="Description"
                  rows="4"
                  value={projectInfo.description}
                  onChange={this.handleChange}
                  placeholder="Add short project description"
                />
              </FormGroup>
              <Button color="success">
                Submit
              </Button>
            </Form>
          </ModalBody>
        </Modal>

        <div className="round-div bg-white py-2 border list-box-outer">
          <div className="list-box">
            <div className="text-light mt-2 bg-dark">
              {this.props.projects.map(project => (
                <div key={project.id} className="file-name-container">
                  {/* Project name area*/}
                  <div className="project-name-container">
                    {/* Project name text*/}
                    <div className="name-cell">
                      <i className="fas fa-folder">{" " + project.name}</i>
                    </div>
                    {/* Plus Icon next to project name */}
                    <div className="text-center button-cell">
                      <CreateScriptModal 
                      key={project.id}
                      {...project} 
                      createFile = {this.createFile} 
                      handleChange={this.handleChange} 
                      handleFileName={this.handleFileName}
                      invalid = {this.state.invalid}
                      />
                    </div>
                  </div>
                  {project.files.map(file => (
                    <ProjectFile key={file.id} name={file.name + file.type} file={file}/>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  projects: state.projects
})

const mapDispatchToProps = dispatch => ({
  createProject: project => dispatch(createProject(project))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileExplorer)
