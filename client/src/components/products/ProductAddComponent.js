import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import axios from 'axios'
import { getJwt } from '../../helpers/jwt'
import { BrowserRouter, Route, withRouter } from 'react-router-dom'


class ProductAddComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: null,
      name: "",
      description: "",
      comment: "",
      price: 0,
      category: "",
      available: false
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount() {
    const jwt = getJwt()
    axios.get('http://localhost:3001/api/v1/categories', { headers: { 'Authorization': `Bearer ${jwt}` } })
      .then(response => {
        this.setState({ categories: response.data.result })
      })
  }

  toggleChange = () => {
    this.setState({ available: !this.state.available })
    console.log(this.state.available)
  }

  handleFormSubmit = event => {
    const jwt = getJwt()

    event.preventDefault();

    const name = this.state.name
    const description = this.state.description
    const comment = this.state.comment
    const price = this.state.price
    const category = this.state.category
    const available = this.state.available

    const data = {
      name,
      description,
      comment,
      price,
      category,
      available,
    }

    const headers = {
      'Authorization': `Bearer ${jwt}`,
    }

    axios.post('http://localhost:3001/api/v1/products', { data }, {
      headers: headers,
    }).then(response => {
      this.props.history.push(`/products/${response.data._id}/show`)
    })
  }

  handleChange = event => {
    const { name, value } = event.target;
    console.log(value)
    this.setState({
      [name]: value
    });
  };

  render() {
    if (!this.state.categories) {
      return (
        <div>Loading...</div>
      )
    }
    return (
      <div className='add-product-form-main'>
        <h4 className="form-title">Add new product</h4>
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
          <Form.Group controlId="formGroupDescription">
            <Form.Control as="textarea" rows="3"
              size="sm"
              type="text"
              placeholder="Add description"
              name="description"
              value={this.state.description}
              onChange={e => { this.handleChange(e) }}
            />
          </Form.Group>
          <Form.Label>Comment</Form.Label>
          <Form.Group controlId="formGroupComment">
            <Form.Control as="textarea" rows="3"
              size="sm"
              type="text"
              placeholder="Add comment"
              name="comment"
              value={this.state.comment}
              onChange={e => { this.handleChange(e) }}
            />
          </Form.Group>
          <Form.Label>Price</Form.Label>
          <Form.Group controlId="formGroupPrice">
            <Form.Control
              size="sm"
              type="number"
              placeholder="Add price"
              name="price"
              value={this.state.price}
              onChange={e => { this.handleChange(e) }}
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Category</Form.Label>
            <Form.Control as="select"
              size="sm"
              type="text"
              placeholder="Category type"
              name="category"
              value={this.state.category}
              onChange={e => { this.handleChange(e) }}
            >
              {this.state.categories.map((response, index) => {
                return <option key={index} value={response.name}>{response.name}</option>
              })}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formGroupAvailable">
            <Form.Check
              onChange={this.toggleChange}
              type="checkbox"
              label='Available'
              value={this.state.available}
              onChange={e => { this.toggleChange() }}
            />
          </Form.Group>
          <button className="btn btn-light btn-submit">Submit</button>
        </Form>
      </div >
    )
  }
}

export default withRouter(ProductAddComponent);
