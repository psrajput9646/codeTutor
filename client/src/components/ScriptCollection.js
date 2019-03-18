import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, ListGroup, Button, ListGroupItem} from 'reactstrap';
import classnames from 'classnames';
import ScriptInfo from './ScriptInfo.js';
import AuthService from './AuthService'

export default class ScriptCollection extends React.Component {
constructor(props) {
    super(props);
    this.Auth = new AuthService();
    let profile = this.Auth.getProfile();
    this.toggle = this.toggle.bind(this);
    this.createScript = this.createScript.bind(this);
    this.state = {
        activeTab: '1',
        username: profile.username
    };
}

toggle = (e) => {
    this.setState({
        activeTab: e.target.attributes.value.nodeValue
    })
}

createScript = () => {
    this.Auth.fetchAuth('/api/project/create', {
        method: 'POST',
        body: JSON.stringify({
            name: "test",
            username: this.username
            })
        })
            .then(res => {
            if (!res.OK) {
                this.Auth.setToken(res.token)
                this.props.history.push('/')
            }
            })
            .catch(err => {
            console.log(err)
            })
}

render() {
    return (
        <div className="mb-4">
            <Nav tabs>
                <NavItem>
                    <NavLink
                        value={'1'}
                        className={classnames({ active:this.state.activeTab === '1' })}
                        onClick={this.toggle}>
                        My Code
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        value={'2'}
                        className={classnames({ active: this.state.activeTab === '2' })}
                        onClick={this.toggle}>
                        Star
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
                <Row>
                    <Col sm="12">
                        <ListGroup className="mt-3" flush>
                            <ListGroupItem className="pt-0">
                                <Button 
                                    value={'1'}
                                    className="float-right" size="sm" color="success" 
                                    onClick={this.createScript}>New <strong>+</strong>
                                </Button>{' '}
                            </ListGroupItem>
                            <ScriptInfo/>
                            <ScriptInfo/>
                        </ListGroup>
                    </Col>
                </Row>
            </TabPane>
            <TabPane tabId="2">
                <Row>
                    <Col sm="12">
                        <ListGroup className="mt-3" flush>
                            <ScriptInfo/>
                            <ScriptInfo/>
                            <ScriptInfo/>
                        </ListGroup>
                    </Col>
                </Row>
            </TabPane>
            </TabContent>
        </div>
        );
    }
}
