import React, { Component } from 'react';
import {Label} from 'reactstrap';
import CommentBox from './CommentBox';
import CommentProjectBox from './CommentProjectBox';

export default class Comment extends Component {
    render() {
        return (
        <div>
            <Label for="exampleSelectMulti" className="mb-3">Script Feedback</Label>
            {/* Create round border and padding around main comment section */}
            <div className="round-div bg-white py-2 pl-2 border">
                {/* Main comment section*/}
                <div className="list-box" id="commentsSection">
                    {/* Holds starred projects */}
                    <div id="solutionSection">
                        <div className="bg-dark text-light">
                            <i className="fas fa-hands-helping pl-2"> Solutions</i>
                        </div>
                        <CommentProjectBox/>
                    </div>
                    {/* Holds starred projects */}
                    <div id="starSection">
                        <div className="bg-dark text-light">
                            <i className="fas fa-star pl-2"> Star Project</i>
                        </div>
                        <CommentProjectBox/>
                    </div>
                    {/* Holds remarks */}
                    <div id="remarksSection">
                        <div className="bg-dark text-light">
                            <i className="fas fa-comments pl-2"> Remarks</i>
                        </div>
                        <CommentBox/>
                        <CommentBox/>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}
