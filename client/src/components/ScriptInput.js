import React, { Component } from 'react'
import { FormGroup, Label, Input } from 'reactstrap'
import { connect } from 'react-redux'

class ScriptInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      input: ''
    }
  }

  componentDidMount(){
  }

  handleChange = event => {
    let value = event.target.value.replace("\n", "");
    this.setState({
      input: value
    })
  }

  handleSubmit = () => {
    this.props.socket.emit('stdin', this.state.input + '\n')
    this.setState({
      input: ''
    })
  }

  handleKeyDown = e => {
    if (e.key === 'Enter') {
      this.handleSubmit()
    }
  }

  render() {
    return (
      <FormGroup>
        <Label for="InputText">Input</Label>
        <Input
          className="no-scale-textarea script-io-height"
          type="textarea"
          name="text"
          onKeyDown={this.handleKeyDown}
          value={this.state.input}
          onChange={this.handleChange}
          id="InputText"
          tabIndex="0"
        />
      </FormGroup>
    )
  }
}

const mapStateToProps = state => ({
  socket: state.socket
})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScriptInput)
