import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import axios from 'axios'
import { getJwt } from '../../helpers/jwt'
import { withRouter, Link } from 'react-router-dom'
import Select from 'react-select'

class ProductEditComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      description: "",
      comment: "",
      price: 0,
      category: [],
      disponible: "",
      categories: []
    }
  }

  componentDidMount() {
    const jwt = getJwt()

    axios.get('http://localhost:3001/api/v1/categories', { headers: { 'Authorization': `Bearer ${jwt}` } })
      .then(response => {
        this.setState({ categories: response.data.result })
      })

    axios.get(`http://localhost:3001/api/v1/products/${this.props.match.params.id}`, { headers: { 'Authorization': `Bearer ${jwt}` } })
      .then(response => {
        this.setState({
          name: response.data.name,
          description: response.data.description,
          comment: response.data.comment,
          price: response.data.price,
          category: response.data.category,
          disponible: response.data.disponible,
        })
      })
  }

  toggleChange = () => {
    this.setState({ disponible: !this.state.disponible })
  }

  handleFormSubmit = event => {
    const jwt = getJwt()

    event.preventDefault();

    const name = this.state.name
    const description = this.state.description
    const comment = this.state.comment
    const price = this.state.price
    const category = this.state.category
    const disponible = this.state.disponible

    const headers = {
      'Authorization': `Bearer ${jwt}`,
    }

    axios.put(`http://localhost:3001/api/v1/products/${this.props.match.params.id}`, {
      name,
      description,
      comment,
      price,
      category,
      disponible,
    }, {
      headers: headers,
    }).then(response => {
      this.props.history.push(`/products/${response.data._id}/show`)
    })
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

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

  loadOptions = () => {
    return this.state.categories.map(category => {
      return { value: category._id, label: category.name }
    })
  }

  render() {
    console.log("edit product", this.props)
    if (!this.state.categories) {
      return (
        <div>Loading...</div>
      )
    }
    return (
      <div className='add-product-form-main'>
        <h4 className="form-title"> Edit product</h4>
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
            <Select defaultValue={this.state.category} options={this.loadOptions()} isMulti onChange={e => { this.handleMultipleSelectChange(e) }} />
          </Form.Group>
          <Form.Group controlId="formGroupDisponible">
            <Form.Check
              checked={this.state.disponible}
              type="checkbox"
              label='Disponible'
              onChange={e => { this.toggleChange(e) }}
            />
          </Form.Group>
          <Link to={{ pathname: '/edit-image', id: this.props.match.params.id, routePath: '/products' }} className='btn-sm'>Edit picture</Link>
          <div>
            <button className="btn-sm btn-light btn-submit">Submit</button>
          </div>
        </Form>
      </div >
    )
  }
}

export default withRouter(ProductEditComponent);
