import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import axios from 'axios'
import { getJwt } from '../../helpers/jwt'
import { withRouter } from 'react-router-dom'
import Select from 'react-select'

class ProductAddComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: "",
      providers: "",
      name: "",
      description: "",
      comment: "",
      price: 0,
      category: "",
      available: false,
      brand: "",
      provider: ""
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount() {
    const jwt = getJwt()
    axios.get('http://localhost:3001/api/v1/categories', { headers: { 'Authorization': `Bearer ${jwt}` } })
      .then(response => {
        this.setState({ categories: response.data.result })
      })
    axios.get('http://localhost:3001/api/v1/providers', { headers: { 'Authorization': `Bearer ${jwt}` } })
      .then(response => {
        console.log("response", response)
        this.setState({ providers: response.data.result })
      })
  }

  toggleChange = () => {
    this.setState({ available: !this.state.available })
  }

  handleFormSubmit = event => {
    const jwt = getJwt()

    event.preventDefault();

    const headers = {
      'Authorization': `Bearer ${jwt}`,
    }


    const name = this.state.name
    const description = this.state.description
    const comment = this.state.comment
    const price = this.state.price
    const category = this.state.category
    const disponible = this.state.disponible
    const brand = this.state.brand
    const provider = this.state.provider

    const data = {
      name,
      description,
      comment,
      price,
      category,
      disponible,
      brand,
      provider
    }

    axios.post('http://localhost:3001/api/v1/products', { data }, {
      headers: headers,
    }).then(response => {
      this.props.history.push({
        pathname: '/confirm',
        state: { id: response.data.id, loc: this.props.location.pathname }
      })
    })
  }

  handleMultipleSelectChange = event => {
    const values = [];
    if (event) {
      event.map(value => {
        values.push(value.value)
      })
    }
    this.setState({
      category: values
    });
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  loadOptions = () => {
    return this.state.categories.map(category => {
      return { value: category._id, label: category.name }
    })
  }

  loadProviders = () => {
    return this.state.providers.map(provider => {
      return { value: provider._id, label: provider.first_name || provider.last_name ? provider.last_name : provider.company_name }
    })
  }

  render() {
    if (!this.state.categories || !this.state.providers) {
      return (
        <div>Loading...</div>
      )
    }
    return (
      <div className='add-product-form-main'>
        <h4 className="form-title">Add new product</h4>
        <Form onSubmit={this.handleFormSubmit} encType="multipart/form-data">
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
          <Form.Group controlId="formGroupName">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              size="sm"
              type="text"
              placeholder="Product brand"
              name="brand"
              value={this.state.brand}
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
            <Form.Label>Categories</Form.Label>
            <Select options={this.loadOptions()} isMulti onChange={e => { this.handleMultipleSelectChange(e) }} />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Provider</Form.Label>
            <Form.Control as="select"
              size="sm"
              type="text"
              placeholder="Provider"
              name="provider"
              onChange={e => { this.handleChange(e) }}>
              <option value={""}>Select</option>
              {this.state.providers.map((response, index) => {
                return (
                  <option key={index} value={response._id}>{response.first_name || response.last_name ? response.last_name : response.company_name}</option>
                )
              })}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formGroupDisponible">
            <Form.Check
              size="sm"
              onChange={this.toggleChange}
              type="checkbox"
              label='Disponible'
              value={this.state.disponible}
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
