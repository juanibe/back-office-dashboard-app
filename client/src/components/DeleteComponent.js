import React, { Component } from "react";
import { Link, withRouter } from 'react-router-dom'
import { getJwt } from '../helpers/jwt'
import axios from 'axios'
import SweetAlert from 'react-bootstrap-sweetalert';


class DeleteComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      path: ""
    }
  }

  componentDidMount() {
    const pathIncluded = ["products", "categories", "events", "clients", "users"]
    pathIncluded.map((pathName, index) => {
      if (this.props.location.pathname.includes(pathName)) {
        this.setState({ path: pathIncluded[index] })
      }
    })
  }

  deleteConfirmation = () => {
    const jwt = getJwt()
    axios.delete(`http://localhost:3001/api/v1/${this.state.path}/${this.props.item}`, { headers: { 'Authorization': `Bearer ${jwt}` } })
      .then(() => {
        this.props.onConfirmDeleteClick()
        if (this.props.reloadData) {
          this.props.reloadData(this.state)
        }
      })
  }

  render() {
    if (!this.props.location.pathname) {
      return (<div>Loading...</div>)
    }
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