// Allows the user to either sign in or sign up
import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Container, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import SignIn from './SignIn';
import SignUp from './SignUp';

export default class AccountAccess extends Component {
        constructor(props) {
            super(props);
        
            this.toggle = this.toggle.bind(this);
            this.state = {
            activeTab: '1'
            };
        }
        
        toggle(tab) {
            if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
            }
        }
        render() {
            return (
            <div className="stretch-container mt-5">
                <Container className="h-100">
                    <Row className="align-items-center h-100">
                        <Col sm={{size: 6, offset: 3}} >
                            <Nav tabs>
                            <NavItem>
                                <NavLink
                                className={classnames({ active: this.state.activeTab === '1' })}
                                onClick={() => { this.toggle('1'); }}
                                >
                                Sign In
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                className={classnames({ active: this.state.activeTab === '2' })}
                                onClick={() => { this.toggle('2'); }}
                                >
                                Sign Up
                                </NavLink>
                            </NavItem>
                            </Nav>
                            <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="1">
                                <Row>
                                    <Col>
                                        <SignIn/>
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tabId="2">
                                <Row>
                                    <Col>
                                        <SignUp/>
                                    </Col>
                                </Row>
                            </TabPane>
                            </TabContent>
                        </Col>
                    </Row>
                </Container>
            </div>
            );
        }
}
