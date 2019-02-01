import React, { Component } from 'react';
import {FormGroup, Label, Input } from 'reactstrap';

export default class Comment extends Component {
    render() {
        return (
        <div>
            <FormGroup>
                <Label for="exampleSelectMulti">Code Feedback</Label>
                <Input type="select" name="selectMulti" id="exampleSelectMulti" multiple>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </Input>
            </FormGroup>
        </div>
        )
    }
}
