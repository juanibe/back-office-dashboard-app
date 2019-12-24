import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import axios from 'axios'
import { getJwt } from '../../helpers/jwt'
import { withRouter } from 'react-router-dom'
import Select from 'react-select'
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';

class UserAddComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      role: "",
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit = event => {
    const jwt = getJwt()

    event.preventDefault();

    const first_name = this.state.first_name
    const last_name = this.state.last_name
    const email = this.state.email
    const password = this.state.password
    const role = this.state.role


    const data = {
      first_name,
      last_name,
      email,
      password,
      role,
    }

    const headers = {
      'Authorization': `Bearer ${jwt}`,
    }

    axios.post('http://localhost:3001/api/v1/register', data, {
      headers: headers,
    }).then(response => {
      console.log(response)
      this.props.history.push({
        pathname: '/confirm',
        state: { id: response.data.id, loc: this.props.location.pathname }
      })
    })
  }

  loadOptions = () => {
    return this.state.role.map(role => {
      return { value: role, label: role }
    })
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <div className='add-product-form-main'>
        <h4 className="form-title">Create user</h4>
        <Form onSubmit={this.handleFormSubmit}>
          <Form.Group controlId="formGroupName">
            <Form.Label>First name</Form.Label>
            <Form.Control
              size="sm"
              type="text"
              placeholder="Enter first name"
              name="first_name"
              value={this.state.first_name}
              onChange={e => { this.handleChange(e) }}
            />
          </Form.Group>
          <Form.Label>Last name</Form.Label>
          <Form.Group controlId="formGroupComment">
            <Form.Control
              size="sm"
              type="text"
              placeholder="Enter last name"
              name="last_name"
              value={this.state.last_name}
              onChange={e => { this.handleChange(e) }}
            />
          </Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Group controlId="formGroupComment">
            <Form.Control
              size="sm"
              type="text"
              placeholder="Enter email"
              name="email"
              value={this.state.email}
              onChange={e => { this.handleChange(e) }}
            />
          </Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Group controlId="formGroupComment">
            <Form.Control
              size="sm"
              type="password"
              placeholder="Enter password"
              name="password"
              value={this.state.password}
              onChange={e => { this.handleChange(e) }}
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Role</Form.Label>
            <Form.Control name="role" as="select" size="sm" onChange={e => { this.handleChange(e) }}>
              <option value=''>Select</option>
              <option value='admin'>Admin</option>
              <option value='employee'>Employee</option>
            </Form.Control>
          </Form.Group>
          <button className="btn btn-light btn-submit">Submit</button>
        </Form>
      </div >
    )
  }
}

export default withRouter(UserAddComponent);
