import React, { Component } from 'react'
import AceEditor from 'react-ace'
import 'brace/mode/java'
import 'brace/mode/python'
import 'brace/ext/language_tools'
import 'brace/theme/monokai'

import { connect } from 'react-redux'
import { updateAndSave } from '../../actions/fileCache'

class Editor extends Component {
  render() {
    let fileType;
    
    switch (this.props.selectedFile.type) {
      case '.java':
        fileType = 'java'
        break;

      case '.py':
        fileType = 'python'
        break;

      default:
        fileType = 'java'
    }

    const user = this.props.user;
    const owner = (user && this.props.currentUserId === this.props.user.id)? true : false;
    return (
      <AceEditor
        className="h-100 w-100"
        readOnly={owner? false: true}
        mode={fileType}
        theme="monokai"
        name="Editor"
        fontSize={14}
        value={this.props.input}
        onChange={this.props.handleChange}
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
  user: state.user,
  currentUserId: state.currentUserId,
  selectedFile: state.selectedFile
})

const mapDispatchToProps = dispatch => ({
    updateAndSave: (id, content) => dispatch(updateAndSave(id, content))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor)
