import React, { Component } from "react";
import CustomReactTable from "../CustomReactTable";
import { withRouter } from 'react-router-dom';
import axios from "axios";
import { getJwt } from '../../helpers/jwt'
import check from '../../img/check.png'
import uncheck from '../../img/uncheck.png'

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
          id: 'category',
          Header: 'Category',
          accessor: 'category',
          Cell: row => {
            if (row.row.category.length > 1) {
              return (
                <div>
                  {row.row.category[0].name} <b>(+)</b>
                </div>
              )
            } else if (row.row.category.length === 1) {
              return (
                <div>{row.row.category[0].name}</div>
              )
            } else {
              return (
                <div><b>-</b></div>
              )
            }
          },

          filterable: true,
          id: 'category',
          Filter: ({ filter, onChange }) =>
            <select style={{ width: "100%", height: "100%" }} onChange={event => onChange(event.target.value)} value={filter ? filter.value : undefined} >
              <option value={""}>Show All</option>
              {this.state.categories.map((category, index) => {
                return (
                  <option key={category._id} value={category._id}>{category.name}</option>
                )
              })}
            </select>
        },
        {
          id: 'available',
          Header: 'Available',
          filterable: true,
          Filter: ({ filter, onChange }) =>
            <select style={{ width: "100%", height: "100%" }} onChange={event => onChange(event.target.value)} value={filter ? filter.value : undefined}>
              <option value={''}>Show All</option>
              <option value={1}>Available</option>
              <option value={0}>Not avilable</option>
            </select>,
          accessor: d => d.available ? <img src={check} style={{ width: '1em' }} /> : <img src={uncheck} style={{ width: '1em' }} />
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
        <CustomReactTable columns={this.state.columns} modelName={"Products"} />
      </div >
    )
  }
}

export default withRouter(ProductIndexComponent);


