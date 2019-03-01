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
import AuthService from './AuthService'

export default class Navigation extends React.Component {
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
    return (
      <div id="navBar">
        <Navbar color="dark" dark expand="md">
          <Container>
            {/* Website name */}
            <NavbarBrand href="/">
              <strong>CodeIt</strong>
            </NavbarBrand>
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
          <NavLink href="/signIn/">Sign In</NavLink>
        </NavItem>
      </Nav>
    )
  } else {
    return (
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink href="/account/">Profile</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/signIn/" onClick={props.handleLogout}>
            Sign Out
          </NavLink>
        </NavItem>
      </Nav>
    )
  }
}
