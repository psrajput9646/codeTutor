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
import { fetchUser } from '../actions/user';

class Accounts extends Component {
    
    componentDidMount(){
        if(this.props.userLoggedIn && (this.props.user === null || 
            this.props.user.id !== parseInt(this.props.match.params.userId))){
            this.loadUser();
        }
    }

    componentDidUpdate(prevProps){
        if(prevProps.match.params.userId !== this.props.match.params.userId ||
            prevProps.currentUserId !== this.props.currentUserId){
            this.loadUser();
        }
    }

    loadUser = () => {
        let userId = this.props.match.params.userId
        if(userId === undefined){
            userId = this.props.currentUserId;
        }

        if(userId !== -1){
            this.props.fetchUser(userId);
        }
    }

    render() {
        return (
        <Container>
            <Row>
                <Col sm="3" className="mt-3">
                {this.props.userLoading ? 
                    <Spinner type="grow" color="dark" style={{width: '3rem', height: '3rem'}} />
                :  <Profile/>}   
                </Col>
                <Col sm="9">
                    <div className="mt-5">
                    {this.props.userLoading ?
                        <Spinner type="grow" color="dark" style={{width: '3rem', height: '3rem'}} />
                    :   <ProjectCollection/>
                    } 
                    </div>
                </Col>
            </Row>
        </Container>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    currentUserId: state.currentUserId,
    userLoading: state.userLoading,
    userLoggedIn: state.userLoggedIn,
    projects: state.projects
})

const mapDispatchToProps = dispatch => ({
    fetchUser: (userId) => dispatch(fetchUser(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Accounts);