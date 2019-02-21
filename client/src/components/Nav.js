// This component holds the content to the navbar
import React from 'react';
import {
Container,
Collapse,
Navbar,
NavbarToggler,
NavbarBrand,
Nav,
NavItem,
NavLink} from 'reactstrap';

export default class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
        isOpen: false
        };
    }
    toggle() {
        this.setState({
        isOpen: !this.state.isOpen
        });
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
                <Nav className="ml-auto" navbar>
                {/* Profile */}
                <NavItem>
                    <NavLink href="/account/">Profile</NavLink>
                </NavItem>
                {/* Allows users to sign in */}
                <NavItem>
                    <NavLink href="/signIn/">Sign In</NavLink>
                </NavItem>
                {/* Allows users to sign out */}
                <NavItem>
                    <NavLink href="/components/">Sign Out</NavLink>
                </NavItem>
                </Nav>
            </Collapse>
            </Container>
            </Navbar>
        </div>
        );
    }
}
