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
        <div>
            <Navbar color="dark" dark expand="md">
            <Container>
            {/* Website name */}
            <NavbarBrand href="/">
                <strong>WTFS</strong>
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
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
