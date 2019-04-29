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
import { connect } from 'react-redux'
import CreateProjectModal from './CreateProjectModal';

class ProjectCollection extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: '1'
    }
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      })
    }
  }

  render() {
    const { projects, favoritedProjects } = this.props;
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
              <div className="flex project-collection-nav-name">
                My Projects &nbsp;
                <CreateProjectModal/>
              </div>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => {
                this.toggle('2')
              }}>
              <div className="project-collection-nav-name">
                Star
              </div>
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
                    <ProjectInfo key={project.id} projectInfo={project}/>
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
                  {favoritedProjects.map(project => (
                    <ProjectInfo key={project.id} projectInfo={project} />
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
  favoritedProjects: state.favoritedProjects,
  projects: state.projects
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectCollection);