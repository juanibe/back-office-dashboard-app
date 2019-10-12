import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import Axios from "axios";
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

  componentDidMount() {
    const jwt = getJwt()
    Axios.get(`http://localhost:3001/api/v1/products/${this.state.product_id}`, { headers: { 'Authorization': `Bearer ${jwt}` } })
      .then(response => {
        this.setState({ product: response.data })
      })
  }


  render() {
    console.log(this.state.product)
    if (!this.state.product) {
      return (
        <div>Loading...</div>
      )
    }
    return (
      <div className="main-content">
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
            <button className="btn btn-light" onClick={this.props.history.goBack}><img src={bin} /></button>
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