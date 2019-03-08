import React, { Component } from 'react';
import { Container, Row, Col} from 'reactstrap';
import Profile from './Profile.js';
import ProjectCollection from './ProjectCollection.js';

export default class Accounts extends Component {

    render() {

        const user = {
            img: '../img/profile.png',
            firstName: 'Peter',
            lastName: 'Harlan',
            userName: 'ptr35244',
            likes: 123,
            bio: ' bio goes here Descrippsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially u'
        };

        return (
        <Container>
            <Row> 
                <Col sm="3" className="mt-3">
                    <Profile {...user}/>
                </Col>
                <Col sm="9">
                    <div className="mt-5">
                        <ProjectCollection/>
                    </div>
                </Col>
            </Row>
        </Container>
        )
    }
}