import React, { Component } from 'react'
import {FormGroup, Label, Input} from 'reactstrap';

export default class ScriptOutput extends Component {
    render() {
        return (
        <FormGroup>
            <Label for="OutputText">Output</Label>
            <Input className="no-scale-textarea  script-io-height" type="textarea" name="outputText" id="OutputText" disabled/>
        </FormGroup>
        )
    }
}
