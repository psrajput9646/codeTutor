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
    this.setState(prevState => ({
      secondModalIsOpen: !prevState.secondModalIsOpen
    }))
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
            <Form>
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
              <Button color="success" onClick={this.createProject}>
                Submit
              </Button>{' '}
            </Form>
          </ModalBody>
        </Modal>

        <div className="round-div bg-white py-2 pl-2 border list-box-outer">
          <div className="list-box">
            <div className="bg-dark text-light mt-2">
              {this.props.projects.map(project => (
                <div key={project.id}>
                  <i className="fas fa-folder pl-2"> {project.name}</i>
                  {/* Popup form to add a file to project */}
                  <span
                    className="float-right mr-2"
                    onClick={this.toggleSecondModal}
                    id="AddFile">
                    <i className="fa fa-plus" aria-hidden="true" />
                  </span>
                  <UncontrolledTooltip placement="top" target="AddFile">
                    Add a File
                  </UncontrolledTooltip>
                  <Modal
                    isOpen={this.state.secondModalIsOpen}
                    toggle={this.toggleSecondModal}
                    className={this.props.className}>
                    <ModalHeader toggle={this.toggleSecondModal}>
                      Add a File
                    </ModalHeader>
                    <ModalBody>
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
                      </Button>{' '}
                    </ModalBody>
                  </Modal>
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
