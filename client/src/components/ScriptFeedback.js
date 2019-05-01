/* Section to the right of editor. Main content div has className="list-box" and id="CommentsSection".
 * First section is submitted solutions, id="solutionSection". next section is current user's starred projects, id="StarSection".
 * Third section is comments on the current project, id="RemarksSection".
 */
import React, {Component} from 'react';
import {Label} from 'reactstrap';
import SolutionBox from './SolutionBox';
import CommentBox from './CommentBox';
import CreateCommentModal from './CreateCommentModal';
import AuthService from './AuthService';
import { connect } from 'react-redux'

class ScriptFeedback extends Component {

    constructor(props) {
        super(props);
        this.state = {
            commentList: [],
            solutionList: []
        };

        this.Auth = new AuthService();
        this.getComments = this.getComments.bind(this);
    }

    componentDidUpdate(prevprops){
        if(this.props !== prevprops){
            if(!this.props.selectedProject){
                this.setState({
                    solutionList: []
                });
            }else{
                this.getComments();
                this.getSolutions();
            }
        }
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

    getSolutions = () =>{
        this.Auth.fetchAuth('/api/project/get/solutions', {
            method: 'POST',
            body: JSON.stringify({
                solutions: this.props.selectedProject.solutions
            })
        })
        .then(projects => {
            this.setState({
                solutionList: projects
            });
        })
        .catch(err => {
            console.log(err)
        })
    }

    render() {
        const { commentList, solutionList } = this.state;
        
        return (
            <div className="h-100">
                {/* Header */}
                <Label for="exampleSelectMulti" className="mb-3">Script Feedback</Label>
                
                {/* Scrolling Panel */}
                <div className="round-div border list-box list-box-outer">
                    {/* Solution Section */}
                    <div id="SolutionSection">
                        {/* Header */}
                        <div className="bg-dark text-light" id="SolutionSectionHead">
                            <i className="fas fa-hands-helping pl-2"> Solutions</i>
                        </div>

                        {/* Content */}
                        {solutionList.map((project)=>
                            <SolutionBox key={project.id} {...project}/>
                        )}
                    </div>

                    {/* Comment Section */}
                    <div id="CommentSection">
                        {/* Header */}
                        <div className="bg-dark text-light mt-2" id="CommentSectionHead">
                            <i className="fas fa-comments pl-2"> Comments</i>
                            {this.props.selectedProject &&
                                <CreateCommentModal
                                    callback={this.getComments}
                                />
                            }
                        </div>

                        {/* Content */}
                        {commentList.map(comment =>
                            <CommentBox key={comment.id} {...comment} currentUserId={this.props.currentUserId}/>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    currentUserId: state.currentUserId,
    selectedProject: state.selectedProject
})
  
const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(ScriptFeedback);