import React, { Component } from "react";
import CustomReactTable from "../CustomReactTable"
import { Link } from 'react-router-dom'
import ReactTable from 'react-table'
import { getJwt } from '../../helpers/jwt'
import axios from 'axios'

class CategoryIndexComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      columns: [
        {
          Header: "Name",
          accessor: "name",
          filterable: true
        },
        {
          Header: "Description",
          accessor: "description"
        },
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
  }

  render() {
    return (
      <div className='main-content'>
        <CustomReactTable showAddButton={this.state.showAddButton} columns={this.state.columns} modelName={'Category'} user={this.props.user} />
      </div >
    )
  }
}

export default CategoryIndexComponent;