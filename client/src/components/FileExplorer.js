import React, { Component } from 'react'
import { Label, UncontrolledTooltip } from 'reactstrap'
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
      favoritedProjects: []
    }
    
    this.Auth = new AuthService();
    this.fetchFavProjects = this.fetchFavProjects.bind(this);
    this.updateCurrentUser = this.updateCurrentUser.bind(this);
    this.updateProject = this.updateProject.bind(this);
    this.toggleStar = this.toggleStar.bind(this);
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

  updateCurrentUser = (projectId) =>{
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
      console.log(err);
    })
  }

  updateProject = (projectId) =>{
    this.Auth.fetchAuth('/api/project/favorite/'+projectId, {
      method: "POST"
    })
    .catch(err => {
      console.log(err);
    })
  }
  
  toggleStar = (event) => {
    const projectId = parseInt(event.target.attributes.projectid.nodeValue);

    this.updateCurrentUser(projectId);
    this.updateProject(projectId);
  }

  render() {
    const { favoritedProjects } = this.state;
    const { user, selectedProject } = this.props;
    const owner = (user && this.props.currentUserId === this.props.user.id)? true : false;
    const classes = ["project-name-container", "project-name-container bg-success"];
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
        <div className="round-div bg-white border list-box list-box-outer">
          <div className="text-light bg-white">
            {this.props.projects.map(project => (
              <div key={project.id} className="file-name-container bg-dark">
                {/* Project name area */}
                <div className={(selectedProject && selectedProject.id === project.id)?classes[1]:classes[0]}>

                  {/* Project name text */}
                  <div className="name-cell">
                    <i className="fas fa-folder">{" " + project.name}</i>
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
  getProjects: userId => dispatch(getProjects(userId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileExplorer)
