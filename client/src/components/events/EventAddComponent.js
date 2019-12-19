import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import axios from 'axios'
import { getJwt } from '../../helpers/jwt'
import { withRouter } from 'react-router-dom'
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';
import Select from 'react-select'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



class ClientAddComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      client: "",
      product: [],
      date: new Date(),
      place: "",
      price: "",
      comment: "",
      clients: [],
      products: []
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit = event => {
    const jwt = getJwt()

    event.preventDefault();

    const client = this.state.client
    const product = this.state.product
    const date = this.state.date
    const place = this.state.place
    const price = this.state.price
    const comment = this.state.comment

    const data = {
      client,
      product,
      date,
      place,
      price,
      comment
    }


    const headers = {
      'Authorization': `Bearer ${jwt}`,
    }

    axios.post('http://localhost:3001/api/v1/events', data, {
      headers: headers,
    }).then(response => {
      this.props.history.push(`/events`)
    }).catch(error => {
      ToastsStore.error("Unauthorized", 10000)
      this.setState({ unauthorized: true })
      console.log(error)
    })
  }

  loadOptions = () => {
    return this.state.products.map(product => {
      return { value: product._id, label: product.name }
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
      product: values
    });
  }

  handleDateSelectChange = event => {
    this.setState({ date: event })

  }

  handleChange = event => {
    console.log(event.target)
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  componentDidMount() {
    const jwt = getJwt()
    axios.get('http://localhost:3001/api/v1/clients', { headers: { 'Authorization': `Bearer ${jwt}` } })
      .then(response => {
        this.setState({ clients: response.data.result })
      })
    axios.get('http://localhost:3001/api/v1/products', { headers: { 'Authorization': `Bearer ${jwt}` } })
      .then(response => {
        this.setState({ products: response.data.result })
      })
  }

  render() {
    return (
      <div>
        {this.state.unauthorized && (
          <div className='message-unauthorized'>You are not authorized to perform this action. Please contact the administrator</div>
        )}
        <div className='add-product-form-main'>
          <h4 className="form-title">Add new event</h4>
          <ToastsContainer
            store={ToastsStore}
            position={ToastsContainerPosition.TOP_RIGHT}
            lightBackground
          />
          <Form onSubmit={this.handleFormSubmit}>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Client</Form.Label>
              <Form.Control as="select"
                size="sm"
                type="text"
                placeholder="Client"
                name="client"
                value={this.state.client}
                onChange={e => { this.handleChange(e) }}
              >
                {this.state.clients.map((response, index) => {
                  return <option key={index} value={response._id}>{response.full_name}</option>
                })}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Products</Form.Label>
              <Select options={this.loadOptions()} isMulti onChange={e => { this.handleMultipleSelectChange(e) }} />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <div>
                <Form.Label>Date </Form.Label>
              </div>
              <DatePicker
                onChange={e => { this.handleDateSelectChange(e) }}
                selected={this.state.date}
              />
            </Form.Group>
            <Form.Label>Place</Form.Label>
            <Form.Group controlId="formGroupPrice">
              <Form.Control
                size="sm"
                type="text"
                placeholder="Add place"
                name="place"
                value={this.state.place}
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
            <button className="btn btn-light btn-submit">Submit</button>
          </Form>
        </div >
      </div>

    )
  }
}

export default withRouter(ClientAddComponent);
