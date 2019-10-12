import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import axios from 'axios'
import { BrowserRouter, Route, withRouter } from 'react-router-dom'


class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }
  handleFormSubmit = event => {
    event.preventDefault();

    const email = this.state.email
    const password = this.state.password

    axios.post('http://localhost:3001/api/v1/login', {
      email: email,
      password: password
    }).then(response => {
      localStorage.setItem('jwt-token', response.data.token)
      this.props.history.push('/home')
    })

  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className='login-form'>
        <Form onSubmit={this.handleFormSubmit}>
          <Form.Group controlId="formGroupEmail">
            <Form.Control
              size="sm"
              type="email"
              placeholder="Enter email"
              name="email"
              value={this.state.email}
              onChange={e => { this.handleChange(e) }}
            />
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
            <Form.Control
              size="sm"
              type="password"
              placeholder="Password"
              name="password"
              value={this.state.password}
              onChange={e => { this.handleChange(e) }}
            />
          </Form.Group>
          <button className="btn">Login</button>
          <hr />
        </Form>
      </div >
    )
  }
}

export default withRouter(Login);