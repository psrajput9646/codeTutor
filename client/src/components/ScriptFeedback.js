/* Section to the right of editor. Main content div has className="list-box" and id="CommentsSection".
 * First section is submitted solutions, id="solutionSection". next section is current user's starred projects, id="StarSection".
 * Third section is comments on the current project, id="RemarksSection".
 */
import React, {Component} from 'react';
import {Label, Modal, ModalHeader, ModalBody, FormGroup, Input, Button, UncontrolledTooltip} from 'reactstrap';
import CommentBox from './CommentBox';
import CommentProjectBox from './CommentProjectBox';
import AuthService from './AuthService';
import { connect } from 'react-redux'

class ScriptFeedback extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            comment: "",
            commentList: []
        };
        this.toggle = this.toggle.bind(this);
        this.getComments = this.getComments.bind(this);
        this.createComment = this.createComment.bind(this);
        this.Auth = new AuthService();
    }

    componentDidUpdate(prevprops){
        if(this.props.selectedProject && this.props.selectedProject !== prevprops.selectedProject){
            this.getComments();
        }
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    createComment = () =>{
        const {comment} = this.state;
        this.Auth.fetchAuth('/api/comment/create', {
            method: 'POST',
            body: JSON.stringify({
                content: comment,
                projectId: this.props.selectedProject.id
            })
        })
        .then(res => {
            this.getComments();
            this.setState({
                comment: ""
            })
        })
        .catch(err => {
            console.log(err)
        })
        
        this.toggle();
    }

    getComments = () =>{
        this.Auth.fetchAuth('/api/comment/comments/'+this.props.selectedProject.id, {
            method: 'GET'
        })
        .then(res => {
            this.setState({
                commentList: res
            });
        })
        .catch(err => {
            console.log(err)
        })
    }
    
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    render() {
        const { comment, commentList } = this.state;
        const solutionList = [
            {
                id : 1,
                name : 'Solution 1',
                userName : 'ptr35244',
                likes: 124
            },
            {
                id : 2,
                name : 'Solution 2',
                userName : 'Joe102',
                likes: 90
            }
        ]
        
        return (
        <div className="h-100">
        <Label for="exampleSelectMulti" className="mb-3">Script Feedback</Label>
        {/* Create round border and padding around main comment section */}
        <div className="round-div bg-white py-2 pl-2 border list-box-outer">
            {/* Main comment section*/}
            <div className="list-box" id="CommentsSection">
                    {/* Holds submitted solutions */}
                    <div id="SolutionSection" className="mt-2">
                        <div className="bg-dark text-light" id="SolutionSectionHead">
                            <i className="fas fa-hands-helping pl-2"> Solutions</i>
                        </div>
                        {solutionList.map((project)=>
                            <CommentProjectBox key={project.id} {...project}/>
                        )}
                    </div>
                    {/* Holds remarks */}
                    <div id="CommentsSection">
                        <div className="bg-dark text-light" id="CommentsSectionHead">
                            <i className="fas fa-comments pl-2"> Comments</i>
                            {/* Popup form to add a comment */}
                            {this.props.selectedProject &&
                                <span className="float-right mr-2" onClick={this.toggle} id="AddComment">
                                    <i className="fa fa-plus" aria-hidden="true"></i>
                                    <UncontrolledTooltip placement="top" target="AddComment">
                                        Add a Comment
                                    </UncontrolledTooltip>
                                </span>
                            }
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
                        </div>
                        {commentList.map((comment) =>
                            <CommentBox key={comment.id} {...comment}/>
                        )}
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    userLoading: state.userLoading,
    userErrored: state.userErrored,
    currentUserId: state.currentUserId,
    selectedFile: state.selectedFile,
    selectedProject: state.selectedProject,
    socket: state.socket
  })
  
  const mapDispatchToProps = dispatch => ({
  })
  
  export default connect(mapStateToProps, mapDispatchToProps)(ScriptFeedback);