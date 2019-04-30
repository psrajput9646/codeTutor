import React, { Component } from 'react'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Modal, ModalHeader,
    ModalBody, Form, Label, Button, FormFeedback, FormGroup, Input } from 'reactstrap';
import { selectFile, deleteFile, renameFile } from '../actions/file'
import { selectProject } from '../actions/projects';
import { fetchFile } from '../actions/fileCache'
import { connect } from 'react-redux';
import AuthService from './AuthService'

class ProjectFile extends Component {
    constructor(props){
        super(props);
        this.state= {
            newFileName: this.props.file.name,
            deleteModal: false,
            renameModal: false,
            invalid: false,
        };

        this.Auth = new AuthService();
    }

    openFile = () => {
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

    toggleRename = () =>{
        this.setState(prevState =>({
            renameModal: !prevState.renameModal
        }))
    }

    renameFile = () => {
        if (this.props.selectedFile && this.props.file.id === this.props.selectedFile.id){
            this.props.selectFile(null);
        }

        this.props.renameFile(this.props.file.id, this.state.newFileName);
        this.toggleRename();
    }

    toggleDelete = () =>{
        this.setState(prevState =>({
            deleteModal: !prevState.deleteModal
        }))
    }

    deleteFile = () => {
        if (this.props.selectedFile && this.props.file.id === this.props.selectedFile.id){
            this.props.selectFile(null);
        }
        this.props.deleteFile(this.props.file.id);
        this.toggleDelete();
    }

    handleChange = event => {
        let name = event.target.value;
        const invalid = !/^[a-zA-Z]+$/.test(name)

        this.setState({
            [event.target.name]: event.target.value,
            invalid
        })
    }

    render() {
        const { newFileName, invalid } = this.state;
        const fileName = this.props.name;
        const owner = (this.props.user && this.props.currentUserId === this.props.user.id)? true : false;

        return (
        <div className="file bg-light">
            <span className="font-weight-light text-smaller text-dark bg-light">
                <UncontrolledDropdown>
                    <DropdownToggle className="btn-block btn-light text-left" size="sm">
                        {fileName}
                    </DropdownToggle>
                    
                    <DropdownMenu>
                        <DropdownItem onClick={this.openFile}>
                            <i className="far fa-file"></i> Open
                        </DropdownItem>
                        
                        {owner &&
                        <span>
                            <DropdownItem divider />

                            <DropdownItem onClick={this.toggleRename}>
                                <i className="far fa-edit"></i> Rename
                            </DropdownItem>

                            <DropdownItem divider />

                            <DropdownItem onClick={this.toggleDelete}>
                                <i className="far fa-trash-alt"></i> Delete
                            </DropdownItem>
                        </span>
                        }
                    </DropdownMenu>
                </UncontrolledDropdown>
            </span>
            <Modal
                isOpen={this.state.deleteModal}
                toggle={this.toggleDelete}>
                <ModalHeader toggle={this.toggleDelete}>Delete File</ModalHeader>
                <ModalBody>
                    <Label>Are you sure?</Label>
                    <Form>
                        <Button color="danger" onClick={this.deleteFile}>
                            Yes
                        </Button>
                        <Button className="ml-3" color="secondary" onClick={this.toggleDelete}>
                            No
                        </Button>
                    </Form>
                </ModalBody>
            </Modal>
            <Modal
                isOpen={this.state.renameModal}
                toggle={this.toggleRename}>
                <ModalHeader toggle={this.toggleRename}>Rename File</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.renameFile}>
                        <FormGroup>
                            <Label for="newFileName">File Name</Label>
                            <Input
                            invalid={invalid}
                            type="text"
                            name="newFileName"
                            id="NewFileName"
                            value={newFileName}
                            onChange={this.handleChange}
                            placeholder="New File Name"
                            />
                            <FormFeedback>Alphabet Characters Only!</FormFeedback>
                        </FormGroup>
                        <Button color="success" onClick={this.renameFile}>
                            Submit
                        </Button>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    currentUserId: state.currentUserId,
    projects: state.projects,
    fileCache: state.fileCache,
    selectedFile: state.selectedFile,
    selectedProject: state.selectedProject
})

const mapDispatchToProps = dispatch => ({
    selectFile: (file) => dispatch(selectFile(file)),
    selectProject: (project, id) => dispatch(selectProject(project, id)),
    fetchFile: (file) => dispatch(fetchFile(file)),
    deleteFile: (id) => dispatch(deleteFile(id)),
    renameFile: (id, name) => dispatch(renameFile(id, name))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectFile);