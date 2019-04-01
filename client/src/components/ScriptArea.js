import React, { Component } from 'react'
import {
  FormGroup,
  Label,
  Input,
  Button,
  UncontrolledTooltip
} from 'reactstrap'
import Editor from './editor/Editor'

export default class ScriptArea extends Component {
  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.state = {
      tooltipOpen: false
    }
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
            id="ExecuteCode">
            <i className="fa fa-play" aria-hidden="true" />
          </Button>
          <UncontrolledTooltip placement="top" target="ExecuteCode">
            Execute code
          </UncontrolledTooltip>
          <Button
            color="success"
            size="sm"
            className="float-right mr-1"
            id="SaveProject">
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
          <Editor file={this.props.file}/>
        </div>
      </FormGroup>
    )
  }
}
