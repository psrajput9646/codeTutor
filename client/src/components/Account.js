/* This is the main user account page. It currently stores user info in a const 'user' and sends it to the <Profile> component.
 * This const should actually pull information for the logged-in user by default. When viewing a user who is not
 * logged in, the information should come from the user associated with the one passed to this component.
 * It also uses the <ProjectCollection> component to show the user's owned and starred projects.
 */
import React, { Component } from 'react';
import { Container, Row, Col, Spinner} from 'reactstrap';
import Profile from './Profile.js';
import ProjectCollection from './ProjectCollection.js';
import { connect } from 'react-redux'
import { fetchCurrentUser } from '../actions/user';

class Accounts extends Component {

    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.fetchCurrentUser();
    }

    render() {
        return (
        <Container>
            <Row>
                <Col sm="3" className="mt-3">
                {this.props.userLoading ? 
                    <Spinner type="grow" color="dark" style={{width: '3rem', height: '3rem'}} />
                :  <Profile {...this.props.user}/>}   
                </Col>
                <Col sm="9">
                    <div className="mt-5">
                    {this.props.userLoading ? 
                    <Spinner type="grow" color="dark" style={{width: '3rem', height: '3rem'}} />
                :  <ProjectCollection projects={this.props.projects}/>} 
                    </div>
                </Col>
            </Row>
        </Container>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    userLoading: state.userLoading,
    userErrored: state.userErrored,
    projects: state.projects
})

const mapDispatchToProps = dispatch => ({
    fetchCurrentUser: () => dispatch(fetchCurrentUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(Accounts);