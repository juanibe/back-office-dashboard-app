import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
import axios from "axios";
import { getJwt } from '../../helpers/jwt'
import back from '../../img/return.png'
import bin from '../../img/bin.png'
import writing from '../../img/writing.png'


class ProductShowComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      product: null,
      product_id: this.props.match.params.id
    }
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
        console.log('product', response)
        this.setState({ product: response.data })
      })
  }


  render() {
    if (!this.state.product) {
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
        <div class="card text-center">
          <div class="card-header">
            Featured
  </div>
          <div class="card-body">
            <h5 class="card-title">Name: <b>{this.state.product.name}</b></h5>
            <div class="card-text">
              <ul>
                <li>Category: <b>{this.state.product.category[0].name}</b></li>
                <li>Price: <b>{this.state.product.price}</b></li>
                <li>State: <b>{this.state.product.state}</b></li>
              </ul>
            </div>
            <button className="btn btn-light" onClick={this.props.history.goBack}><img src={back} /></button>
            <button className="btn btn-light" onClick={this.props.history.goBack}><img src={writing} /></button>
            <span><button className="btn btn-light" onClick={() => this.setState({ alert: true })}><img src={bin} /></button></span>
          </div>
          <div class="card-footer text-muted">
            2 days ago
  </div>
        </div>
      </div >
    )
  }
}

export default withRouter(ProductShowComponent);