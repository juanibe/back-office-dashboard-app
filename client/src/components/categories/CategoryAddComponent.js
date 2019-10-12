import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import axios from 'axios'
import { getJwt } from '../../helpers/jwt'
import { BrowserRouter, Route, withRouter } from 'react-router-dom'


class CategoryAddComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      description: "",
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit = event => {
    const jwt = getJwt()

    event.preventDefault();

    const name = this.state.name
    const description = this.state.description

    const data = {
      name,
      description,
    }

    const headers = {
      'Authorization': `Bearer ${jwt}`,
    }

    console.log(data)

    axios.post('http://localhost:3001/api/v1/categories', data, {
      headers: headers,
    }).then(response => {
      this.props.history.push(`/categories/${response.data._id}/show`)
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
        <h4 className="form-title">Add new category</h4>
        <Form onSubmit={this.handleFormSubmit}>
          <Form.Group controlId="formGroupName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              size="sm"
              type="text"
              placeholder="Enter name"
              name="name"
              value={this.state.name}
              onChange={e => { this.handleChange(e) }}
            />
          </Form.Group>
          <Form.Label>Add Description</Form.Label>
          <Form.Group controlId="formGroupDescription">
            <Form.Control
              size="sm"
              type="text"
              placeholder="Add description"
              name="description"
              value={this.state.description}
              onChange={e => { this.handleChange(e) }}
            />
          </Form.Group>
          <button className="btn btn-light btn-submit">Submit</button>
        </Form>
      </div >
    )
  }
}

export default withRouter(CategoryAddComponent);
