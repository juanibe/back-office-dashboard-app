import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import Axios from "axios";
import { getJwt } from '../../helpers/jwt'
import back from '../../img/return.png'
import bin from '../../img/bin.png'
import writing from '../../img/writing.png'


class AdminIndexComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount() {

  }


  render() {

    return (
      <div className="main-content">
        <ul>
          <li>Profile</li>
          <li>See all users</li>
          <li>Create a new user</li>
          <li>Edit an existing user</li>
        </ul>
      </div >
    )
  }
}

export default withRouter(AdminIndexComponent);