import React, { Component } from "react";
import CustomReactTable from "../CustomReactTable";
import InputRange from 'react-input-range';
import { withRouter } from 'react-router-dom';
import axios from "axios";
import { getJwt } from '../../helpers/jwt'
import "react-input-range/lib/css/index.css"

class ProductIndexComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      columns: [
        {
          Header: 'Name',
          accessor: 'name',
          filterable: true,
        },
        {
          Header: 'Category',
          accessor: 'category[0].name',
          filterable: true,
          id: 'category',
          Filter: ({ filter, onChange }) =>
            <select onChange={event => onChange(event.target.value)} value={filter ? filter.value : undefined} >
              <option value={""}>Show All</option>
              {this.state.categories.map((category, index) => {
                return (
                  <option value={category._id}>{category.name}</option>
                )
              })}
            </select>
        },
        {
          id: 'available',
          Header: 'Available',
          filterable: true,
          Filter: ({ filter, onChange }) =>
            <select onChange={event => onChange(event.target.value)} value={filter ? filter.value : undefined}>
              <option value={''}>All</option>
              <option value={1}>Available</option>
              <option value={0}>Not avilable</option>
            </select>,
          accessor: d => d.available ? "Yes" : "No"
        },
        {
          Header: 'Price',
          accessor: 'price',
          filterable: false,
        },
      ],
      categories: [],
    }
  }

  componentDidMount() {
    const jwt = getJwt()
    if (!jwt) {
      this.props.history.push('/login')
    }
    axios.get('http://localhost:3001/api/v1/categories', { headers: { 'Authorization': `Bearer ${jwt}` } })
      .then(response => {
        this.setState({ categories: response.data.result })
      })
  }


  render() {
    return (
      <div className='main-content'>
        <CustomReactTable columns={this.state.columns} />
      </div >
    )
  }
}

export default withRouter(ProductIndexComponent);


