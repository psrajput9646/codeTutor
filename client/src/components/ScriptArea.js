import React, { Component } from 'react';
import {FormGroup, Label, Input, Button } from 'reactstrap';

export default class ScriptArea extends Component {
    render() {
        return (
        <div>
            <FormGroup>
                <div className="d-block mb-2">
                    <Label for="scriptArea">Script Input</Label>

                    {/* Buttons for script inputs */}
                    <Button color="success" size="sm" className="float-right">
                        <i className="fa fa-play" aria-hidden="true"></i>
                    </Button>{' '}
                    <Button color="success" size="sm" className="float-right mr-1">
                        <i className="fa fa-save" aria-hidden="true"></i>
                    </Button>{' '}
                    <Button color="success" size="sm" className="float-right mr-1">
                        <i className="fa fa-hands-helping" aria-hidden="true"></i>
                    </Button>{' '}
                </div>
                {/* Input field for scripts */}
                <Input className="no-scale-textarea d-block" type="textarea" name="text" id="scriptArea" />
            </FormGroup>
        </div>
        )
    }
}
