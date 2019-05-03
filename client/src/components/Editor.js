import React, { Component } from 'react'
import { Container, Row, Col, Modal, ModalBody,
    FormGroup, Label, Input, Button, Jumbotron, Spinner} from 'reactstrap'
import { Link } from 'react-router-dom'
import ScriptArea from './ScriptArea.js'
import ScriptFeedback from './ScriptFeedback.js'
import ScriptInput from './ScriptInput.js'
import ScriptOutput from './ScriptOutput.js'
import FileExplorer from './FileExplorer.js'
import { fetchUser } from '../actions/user';
import { selectProject } from '../actions/projects';
import { selectFile } from '../actions/file';
import { connect } from 'react-redux'

class Editor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
    }

    this.toggle = this.toggle.bind(this)
  }

  componentDidMount(){
    if(this.props.user === null ||
      this.props.user.id !== parseInt(this.props.match.params.userId)){
      this.loadUser();
    }
  }

  componentWillUnmount(){
    this.props.selectFile(null);
    this.props.selectProject(this.props.projects, null);
  }

  componentDidUpdate(prevProps){
    if(prevProps.match.params.userId !== this.props.match.params.userId ||
        prevProps.currentUserId !== this.props.currentUserId){
        this.loadUser();
    }
  }

  loadUser = () => {
    let userId = this.props.match.params.userId
    if(userId === undefined){
        userId = this.props.currentUserId;
    }

    if(userId !== -1){
        this.props.fetchUser(userId);
    }
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }))
  }

  render() {
    const {selectedFile, selectedProject, user} = this.props;

    return (
      <div id="EditorWindow">
        {/* Top Left Panel */}
        <Container fluid>
          <Row>
          {this.props.userLoading || !user ?
            <Spinner type="grow" color="dark" style={{width: '3rem', height: '3rem'}} />
          : <Breadcrumbs
              selectedFile={selectedFile}
              selectedProject={selectedProject}
              toggleStar={this.toggleStar}
              toggle={this.toggle}
              user={user}
            />
          }
          </Row>
          {/* Edit Current Project Modal */}
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggle}
            className={this.props.className}>
            <ModalBody>
              <FormGroup>
                <Label for="projectName">Project Name</Label>
                <Input
                  type="text"
                  id="ProjectName"
                />
              </FormGroup>
              <Button color="primary" onClick={this.toggle}>
                Submit
              </Button>{' '}
            </ModalBody>
          </Modal>

          {/* Middle Row of Editor page */}
          <Row className="mt-3 mb-0 editor-content-height">
            <Col sm="12" md="2" className="h-100">
              <FileExplorer />
            </Col>

            <Col sm="12" md="7">
              <Row className="script-area-height">
                <Col sm="12">
                {selectedFile ? <ScriptArea file={selectedFile} handleRun={this.handleRun}/>
                : <Jumbotron fluid>
                    <Container fluid>
                        <h2>Select or create a file to get started!</h2>
                    </Container>
                </Jumbotron>}
                </Col>
              </Row>
              {/* I/O Boxes */}
              <Row className="io-area-height">
                <Col sm="12" md="6">
                  <ScriptInput />
                </Col>
                <Col sm="12" md="6">
                  <ScriptOutput />
                </Col>
              </Row>
            </Col>

            <Col sm="12" md="3" className="h-100">
              <ScriptFeedback />
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

const Breadcrumbs = (props) => {
  return(
  <h4 className="pt-3 ml-3" id="EditorName">
    <Link to={"/account/"+props.user.id}>{props.user.username}</Link>
    {" / "}
    {props.selectedProject &&
      <span>{props.selectedProject.name + " / "}</span>
    }
    {props.selectedFile &&
      <span>{props.selectedFile.name + props.selectedFile.type}</span>
    }
  </h4>)
}

const mapStateToProps = state => ({
  user: state.user,
  projects: state.projects,
  userLoading: state.userLoading,
  currentUserId: state.currentUserId,
  selectedFile: state.selectedFile,
  selectedProject: state.selectedProject
})

const mapDispatchToProps = dispatch => ({
  fetchUser: (userId) => dispatch(fetchUser(userId)),
  selectFile: (file) => dispatch(selectFile(file)),
  selectProject: (projects, id) => dispatch(selectProject(projects, id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Editor);