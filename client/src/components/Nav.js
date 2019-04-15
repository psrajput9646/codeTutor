// This component holds the content to the navbar
import React from 'react'
import {Container, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap'
import { Link } from 'react-router-dom'
import AuthService from './AuthService'
import { fetchCurrentUser, setUserLoggedIn } from '../actions/user'
import { connect } from 'react-redux'

class Navigation extends React.Component {
  
  componentDidMount(){
    
  }

  constructor(props) {
    super(props)
    this.Auth = new AuthService()
    this.toggle = this.toggle.bind(this)
    this.state = {
      isOpen: false
    }
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  handleLogout = () => {
    this.Auth.logout()
    this.props.userLoggedIn(false);
  }

  render() {
    let id;
    if (this.Auth.isLoggedIn()){
      if(this.props.currentUser === null) {
        this.props.fetchCurrentUser();
      }else{
        id = this.props.currentUser.id;
      }
    }
    
    return (
      <div id="NavBar">
        <Navbar color="dark" dark expand="md">
          <Container fluid>
            {/* Website name */}
            <NavbarBrand tag={Link} to="/"><strong>CodeIt</strong></NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            {/* Links */}
            <Collapse isOpen={this.state.isOpen} navbar>
              {/* Profile */}
              <SignInNav
                isLoggedIn={this.props.userLoggedIn}
                handleLogout={this.handleLogout}
                userId={id}
              />
            </Collapse>
          </Container>
        </Navbar>
      </div>
    )
  }
}

const SignInNav = props => {
  const isLoggedIn = props.isLoggedIn
  if (!isLoggedIn) {
    return (
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink tag={Link} to="/signIn"><strong>Sign In</strong></NavLink>
        </NavItem>
      </Nav>
    )
  } else {
    return (
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink tag={Link} to={"/account/"+props.userId}><strong>Profile</strong></NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to="/account" onClick={props.handleLogout} replace><strong>Sign Out</strong></NavLink>
        </NavItem>
      </Nav>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser,
  userLoggedIn: state.userLoggedIn
})

const mapDispatchToProps = dispatch => ({
  fetchCurrentUser: () => dispatch(fetchCurrentUser()),
  setUserLoggedIn: (status) => dispatch(setUserLoggedIn(status))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation)
