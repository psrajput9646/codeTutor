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
        this.Auth = new AuthService();
        this.getUser = this.getUser.bind(this);
        this.state = {
            user: null
        }
    }

    componentDidMount(){
        this.getUser();
    }
    
    getUser = () =>{
        const user = this.Auth.getProfile();
        return this.Auth.fetchAuth('/api/user/'+user.id, {
            method: 'GET'
        })
        .then(res => {
            this.setState({
                user: res
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    render() {
        const { user } = this.state;
        let test = user;
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