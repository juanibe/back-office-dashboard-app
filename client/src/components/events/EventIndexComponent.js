import React, { Component } from "react";
import CustomReactTable from "../CustomReactTable";
import { withRouter } from 'react-router-dom';
import { getJwt } from '../../helpers/jwt'
import check from '../../img/check.png'
import uncheck from '../../img/uncheck.png'

class EventIndexComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      columns: [
        {
          Header: 'Client',
          accessor: 'client[0].full_name',
          filterable: true,
        },
        {
          Header: 'Place',
          accessor: 'place',
          filterable: true,
        },
        {
          Header: 'Date',
          accessor: 'date',
          filterable: true,
        },
        {
          Header: 'Price',
          accessor: 'price',
          filterable: true,
        },
      ],
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
        <CustomReactTable columns={this.state.columns} modelName={"Events"} />
      </div >
    )
  }
}

export default withRouter(EventIndexComponent);


