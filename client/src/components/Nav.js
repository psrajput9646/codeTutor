// This component holds the content to the navbar
import React from 'react'
import {Container, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap'
import { Link } from 'react-router-dom'
import AuthService from './AuthService'
import { setUserLoggedIn, setCurrentUserId } from '../actions/user'
import { connect } from 'react-redux'

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      isOpen: false
    }

    this.Auth = new AuthService();
    this.toggle = this.toggle.bind(this)
  }

  componentDidMount(){
    if(this.Auth.isLoggedIn()){
      this.props.setCurrentUserId();
    }
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  handleLogout = () => {
    this.props.setUserLoggedIn(false);
    this.Auth.logout();
  }

  render() {
    return (
      <div id="NavBar">
        <Navbar color="dark" dark expand="md">
          <Container fluid>

            {/* Website name */}
            <NavbarBrand tag={Link} to="/"><strong>CodeIt</strong></NavbarBrand>
            <NavbarToggler onClick={this.toggle} />

            {/* Links */}
            <Collapse isOpen={this.state.isOpen} navbar>
              <SignInNav
                isLoggedIn={this.props.userLoggedIn}
                handleLogout={this.handleLogout}
                userId={this.props.currentUserId}
              />
            </Collapse>

          </Container>
        </Navbar>
      </div>
    )
  }
}

const SignInNav = (props) => {
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
  userLoggedIn: state.userLoggedIn,
  currentUserId: state.currentUserId
})

const mapDispatchToProps = dispatch => ({
  setUserLoggedIn: (status) => dispatch(setUserLoggedIn(status)),
  setCurrentUserId: () => dispatch(setCurrentUserId())
})

export default connect(mapStateToProps,mapDispatchToProps)(Navigation)