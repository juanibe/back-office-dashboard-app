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
      error: false,
      errorMessage: ""
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
    })
      .then(response => {
        localStorage.setItem('jwt-token', response.data.token)
        this.props.history.push('/home')
      })
      .catch(error => {
        console.log(error.response)
        this.setState({ error: true, errorMessage: error.response.data.message, password: "" })
      })

  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="login-pres col-7">
              <div className="login-title">
                <h1 className="main-title-login">livings del pilar</h1>
                <h4>admin panel</h4>
              </div>
            </div>
            <div className="login-form col-5">
              <div className="form-fields">
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
                  <button className="btn-xs btn-outline-info btn-login">Login</button>
                  <hr />
                </Form>
                <div>
                  {this.state.error && (
                    <p className="login-error-message">{this.state.errorMessage}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div >
    )
  }
}

export default withRouter(Login);