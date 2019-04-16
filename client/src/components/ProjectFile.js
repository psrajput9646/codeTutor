import React, { Component } from 'react'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { selectFile } from '../actions/file'
import { fetchFile } from '../actions/fileCache'
import { connect } from 'react-redux';

class ProjectFile extends Component {

    handleOpen = () => {
        if (typeof this.props.fileCache[this.props.file.id] === "undefined") {
            this.props.fetchFile(this.props.file)
            .then(fetchedFile => {
                this.props.selectFile(fetchedFile);
            })
        } else {
            this.props.selectFile(this.props.fileCache[this.props.file.id]);
        }
    }

    render() {
        const fileName = this.props.name;
        return (
        <div className="comment-box bg-light">
            <span className="font-weight-light text-smaller text-dark bg-light">
                <UncontrolledDropdown>
                    <DropdownToggle className="btn-block btn-light mb-1 text-left" size="sm">
                        {fileName}
                    </DropdownToggle>
                    
                    <DropdownMenu>
                        <DropdownItem onClick={this.handleOpen}>Open</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem >Delete</DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </span>
        </div>
        )
    }
}

const mapStateToProps = state => ({
    fileCache: state.fileCache
})

const mapDispatchToProps = dispatch => ({
    selectFile: (file) => dispatch(selectFile(file)),
    fetchFile: (file) => dispatch(fetchFile(file))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectFile);
