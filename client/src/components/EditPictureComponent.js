import React, { Component } from "react";
import Form, { FormRow } from "react-bootstrap/Form";
import axios from 'axios'
import { getJwt } from '../helpers/jwt'
import { withRouter } from 'react-router-dom'

class EditPictureComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      item: {},
      image: {},
      cloudImage: null,
      waitMessage: ""
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }


  handleFormSubmit = event => {
    const jwt = getJwt()

    event.preventDefault()

    const formData = new FormData()

    formData.append(this.state.image.name + new Date().toISOString(), this.state.image)

    const headers = {
      'Authorization': `Bearer ${jwt}`,
    }

    this.setState({ waitMessage: true })

    axios.post('http://localhost:3001/api/v1/images', formData, {
      headers: headers,
    })
      .then(response => {
        axios.put(
          `http://localhost:3001/api/v1${this.props.location.routePath}/${this.props.location.id}`,
          { image: response.data.result._id },
          { headers: headers }
        )
      })
      .then((response) => {
        this.props.history.push(this.props.location.routePath)
      })
  }


  uploadImageHandler = event => {
    this.setState({
      image: event.target.files[0]
    })
  }

  render() {
    if (!this.state.item) {
      return (
        <div>Loading...</div>
      )
    }
    return (
      <div className="confirm-form-main">
        <div>
          <Form onSubmit={this.handleFormSubmit} encType="multipart/form-data">
            <Form.Row>
              <Form.Group>
                <Form.Label>Choose a new image...</Form.Label>
                <Form.Control
                  required
                  type="file"
                  name="image"
                  onChange={this.uploadImageHandler}
                />
              </Form.Group>
              <Form.Group>
                <button className="btn-sm btn-success btn-submit">Upload</button>
              </Form.Group>
            </Form.Row>
          </Form>
          {this.state.waitMessage ?
            <div style={{ color: "rgb(200,50,50)" }}>Please wait until the image is being uploaded...</div> :
            <button className="btn-sm btn-outline-info" onClick={() => this.props.history.push(this.props.location.routePath)}>Finish</button>
          }
        </div>
      </div >
    )
  }
}

export default withRouter(EditPictureComponent);
