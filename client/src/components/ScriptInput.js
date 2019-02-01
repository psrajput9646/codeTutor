import React, { Component } from 'react';
import {FormGroup, Label, Input } from 'reactstrap';

export default class ScriptInput extends Component {
    render() {
        return (
        <div>
            <FormGroup>
                <Label for="exampleText">Input</Label>
                <Input type="textarea" name="text" id="exampleText"/>
            </FormGroup>
        </div>
        )
    }
}
