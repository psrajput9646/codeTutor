import React, { Component } from 'react';
import { Container, Row, Col, ListGroup } from 'reactstrap';
import ProjectInfo from './ProjectInfo.js';

import AuthService from './AuthService';
export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            projectsList: []
        }

        this.getAllProjects = this.getAllProjects.bind(this);
        this.Auth = new AuthService();
    }

    componentDidMount(){
        this.getAllProjects();
    }

    getAllProjects = () => {
        this.Auth.fetchAuth('/api/project/get/all', {
          method: 'GET'
        })
        .then(projectsList => {
            this.setState({
                projectsList
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
                <Row>
                    <Col sm="12">
                        {/* Heading */}
                        <div className="mt-5">
                            <h1>Latest Projects</h1>
                        </div>

                        {/* List Of All Projects*/}
                        <div>
                            <ListGroup className="mt-3" flush>
                                {projectsList.map((project)=>
                                    <ProjectInfo key={project.id} {...project}/>
                                )}
                            </ListGroup>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
        )
    }
}