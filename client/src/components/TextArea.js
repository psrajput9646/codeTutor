import React, { Component } from 'react';
import {FormGroup, Label, Input } from 'reactstrap';

export default class TextArea extends Component {
    render() {
        return (
        <div>
            <FormGroup>
                <Label for="exampleText">Script Input</Label>
                <Input className="no-scale-textarea h5 d-block" type="textarea" name="text" id="exampleText" />
            </FormGroup>
        </div>
        )
    }
}
