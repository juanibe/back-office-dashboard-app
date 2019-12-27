import React, { Component } from "react";
import DeleteComponent from "../../components/DeleteComponent"
import { withRouter } from 'react-router-dom';
import axios from "axios";
import { getJwt } from '../../helpers/jwt'


class CategoryShowComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      category: null,
      category_id: this.props.match.params.id,
      showDelete: false,
      showId: false,
      hideId: false
    }
  }

  componentDidMount() {
    const jwt = getJwt()
    axios.get(`http://localhost:3001/api/v1/categories/${this.state.category_id}`, { headers: { 'Authorization': `Bearer ${jwt}` } })
      .then(response => {
        console.log(response.data)
        this.setState({ category: response.data })
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
    this.props.history.push('/categories')
  }


  render() {
    if (!this.state.category) {
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
              item={this.state.category_id}
            />
          )
        }
        <div className="btn-group-product-show">
          <button className="btn-product-show btn-xs btn-outline-dark" onClick={this.props.history.goBack}>Go back</button>
          <button className="btn-product-show btn-xs btn-outline-dark" onClick={() => { this.props.history.push(`edit`) }}>Edit</button>
          <span><button className="btn-product-show btn-xs btn-outline-dark" onClick={this.toggleShowId}>{this.state.hideId ? "Hide item ID" : "Show item ID"}</button></span>
          <button className="btn-product-show btn-xs btn-outline-danger" onClick={() => { this.onClickDeleteButton() }}>Delete</button>
        </div >
        {this.state.showId ? <div style={{ fontSize: "0.7em", display: "inline-block", color: "green", padding: "5px", margin: "0 0 10px 0" }}>Unique Id: <b>{this.state.category_id}</b></div> : <div></div>}
        <h3>Name: <b>{this.state.category.name}</b></h3>
        <h5>Description: {this.state.category.description}</h5>
      </div >
    )
  }
}

export default withRouter(CategoryShowComponent);