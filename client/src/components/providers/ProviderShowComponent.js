import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import DeleteComponent from "../../components/DeleteComponent"
import axios from "axios";
import { getJwt } from '../../helpers/jwt'


class ProviderShowComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      provider: null,
      provider_id: this.props.match.params.id,
      showDelete: false,
      showId: false,
      hideId: false
    }
  }

  componentDidMount() {
    const jwt = getJwt()
    axios.get(`http://localhost:3001/api/v1/providers/${this.state.provider_id}`, { headers: { 'Authorization': `Bearer ${jwt}` } })
      .then(response => {
        this.setState({ provider: response.data })
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
    this.props.history.push('/providers')
  }


  render() {
    if (!this.state.provider) {
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
              item={this.state.provider_id}
            />
          )
        }
        <div>
          {this.loadFunctionalities()}
          <div>
            {this.state.showId ? <div style={{ fontSize: "0.7em", display: "inline-block", color: "green", padding: "5px", margin: "0 0 10px 0" }}>Unique Id: <b>{this.state.provider_id}</b></div> : <div></div>}
            <h3>{this.state.provider.first_name || this.state.provider.last_name ? this.state.provider.last_name : this.state.provider.company_name}</h3>
            <h5>Provider information</h5>
            <p><ins>Phone</ins>: <b>{this.state.provider.phone}</b></p>
            <p><ins>Email</ins>: {this.state.provider.email}</p>
            <p><ins>Web</ins>: {this.state.provider.web}</p>
            {/* <h5>Products:</h5>
            {this.state.event.product.map(product => {
              return <p key={product._id}>{product.name}</p>
            })} */}
          </div>
        </div>
      </div >
    )
  }
}

export default withRouter(ProviderShowComponent);