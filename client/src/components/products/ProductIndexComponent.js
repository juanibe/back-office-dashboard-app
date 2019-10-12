import React, { Component } from "react";
import { Link, withRouter } from 'react-router-dom'
import ReactTable from 'react-table'
import { getJwt } from '../../helpers/jwt'
import axios from 'axios'
import eye from '../../img/eye.png'
import bin from '../../img/bin.png'
import writing from '../../img/writing.png'
import plus from '../../img/plus.png'


class ProductIndexComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      products: [],
      categories: [],
      category: "",
      value: "",
      loading: true
    }
  }

  categoryFilter = (value) => {
    const jwt = getJwt()
    this.setState({ category: value })
    if (value !== "9") {
      axios.get(`http://localhost:3001/api/v1/products?category=${value}`, { headers: { 'Authorization': `Bearer ${jwt}` } })
        .then(response => {
          this.setState({ products: response.data.result })
        })
    } else {
      axios.get(`http://localhost:3001/api/v1/products`, { headers: { 'Authorization': `Bearer ${jwt}` } })
        .then(response => {
          this.setState({ products: response.data.result })
        })
    }
  }

  availabilityFilter = (value) => {
    const jwt = getJwt()
    this.setState({ value: value })
    if (value !== "9") {
      axios.get(`http://localhost:3001/api/v1/products?available=${value}`, { headers: { 'Authorization': `Bearer ${jwt}` } })
        .then(response => {
          this.setState({ products: response.data.result })
        })
    } else {
      axios.get(`http://localhost:3001/api/v1/products`, { headers: { 'Authorization': `Bearer ${jwt}` } })
        .then(response => {
          this.setState({ products: response.data.result })
        })
    }
  }

  componentDidMount() {

    const jwt = getJwt()
    if (!jwt) {
      this.props.history.push('/login')
    }

    axios.get('http://localhost:3001/api/v1/categories', { headers: { 'Authorization': `Bearer ${jwt}` } })
      .then(response => {
        this.setState({
          categories: response.data
        })
      })

    axios.get('http://localhost:3001/api/v1/products', { headers: { 'Authorization': `Bearer ${jwt}` } })
      .then(response => {
        this.setState({
          products: response.data.result,
          loading: false
        })
      })
  }

  render() {
    if (this.state.products === null || this.state.categories === null) {
      return (
        <div>Loading...</div>
      )
    }
    return (
      <div className='main-content'>
        <div>
          <Link to={'/products/add'}><button className="btn btn-light"><img src={plus} /></button></Link>
        </div>
        <hr />
        <ReactTable
          loading={this.state.loading}
          onFetchData={this.state.fetchData}
          data={this.state.products}
          pages={-1}
          columns={[
            {
              Header: "Products",
              columns: [
                {
                  Header: "Name",
                  accessor: "name",
                },
                {
                  Header: "Availability",
                  accessor: "available",
                  filterable: true,
                  Filter: cellInfo => (
                    <select value={this.state.value} onChange={(e) => { this.availabilityFilter(e.target.value) }}>
                      <option value="9">All</option>
                      <option value='1'>Available</option>
                      <option value='0'>Not available</option>
                    </select>
                  )
                },
                {
                  Header: "Category",
                  accessor: "category[0].name",
                  filterable: true,
                  Filter: () => (
                    <select value={this.state.category} onChange={(e) => { this.categoryFilter(e.target.value) }}>
                      <option value="9">All</option>
                      {this.state.categories.map(response => {
                        return <option value={response.name}>{response.name}</option>
                      })}
                    </select>
                  )
                },
                {
                  Header: "Price",
                  accessor: "price"
                },
                {
                  Header: "State",
                  accessor: "state"
                },
                {
                  Header: "",
                  Cell: row => [
                    <Link to={`products/${row.original._id}/show`} params={{ id: row.original._id }}><button className="btn btn-light"><img src={eye} /></button></Link>,
                    <Link to={`products/${row.original._id}/edit`}><button className="btn btn-light"><img src={writing} /></button></Link>,
                    <Link to={`products/${row.original._id}/delete`}><button className="btn btn-light"><img src={bin} /></button></Link>
                  ]
                }
              ]
            }
          ]
          }
          defaultPageSize={10}
          manual
        />
      </div >
    )
  }
}

export default withRouter(ProductIndexComponent);