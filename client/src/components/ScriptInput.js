import React, { Component } from 'react';
import {FormGroup, Label, Input, Button } from 'reactstrap';
import { connect} from 'react-redux'


class ScriptInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: ""
        }
    }

    handleChange = event => {
        this.setState({
            input: event.target.value
        })
    }

    handleSubmit = () => {
        this.props.socket.emit("stdin", this.state.input + "\n");
        this.setState({
            input: ""
        })
    }

    render() {
        return (
        <FormGroup>
            <Label for="InputText">Input</Label>
            <Input className="no-scale-textarea script-io-height" type="textarea" name="text" value={this.state.input} onChange={this.handleChange} id="InputText"/>
        </FormGroup>
        )
    }
}

const mapStateToProps = state => ({
    socket: state.socket
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(ScriptInput);
