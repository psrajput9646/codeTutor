/* This is the main user account page. It currently stores user info in a const 'user' and sends it to the <Profile> component.
 * This const should actually pull information for the logged-in user by default. When viewing a user who is not
 * logged in, the information should come from the user associated with the one passed to this component.
 * It also uses the <ProjectCollection> component to show the user's owned and starred projects.
 */
import React, { Component } from 'react';
import { Container, Row, Col} from 'reactstrap';
import Profile from './Profile.js';
import ProjectCollection from './ProjectCollection.js';
import AuthService from './AuthService';

export default class Accounts extends Component {

    constructor(props){
        super(props);
        this.AuthService = new AuthService();

        this.state = {
            user: {}
        }
    }

    componentDidMount(){
        this.setState({
            user : this.AuthService.getProfile()
        })
        console.log(this.AuthService.getProfile());
    }
    render() {

        const user = {
            firstName: 'Peter',
            lastName: 'Harlan',
            username: 'ptr35244',
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