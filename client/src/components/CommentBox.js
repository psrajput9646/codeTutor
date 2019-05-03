import React, { Component } from 'react'
import AuthService from './AuthService';

export default class CommentBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            votedBy: this.props.votedBy,
            votes: this.props.votes
        };

        this.Auth = new AuthService();
    }

    vote = () => {
        const { id } = this.props
        this.Auth.fetchAuth('/api/comment/vote/'+id, {
            method: 'POST'
        })
        .then(res => {
            console.log(res);
            this.setState({
                votes: res[0].votes,
                votedBy: res[0].votedBy
            });
        })
        .catch(err => {
            console.log(err)
        })
    }

    render() {
        const { votes, votedBy } = this.state;
        const { user, userId, content, currentUserId } = this.props;
        const liked = votedBy.includes(currentUserId);
        console.log(this.props)
        return (
        <div className="bg-light comment-box">
            <div className="ml-2">
                <span className="font-weight-light text-smaller">
                    {content}
                </span>
                <span className="font-weight-light text-smaller pl-2 text-primary">
                    - <a href={"/account/"+userId}>{user.username}</a>
                </span>
                <div>
                    {liked ?
                        <span className="like-comment text-secondary">
                            <i className="fa fa-heart fa-xs text-danger" onClick={this.vote}></i>
                        </span>
                    :
                        <span className="like-comment text-secondary">
                            <i className="fa fa-heart fa-xs" onClick={this.vote}></i>
                        </span>
                    }
                    <span className="font-weight-light smallerText pl-2 text-like">
                        {votes}
                    </span>
                </div>
            </div>
        </div>
        )
    }
}