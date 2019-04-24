import React, { Component } from 'react'
import { Label } from 'reactstrap'
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
    }
    
    this.Auth = new AuthService()
  }

  render() {
    return (
      <div className="h-100">

        {/* Header for file explorer */}
        <div className="flex">
          <Label for="scriptArea" className="mb-3">
            Explorer
          </Label>

          {/* Popup form to create a new project */}
          <CreateProjectModal/>
        </div>

        {/* Projects Area */}
        <div className="round-div bg-white py-2 border list-box list-box-outer">
          <div className="text-light mt-2 bg-dark">
            {this.props.projects.map(project => (
              <div key={project.id} className="file-name-container">
                {/* Project name area */}
                <div className="project-name-container">

                  {/* Project name text */}
                  <div className="name-cell">
                    <i className="fas fa-folder">{" " + project.name}</i>
                  </div>

                  {/* Plus Icon next to project name */}
                  <div className="text-center button-cell">
                    <CreateScriptModal
                      key={project.id}
                      {...project}
                    />
                  </div>

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
