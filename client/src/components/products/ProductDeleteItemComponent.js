import React, { Component } from "react";
import { getJwt } from '../../helpers/jwt'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import SweetAlert from 'react-bootstrap-sweetalert';
import bin from '../../../src/img/bin.png'


class ProductDeleteItemComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      alert: null,
      data: null
    }
  }


  componentDidMount = () => {

    this.setState({ data: this.props.product })
  }

  deleteItem = () => {
    const jwt = getJwt()
    if (!jwt) {
      this.props.history.push('/login')
    }

    const getAlert = () =>
      (
        <SweetAlert
          warning
          showCancel
          confirmBtnText="Yes, delete it!"
          confirmBtnBsStyle="danger"
          cancelBtnBsStyle="default"
          title="Are you sure?"
          onConfirm={() => { deleteConfirmation() }}
          onCancel={() => { hideAlert() }} >
          You will delete this product premanently...
      </SweetAlert>
      )

    const deleteConfirmation = () => {
      axios.delete(`http://localhost:3001/api/v1/products/${this.props.product}`, { headers: { 'Authorization': `Bearer ${jwt}` } })
        .then(response => {
          this.setState({ data: response.data.result, alert: hideAlert() })
          this.props.handleChange(this.state.data)
        })
    }

    const hideAlert = () => {
      console.log('Hiding alert...');
      this.setState({
        alert: null
      });
    }

    this.setState({ alert: getAlert() })
  }

  render() {
    return (
      <span>
        <span><button className="btn btn-light" onClick={() => this.deleteItem()}><img src={bin} /></button></span>
        {this.state.alert}
      </span>
    )
  }
}

export default withRouter(ProductDeleteItemComponent);