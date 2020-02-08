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
      company_name: "",
      email: "",
      address: "",
      phone: "",
      web: "",
      comment: "",
      legal_type: null,
      confirmation: false,
      addContactPerson: false
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit = event => {
    const jwt = getJwt()

    event.preventDefault();

    const legal_type = this.state.legal_type
    const first_name = this.state.first_name
    const last_name = this.state.last_name
    const company_name = this.state.company_name
    const email = this.state.email
    const address = this.state.address
    const phone = this.state.phone
    const web = this.state.web
    const comment = this.state.comment


    const data = {
      first_name,
      last_name,
      company_name,
      email,
      address,
      phone,
      web,
      comment,
      legal_type
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

  handleConfirmationStatus = () => {
    let confirmation = false
    if (this.state.legal_type === "1") {
      if (
        this.state.first_name &&
        this.state.last_name &&
        (this.state.email ||
          this.state.address ||
          this.state.phone ||
          this.state.web ||
          this.state.comment)
      ) {
        return true
      }
    } else if (this.state.legal_type === "0")
      if (
        this.state.company_name &&
        (this.state.email ||
          this.state.address ||
          this.state.phone ||
          this.state.web ||
          this.state.comment)
      ) {
        return true
      }
    return false
  }

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <div className='add-event-form'>
        <div className="container">
          <div className="row">
            <div className="col-6">
              <Form onSubmit={this.handleFormSubmit}>
                <div>
                  <Form.Group controlId="exampleForm.ControlSelect1">
                    <label className="title-form-input">Select the client's legal type: </label>
                    <Form.Control as="select"
                      disabled={this.state.confirmation}
                      size="sm"
                      type="text"
                      placeholder="Legal type"
                      name="legal_type"
                      onChange={e => { this.handleChange(e) }}>
                      <option value={""}>Select</option>
                      <option value={1}>Natural person</option>
                      <option value={0}>Business</option>
                    </Form.Control>
                  </Form.Group>
                </div>
                {this.state.legal_type && (
                  <div>
                    {this.state.legal_type === "1" ? (
                      <div>
                        <Form.Group controlId="formGroupName">
                          <Form.Label className="title-form-input">First name</Form.Label>
                          <Form.Control
                            size="sm"
                            type="text"
                            placeholder="Enter first name"
                            name="first_name"
                            value={this.state.first_name}
                            onChange={e => { this.handleChange(e) }}
                          />
                        </Form.Group>
                        <Form.Label className="title-form-input">Last name</Form.Label>
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
                      </div>
                    ) : (
                        <div>
                          <Form.Label className="title-form-input">Company name</Form.Label>
                          <Form.Group controlId="formGroupComment">
                            <Form.Control
                              size="sm"
                              type="text"
                              placeholder="Enter company name"
                              name="company_name"
                              value={this.state.company_name}
                              onChange={e => { this.handleChange(e) }}
                            />
                          </Form.Group>
                        </div>
                      )}

                    <Form.Label className="title-form-input">Email</Form.Label>
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
                    <Form.Label className="title-form-input">Address</Form.Label>
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
                    <Form.Label className="title-form-input">Web page</Form.Label>
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
                    <Form.Label className="title-form-input">Phone</Form.Label>
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
                    <Form.Label className="title-form-input">Comment</Form.Label>
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
                  </div>
                )}
                {this.state.legal_type === "0" && (
                  <div>
                    <button onClick={() => this.setState({ addContactPerson: true })} className="btn-xs btn-info btn-continue">Add contact person</button>
                  </div>
                )}
                {this.state.addContactPerson && (
                  <div>
                    Contact Person Form
                  </div>
                )}
                {this.handleConfirmationStatus() && (
                  <div>
                    <button onClick={(e) => { return this.setState({ confirmation: true }), e.preventDefault() }} className="btn-xs btn-outline-success btn-continue">Continue</button>
                  </div>
                )}
              </Form>
            </div>
            {this.state.confirmation && (
              <div className="col-6">
                <div className="container-data-confirm-client">
                  <strong className="title-data-confrim-client">NEW CLIENT INFORMATION</strong>
                  <p className="data-confrim-client"><strong className="label-data-confirm-client">First name</strong>: {this.state.first_name && (this.state.first_name.toUpperCase())}</p>
                  <p className="data-confrim-client"><strong className="label-data-confirm-client">Last name</strong>: {this.state.last_name && (this.state.last_name.toUpperCase())}</p>
                  <p className="data-confrim-client"><strong className="label-data-confirm-client">Email</strong>: {this.state.email && (this.state.email)}</p>
                  <p className="data-confrim-client"><strong className="label-data-confirm-client">Address</strong>: {this.state.address && (this.state.address)}</p>
                  <p className="data-confrim-client"><strong className="label-data-confirm-client">Web</strong>: {this.state.web && (this.state.web)}</p>
                  <p className="data-confrim-client"><strong className="label-data-confirm-client">phone</strong>: {this.state.phone && (this.state.phone)}</p>
                  <p className="data-confrim-client"><strong className="label-data-confirm-client">Comment</strong>: {this.state.comment && (this.state.comment)}</p>
                  <div>
                    <button className="btn-xs btn-danger btn-confirmation-event" onClick={() => this.setState({ date: "", product: [], client: [], place: "", price: "", comment: "", confirmation: false })}>Abort</button>
                    {this.state.confirmation && (
                      <button form="create-event-form" className="btn-xs btn-success btn-confirmation-event btn-submit">Confirm</button>
                    )}
                  </div>
                </div>

              </div>
            )}

          </div>
        </div>

      </div >
    )
  }
}

export default withRouter(ClientAddComponent);
