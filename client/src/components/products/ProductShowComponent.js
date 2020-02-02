import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
import axios from "axios";
import { getJwt } from '../../helpers/jwt'

const Moment = require('moment');

class ProductShowComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      product: null,
      product_id: this.props.match.params.id,
      image_id: "",
      image: {},
      showId: false,
      hideId: false
    }
  }

  toggleShowId = () => {
    this.setState({ showId: !this.state.showId, hideId: !this.state.hideId })
  }


  deleteConfirmation = () => {
    const jwt = getJwt()
    axios.delete(`http://localhost:3001/api/v1/products/${this.state.product_id}`, { headers: { 'Authorization': `Bearer ${jwt}` } })
      .then(response => {
        this.setState({ alert: false })
        this.props.history.push('/products')
      })
  }

  componentDidMount() {
    const jwt = getJwt()
    axios.get(`http://localhost:3001/api/v1/products/${this.state.product_id}`, { headers: { 'Authorization': `Bearer ${jwt}` } })
      .then(response => {
        this.setState({ product: response.data, image_id: response.data.image[0] })
      }).then(() => {
        axios.get(`http://localhost:3001/api/v1/images/${this.state.image_id}`, { headers: { 'Authorization': `Bearer ${jwt}` } })
          .then(response => {
            this.setState({ image: response.data })
          })
      })
  }

  loadFunctionalities = () => {
    if (this.props.user.role === 'admin') {
      return (
        <div className="btn-group-product-show">
          <button className="btn-product-show btn-xs btn-outline-dark" onClick={this.props.history.goBack}>Go back</button>
          <button className="btn-product-show btn-xs btn-outline-dark" onClick={() => { this.props.history.push(`edit`) }}>Edit</button>
          <span><button className="btn-product-show btn-xs btn-outline-dark" onClick={this.toggleShowId}>{this.state.hideId ? "Hide item ID" : "Show item ID"}</button></span>
          <span><button className="btn-product-show btn-xs btn-outline-danger" onClick={() => this.setState({ alert: true })}>Delete</button></span>
        </div >
      )
    } else {
      return (
        <div className="btn-group-product-show">
          <button className="btn-product-show btn-xs btn-outline-dark" onClick={this.props.history.goBack}>Go back</button>
          <span><button className="btn-product-show btn-xs btn-outline-dark" onClick={this.toggleShowId}>{this.state.hideId ? "Hide item ID" : "Show item ID"}</button></span>
        </div >
      )
    }
  }


  render() {
    if (!this.state.product || !this.state.image) {
      return (
        <div>Loading...</div>
      )
    }
    return (
      < div className="main-content" >
        <div>
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
        </div>
        {this.loadFunctionalities()}
        <div className="cointainer">
          <div className="product-show-description-image-container row">
            <div className="col-6">
              {this.state.showId ? <div style={{ fontSize: "0.7em", display: "inline-block", color: "green", padding: "5px", margin: "0 0 10px 0" }}>Unique Id: <b>{this.state.product._id}</b></div> : <div></div>}
              <h3>{this.state.product.name}</h3>
              <h5>Description</h5>
              <p>{this.state.product.description}</p>
              <h5>Comment</h5>
              <p>{this.state.product.comment}</p>
              <h5>This product belongs to these categories:</h5>
              {this.state.product.category.map(category => {
                return (
                  <p key={category._id}>{category.name}</p>
                )
              })}
              <h5>Disponible</h5>
              {this.state.product.disponible ? <p style={{ color: "green" }}>Yes</p> : <p style={{ color: "red" }}>No</p>}
            </div>
            <div className="col-6">
              <img className="image-show-product" src={this.state.image.cloudImage}></img>
            </div>
          </div>
        </div>
      </div >
    )
  }
}

export default withRouter(ProductShowComponent);