import React from 'react'
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
  ListGroup
} from 'reactstrap'
import classnames from 'classnames'
import ProjectInfo from './ProjectInfo.js'
import AuthService from './AuthService'
import { createProject } from '../actions/projects'
import { connect } from 'react-redux'
import CreateProjectModal from './CreateProjectModal';

class ProjectCollection extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: '1',
      projectList: [],
      projectName: '',
      description: ''
    }
    this.Auth = new AuthService()
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      })
    }
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
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

  render() {
    const favoritedProjectList = [
      {
        id: 'FavProject1',
        name: 'Fav Project Name 1',
        description:
          "script Description 1 Description about the script imply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently"
      },
      {
        id: 'FavProject2',
        name: 'Fav Project Name 2',
        description:
          "script Description 1 Description about the script imply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently"
      }
    ]
    return (
      <div className="mb-4">
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => {
                this.toggle('1')
              }}>
              <div className="flex">
                My Projects &nbsp;
                <CreateProjectModal
                  createProject = {this.createProject} 
                  handleChange={this.handleChange} 
                  invalid = {this.state.invalid}
                />
              </div>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => {
                this.toggle('2')
              }}>
              Star
            </NavLink>
          </NavItem>
        </Nav>

        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <ListGroup className="mt-3" flush>
                  {this.props.projects.map(project => (
                    <ProjectInfo key={project.id} {...project} owner={this.props.owner}/>
                  ))}
                </ListGroup>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12">
                <ListGroup className="mt-3" flush>
                  {favoritedProjectList.map(project => (
                    <ProjectInfo key={project.id} {...project} />
                  ))}
                </ListGroup>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  createProject: project => dispatch(createProject(project))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectCollection)
