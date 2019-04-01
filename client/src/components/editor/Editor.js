import React, { Component } from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/java';
import 'brace/mode/python';
import 'brace/ext/language_tools'
import 'brace/theme/monokai';

import { connect } from 'react-redux'

class Editor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            input: "",
        }
    }

    componentDidMount() {
        this.setState({
            input: this.props.selectedFile.content
        })
    }

    handleChange = (newValue) => {
        this.setState({
            input: newValue
        })
    }

    render() {
        let fileType;
        switch (this.props.selectedFile.fileType) {
            case '.java':
                fileType = "java"
                return

            case '.py':
                fileType = "python"
                return

            default:
                fileType = "java"
        }

        console.log(fileType)

        return (
        <AceEditor 
        width="100%"
        height="100%"
        mode={fileType}
        theme="monokai"
        name="Editor"
        fontSize={14}
        value = {this.state.input}
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

})

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
