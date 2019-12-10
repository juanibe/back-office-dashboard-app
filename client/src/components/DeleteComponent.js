import React, { Component } from "react";
import { Link, withRouter } from 'react-router-dom'
import { getJwt } from '../helpers/jwt'
import axios from 'axios'
import SweetAlert from 'react-bootstrap-sweetalert';


class DeleteComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  deleteConfirmation = () => {
    const jwt = getJwt()
    axios.delete(`http://localhost:3001/api/v1${this.props.location.pathname}/${this.props.item}`, { headers: { 'Authorization': `Bearer ${jwt}` } })
      .then(() => {
        this.props.onCancelDeleteClick()
        this.props.reloadData(this.state)
      })
  }

  render() {
    return (
      <div className='main-content'>
        <div>
          <SweetAlert
            warning
            showCancel
            confirmBtnText="Yes, delete it"
            confirmBtnBsStyle="danger"
            cancelBtnBsStyle="default"
            title='Are you sure?'
            onConfirm={this.deleteConfirmation}
            onCancel={this.props.onCancelDeleteClick}
          >
            You will delete this product premanently...
            </SweetAlert>
        </div>
      </div >
    )
  }
}

export default withRouter(DeleteComponent);