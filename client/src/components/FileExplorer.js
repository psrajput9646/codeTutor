import React, { Component } from 'react'
import {
  Label
} from 'reactstrap'
import ProjectFile from './ProjectFile'
import AuthService from './AuthService'
import { createProject, getProjects } from '../actions/projects'
import { connect } from 'react-redux'
import CreateScriptModal from './CreateScriptModal'
import CreateProjectModal from './CreateProjectModal'

class FileExplorer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      projectName: '',
      description: '',
      projectList: [],
      fileName: '',
      fileType: '.java',
      invalid: false
    }
    this.Auth = new AuthService()
  }

  createProject = () => {
    const { projectName, description } = this.state
    this.Auth.fetchAuth('/api/project/create', {
      method: 'POST',
      body: JSON.stringify({
        name: projectName,
        description
      })
    })
    .then(res => {
      console.log(res)
    })
      .catch(err => {
        console.log(err)
      })
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
        this.fetchProjects()
      })
        .catch(err => {
          console.log(err)
      })
  }

  fetchProjects = () => {
    const { getProjects, currentUser } = this.props;
    getProjects(currentUser.id);
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
    return (
      <div className="h-100">
        <div className="flex">
          <Label for="scriptArea" className="mb-3">
            Explorer
          </Label>
          {/* Popup form to create a new project */}
          <CreateProjectModal
            createProject = {this.createProject} 
            handleChange={this.handleChange} 
            invalid = {this.state.invalid}
          />
        </div>

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
  projects: state.projects,
  currentUser: state.currentUser
})

const mapDispatchToProps = dispatch => ({
  createProject: project => dispatch(createProject(project)),
  getProjects: userId => dispatch(getProjects(userId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileExplorer)
