import React, { Component } from 'react';
import {Label, Button } from 'reactstrap';
import ProjectFile from './ProjectFile';

export default class FileExplorer extends Component {
    render() {
        return (
        <div>
            <div>
                <Label for="scriptArea" className="mb-3">Script Input</Label>

                {/* Buttons for script inputs */}
                <Button color="success" size="sm" className="float-right">
                    <i className="fa fa-plus" aria-hidden="true"></i>
                </Button>{' '}

                <div className="round-div bg-white py-2 pl-2 border">
                    <div className="list-box">
                        <div id="projectOne">
                            <div className="bg-dark text-light">
                                <i className="fas fa-folder pl-2"> Project 1</i>
                                <ProjectFile/>
                                <i className="fas fa-folder pl-2"> Project 2</i>
                                <ProjectFile/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}
