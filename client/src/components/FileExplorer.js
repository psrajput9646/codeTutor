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
  FormFeedback
} from 'reactstrap'
import ProjectFile from './ProjectFile'
import AuthService from './AuthService'
import { createProject } from '../actions/projects'
import { connect } from 'react-redux'

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

  toggleSecondModal = () => {
    this.setState(prevState => ({ secondModalIsOpen: !prevState.secondModalIsOpen }))
  }

  createProject = () => {
    const { projectName, description } = this.state
    this.props.createProject({
      name: projectName,
      description
    })
    this.toggle()
  }

  createFile = projectId => {
    console.log(this.state); 
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
        this.getProjects()
      })
      .catch(err => {
        console.log(err)
      })

      this.toggleSecondModal();
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleFileName = event => {
    let name = event.target.value
    let valid = /^[a-zA-Z]+$/.test(name)
    this.setState({
      [event.target.name]: event.target.value,
      invalid: !valid
    })
  }

  render() {
    const {
      projectName,
      description,
      fileName,
      fileType,
      invalid
    } = this.state
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
                  value={projectName}
                  onChange={this.handleChange}
                />
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
                    <div className="text-center button-cell" onClick={this.toggleSecondModal} id={"AddFile"+ project.id}>
                      <i className="fa fa-plus" aria-hidden="true"></i>
                    </div>
                  </div>
                    <UncontrolledTooltip placement="top" target={"AddFile"+ project.id}>
                      Add a File
                    </UncontrolledTooltip>
                  {project.files.map(file => (
                    <ProjectFile key={file.id} name={file.name + file.type} file={file}/>
                  ))}
                  <Modal
                    isOpen={this.state.secondModalIsOpen}
                    toggle={this.toggleSecondModal}
                    className={this.props.className}>
                    <ModalHeader toggle={this.toggleSecondModal}>
                      Add a File
                    </ModalHeader>
                    <ModalBody>
                      <Form>
                        <FormGroup>
                          <Label for="fileName">File Name</Label>
                          <Input
                            invalid={invalid}
                            type="text"
                            name="fileName"
                            id="fileName"
                            value={fileName}
                            onChange={this.handleFileName}
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
                        <Button
                          color="success"
                          onClick={() => this.createFile(project.id)}>
                          Submit
                        </Button>
                      </Form>
                    </ModalBody>
                  </Modal>
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
