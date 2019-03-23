import React, { Component } from 'react'
import {FormGroup, Label, Input} from 'reactstrap';

export default class ScriptOutput extends Component {
    render() {
        return (
        <FormGroup>
            <Label for="outputText">Output</Label>
            <Input className="no-scale-textarea" type="textarea" name="outputText" id="OutputText" disabled/>
        </FormGroup>
        )
    }
}
