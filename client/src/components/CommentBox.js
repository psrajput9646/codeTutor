import React, { Component } from 'react'
import AuthService from './AuthService';

export default class CommentBox extends Component {
   
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.username,
            content: this.props.content,
            votes: this.props.votes,
            id: this.props.id
        };
        this.vote = this.vote.bind(this);
        this.Auth = new AuthService();
    }

    vote(){
        const { id } = this.state
        this.Auth.fetchAuth('/api/comment/vote/'+id, {
            method: 'POST'
        })
        .then(res => {
            this.setState({
                votes: res.votes
            });
        })
        .catch(err => {
            console.log(err)
        })
    }

    render() {
        const { username, content, votes } = this.state;
        return (
        <div className="bg-light comment-box">
            <div className="ml-2">
                <span className="font-weight-light text-smaller">
                    {content}
                </span>
                <span className="font-weight-light text-smaller pl-2 text-primary">
                    - <a href="/">{username}</a>
                </span>
                <div>
                    <span className="like-comment text-secondary">
                        <i className="fa fa-heart fa-xs text-danger" onClick={this.vote}></i>
                    </span>
                    <span className="font-weight-light smallerText pl-2 text-like">
                        {votes}
                    </span>
                </div>
            </div>
        </div>
        )
    }
}
