import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import DeleteComponent from "../../components/DeleteComponent"
import axios from "axios";
import { getJwt } from '../../helpers/jwt'

const Moment = require('moment');



class EventShowComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      event: null,
      event_id: this.props.match.params.id,
      showDelete: false,
      showId: false,
      hideId: false
    }
  }

  componentDidMount() {
    const jwt = getJwt()
    axios.get(`http://localhost:3001/api/v1/events/${this.state.event_id}`, { headers: { 'Authorization': `Bearer ${jwt}` } })
      .then(response => {
        this.setState({ event: response.data })
      })
  }

  loadFunctionalities = () => {
    if (this.props.user.role === 'admin') {
      return (
        <div className="btn-group-product-show">
          <button className="btn-product-show btn-xs btn-outline-dark" onClick={this.props.history.goBack}>Go back</button>
          <button className="btn-product-show btn-xs btn-outline-dark" onClick={() => { this.props.history.push(`edit`) }}>Edit</button>
          <span><button className="btn-product-show btn-xs btn-outline-dark" onClick={this.toggleShowId}>{this.state.hideId ? "Hide item ID" : "Show item ID"}</button></span>
          <button className="btn-product-show btn-xs btn-outline-danger" onClick={() => { this.onClickDeleteButton() }}>Delete</button>
        </div >
      )
    } else {
      return (
        <div className="btn-group-product-show">
          <button className="btn-product-show btn-xs btn-outline-dark" onClick={this.props.history.goBack}>Go back</button>
          <button className="btn-product-show btn-xs btn-outline-dark" onClick={() => { this.props.history.push(`edit`) }}>Edit</button>
          <span><button className="btn-product-show btn-xs btn-outline-dark" onClick={this.toggleShowId}>{this.state.hideId ? "Hide item ID" : "Show item ID"}</button></span>
        </div >
      )
    }
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
    this.props.history.push('/events')
  }


  render() {
    console.log(this.state.event)
    if (!this.state.event) {
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
              item={this.state.event_id}
            />
          )
        }
        <div>
          {this.loadFunctionalities()}
          <div>
            {this.state.showId ? <div style={{ fontSize: "0.7em", display: "inline-block", color: "green", padding: "5px", margin: "0 0 10px 0" }}>Unique Id: <b>{this.state.event_id}</b></div> : <div></div>}
            <h3>{this.state.event.client.length > 0 ? this.state.event.client[0].full_name : <strong>Error: no client</strong>}</h3>
            <p><ins>Event date</ins>: <b>{this.state.event.date ? Moment(this.state.event.date).format('DD-MM-YYYY') : 'Error: no date'}</b></p>
            <p><ins>Event address</ins>: {this.state.event.place ? this.state.event.place : <strong>-</strong>}</p>
            <p><ins>Event price</ins>: {this.state.event.price ? this.state.event.price : <strong>-</strong>}</p>
            <p><ins>Event comment</ins>: {this.state.event.comment}</p>
            <h5>Products:</h5>
            {this.state.event.product.map(product => {
              return <p key={product._id}>{product.name}</p>
            })}
          </div>
        </div>
      </div >
    )
  }
}

export default withRouter(EventShowComponent);