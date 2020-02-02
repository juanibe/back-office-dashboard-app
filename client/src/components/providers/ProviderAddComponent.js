import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import axios from 'axios'
import { getJwt } from '../../helpers/jwt'
import { withRouter } from 'react-router-dom'
import Select from 'react-select'

class ProviderAddComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      company_name: "",
      first_name: "",
      last_name: "",
      comment: "",
      phone: "",
      email: "",
      web: "",
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount() {

  }

  handleFormSubmit = event => {
    const jwt = getJwt()

    event.preventDefault();

    const headers = {
      'Authorization': `Bearer ${jwt}`,
    }


    const company_name = this.state.company_name
    const first_name = this.state.first_name
    const last_name = this.state.last_name
    const comment = this.state.comment
    const phone = this.state.phone
    const email = this.state.email
    const web = this.state.web

    const data = {
      company_name,
      first_name,
      last_name,
      comment,
      phone,
      email,
      web
    }

    axios.post('http://localhost:3001/api/v1/providers', { data }, {
      headers: headers,
    }).then(response => {
      this.props.history.push({
        pathname: '/confirm',
        state: { id: response.data.id, loc: this.props.location.pathname }
      })
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
        <h4 className="form-title">Add new provider</h4>
        <Form onSubmit={this.handleFormSubmit} encType="multipart/form-data">
          <Form.Group controlId="formGroupName">
            <Form.Label>Company name</Form.Label>
            <Form.Control
              size="sm"
              type="text"
              placeholder="If company, enter it's name"
              name="company_name"
              value={this.state.company_name}
              onChange={e => { this.handleChange(e) }}
            />
          </Form.Group>
          <Form.Group controlId="formGroupName">
            <Form.Label>First name</Form.Label>
            <Form.Control
              size="sm"
              type="text"
              placeholder="If person, enter it's first name"
              name="first_name"
              value={this.state.first_name}
              onChange={e => { this.handleChange(e) }}
            />
          </Form.Group>
          <Form.Group controlId="formGroupName">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              size="sm"
              type="text"
              placeholder="If person, enter it's last name"
              name="last_name"
              value={this.state.last_name}
              onChange={e => { this.handleChange(e) }}
            />
          </Form.Group>
          <Form.Group controlId="formGroupName">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              size="sm"
              type="text"
              placeholder="Add a comment"
              name="comment"
              value={this.state.comment}
              onChange={e => { this.handleChange(e) }}
            />
          </Form.Group>
          <Form.Group controlId="formGroupName">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              size="sm"
              type="text"
              placeholder="Add a phone number"
              name="phone"
              value={this.state.phone}
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
          <Form.Label>Web page</Form.Label>
          <Form.Group controlId="formGroupComment">
            <Form.Control
              size="sm"
              type="text"
              placeholder="http://www..."
              name="web"
              value={this.state.web}
              onChange={e => { this.handleChange(e) }}
            />
          </Form.Group>

          <button className="btn btn-light btn-submit">Submit</button>
        </Form>
      </div >
    )
  }
}

export default withRouter(ProviderAddComponent);
