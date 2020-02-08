import React, { Component } from "react";
import CustomReactTable from "../CustomReactTable"
import { getJwt } from '../../helpers/jwt'
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';



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
      ],
      showAddButton: false
    }
  }

  componentDidMount() {
    const jwt = getJwt()
    if (!jwt) {
      this.props.history.push('/login')
    }
    if (this.props.user.role === 'admin') {
      this.setState({ showAddButton: true })
    }

    if (this.props.location) {
      ToastsStore.success(`Event on ${this.props.location.date} created successfuly`, 5000)
    }
  }

  render() {
    console.log(this.props.location)
    return (
      <div className='main-content'>
        <CustomReactTable
          showAddButton={this.state.showAddButton}
          columns={this.state.columns}
          modelName={"Clients"}
          user={this.props.user} />
      </div >
    )
  }
}

export default ClientIndexComponent;