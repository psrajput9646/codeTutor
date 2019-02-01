import React, { Component } from 'react';
import {FormGroup, Label, Input } from 'reactstrap';

export default class TextArea extends Component {
    render() {
        return (
        <div>
            <FormGroup>
                <Label for="exampleText">Script Input</Label>
                <Input type="textarea" name="text" id="exampleText" />
            </FormGroup>
        </div>
        )
    }
}
