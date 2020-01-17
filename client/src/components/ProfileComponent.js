import React, { Component } from "react";
import { Link, withRouter } from 'react-router-dom';
import axios from "axios";
import { getJwt } from '../helpers/jwt'
import EditPasswordComponent from "./EditPasswordComponent";
import EditPictureComponent from "./EditPictureComponent";

class ProfileComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      image: null,
      editPassowordState: false,
      editPictureState: false
    }
  }

  componentDidMount() {
    const jwt = getJwt()
    axios.get(`http://localhost:3001/api/v1/images/${this.props.user.image}`, { headers: { 'Authorization': `Bearer ${jwt}` } })
      .then(response => {
        this.setState({
          image: response.data,
          user: this.props.user
        })
      })
  }

  showEditPassword = () => {
    this.setState({ editPassowordState: !this.state.editPassowordState })
  }

  showEditPicture = () => {
    this.setState({ editPictureState: !this.state.editPictureState })
  }

  render() {
    if (!this.state.user) {
      return (
        <div>Loading...</div>
      )
    }
    return (
      <div className="main-content container">
        <h5>My profile</h5>
        <div style={{ margin: "20px 0 20px 0" }}>
          <button onClick={() => this.showEditPassword()} className="btn-xs btn-outline-warning">Edit password</button>
          <Link to={{ pathname: '/edit-image', id: this.props.user.id, routePath: '/users' }} >
            <button className="btn-xs btn-outline-dark">Edit picture</button>
          </Link>
        </div>
        {this.state.editPassowordState && (
          <EditPasswordComponent />
        )}
        {this.state.editPictureState && (
          <EditPictureComponent />
        )}
        <div className="row">
          <div className="col">
            <p>{this.state.user.fullName}</p>
            <p>{this.state.user.email}</p>
            <p>{this.state.user.role}</p>
          </div >
          <div className="col">
            <img src={this.state.image.cloudImage} style={{ width: "400px" }} />
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(ProfileComponent);