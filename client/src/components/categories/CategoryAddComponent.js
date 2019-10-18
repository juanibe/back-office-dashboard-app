import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import axios from 'axios'
import { getJwt } from '../../helpers/jwt'
import { withRouter } from 'react-router-dom'
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';

class CategoryAddComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      description: "",
      unauthorized: false,
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

    axios.post('http://localhost:3001/api/v1/categories', data, {
      headers: headers,
    }).then(response => {
      this.props.history.push(`/categories/${response.data._id}/show`)
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
      <div>
        {this.state.unauthorized && (
          <div className='message-unauthorized'>You are not authorized to perform this action. Please contact the administrator</div>
        )}
        <div className='add-product-form-main'>
          <h4 className="form-title">Add new category</h4>
          <ToastsContainer
            store={ToastsStore}
            position={ToastsContainerPosition.TOP_RIGHT}
            lightBackground
          />
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
              <Form.Control as="textarea" rows="10"
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
      </div>

    )
  }
}

export default withRouter(CategoryAddComponent);
