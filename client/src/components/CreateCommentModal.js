import React, { Component } from 'react';
import { Label, Modal, ModalHeader, ModalBody, 
    FormGroup, Input, Button, UncontrolledTooltip } from 'reactstrap';
import AuthService from './AuthService';
import { connect } from 'react-redux'

class CreateCommentModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: false,
            comment: "",
        };

        this.Auth = new AuthService();
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }
    
    createComment = () => {
        const {comment} = this.state;
        this.Auth.fetchAuth('/api/comment/create', {
            method: 'POST',
            body: JSON.stringify({
                content: comment,
                projectId: this.props.selectedProject.id
            })
        })
        .then(res => {
            this.props.callback();
            this.setState({
                comment: ""
            })
        })
        .catch(err => {
            console.log(err)
        })
        
        this.toggle();
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    render(){
        const { comment } = this.state;
        return(
            <span>
                <span className="float-right mr-2" onClick={this.toggle} id="AddComment">
                    <i className="fa fa-plus" aria-hidden="true"></i>
                    <UncontrolledTooltip placement="top" target="AddComment">
                        Add a Comment
                    </UncontrolledTooltip>
                </span>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Add a Comment</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="comment">Comment</Label>
                            <Input
                                type="textarea"
                                name="comment"
                                id="Comment"
                                value={comment}
                                onChange={this.handleChange}
                                rows="6"
                            ></Input>
                        </FormGroup>
                        <Button color="success" onClick={this.createComment}>Submit</Button>{' '}
                    </ModalBody>
                </Modal>
            </span>
        )
   }
}

const mapStateToProps = state => ({
    selectedProject: state.selectedProject
  })
  
  const mapDispatchToProps = dispatch => ({
  })
  
  export default connect(mapStateToProps, mapDispatchToProps)(CreateCommentModal);