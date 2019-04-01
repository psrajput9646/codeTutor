// This component holds the content to the navbar
import React from 'react'
import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap'
import { Link } from 'react-router-dom'
import AuthService from './AuthService'
import { fetchCurrentUser } from '../actions/user'
import { connect } from 'react-redux'

class Navigation extends React.Component {
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
  }

  render() {
    if (this.Auth.isLoggedIn() && this.props.user === null) {
      this.props.fetchCurrentUser()
    }
    return (
      <div id="NavBar">
        <Navbar color="dark" dark expand="md">
          <Container>
            {/* Website name */}
            <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
              <NavbarBrand>
                <strong>CodeIt</strong>
              </NavbarBrand>
            </Link>
            <NavbarToggler onClick={this.toggle} />
            {/* Links */}
            <Collapse isOpen={this.state.isOpen} navbar>
              {/* Profile */}
              <SignInNav
                isLoggedIn={this.Auth.isLoggedIn()}
                handleLogout={this.handleLogout}
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
          <Link to="/signIn">
            <NavLink>Sign In</NavLink>
          </Link>
        </NavItem>
      </Nav>
    )
  } else {
    return (
      <Nav className="ml-auto" navbar>
        <NavItem>
          <Link to="/account">
            <NavLink>Profile</NavLink>
          </Link>
        </NavItem>
        <NavItem>
          <Link to="/account" replace>
            <NavLink onClick={props.handleLogout}>Sign Out</NavLink>
          </Link>
        </NavItem>
      </Nav>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  fetchCurrentUser: () => dispatch(fetchCurrentUser())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation)
