import React, { Component } from 'react'
import {FormGroup, Label, Input} from 'reactstrap';
import { connect } from 'react-redux';

class ScriptOutput extends Component {
    constructor(props) {
        super(props)
        this.state = {
            input: ""
        }
    }

    componentDidMount() {
        this.props.socket.on("stdout", this.getData)
    }

    getData = data => {
        this.setState({
            input: this.state.input + data
        })
    }

    render() {
        return (
        <FormGroup>
            <Label for="OutputText">Output</Label>
            <Input className="no-scale-textarea  script-io-height" type="textarea" name="outputText" id="OutputText" value={this.state.input} disabled/>
        </FormGroup>
        )
    }
}

const mapStateToProps = state => ({
    socket: state.socket
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(ScriptOutput);
