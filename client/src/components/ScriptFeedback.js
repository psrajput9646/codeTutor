/* Section to the right of editor. Main content div has className="list-box" and id="CommentsSection".
 * First section is submitted solutions, id="solutionSection". next section is current user's starred projects, id="StarSection".
 * Third section is comments on the current project, id="RemarksSection".
 */
import React, {Component} from 'react';
import {Label, Modal, ModalHeader, ModalBody, FormGroup, Input, Button} from 'reactstrap';
import CommentBox from './CommentBox';
import CommentProjectBox from './CommentProjectBox';

export default class ScriptFeedback extends Component {

    constructor(props) {
        super(props);
        this.state = {
        modal: false
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
        modal: !prevState.modal
        }));
    }
    
    render() {

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

        const starList = [
            {
                id : 1,
                name : 'star 1',
                userName : 'Baily35244',
                likes: -1
            },
            {
                id : 2,
                name : 'Solution 2',
                userName : 'Robert102',
                likes: 1
            }
        ]
        
        const commentList = [
            {
                id:1, 
                text:'I am placing some comments here you little punka\nasdfasdf\nasdfasdfasdf\nasdfasdfasdfa\nasdfasdf\nasdfasdf',
                userName:'taylor10094',
                likes:123
            }, 
            {
                id:2, 
                text:'You need to code better in react\nasdfasdf\nasdfasdfasdf\nasdfasdfasdfa\nasdfasdf\nasdfasdf',
                userName:'baily0394',
                likes:123
            }, 
            {
                id:3, 
                text:'who wants to set up some docker containers?\nasdfasdf\nasdfasdfasdf\nasdfasdfasdfa\nasdfasdf\nasdfasdf',
                userName:'robert904',
                likes:123
            }
        ]
        
        return (
        <div>
            <Label for="exampleSelectMulti" className="mb-3">Script Feedback</Label>
            {/* Create round border and padding around main comment section */}
            <div className="round-div bg-white py-2 pl-2 border">
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
                    {/* Holds signed-in user's starred projects */}
                    <div id="StarSection">
                        <div className="bg-dark text-light" id="StarredSectionHead">
                            <i className="fas fa-star pl-2"> Star Project</i>
                        </div>
                        {starList.map((project)=>
                            <CommentProjectBox key={project.id} {...project}/>
                        )}
                    </div>
                    {/* Holds remarks */}
                    <div id="RemarksSection">
                        <div className="bg-dark text-light" id="RemarksSectionHead">
                            <i className="fas fa-comments pl-2"> Remarks</i>
                            {/* Popup form to add a comment */}
                            <span className="float-right mr-2">
                            <Button color="link" onClick={this.toggle} size="sm" id="AddComment">
                                <i className="fa fa-plus" aria-hidden="true"></i>
                            </Button></span>
                            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                                <ModalHeader toggle={this.toggle}>Add a Comment</ModalHeader>
                                <ModalBody>
                                    <FormGroup>
                                        <Label for="comment">Comment</Label>
                                        <Input type="textarea" rows="6" id="comment"></Input>
                                    </FormGroup>
                                    <Button color="primary" onClick={this.toggle}>Submit</Button>{' '}
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
