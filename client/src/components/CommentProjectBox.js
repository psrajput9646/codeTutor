import React, { Component } from 'react'

export default class CommentProjectBox extends Component {
    render() {
        const project = this.props;
        return (
        <div className="bg-light comment-box">
            <div className="ml-2">
                <span className="font-weight-light text-smaller text-primary">
                    <a href="/editor">{project.name}</a>
                </span>
                <span className="font-weight-light text-smaller text-primary">
                    - <a href="/account/">{project.userName}</a>
                </span>
                <div>
                    <span className="likeComment text-secondary">
                        <i className="fas fa-check-circle fa-xs"></i>
                    </span>
                    <span className="font-weight-light smallerText pl-2 text-like">{project.likes}</span>
                </div>
            </div>
        </div>
        )
    }
}
