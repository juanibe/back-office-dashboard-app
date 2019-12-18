import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
import axios from "axios";
import { getJwt } from '../../helpers/jwt'
import back from '../../img/return.png'
import bin from '../../img/bin.png'
import writing from '../../img/writing.png'


class EventShowComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      event: null,
      event_id: this.props.match.params.id
    }
  }

  deleteConfirmation = () => {
    const jwt = getJwt()
    axios.delete(`http://localhost:3001/api/v1/events/${this.state.event_id}`, { headers: { 'Authorization': `Bearer ${jwt}` } })
      .then(response => {
        this.setState({ alert: false })
        this.props.history.push('/events')
      })
  }

  componentDidMount() {
    const jwt = getJwt()
    axios.get(`http://localhost:3001/api/v1/events/${this.state.event_id}`, { headers: { 'Authorization': `Bearer ${jwt}` } })
      .then(response => {
        this.setState({ event: response.data })
      })
  }


  render() {
    if (!this.state.event) {
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
        <div className="card text-center">
          <div className="card-header">
            Featured
  </div>
          <div className="card-body">
            <h5 className="card-title">Client: <b>{this.state.event.client}</b></h5>
            <div className="card-text">
              <ul>
                <li>Products: <b>{this.state.event.product}</b></li>
                <li>Place: <b>{this.state.event.place}</b></li>
                <li>Date: <b>{this.state.event.date}</b></li>
                <li>Price: <b>{this.state.event.price}</b></li>
                <li>Comment: <b>{this.state.event.comment}</b></li>
              </ul>
            </div>
            <button className="btn btn-light" onClick={this.props.history.goBack}><img src={back} /></button>
            <button className="btn btn-light" onClick={this.props.history.goBack}><img src={writing} /></button>
            <span><button className="btn btn-light" onClick={() => this.setState({ alert: true })}><img src={bin} /></button></span>
          </div>
          <div className="card-footer text-muted">
            2 days ago
  </div>
        </div>
      </div >
    )
  }
}

export default withRouter(EventShowComponent);