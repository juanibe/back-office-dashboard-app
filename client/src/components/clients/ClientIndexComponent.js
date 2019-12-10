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
        <CustomReactTable columns={this.state.columns} modelName={"Clients"} />
      </div >
    )
  }
}

export default ClientIndexComponent;