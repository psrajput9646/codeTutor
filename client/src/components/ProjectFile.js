import React, { Component } from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default class ProjectFile extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false
        };
    }
    
    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }
    render() {
        return (
        <div className="bg-light comment-box">
            <div className="ml-2">
                <span className="font-weight-light text-smaller text-dark">
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle
                    tag="span"
                    onClick={this.toggle}
                    data-toggle="dropdown"
                    aria-expanded={this.state.dropdownOpen}
                    >
                    Custom Dropdown Content
                    </DropdownToggle>
                    <DropdownMenu>
                        <div onClick={this.toggle} className="ml-2 font-weight-light">Open</div>
                        <div onClick={this.toggle} className="ml-2 font-weight-light">Delete</div>
                    </DropdownMenu>
                </Dropdown>
                </span>
            </div>
        </div>
        )
    }
}
