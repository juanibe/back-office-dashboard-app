import React, { Component } from "react";
import DeleteComponent from "../../components/DeleteComponent"
import { withRouter } from 'react-router-dom';
import axios from "axios";
import { getJwt } from '../../helpers/jwt'

const Moment = require('moment');

class CLientShowComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      client: null,
      client_id: this.props.match.params.id,
      showDelete: false,
      showId: false,
      hideId: false
    }
  }

  componentDidMount() {
    const jwt = getJwt()
    axios.get(`http://localhost:3001/api/v1/clients/${this.state.client_id}`, { headers: { 'Authorization': `Bearer ${jwt}` } })
      .then(response => {
        console.log(response.data)
        this.setState({ client: response.data })
      })
  }

  toggleShowId = () => {
    this.setState({ showId: !this.state.showId, hideId: !this.state.hideId })

  }

  onClickDeleteButton = () => {
    this.setState({ showDelete: true })
  }

  onCancelDeleteClick = () => {
    this.setState({ showDelete: false })
  }

  onConfirmDeleteClick = () => {
    this.setState({ showDelete: false })
    this.props.history.push('/clients')
  }


  render() {
    console.log(this.state.client)
    if (!this.state.client) {
      return (
        <div>Loading...</div>
      )
    }
    return (
      <div className="main-content">
        {
          this.state.showDelete && (
            <DeleteComponent
              onCancelDeleteClick={this.onCancelDeleteClick}
              onConfirmDeleteClick={this.onConfirmDeleteClick}
              item={this.state.client_id}
            />
          )
        }
        <div className="btn-group-product-show">
          <button className="btn-product-show btn-xs btn-outline-dark" onClick={this.props.history.goBack}>Go back</button>
          <button className="btn-product-show btn-xs btn-outline-dark" onClick={() => { this.props.history.push(`edit`) }}>Edit</button>
          <span><button className="btn-product-show btn-xs btn-outline-dark" onClick={this.toggleShowId}>{this.state.hideId ? "Hide item ID" : "Show item ID"}</button></span>
          <button className="btn-product-show btn-xs btn-outline-danger" onClick={() => { this.onClickDeleteButton() }}>Delete</button>
        </div >
        <div>
          {this.state.showId ? <div style={{ fontSize: "0.7em", display: "inline-block", color: "green", padding: "5px", margin: "0 0 10px 0" }}>Unique Id: <b>{this.state.client_id}</b></div> : <div></div>}
          <h3><b>{this.state.client.full_name}</b></h3>
          <p>Address: {this.state.client.address}</p>
          <p>Phone: {this.state.client.phone}</p>
          <p>email: {this.state.client.email}</p>
          <p>Web page: {this.state.client.web}</p>
          <p>Comment: {this.state.client.comment}</p>
        </div>
        <div>
          <h5>Events</h5>
          <div className="col-9">
            {this.state.client.event.map(event => {
              console.log("EVENT MAP", event)
              return (
                <div className="upcoming-events-show-product">
                  <p><b>Date: {Moment(event.date).format('DD-MM-YYYY')}</b></p>
                  <p>Place: {event.place}</p>
                  <p>Price : {event.price}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div >
    )
  }
}

export default withRouter(CLientShowComponent);

