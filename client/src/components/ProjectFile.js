import React, { Component } from 'react'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { selectFile } from '../actions/file'
import { fetchFile } from '../actions/fileCache'
import { connect } from 'react-redux';

class ProjectFile extends Component {

    handleOpen = () => {
        let findFile = this.props.fileCache.find(file => file.id === this.props.file.id)
        if (!findFile) {
            this.props.fetchFile(this.props.file)
            .then(fetchedFile => {
                this.props.selectFile(fetchedFile);
            })
        } else {
            this.props.selectFile(findFile);
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
