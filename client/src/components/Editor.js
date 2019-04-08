import React, { Component } from 'react'
import {
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  Modal,
  ModalBody,
  FormGroup,
  Label,
  Input,
  Button,
  Jumbotron
} from 'reactstrap'
import ScriptArea from './ScriptArea.js'
import ScriptFeedback from './ScriptFeedback.js'
import ScriptInput from './ScriptInput.js'
import ScriptOutput from './ScriptOutput.js'
import FileExplorer from './FileExplorer.js'
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
    const {selectedFile} = this.props
    return (
      <div id="EditorWindow">
        <Container fluid>
          <Row>
            {selectedFile ? (
              <h3 className="pt-3 ml-3" id="EditorName">
                {selectedFile.name}{' '}
                <span onClick={this.toggleStar}>
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
                  onClick={this.toggle}
                  size="sm"
                  id="EditScriptInfo">
                  edit
                </span>
              </h3>
            ) : (
              <h3 className = "pt-3 ml-3">Select a file</h3>
            )}
          </Row>
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggle}
            className={this.props.className}>
            <ModalBody>
              <FormGroup>
                <Label for="projectName">Script Name</Label>
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

const mapStateToProps = state => ({
    selectedFile: state.selectedFile,
    socket: state.socket
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
