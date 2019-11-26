import React, { Component } from "react";
import CustomReactTable from "../CustomReactTable"
import { Link } from 'react-router-dom'
import ReactTable from 'react-table'
import { getJwt } from '../../helpers/jwt'
import axios from 'axios'
import eye from '../../img/eye.png'
import bin from '../../img/bin.png'
import writing from '../../img/writing.png'
import plus from '../../img/plus.png'


class ClientIndexComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      columns: [
        {
          Header: "First name",
          accessor: "first_name",
        },
        {
          Header: "Last name",
          accessor: "last_name"
        },
        {
          Header: "Email",
          accessor: "email"
        },
        {
          Header: "Address",
          accessor: "address"
        }
      ]
    }
  }

  componentDidMount() {
    const jwt = getJwt()
    if (!jwt) {
      this.props.history.push('/login')
    }
  }

  render() {
    return (
      <div className='main-content'>
        <CustomReactTable columns={this.state.columns} />
      </div >
    )
  }
}

export default ClientIndexComponent;