import React, { Component } from "react";
import { Link } from 'react-router-dom'
import ReactTable from 'react-table'
import { getJwt } from '../../helpers/jwt'
import axios from 'axios'
import eye from '../../img/eye.png'
import bin from '../../img/bin.png'
import writing from '../../img/writing.png'
import plus from '../../img/plus.png'


class CategoryIndexComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: null
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
  }

  render() {
    if (this.state.categories === null) {
      return (
        <div>Loading...</div>
      )
    }
    return (
      <div className='main-content'>
        <div>
          <Link to={'/categories/add'}><button className="btn btn-light"><img src={plus} /></button></Link>
        </div>
        <hr />
        <ReactTable
          data={this.state.categories}
          filterable
          defaultFilterMethod={(filter, row) =>
            String(row[filter.id]) === filter.value}
          columns={[
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
                {
                  Header: "",
                  Cell: row => [
                    <Link to={`categories/${row.original._id}/show`} params={{ id: row.original._id }}><button className="btn btn-light"><img src={eye} /></button></Link>,
                    <Link to={`categories/${row.original._id}/edit`}><button className="btn btn-light"><img src={writing} /></button></Link>,
                    <Link to={`categories/${row.original._id}/delete`}><button className="btn btn-light"><img src={bin} /></button></Link>
                  ]
                }
              ]
            }
          ]
          }
          defaultPageSize={10}
        />
      </div >
    )
  }
}

export default CategoryIndexComponent;