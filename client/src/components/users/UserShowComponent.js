import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
import axios from "axios";
import { getJwt } from '../../helpers/jwt'
import back from '../../img/return.png'
import bin from '../../img/bin.png'
import writing from '../../img/writing.png'


class UserShowComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      user_id: this.props.match.params.id,
      image: {},
      image_id: ""
    }
  }

  deleteConfirmation = () => {
    const jwt = getJwt()
    axios.delete(`http://localhost:3001/api/v1/users/${this.state.user_id}`, { headers: { 'Authorization': `Bearer ${jwt}` } })
      .then(response => {
        this.setState({ alert: false })
        this.props.history.push('/users')
      })
  }


  componentDidMount() {
    const jwt = getJwt()
    axios.get(`http://localhost:3001/api/v1/users/${this.state.user_id}`, { headers: { 'Authorization': `Bearer ${jwt}` } })
      .then(response => {
        this.setState({ user: response.data, image_id: response.data.image[0] })
      }).then(() => {
        axios.get(`http://localhost:3001/api/v1/images/${this.state.image_id}`, { headers: { 'Authorization': `Bearer ${jwt}` } })
          .then(response => {
            this.setState({ image: response.data })
          })
      })
  }


  render() {
    console.log(this.state)
    if (!this.state.user || !this.state.image) {
      return (
        <div>Loading...</div>
      )
    }
    return (
      <div className="main-content">
        {this.state.alert && (
          <SweetAlert
            warning
            showCancel
            confirmBtnText="Yes, delete it!"
            confirmBtnBsStyle="danger"
            cancelBtnBsStyle="default"
            title="Are you sure?"
            onConfirm={() => { this.deleteConfirmation() }}
            onCancel={() => { this.setState({ alert: false }) }}
          >
            You will delete this product premanently...
          </SweetAlert>
        )}

        <div>
          <img src={this.state.image.cloudImage}></img>
        </div>
        <div>

          <h3>{this.state.user.fullName}</h3>
          <h5>{this.state.user.role}</h5>
        </div>

      </div >
    )
  }
}

export default withRouter(UserShowComponent);