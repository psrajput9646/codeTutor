// Allows the user to sign into their account
import React, { Component } from 'react'
import { FormGroup, Label, Input, Button } from 'reactstrap'
import AuthService from './AuthService'
import {Redirect} from 'react-router-dom';

export default class SignIn extends Component {
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
          this.setState({
            redirect: true
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    const { username, password, redirect } = this.state
    if (redirect) {
      return <Redirect to='/' />
    }
    
    return (
      <div className="mx-3">
        <form>
          <h3 className="mt-3">Sign In</h3>
          <FormGroup className="mt-3">
            <Label for="exampleUsername">Username</Label>
            <Input
              type="username"
              name="username"
              id="username"
              placeholder="Username"
              value={username}
              onChange={this.handleChange}
              onKeyDown={this.onKeyDown}
              />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={this.handleChange}
              onKeyDown={this.onKeyDown}
            />
          </FormGroup>
        </form>
        <Button
          color="success"
          type="submit"
          className="float-right mb-5"
          onClick={this.handleSubmit}
          >
          Sign In
        </Button>
        {''}
      </div>
    )
  }
}
