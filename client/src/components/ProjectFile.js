import React, { Component } from 'react'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default class ProjectFile extends Component {

    render() {
        const fileName = this.props.name;
        return (
        <div className="comment-box bg-light">
            <span className="font-weight-light text-smaller text-dark bg-light">
                <UncontrolledDropdown>
                    <DropdownToggle className="btn-block btn-light mb-1" size="sm">
                        {fileName}
                    </DropdownToggle>
                    
                    <DropdownMenu>
                        <DropdownItem>Open</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>Delete</DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </span>
        </div>
        )
    }
}
