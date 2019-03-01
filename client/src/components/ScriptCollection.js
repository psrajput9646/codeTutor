import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, ListGroup, Button, ListGroupItem} from 'reactstrap';
import classnames from 'classnames';
import ScriptInfo from './ScriptInfo.js';

export default class ScriptCollection extends React.Component {
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

handleClick = () => {
    console.log("Here");
}

render() {
    return (
        <div className="mb-4">
            <Nav tabs>
                <NavItem>
                    <NavLink 
                        className={classnames({ active: this.state.activeTab === '1' })}
                        onClick={() => { this.toggle('1'); }}>
                        My Code
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink 
                        className={classnames({ active: this.state.activeTab === '2' })}
                        onClick={() => { this.toggle('2'); }}>
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
                                <Button className="float-right" size="sm" color="success"
                                onClick={this.handleClick}>New <strong>+</strong></Button>{' '}
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
