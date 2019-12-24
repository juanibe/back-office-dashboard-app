import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import axios from "axios";
import { getJwt } from '../helpers/jwt'


class ProfileComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }


  render() {

    return (
      <div className="main-content">
        Profile Component
      </div >
    )
  }
}

export default withRouter(ProfileComponent);