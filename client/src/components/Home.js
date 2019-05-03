import React, { Component } from 'react';
import { Container, Row, Col, ListGroup, Spinner } from 'reactstrap';
import ProjectInfo from './ProjectInfo.js';

import AuthService from './AuthService';
export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            projectsList: []
        }

        this.getAllProjects = this.getAllProjects.bind(this);
        this.Auth = new AuthService();
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
                <Row>
                    <Col sm="12">
                        {/* Heading */}
                        <div className="mt-5">
                            <h1>Project Feed</h1>
                        </div>

                        {/* List Of All Projects*/}
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
            </Container>
        </div>
        )
    }
}