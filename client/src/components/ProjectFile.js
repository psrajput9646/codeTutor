import React, { Component } from 'react'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { selectFile } from '../actions/file'
import { selectProject } from '../actions/projects';
import { fetchFile } from '../actions/fileCache'
import { connect } from 'react-redux';

class ProjectFile extends Component {
    constructor(props){
        super(props);
        this.state = {
            redirect: false
        }
    }

    handleOpen = () => {
        if(!this.props.selectedProject || this.props.selectedProject.id !== this.props.projectId){
            this.props.selectProject(this.props.projects, this.props.projectId);
        }

        if(typeof this.props.fileCache[this.props.file.id] === "undefined") {
            this.props.fetchFile(this.props.file)
            .then(fetchedFile => {
                this.props.selectFile(fetchedFile);
            })
        } else {
            this.props.selectFile(this.props.fileCache[this.props.file.id]);
        }
    }

    componentDidUpdate(prevProps){
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
    projects: state.projects,
    fileCache: state.fileCache,
    selectedFile: state.selectedFile,
    selectedProject: state.selectedProject
})

const mapDispatchToProps = dispatch => ({
    selectFile: (file) => dispatch(selectFile(file)),
    selectProject: (project, id) => dispatch(selectProject(project, id)),
    fetchFile: (file) => dispatch(fetchFile(file))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectFile);
