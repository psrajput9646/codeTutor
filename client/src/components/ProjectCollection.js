import React from 'react'
import {
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
  ListGroup,
  Button,
  ListGroupItem
} from 'reactstrap'
import classnames from 'classnames'
import ProjectInfo from './ProjectInfo.js'
import SolutionInfo from './SolutionInfo.js'
import AuthService from './AuthService'
import { createProject } from '../actions/projects'
import { connect } from 'react-redux'

class ProjectCollection extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: '1',
      modal: false,
      projectList: [],
      projectName: '',
      description: ''
    }

    this.toggle = this.toggle.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
    this.Auth = new AuthService()
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      })
    }
  }

  toggleModal() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }))
  }

  handleClick = () => {
    console.log('Here')
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  createProject = () => {
    const { projectName, description } = this.state
    this.props.createProject({
      name: projectName,
      description
    });
    this.toggleModal();
  }

  render() {
    const { projectName, description } = this.state
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
      },
      {
        id: 'FavProject3',
        name: 'Fav Project Name 3',
        description:
          "script Description 1 Description about the script imply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently"
      }
    ]
    const pendingSolutionList = [
      {
        id: 'Solution1',
        name: 'My Project Name 1', // Name of your (logged-in user) project
        // Description is from the solution submitter. It should briefly say what was done to solve the problem.
        description:
          "script Description 1 Description about the script imply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently",
        author: 'taylor10094' // Author of the submitted solution. That author's profile rank should be shown next to name.
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
              My Code
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
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '3' })}
              onClick={() => {
                this.toggle('3')
              }}>
              Pending Solutions
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <ListGroup className="mt-3" flush>
                  {this.props.owner === true &&
                  <ListGroupItem className="pt-0">
                    <Button
                      className="float-right"
                      size="sm"
                      color="success"
                      onClick={this.toggleModal}>
                      <strong>New</strong>
                      {' '}
                      <i className="fas fa-plus fa-xs"></i>
                    </Button>
                  </ListGroupItem> 
                  }
                  <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggleModal}
                    className={this.props.className}>
                    <ModalHeader toggle={this.toggleModal}>
                      Add a Project
                    </ModalHeader>
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
                            placeholder="Add project name"
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label for="description">
                            Description (Optional)
                          </Label>
                          <Input
                            className = "no-scale-textarea" 
                            type="textarea"
                            name="description"
                            id="Description"
                            rows="4"
                            value={description}
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
          <TabPane tabId="3">
            <Row>
              <Col sm="12">
                <ListGroup className="mt-3" flush>
                  {pendingSolutionList.map(project => (
                    <SolutionInfo key={project.id} {...project} />
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
