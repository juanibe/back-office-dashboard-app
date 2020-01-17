import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import CustomReactTable from "../CustomReactTable";
import Axios from "axios";

class UserIndexComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      columns: [
        {
          Header: 'First name',
          accessor: 'first_name',
          filterable: true,
        },
        {
          Header: 'Last name',
          accessor: 'last_name',
          filterable: true,
        },
        {
          Header: 'Email',
          accessor: 'email',
          filterable: true,
        },
        {
          Header: 'Role',
          accessor: 'role',
          filterable: true
        }
      ],
      showAddButton: false
    }
  }

  componentDidMount() {
    if (this.props.user.role === 'admin') {
      this.setState({ showAddButton: true })
    }
  }


  render() {

    return (
      <div className="main-content">
        <CustomReactTable
          showAddButton={this.state.showAddButton}
          columns={this.state.columns}
          modelName={"Users"}
          user={this.props.user} />
      </div >
    )
  }
}

export default withRouter(UserIndexComponent);