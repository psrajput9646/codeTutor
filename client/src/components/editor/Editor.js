import React, { Component } from 'react'
import AceEditor from 'react-ace'
import 'brace/mode/java'
import 'brace/mode/python'
import 'brace/ext/language_tools'
import 'brace/theme/monokai'

import { connect } from 'react-redux'
import { updateAndSave } from '../../actions/fileCache'

class Editor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      input: ''
    }
  }

  componentDidMount() {
    this.setState({
      input: this.props.selectedFile.content
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedFile.id !== this.props.selectedFile.id) {
        this.props.updateAndSave(prevProps.selectedFile.id, this.state.input);
      this.setState({
        input: this.props.selectedFile.content
      })
    }
  }

  handleChange = newValue => {
    this.setState({
      input: newValue
    })
  }

  render() {
    let fileType
    switch (this.props.selectedFile.fileType) {
      case '.java':
        fileType = 'java'
        return

      case '.py':
        fileType = 'python'
        return

      default:
        fileType = 'java'
    }

    return (
      <AceEditor
        className="h-100 w-100"
        mode={fileType}
        theme="monokai"
        name="Editor"
        fontSize={14}
        value={this.state.input}
        onChange={this.handleChange}
        highlightActiveLine
        setOptions={{
          enableLiveAutocompletion: true,
          showLineNumbers: true
        }}
      />
    )
  }
}

const mapStateToProps = state => ({
  selectedFile: state.selectedFile
})

const mapDispatchToProps = dispatch => ({
    updateAndSave: (id, content) => dispatch(updateAndSave(id, content))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor)
