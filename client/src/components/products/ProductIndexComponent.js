import React, { Component } from "react";
import { Link, withRouter } from 'react-router-dom'
import ReactTable from 'react-table'
import ProductDeleteItemComponent from '../../components/products/ProductDeleteItemComponent'
import { getJwt } from '../../helpers/jwt'
import axios from 'axios'
import eye from '../../img/eye.png'
import writing from '../../img/writing.png'
import plus from '../../img/plus.png'
import available_icon from '../../img/available.png'
import not_available_icon from '../../img/not_available.png'


class ProductIndexComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      categories: [],
      category_value: '',
      availability_value: '',
      filters: {},
      pages: null,
      alert: null,
    }
  }

  handleChange = (value) => {
    this.setState({ data: value })
  }

  applyFilter = (value) => {

    const jwt = getJwt()

    let filterObject = JSON.parse(value)

    let filters = this.state.filters

    Object.assign(filters, filterObject)

    this.setState({ filters: filters })

    let config = {
      headers: { 'Authorization': `Bearer ${jwt}` },
      params: this.state.filters
    }


    /** 
     * TODO: when changes page with filters, it shows everything again.
     * When apply filter it will show all the items in one page, not matter
     * how many are they
    */

    axios.get(`http://localhost:3001/api/v1/products`, config)
      .then(response => {
        console.log(response.config.params)
        this.setState({
          data: response.data.result
        })
      })

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
          data: response.data.result.slice(0, 10),
          pages: Math.ceil(response.data.result.length / 10),
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
          data={this.state.data}
          pages={this.state.pages}
          style={{ textAlign: 'center' }}
          columns={[
            {
              Header: "Products",
              columns: [
                {
                  Header: "Name",
                  accessor: "name",
                },
                {
                  id: 'available',
                  Header: "Available",
                  accessor: d => { return d.available ? <img src={available_icon} /> : <img src={not_available_icon} /> },
                  filterable: true,
                  Filter: () => (
                    <select className='form-control' value={this.state.availability_value} onChange={(e) => this.applyFilter(e.target.value)} >
                      <option value={`{ "available": "" }`}>Select</option>
                      <option value={`{ "available": "" }`}>All</option>
                      <option value={`{ "available": "1" }`}>Available</option>
                      <option value={`{ "available": "0" }`}>Not available</option>
                    </select>
                  )
                },
                {
                  Header: "Category",
                  accessor: "category[0].name",
                  filterable: true,
                  Filter: () => (
                    <select className='form-control' value={this.state.category_value} onChange={(e) => this.applyFilter(e.target.value)}>
                      <option value={`{ "category": "" }`}>Select</option>
                      <option value={`{ "category": "" }`}>All</option>
                      {this.state.categories.map((category, index) => {
                        return <option key={index} value={`{ "category": "${category.name}" }`}>{category.name}</option>
                      })}
                    </select>
                  )
                },
                {
                  Header: "Price",
                  accessor: "price"
                },
                {
                  Header: "",
                  Cell: row => [
                    <Link to={`products/${row.original._id}/show`} params={{ id: row.original._id }}><button className="btn btn-light"><img src={eye} /></button></Link>,
                    <Link to={`products/${row.original._id}/edit`}><button className="btn btn-light"><img src={writing} /></button></Link>,
                    <ProductDeleteItemComponent product={row.original._id} products={this.state.data} handleChange={this.handleChange} />
                  ]
                }
              ]
            }
          ]
          }
          onPageChange={pageIndex => {
            let pagesize = 10;
            let low = pageIndex * pagesize;
            let high = pageIndex * pagesize + pagesize;
            const jwt = getJwt()
            axios.get(`http://localhost:3001/api/v1/products`, { headers: { 'Authorization': `Bearer ${jwt}` } })
              .then(res => {
                this.setState({
                  data: res.data.result.slice(low, high),
                  pages: res.data.pages,
                  loading: false
                });
              })
          }}
          defaultPageSize={10}
          manual
        />
      </div >
    )
  }
}

export default withRouter(ProductIndexComponent);