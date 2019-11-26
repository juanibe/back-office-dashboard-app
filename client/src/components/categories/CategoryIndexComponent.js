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
          Header: "Categories",
          columns: [
            {
              Header: "Name",
              accessor: "name",
            },
            {
              Header: "Description",
              accessor: "description"
            },
          ]
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

export default CategoryIndexComponent;