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
      data: [],
      pages: null,
      products: []
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
          categories: response.data,
          data: response.data.slice(0, 10),
          pages: response.data.length / 10,
          loading: false
        })
      })

    axios.get('http://localhost:3001/api/v1/products', { headers: { 'Authorization': `Bearer ${jwt}` } })
      .then(response => {
        this.setState({
          products: response.data.result,
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
          onFetchData={this.state.fetchData}
          data={this.state.data}
          pages={this.state.pages}
          filterable
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
                },
                {
                  Header: "Category",
                  accessor: "category[0].name",
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
          onPageChange={pageIndex => {
            let pagesize = 10;
            let low = pageIndex * pagesize;
            let high = pageIndex * pagesize + pagesize;
            const jwt = getJwt()
            axios.get(`http://localhost:3001/api/v1/products`, { headers: { 'Authorization': `Bearer ${jwt}` } })
              .then(res => {
                this.setState({
                  posts: res.data,
                  data: res.data.result.slice(low, high),
                  pages: res.data.pages,
                  loading: false
                });
              })
          }}
          defaultPageSize={10}
          noDataText={"Loading..."}
          manual
        />
      </div >
    )
  }
}

export default withRouter(ProductIndexComponent);