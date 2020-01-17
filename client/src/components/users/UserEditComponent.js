import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import axios from 'axios'
import { getJwt } from '../../helpers/jwt'
import { withRouter } from 'react-router-dom'

class UserEditComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: "",
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      role: "",
      warningMessage: false
    }
  }

  componentDidMount() {
    const jwt = getJwt()

    axios.get(`http://localhost:3001/api/v1/users/${this.props.match.params.id}`, { headers: { 'Authorization': `Bearer ${jwt}` } })
      .then(response => {
        this.setState({
          id: response.data._id,
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          email: response.data.email,
          password: response.data.password,
          role: response.data.role,
        })
      })
  }

  handleFormSubmit = event => {
    const jwt = getJwt()

    event.preventDefault();

    const first_name = this.state.first_name
    const last_name = this.state.last_name
    const email = this.state.email
    const password = this.state.password
    const role = this.state.role

    const headers = {
      'Authorization': `Bearer ${jwt}`,
    }

    axios.put(`http://localhost:3001/api/v1/users/${this.props.match.params.id}`, {
      first_name,
      last_name,
      email,
      password,
      role
    }, {
      headers: headers,
    }).then(response => {
      this.props.history.push(`/users`)
    })
  }

  handleChange = event => {
    const { name, value } = event.target;
    if (event.target.value === 'admin') {
      this.setState({
        warningMessage: true,
      });
    } else if (event.target.value === 'employee') {
      this.setState({
        warningMessage: false
      });
    }
    this.setState({
      [name]: value,
    });

  };

  render() {
    // if (!this.props.user) {
    //   return (
    //     <div>Loading...</div>
    //   )
    // }
    return (
      <div className='add-product-form-main'>
        <h4 className="form-title">Edit user</h4>
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
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Role</Form.Label>
            {/* disabled={this.props.user._id === this.state.id ? true : false} */}
            <Form.Control disabled={this.props.user._id === this.state.id ? true : false} value={this.state.role} name="role" as="select" size="sm" onChange={e => { this.handleChange(e) }}>
              <option value=''>Select</option>
              <option value='admin'>Admin</option>
              <option value='employee'>Employee</option>
            </Form.Control>
            {this.state.warningMessage &&
              <div style={{ color: "rgb(200,50,50)", fontSize: "0.8em" }}>WARNING: Setting a user as admin will give him access to info that might be sensible</div>
            }
          </Form.Group>
          <button className="btn-xs btn-light btn-submit">Submit</button>
        </Form>
      </div >
    )
  }
}

export default withRouter(UserEditComponent);
