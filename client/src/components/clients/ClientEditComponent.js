import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import axios from 'axios'
import { getJwt } from '../../helpers/jwt'
import { withRouter } from 'react-router-dom'


class ClientEditComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      phone: "",
      web: "",
      comment: ""
    }
  }

  componentDidMount() {
    const jwt = getJwt()

    axios.get(`http://localhost:3001/api/v1/clients/${this.props.match.params.id}`, { headers: { 'Authorization': `Bearer ${jwt}` } })
      .then(response => {
        console.log(response.data)
        this.setState({
          firstName: response.data.first_name,
          lastName: response.data.last_name,
          email: response.data.email,
          address: response.data.address,
          phone: response.data.phone,
          web: response.data.web,
          comment: response.data.comment
        })
      })
  }

  handleFormSubmit = event => {
    const jwt = getJwt()


    event.preventDefault();

    const firstName = this.state.firstName
    const lastName = this.state.lastName
    const email = this.state.email
    const address = this.state.address
    const phone = this.state.phone
    const web = this.state.web
    const comment = this.state.comment

    const headers = {
      'Authorization': `Bearer ${jwt}`,
    }

    axios.put(`http://localhost:3001/api/v1/clients/${this.props.match.params.id}`, {
      firstName,
      lastName,
      email,
      address,
      phone,
      web,
      comment
    }, {
      headers: headers,
    }).then(response => {
      this.props.history.push(`/clients/${response.data._id}/show`)
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
        <h4 className="form-title"> Edit client</h4>
        <Form onSubmit={this.handleFormSubmit}>
          <Form.Group controlId="formGroupName">
            <Form.Label>First name</Form.Label>
            <Form.Control
              size="sm"
              type="text"
              placeholder="Enter first name"
              name="firstName"
              value={this.state.firstName}
              onChange={e => { this.handleChange(e) }}
            />
          </Form.Group>
          <Form.Label>Last name</Form.Label>
          <Form.Group controlId="formGroupComment">
            <Form.Control
              size="sm"
              type="text"
              placeholder="Enter last name"
              name="lastName"
              value={this.state.lastName}
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
          <Form.Label>Address</Form.Label>
          <Form.Group controlId="formGroupComment">
            <Form.Control
              size="sm"
              type="text"
              placeholder="Enter address"
              name="address"
              value={this.state.address}
              onChange={e => { this.handleChange(e) }}
            />
          </Form.Group>
          <Form.Label>Web page</Form.Label>
          <Form.Group controlId="formGroupComment">
            <Form.Control
              size="sm"
              type="text"
              placeholder="http://wwww..."
              name="web"
              value={this.state.web}
              onChange={e => { this.handleChange(e) }}
            />
          </Form.Group>
          <Form.Label>Phone</Form.Label>
          <Form.Group controlId="formGroupComment">
            <Form.Control
              size="sm"
              type="text"
              placeholder="Enter phone number"
              name="phone"
              value={this.state.phone}
              onChange={e => { this.handleChange(e) }}
            />
          </Form.Group>
          <Form.Label>Comment</Form.Label>
          <Form.Group controlId="formGroupComment">
            <Form.Control as="textarea" rows="3"
              size="sm"
              type="text"
              placeholder="Enter a comment"
              name="comment"
              value={this.state.comment}
              onChange={e => { this.handleChange(e) }}
            />
          </Form.Group>
          <button className="btn btn-light btn-submit">Submit</button>
        </Form>
      </div >
    )
  }
}

export default withRouter(ClientEditComponent);
