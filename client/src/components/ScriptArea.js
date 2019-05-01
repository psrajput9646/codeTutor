import React, { Component } from 'react'
import { FormGroup, Label, Button, UncontrolledTooltip } from 'reactstrap'
import TextEditor from './TextEditor'
import { connect } from 'react-redux'
import AuthService from './AuthService'
import { updateAndSave } from '../actions/fileCache'

class ScriptArea extends Component {
  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.state = {
      tooltipOpen: false,
      input: '',
      executing: false
    }

    this.Auth = new AuthService()
  }

  componentDidMount() {
    this.setState({
      input: this.props.file.content
    })
    this.props.socket.on('stdout', data => {
      if (data === "Process finished") this.setState({executing: false})
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.file.id) {
      if (prevProps.file.id !== this.props.file.id) {
        this.props.updateAndSave(prevProps.file.id, this.state.input)
        this.setState({
          input: this.props.file.content
        })
      }
    }
  }

  handleChange = newValue => {
    this.setState({
      input: newValue
    })
  }

  handleRun = () => {
    this.props.socket.emit('run', this.props.selectedFile.path)
    this.setState({
      executing: true
    })
  }

  handleSave = () => {
    const { updateAndSave, file } = this.props
    updateAndSave(file.id, this.state.input)
  }

  handleFork = () => {
    const { selectedProject } = this.props
    this.Auth.fetchAuth('/api/project/fork/' + selectedProject.id, {
      method: 'POST'
    })
      .then(project => {
        console.log(project)
      })
      .catch(err => {
        console.log(err)
      })
  }

  toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    })
  }

  render() {
    const { user, fileSaving } = this.props
    const owner =
      user && this.props.currentUserId === this.props.user.id ? true : false

    return (
      <FormGroup className="h-100">
        <div className="d-block mb-2 ">
          <Label for="scriptArea">Script Input</Label>

          {/* Execute Code Button */}
          <Button
            disabled={fileSaving || this.state.executing}
            color="success"
            size="sm"
            className="float-right"
            id="ExecuteCode"
            onClick={this.handleRun}>
            <i className="fa fa-play" aria-hidden="true" />
            <UncontrolledTooltip placement="top" target="ExecuteCode">
              Execute code
            </UncontrolledTooltip>
          </Button>

          {owner && (
            /* Save Project Button */
            <Button
              disabled={fileSaving}
              color="success"
              size="sm"
              className="float-right mr-1"
              id="SaveProject"
              onClick={this.handleSave}>
              <i className="fa fa-save" aria-hidden="true" />
              <UncontrolledTooltip placement="top" target="SaveProject">
                Save your project
              </UncontrolledTooltip>
            </Button>
          )}

          {/* Commenting out because not implemented yet         
    {owner &&
             Submit For Help Button 
              <Button
                color="success"
                size="sm"
                className="float-right mr-1"
                id="HelpingHand">
                <i className="fa fa-hands-helping" aria-hidden="true" />
                <UncontrolledTooltip placement="top" target="HelpingHand">
                  Submit for help!
                </UncontrolledTooltip>
              </Button>
          } */}

          {!owner && this.props.selectedProject.forkedFrom && (
            /* Submit As Solution Button */
            <Button
              disabled={fileSaving}
              color="success"
              size="sm"
              className="float-right mr-1"
              id="SubmitSolution">
              <i className="fa fa-paper-plane" aria-hidden="true" />
              <UncontrolledTooltip placement="top" target="SubmitSolution">
                Submit as solution
              </UncontrolledTooltip>
            </Button>
          )}

          {!owner && (
            /* Fork Project Button*/
            <span>
              <Button
                disabled={fileSaving}
                color="success"
                size="sm"
                className="float-right mr-1"
                id="CodeFork"
                onClick={this.handleFork}>
                <i className="fa fa-code-branch" aria-hidden="true" />
              </Button>{' '}
              <UncontrolledTooltip placement="top" target="CodeFork">
                Fork Project
              </UncontrolledTooltip>
            </span>
          )}
        </div>

        {/* Input field for Scripts */}
        <div className="no-scale-textarea script-area-input-height">
          <TextEditor
            file={this.props.file}
            handleChange={this.handleChange}
            input={this.state.input}
          />
        </div>
      </FormGroup>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  currentUserId: state.currentUserId,
  selectedFile: state.selectedFile,
  selectedProject: state.selectedProject,
  socket: state.socket,
  fileSaving: state.fileSaving
})

const mapDispatchToProps = dispatch => ({
  updateAndSave: (id, content) => dispatch(updateAndSave(id, content))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScriptArea)
