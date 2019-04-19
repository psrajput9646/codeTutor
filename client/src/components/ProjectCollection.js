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
import { connect } from 'react-redux'
import CreateProjectModal from './CreateProjectModal';

class ProjectCollection extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: '1',
      projectList: []
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

  render() {
    const projects = this.props.projects;
    const owner = (this.props.user && this.props.currentUserId === this.props.user.id)? true : false;
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
        {/* Tabs Headers */}
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => {
                this.toggle('1')
              }}>
              <div className="flex">
                My Projects &nbsp;
                <CreateProjectModal owner = {owner} />
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

        {/* Tab Content */}
        <TabContent activeTab={this.state.activeTab}>
          {/* Pane 1 */}
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <ListGroup className="mt-3" flush>
                  {projects.map(project => (
                    <ProjectInfo key={project.id} {...project} owner={owner}/>
                  ))}
                </ListGroup>
              </Col>
            </Row>
          </TabPane>
          {/* Pane 2 */}
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

const mapStateToProps = state => ({
  user: state.user,
  currentUserId: state.currentUserId,
  projects: state.projects
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectCollection);