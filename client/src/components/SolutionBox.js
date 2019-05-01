import React, { Component } from 'react'
import AuthService from './AuthService'
import { Link } from 'react-router-dom'
import { selectProject } from '../actions/projects'
import { selectFile } from '../actions/file'
import { connect } from 'react-redux'

class SolutionBox extends Component {
    constructor(props){
        super(props);
        this.state= {
            votes: this.props.votes,
            votedBy: this.props.votedBy
        }

        this.Auth = new AuthService();
    }

    voteProject = () =>{
        this.Auth.fetchAuth("/api/project/vote/" + this.props.id, {
            method: "POST"
        })
        .then(res =>{
           this.setState({
               votes: res[0].votes,
               votedBy: res[0].votedBy
           })
        })
        .catch(err =>{
            console.log(err)
        })
    }

    unload = () =>{
        this.props.selectFile(null)
        this.props.selectProject(this.props.projects, null)
    }

    render() {
        const project = this.props;
        
        return (
        <div className="bg-light comment-box">
            <div className="ml-2">
                <span className="font-weight-light text-smaller text-primary">
                    <Link to={"/editor/"+project.user.id} onClick={this.unload}>{project.name}</Link>
                </span>
                <i> - </i>
                <span className="font-weight-light text-smaller text-primary">
                    <Link to={"/account/"+project.user.id}>{project.user.username}</Link>
                </span>
                <div>
                    <span className="like-comment text-secondary">
                    {this.state.votedBy.includes(this.props.currentUserId)
                    ?   <i className="fas fa-thumbs-up fa-xs text-primary" onClick={this.voteProject}></i>
                    :   <i className="fas fa-thumbs-up fa-xs" onClick={this.voteProject}></i>
                    }
                    </span>
                    <span className="font-weight-light smallerText pl-2 text-like">{this.state.votes}</span>
                </div>
            </div>
        </div>
        )
    }
}

const mapStateToProps = state => ({
    projects: state.projects,
    currentUserId: state.currentUserId
})
  
const mapDispatchToProps = dispatch => ({
    selectFile: id => dispatch(selectFile(id)),
    selectProject: id => dispatch(selectProject(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(SolutionBox);