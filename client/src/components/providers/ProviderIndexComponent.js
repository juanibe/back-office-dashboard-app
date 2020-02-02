import React, { Component } from "react";
import CustomReactTable from "../CustomReactTable";
import { withRouter } from 'react-router-dom';
import axios from "axios";
import { getJwt } from '../../helpers/jwt'
import check from '../../img/check.png'
import uncheck from '../../img/uncheck.png'

class ProviderIndexComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      columns: [
        {
          Header: 'Company',
          accessor: 'company_name',
          filterable: true,
        },
        {
          Header: 'First Name',
          accessor: 'first_name',
          filterable: true,
        },
        {
          Header: 'Last Name',
          accessor: 'last_name',
          filterable: true,
        },
        {
          Header: 'Phone',
          accessor: 'phone',
          filterable: true,
        },
        {
          Header: 'Email',
          accessor: 'email',
          filterable: true,
        },
      ],
      showAddButton: true
    }
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className='main-content'>
        <CustomReactTable
          showAddButton={this.state.showAddButton}
          columns={this.state.columns}
          modelName={"Providers"}
          user={this.props.user} />
      </div >
    )
  }
}

export default withRouter(ProviderIndexComponent);


