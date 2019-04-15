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
        this.setState({
            useCurrentUser: false
        })
        const pathArray = window.location.pathname.split('/').filter(function(e) {return e.length !== 0});
        const last = pathArray[pathArray.length-1];
        if(last !== "account"){
            this.props.fetchUser(last);
        }else{
            this.setState({
                useCurrentUser: true
            })
        }
    }

    updateBio = (bio) =>{
        let user = {...this.state.user};
        user.bio = bio;
        this.setState({
            user
        })
    }

    render() {
        let userInfo;
        let owner = true;
        if(!this.props.userLoading){
            if(this.state.useCurrentUser){
                userInfo = this.props.currentUser;
            }else{
                userInfo = this.props.user;
            }

            if(this.props.user !== null && this.props.currentUser !== null &&
                this.props.currentUser.id !== this.props.user.id){
                owner = false;
            }
        }

        return (
        <Container>
            <Row>
                <Col sm="3" className="mt-3">
                {this.props.userLoading ? 
                    <Spinner type="grow" color="dark" style={{width: '3rem', height: '3rem'}} />
                :  <Profile {...userInfo} callback={this.updateBio}  owner={owner}/>}   
                </Col>
                <Col sm="9">
                    <div className="mt-5">
                    {this.props.userLoading ? 
                    <Spinner type="grow" color="dark" style={{width: '3rem', height: '3rem'}} />
                :  <ProjectCollection projects={this.props.projects} owner={owner}/>} 
                    </div>
                </Col>
            </Row>
        </Container>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    currentUser: state.currentUser,
    userLoading: state.userLoading,
    userErrored: state.userErrored,
    projects: state.projects
})

const mapDispatchToProps = dispatch => ({
    fetchUser: (userId) => dispatch(fetchUser(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Accounts);