import React, { Component } from 'react';
import {FormGroup, Label, Input } from 'reactstrap';

export default class ScriptInput extends Component {
    render() {
        return (
        <FormGroup>
            <Label for="InputText">Input</Label>
            <Input className="no-scale-textarea script-io-height" type="textarea" name="text" id="InputText"/>
        </FormGroup>
        )
    }
}
