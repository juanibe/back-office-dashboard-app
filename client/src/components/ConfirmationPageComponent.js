import React, { Component } from "react";
import Form, { FormRow } from "react-bootstrap/Form";
import axios from 'axios'
import { getJwt } from '../helpers/jwt'
import { withRouter } from 'react-router-dom'

class ConfirmationPageComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      item: {},
      image: {},
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount() {
    const jwt = getJwt()
    let prevLocationPath = this.props.location.state.loc.slice(0, -4)
    let id = this.props.location.state.id

    axios.get(`http://localhost:3001/api/v1${prevLocationPath}/${id}`, { headers: { 'Authorization': `Bearer ${jwt}` } })
      .then(response => {
        console.log(response)
        this.setState({ item: response.data })
      })
  }


  handleFormSubmit = event => {
    const jwt = getJwt()

    event.preventDefault()

    const formData = new FormData()

    formData.append(this.state.image.name + new Date().toISOString(), this.state.image)

    const headers = {
      'Authorization': `Bearer ${jwt}`,
    }

    axios.post('http://localhost:3001/api/v1/images', formData, {
      headers: headers,
    })
      .then(response => {
        axios.put(
          `http://localhost:3001/api/v1${this.props.location.state.loc.slice(0, -4)}/${this.props.location.state.id}`,
          { image: response.data.result._id },
          { headers: headers }
        )
      })
      .then((response) => {
        console.log(response)
        this.props.history.push(this.props.location.state.loc.slice(0, -4))
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
      <div className='confirm-form-main'>
        <div>
          <h5 className="form-title">The item has been created successfully!</h5>
          {/* {Object.values(this.state.item).map(data => {
          return <p>{data}</p>
        })} */}
        </div>
        <div>
          <Form onSubmit={this.handleFormSubmit} encType="multipart/form-data">
            <Form.Row>
              <Form.Group>
                <Form.Label>Now you can upload an image...</Form.Label>
                <Form.Control
                  required
                  type="file"
                  name="image"
                  onChange={this.uploadImageHandler}
                />
              </Form.Group>
              <Form.Group>
                <button className="btn-sm btn-outline-info btn-submit">Finish</button>
              </Form.Group>
              <Form.Group>
                <button className="btn-sm btn-success btn-submit">Upload</button>
              </Form.Group>

            </Form.Row>
          </Form>
        </div>
      </div >
    )
  }
}

export default withRouter(ConfirmationPageComponent);
