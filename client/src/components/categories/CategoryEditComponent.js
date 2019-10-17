import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import axios from 'axios'
import { getJwt } from '../../helpers/jwt'
import { withRouter } from 'react-router-dom'


class CategoryEditComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      description: ""
    }
  }

  componentDidMount() {
    console.log(this.props.match.params)
    const jwt = getJwt()

    axios.get(`http://localhost:3001/api/v1/categories/${this.props.match.params.id}`, { headers: { 'Authorization': `Bearer ${jwt}` } })
      .then(response => {
        console.log(response)
        this.setState({
          name: response.data.name,
          description: response.data.description,
        })
      })
  }

  handleFormSubmit = event => {
    const jwt = getJwt()

    event.preventDefault();

    const name = this.state.name
    const description = this.state.description

    const headers = {
      'Authorization': `Bearer ${jwt}`,
    }

    axios.put(`http://localhost:3001/api/v1/categories/${this.props.match.params.id}`, {
      name,
      description
    }, {
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
        <h4 className="form-title"> Edit category</h4>
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
          <Form.Label>Description</Form.Label>
          <Form.Group controlId="formGroupComment">
            <Form.Control as="textarea" rows="3"
              size="sm"
              type="text"
              placeholder="description"
              name="comment"
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

export default withRouter(CategoryEditComponent);
