import React, { Component } from 'react'

export default class CommentBox extends Component {
    render() {
        const comment = this.props;
        return (
        <div className="bg-light comment-box">
            <div className="ml-2">
                <span className="font-weight-light text-smaller">
                    {comment.content}
                </span>
                <span className="font-weight-light text-smaller pl-2 text-primary">
                    - <a href="/">{comment.username}</a>
                </span>
                <div>
                    <span className="like-comment text-secondary">
                        <i className="fas fa-check-circle fa-xs"></i>
                    </span>
                    <span className="font-weight-light smallerText pl-2 text-like">
                        {comment.votes}
                    </span>
                </div>
            </div>
        </div>
        )
    }
}
