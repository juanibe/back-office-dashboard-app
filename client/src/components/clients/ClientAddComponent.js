import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import axios from 'axios'
import { getJwt } from '../../helpers/jwt'
import { withRouter } from 'react-router-dom'
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';

class ClientAddComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      address: "",
      phone: "",
      web: "",
      comment: ""
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit = event => {
    const jwt = getJwt()

    event.preventDefault();

    const first_name = this.state.first_name
    const last_name = this.state.last_name
    const email = this.state.email
    const address = this.state.address
    const phone = this.state.phone
    const web = this.state.web
    const comment = this.state.comment


    const data = {
      first_name,
      last_name,
      email,
      address,
      phone,
      web,
      comment
    }

    const headers = {
      'Authorization': `Bearer ${jwt}`,
    }

    axios.post('http://localhost:3001/api/v1/clients', data, {
      headers: headers,
    }).then(response => {
      this.props.history.push(`/clients/${response.data._id}/show`)
    }).catch(error => {
      ToastsStore.error("Unauthorized", 10000)
      this.setState({ unauthorized: true })
      console.log(error)
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

export default withRouter(ClientAddComponent);
