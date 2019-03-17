import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, ListGroup, Button, ListGroupItem} from 'reactstrap';
import classnames from 'classnames';
import ProjectInfo from './ProjectInfo.js';
import SolutionInfo from './SolutionInfo.js';

export default class ProjectCollection extends React.Component {
constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
    activeTab: '1'
    };
}

toggle(tab) {
    if (this.state.activeTab !== tab) {
        this.setState({
            activeTab: tab
        });
    }
}

handleClick = () => {
    console.log("Here");
}

render() {
    const myProjectList = [
        {   
            id : 'project1',
            name : 'My Project Name 1',
            description : 'script Description 1 Description about the script imply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently'
        },
        {
            id : 'project2',
            name : 'My Project Name 2',
            description : 'script Description 1 Description about the script imply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently'
        },
        {
            id : 'project3',
            name : 'My Project Name 3',
            description : 'script Description 1 Description about the script imply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently'
        }
    ]
    const favoritedProjectList = [
        {   
            id : 'favProject1',
            name : 'Fav Project Name 1',
            description : 'script Description 1 Description about the script imply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently'
        },
        {
            id : 'favProject2',
            name : 'Fav Project Name 2',
            description : 'script Description 1 Description about the script imply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently'
        },
        {
            id : 'favProject3',
            name : 'Fav Project Name 3',
            description : 'script Description 1 Description about the script imply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently'
        }
    ]
    const pendingSolutionList = [
        {
            id : 'solution1',
            name : 'My Project Name 1', // Name of your (logged-in user) project
            // Description is from the solution submitter. It should briefly say what was done to solve the problem.
            description : 'script Description 1 Description about the script imply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently',
            author : 'taylor10094' // Author of the submitted solution. That author's profile rank should be shown next to name.
        }
    ]
    return (
        
        <div className="mb-4">
            <Nav tabs>
                <NavItem>
                    <NavLink 
                        className={classnames({ active: this.state.activeTab === '1' })}
                        onClick={() => { this.toggle('1'); }}>
                        My Code
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink 
                        className={classnames({ active: this.state.activeTab === '2' })}
                        onClick={() => { this.toggle('2'); }}>
                        Star
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink 
                        className={classnames({ active: this.state.activeTab === '3' })}
                        onClick={() => { this.toggle('3'); }}>
                        Pending Solutions
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
                <Row>
                    <Col sm="12">
                        <ListGroup className="mt-3" flush>
                            <ListGroupItem className="pt-0">
                                <Button className="float-right" size="sm" color="success"
                                onClick={this.handleClick}>New <strong>+</strong></Button>{' '}
                            </ListGroupItem>
                            {myProjectList.map((project)=>
                                <ProjectInfo key = {project.id} {...project}/>
                            )}
                        </ListGroup>
                    </Col>
                </Row>
            </TabPane>
            <TabPane tabId="2">
                <Row>
                    <Col sm="12">
                        <ListGroup className="mt-3" flush>
                            {favoritedProjectList.map((project)=>
                                <ProjectInfo key = {project.id} {...project}/>
                            )}
                        </ListGroup>
                    </Col>
                </Row>
            </TabPane>
            <TabPane tabId="3">
                <Row>
                    <Col sm="12">
                        <ListGroup className="mt-3" flush>
                            {pendingSolutionList.map((project)=>
                                <SolutionInfo key = {project.id} {...project}/>
                            )}
                        </ListGroup>
                    </Col>
                </Row>
            </TabPane>
            </TabContent>
        </div>
        );
    }
}
