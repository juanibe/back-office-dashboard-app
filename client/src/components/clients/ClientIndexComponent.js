import React, { Component } from "react";
import CustomReactTable from "../CustomReactTable"
import { getJwt } from '../../helpers/jwt'


class ClientIndexComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      columns: [
        {
          Header: "First name",
          accessor: "first_name",
          filterable: true
        },
        {
          Header: "Last name",
          accessor: "last_name",
          filterable: true
        },
        {
          Header: "Email",
          accessor: "email",
          filterable: true
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
        <CustomReactTable columns={this.state.columns} modelName={"Clients"} user={this.props.user} />
      </div >
    )
  }
}

export default ClientIndexComponent;