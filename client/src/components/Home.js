import React, { Component } from 'react';
import { Container, Row, Col, ListGroup, Spinner, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import ProjectInfo from './ProjectInfo.js';

import AuthService from './AuthService';
export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            projectsList: [],
            activeTab: '1'
        }
        this.toggle = this.toggle.bind(this);
        this.getAllProjects = this.getAllProjects.bind(this);
        this.Auth = new AuthService();
    }

    toggle = (e) => {
        this.setState({
            activeTab: e.target.attributes.value.nodeValue
        })
    }

    componentDidMount(){
        this.getAllProjects();
    }

    getAllProjects = () => {
        this.setState({
            loading: true
        })
        this.Auth.fetchAuth('/api/project/get/all', {
          method: 'GET'
        })
        .then(projectsList => {
            this.setState({
                projectsList
            });
            this.setState({
                loading:false
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    render() {
        const { projectsList } = this.state;
        return (
        <div>
            <Container>
                <h1>Project Feed</h1>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            value={'1'}
                            className={classnames({ active:this.state.activeTab === '1'})}
                            onClick={this.toggle}>
                            New Projects
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            value={'2'}
                            className={classnames({ active:this.state.activeTab === '2'})}
                            onClick={this.toggle}>
                            Requesting Help
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                    <Row>
                        <Col sm="12">
                            <div>
                            {this.state.loading ?
                                <Spinner type="grow" color="dark" style={{width: '3rem', height: '3rem'}} />
                            :   <ListGroup className="mt-3" flush>
                                    {projectsList.map((project)=>
                                        <ProjectInfo key={project.id} projectInfo={project} locked={true}/>
                                    )}
                                </ListGroup>
                            }
                            </div>
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tabId="2">
                    <Row>
                        <Col sm="12">
                            <ListGroup className="mt-3" flush>
                            
                            </ListGroup>
                        </Col>
                    </Row>
                </TabPane>
                </TabContent>
            </Container>
        </div>
        )
    }
}