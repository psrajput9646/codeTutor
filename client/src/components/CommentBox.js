import React, { Component } from 'react'

export default class CommentBox extends Component {
    render() {
        return (
        <div className="bg-light comment-box">
            <div className="ml-2">
                <span className="font-weight-light text-smaller">
                    I am placing some comments here you little punka
                    asdfasdf
                    asdfasdfasdf
                    asdfasdfasdfa
                    asdfasdf
                    asdfasdf
                </span>
                <span className="font-weight-light text-smaller pl-2 text-primary">
                    - <a href="/">User Name</a>
                </span>
                <div>
                    <span className="likeComment text-secondary">
                        <i className="fas fa-check-circle fa-xs"></i>
                    </span>
                    <span className="font-weight-light smallerText pl-2 text-like">
                        1240
                    </span>
                </div>
            </div>
        </div>
        )
    }
}
