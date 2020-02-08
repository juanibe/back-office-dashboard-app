import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import axios from 'axios'
import { getJwt } from '../../helpers/jwt'
import { withRouter } from 'react-router-dom'
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';
import Select from 'react-select'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Moment = require('moment');

class EventAddComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      client: [],
      product: [],
      date: "",
      place: "",
      price: "",
      comment: "",
      clients: [],
      products: [],
      unavailableProducts: [],
      confirmation: false,
      selectedProductsNames: "",
      selectedClientName: "",
      validationError: false,
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
    console.log(data)

    const headers = {
      'Authorization': `Bearer ${jwt}`,
    }

    axios.post('http://localhost:3001/api/v1/events', data, {
      headers: headers,
    }).then(response => {
      this.props.history.push({ pathname: `/events`, state: response.data })
    }).catch(error => {
      ToastsStore.error(`400 Error: Check data`, 10000)
      this.setState({ errorStatus: true })
    })
  }

  loadOptions = () => {

    const unavailableProducts = this.state.unavailableProducts.map(unavailableProduct => {
      return unavailableProduct._id
    })

    return this.state.products.map(product => {
      return {
        value: product._id,
        label: product.name,
        disabled: !product.disponible || unavailableProducts.includes(product._id) ? true : false,
      }
    })
  }

  handleContinueButton = (e) => {
    e.preventDefault();
    if (
      (this.state.product.length === 0 || !this.state.product) ||
      (this.state.client.length === 0 || !this.state.client) ||
      !this.state.place ||
      !this.state.price
    ) {
      ToastsStore.error("400 Error: Invalid data", 5000)
      this.setState({ validationError: true })
    } else {
      this.setState({ confirmation: true })
    }
  }

  handleMultipleSelectChange = event => {
    console.log("EVENT", event)
    const values = [];
    const selectedProductsNames = []
    if (event) {
      event.map(value => {
        values.push(value.value)
        selectedProductsNames.push(value.label)
      })
    }
    this.setState({
      product: values,
      selectedProductsNames: selectedProductsNames
    });
  }

  handleDateSelectChange = event => {
    const jwt = getJwt()
    this.setState({ date: event }, function () {
      const date = Moment(this.state.date).format('DD-MM-YYYY')
      axios.get(`http://localhost:3001/api/v1/general/availability?dateAvailability=${date}`, { headers: { 'Authorization': `Bearer ${jwt}` } })
        .then(response => {
          this.setState({ unavailableProducts: response.data })
        })
    }, this.loadOptions())
  }

  handleChange = event => {
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
        <div className='add-event-form'>
          <div className="container">
            <div className="row">
              <div className="col-6">
                <ToastsContainer
                  store={ToastsStore}
                  position={ToastsContainerPosition.TOP_RIGHT}
                  lightBackground
                />
                <Form id="create-event-form" onSubmit={this.handleFormSubmit}>
                  <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Group controlId="exampleForm.ControlSelect1">
                      {!this.state.date && (
                        <span>
                          <span className="footer-info title-form-input">Select the date of the event </span>
                          <DatePicker
                            minDate={Moment().toDate()}
                            dateFormat="dd-MM-yyyy"
                            onChange={e => { this.handleDateSelectChange(e) }}
                            selected={this.state.date}
                            disabled={this.state.confirmation}
                          />
                        </span>
                      )}
                    </Form.Group>
                  </Form.Group>
                  {this.state.date && (
                    <div>
                      <Form.Group>
                        <Form.Label className="title-form-input">CLIENT</Form.Label>
                        <Form.Control as="select"
                          disabled={this.state.confirmation}
                          size="sm"
                          type="text"
                          placeholder="Client"
                          name="client"
                          onChange={e => { this.handleChange(e) }}>
                          <option value={""}>Select</option>
                          {this.state.clients.map((response, index) => {
                            return (
                              <option key={index} value={response._id}>{response.full_name}</option>
                            )
                          })}
                        </Form.Control>
                        {/* {this.state.errors.client && this.state.errors.client.message} */}
                      </Form.Group>
                      <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label className="title-form-input">PRODUCTS (*)</Form.Label>
                        <Select isDisabled={this.state.confirmation} isOptionDisabled={(option) => { return option.disabled }}
                          options={this.loadOptions()} isMulti onChange={e => { this.handleMultipleSelectChange(e) }} />
                      </Form.Group>

                      <Form.Label className="title-form-input">PLACE/ADDRESS</Form.Label>
                      <Form.Group controlId="formGroupPrice">
                        <Form.Control
                          disabled={this.state.confirmation}
                          size="sm"
                          type="text"
                          placeholder="Add place"
                          name="place"
                          value={this.state.place}
                          onChange={e => { this.handleChange(e) }}
                        />
                      </Form.Group>
                      <Form.Label className="title-form-input">PRICE (**)</Form.Label>
                      <Form.Group controlId="formGroupPrice">
                        <Form.Control
                          disabled={this.state.confirmation}
                          size="sm"
                          type="number"
                          placeholder="Add price"
                          name="price"
                          value={this.state.price}
                          onChange={e => { this.handleChange(e) }}
                        />
                      </Form.Group>
                      <Form.Label className="title-form-input">COMMENT</Form.Label>
                      <Form.Group controlId="formGroupComment">
                        <Form.Control as="textarea" rows="3"
                          disabled={this.state.confirmation}
                          size="sm"
                          type="text"
                          placeholder="Add comment"
                          name="comment"
                          value={this.state.comment}
                          onChange={e => { this.handleChange(e) }}
                        />
                      </Form.Group>
                      {this.state.date &&
                        this.state.client &&
                        this.state.product.length > 0 &&
                        this.state.place &&
                        this.state.price
                        ? <button disabled={this.state.confirmation} onClick={(e) => { return this.handleContinueButton(e) }} className="btn-xs btn-outline-success btn-continue">Continue</button>
                        : ""
                      }
                    </div>
                  )}
                </Form>
                {this.state.date && (
                  <div>
                    <footer className="footer-warning">
                      <p className="footer-info">(*) Products that have associaated and event in the same date or are set as not disponible will not be able to be selected</p>
                      <p className="footer-info">(**) This price is going to be taken for the statistics. However, it will not be applied until the date of the event has passed</p>

                    </footer>
                  </div>
                )}
              </div>
              <div className="col-6 confirm-page">
                <div className="data">
                  {this.state.date && (
                    <div>
                      New event on: <strong>{(Moment(this.state.date).format("MMMM Do YYYY"))}</strong><span>(*)</span>
                      {this.state.confirmation && (
                        <div>
                          <p className="data-confrim"><strong>Client: </strong>{this.state.client ? this.state.client : ""}</p>
                          <p className="data-confrim"><strong>Products: </strong>{this.state.selectedProductsNames ? this.state.selectedProductsNames.join(", ") : " "}</p>
                          <p className="data-confrim"><strong>Place/Address: </strong>{this.state.place}</p>
                          <p className="data-confrim"><strong>Price: </strong>{this.state.price}</p>
                          <p className="data-confrim"><strong>Comment: </strong>{this.state.comment}</p>
                        </div>
                      )}
                      <div>
                        <button className="btn-xs btn-danger btn-confirmation-event" onClick={() => this.setState({ date: "", product: [], client: [], place: "", price: "", comment: "", confirmation: false })}>Abort</button>
                        {this.state.confirmation && (
                          <button form="create-event-form" className="btn-xs btn-success btn-confirmation-event btn-submit">Confirm</button>
                        )}
                      </div>
                      <footer className="footer-warning">
                        <p className="footer-info">(*) By default the event is going to be set as not charged until the event date has passed. In case you need to set it as charged before, you need to do it with admin permission from the event details after confirmation.</p>
                      </footer>
                    </div>

                  )}
                </div>
              </div>
            </div>
          </div>
        </div >
      </div >
    )
  }
}

export default withRouter(EventAddComponent);
