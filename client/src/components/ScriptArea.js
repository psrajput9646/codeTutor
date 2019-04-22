import React, { Component } from 'react'
import { FormGroup, Label, Button, UncontrolledTooltip } from 'reactstrap'
import Editor from './editor/Editor'
import { connect } from 'react-redux'
import { updateAndSave } from '../actions/fileCache'

class ScriptArea extends Component {
  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.state = {
      tooltipOpen: false,
      input: ''
    }
  }

  componentDidMount() {
    this.setState({
      input: this.props.file.content
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

  handleSave = () => {
    const { updateAndSave, file } = this.props
    updateAndSave(file.id, this.state.input)
  }

  toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    })
  }

  render() {
    return (
      <FormGroup className="h-100">
        <div className="d-block mb-2 ">
          <Label for="scriptArea">Script Input</Label>
          {/* Buttons for script inputs */}
          <Button
            color="success"
            size="sm"
            className="float-right"
            id="ExecuteCode"
            onClick={this.props.handleRun}>
            <i className="fa fa-play" aria-hidden="true" />
          </Button>
          <UncontrolledTooltip placement="top" target="ExecuteCode">
            Execute code
          </UncontrolledTooltip>
          <Button
            color="success"
            size="sm"
            className="float-right mr-1"
            id="SaveProject"
            onClick={this.handleSave}>
            <i className="fa fa-save" aria-hidden="true" />
          </Button>
          <UncontrolledTooltip placement="top" target="SaveProject">
            Save your project
          </UncontrolledTooltip>
          <Button
            color="success"
            size="sm"
            className="float-right mr-1"
            id="HelpingHand">
            <i className="fa fa-hands-helping" aria-hidden="true" />
          </Button>
          <UncontrolledTooltip placement="top" target="HelpingHand">
            Submit for help!
          </UncontrolledTooltip>
          <Button
            color="success"
            size="sm"
            className="float-right mr-1"
            id="CodeFork">
            <i className="fa fa-code-branch" aria-hidden="true" />
          </Button>{' '}
          <UncontrolledTooltip placement="top" target="CodeFork">
            Fork Project
          </UncontrolledTooltip>
        </div>
        {/* Input field for scripts */}
        <div className="no-scale-textarea script-area-input-height">
          <Editor
            file={this.props.file}
            handleChange={this.handleChange}
            input={this.state.input}
          />
        </div>
      </FormGroup>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  updateAndSave: (id, content) => dispatch(updateAndSave(id, content))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScriptArea)
