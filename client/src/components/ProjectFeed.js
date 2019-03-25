import React, { Component } from 'react';
import {ListGroup} from 'reactstrap'
import ProjectInfo from './ProjectInfo.js';

export default class ProjectFeed extends Component {
    render() {
        const newProjectHelpList = [
            {   
                key : 'HelpProject1',
                name : 'Project Name 1',
                description : 'script Description 1 Description about the script imply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently'
            },
            {
                key : 'HelpProject2',
                name : 'Project Name 2',
                description : 'script Description 1 Description about the script imply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently'
            },
            {
                key : 'HelpProject3',
                name : 'Project Name 3',
                description : 'script Description 1 Description about the script imply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently'
            }
        ]
        return (
            <ListGroup className="mt-3" flush>
                {newProjectHelpList.map((project)=>
                    <ProjectInfo {...project}/>
                )}
            </ListGroup>
        )
    }
}
