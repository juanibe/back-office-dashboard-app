import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { getJwt } from '../helpers/jwt'


class EditPasswordComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      password: "",
      confirmPassword: "",
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }
  handleFormSubmit = event => {
    event.preventDefault();
    const jwt = getJwt()

    const password = this.state.password
    const confirmPassword = this.state.confirmPassword
    const data = { password: password, confirmPassword: confirmPassword }
    const headers = {
      'Authorization': `Bearer ${jwt}`,
    }

    axios.put('http://localhost:3001/api/v1/update-password', data, { headers: headers })
      .then(response => {
        axios.post('http://localhost:3001/api/v1/logout')
          .then(() => {
            localStorage.removeItem('jwt-token')
            this.forceUpdate()
            this.props.history.push(`/login`)
          })
      })
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div style={{ width: "50%" }}>
        <div>
          <p style={{ color: "rgb(200,50,50)", fontSize: "0.85em" }}>After changing your password you will be logged out</p>
        </div>
        <Form onSubmit={this.handleFormSubmit}>
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
          <Form.Group controlId="formGroupPassword">
            <Form.Control
              size="sm"
              type="password"
              placeholder="Confirm your password"
              name="confirmPassword"
              value={this.state.confirmPassword}
              onChange={e => { this.handleChange(e) }}
            />
          </Form.Group>
          <button className="btn-xs btn-outline-dark">Submit</button>
          <hr />
        </Form>
      </div >
    )
  }
}

export default withRouter(EditPasswordComponent);