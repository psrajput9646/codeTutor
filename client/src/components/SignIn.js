// Allows the user to sign into their account
import React, { Component } from 'react'
import { FormGroup, Label, Input, Button, UncontrolledTooltip, Alert, Form} from 'reactstrap'
import AuthService from './AuthService'
import {Redirect} from 'react-router-dom';
import {connect} from "react-redux";
import { setUserLoggedIn } from "../actions/user"

class SignIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      redirect: false,
    }
    this.Auth = new AuthService()
  }

  //Submits the form when Enter key is pressed
  onKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      this.handleSubmit();
    }
  }

  //Updates the state when an input field is updated
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = () => {
    const { password, username } = this.state
    this.Auth.fetchAuth('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        password,
        username
      })
    })
      .then(res => {
        if (!res.OK) {
          this.Auth.setToken(res.token)
          this.props.setUserLoggedIn(true)
          this.setState({
            redirect: true
          })
        }
      })
      .catch(err => {
        this.setState({
            err
        })
    })
  }

  render() {
    const { username, password, redirect, err} = this.state
    if (redirect) {
      return <Redirect to='/' />
    }
    
    return (
      <div className="mx-3">
        <Form>
          <h3 className="mt-3">Sign In</h3>
          <FormGroup className="mt-3">
            <Label for="exampleUsername">Username</Label>
            <Input
              type="username"
              name="username"
              id="SignInUsername"
              placeholder="Username"
              value={username}
              onChange={this.handleChange}
              onKeyDown={this.onKeyDown}
              />
          </FormGroup>
          <FormGroup id="SignInPasswordGroup">
            <Label for="examplePassword">Password</Label>
            <Input
              type="password"
              name="password"
              id="SignInPassword"
              placeholder="Password"
              value={password}
              onChange={this.handleChange}
              onKeyDown={this.onKeyDown}
            />
          </FormGroup>
          <UncontrolledTooltip placement="top" target="SignInPasswordGroup">
              Case sensitive
          </UncontrolledTooltip>
        </Form>
        {err && <Alert color="danger">{err}</Alert>}
        <Button
          color="success"
          type="submit"
          className="float-right mb-5"
          onClick={this.handleSubmit}
          >Sign In
        </Button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
})

const mapDispatchToProps = dispatch => ({
  setUserLoggedIn: (status) => dispatch(setUserLoggedIn(status))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn)

