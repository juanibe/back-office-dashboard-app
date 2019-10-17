import React, { Component } from "react";
import { Link } from 'react-router-dom'
import ReactTable from 'react-table'
import { getJwt } from '../../helpers/jwt'
import axios from 'axios'
import eye from '../../img/eye.png'
import bin from '../../img/bin.png'
import writing from '../../img/writing.png'
import plus from '../../img/plus.png'


class ClientIndexComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clients: []
    }
  }

  componentDidMount() {
    const jwt = getJwt()
    if (!jwt) {
      this.props.history.push('/login')
    }

    axios.get('http://localhost:3001/api/v1/clients', { headers: { 'Authorization': `Bearer ${jwt}` } })
      .then(response => {
        this.setState({
          clients: response.data
        })
      })
  }

  render() {
    if (this.state.clients === null) {
      return (
        <div>Loading...</div>
      )
    }
    return (
      <div className='main-content'>
        <div>
          <Link to={'/clients/add'}><button className="btn btn-light"><img src={plus} /></button></Link>
        </div>
        <hr />
        <ReactTable
          data={this.state.clients}
          filterable
          defaultFilterMethod={(filter, row) =>
            String(row[filter.id]) === filter.value}
          columns={[
            {
              Header: "Clients",
              columns: [
                {
                  Header: "First name",
                  accessor: "first_name",
                },
                {
                  Header: "Last name",
                  accessor: "last_name"
                },
                {
                  Header: "Email",
                  accessor: "email"
                },
                {
                  Header: "Address",
                  accessor: "address"
                },
                {
                  Header: "",
                  Cell: row => [
                    <Link to={`clients/${row.original._id}/show`} params={{ id: row.original._id }}><button className="btn btn-light"><img src={eye} /></button></Link>,
                    <Link to={`clients/${row.original._id}/edit`}><button className="btn btn-light"><img src={writing} /></button></Link>,
                    <Link to={`clients/${row.original._id}/delete`}><button className="btn btn-light"><img src={bin} /></button></Link>
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

export default ClientIndexComponent;