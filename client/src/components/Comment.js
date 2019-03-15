/* Section to the right of editor. Main content div has className="list-box" and id="commentsSection".
 * First section is submitted solutions, id="solutionSection". next section is current user's starred projects, id="starSection".
 * Third section is comments on the current project, id="remarksSection".
 */
import React, { Component } from 'react';
import {Label} from 'reactstrap';
import CommentBox from './CommentBox';
import CommentProjectBox from './CommentProjectBox';

export default class Comment extends Component {
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
                <div className="list-box" id="commentsSection">
                    {/* Holds submitted solutions */}
                    <div id="solutionSection">
                        <div className="bg-dark text-light">
                            <i className="fas fa-hands-helping pl-2"> Solutions</i>
                            <span className="float-right mr-2"><i className="fa fa-plus" aria-hidden="true"></i></span>
                        </div>
                        {solutionList.map((project)=>
                            <CommentProjectBox key={project.id} {...project}/>
                        )}
                    </div>
                    {/* Holds starred projects */}
                    <div id="starSection">
                        <div className="bg-dark text-light">
                            <i className="fas fa-star pl-2"> Star Project</i>
                            <span className="float-right mr-2"><i className="fa fa-plus" aria-hidden="true"></i></span>
                        </div>
                        {starList.map((project)=>
                            <CommentProjectBox key={project.id} {...project}/>
                        )}
                    </div>
                    {/* Holds remarks */}
                    <div id="remarksSection">
                        <div className="bg-dark text-light">
                            <i className="fas fa-comments pl-2"> Remarks</i>
                            <span className="float-right mr-2"><i className="fa fa-plus" aria-hidden="true"></i></span>
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
