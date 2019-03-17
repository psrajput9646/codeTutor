// Provides script information
import React, { Component } from 'react';
import { ListGroupItem } from 'reactstrap';

export default class ProjectInfo extends Component {
    render() {
        const projectInfo = this.props;
        return (
        
        <ListGroupItem className="pb-0">
            <span className="script-name">
                <i className="far fa-star" aria-hidden="true"></i>
                {' '}
                {projectInfo.name}
            </span>
            <a href="/editor/">edit</a>
            <p>{projectInfo.description}</p>
        </ListGroupItem>
        )
    }
}
