import React, { Component } from 'react'
import { Container, Row, Col, UncontrolledTooltip, Modal, ModalBody,
    FormGroup, Label, Input, Button, Jumbotron, Spinner} from 'reactstrap'
import ScriptArea from './ScriptArea.js'
import ScriptFeedback from './ScriptFeedback.js'
import ScriptInput from './ScriptInput.js'
import ScriptOutput from './ScriptOutput.js'
import FileExplorer from './FileExplorer.js'
import { fetchUser } from '../actions/user';
import { setProject } from '../actions/projects';
import { selectFile } from '../actions/file';
import { connect } from 'react-redux'

class Editor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
    }

    this.toggle = this.toggle.bind(this)
    this.toggleStar = this.toggleStar.bind(this)
  }

  componentDidMount(){
    if(this.props.user === null ||
      this.props.user.id !== parseInt(this.props.match.params.userId)){
      this.loadUser();
      this.props.setProject(null);
      this.props.selectFile(null);
    }
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

  /* Add functionality to toggle favorite project */
  toggleStar() {
    var star = document.getElementById('FavoriteProjectStar')
    star.classList.toggle('far')
    star.classList.toggle('fa')
    star.classList.toggle("text-warning")
  }

  handleClick = () => {
    this.props.socket.emit("run", "This is path");
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
                {selectedFile ? <ScriptArea file={selectedFile}/>
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

            <Button onClick={this.handleClick}>Example Run</Button>
          </Row>
        </Container>
      </div>
    )
  }
}

const Breadcrumbs = (props) => {
  if(props.selectedFile){
    return(
    <h4 className="pt-3 ml-3" id="EditorName">
      <a href={"/account/"+props.user.id}>{props.user.username}</a>
      {" / "}
      <a href={"#"}>{props.selectedProject.name}</a>
      {" / "}
      <a href={"#"}>{props.selectedFile.name}</a>
      {"  "}
      <span onClick={props.toggleStar}>
        <i
          className="far fa-star"
          aria-hidden="true"
          id="FavoriteProjectStar"
        />
      </span>
      <UncontrolledTooltip
        placement="left"
        target="FavoriteProjectStar">
        Favorite Project!
      </UncontrolledTooltip>{' '}
      <span
        className="edit"
        onClick={props.toggle}
        size="sm"
        id="EditScriptInfo">
        edit
      </span>
    </h4>)
  }
  return(
    <h4 className = "pt-3 ml-3">
      <a href={"/account/"+props.user.id}>{props.user.username}</a>
      {" / "}
      Select a file
    </h4>
  )
}

const mapStateToProps = state => ({
  user: state.user,
  userLoading: state.userLoading,
  userErrored: state.userErrored,
  currentUserId: state.currentUserId,
  selectedFile: state.selectedFile,
  selectedProject: state.selectedProject,
  socket: state.socket
})

const mapDispatchToProps = dispatch => ({
  fetchUser: (userId) => dispatch(fetchUser(userId)),
  selectFile: (file) => dispatch(selectFile(file)),
  setProject: (project) => dispatch(setProject(project))
})

export default connect(mapStateToProps, mapDispatchToProps)(Editor);