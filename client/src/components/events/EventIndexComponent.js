import React, { Component } from "react";
import CustomReactTable from "../CustomReactTable";
import { withRouter } from 'react-router-dom';
import { getJwt } from '../../helpers/jwt'
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";

const Moment = require('moment');

class EventIndexComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clients: [],
      columns: [
        {
          id: 'client',
          Header: 'Client',
          accessor: 'client',
          Cell: row => {
            return <div>{row.original.client[0].full_name}</div>
          },

          filterable: true,
          Filter: ({ filter, onChange }) =>
            <select style={{ width: "100%", height: "100%" }} onChange={event => onChange(event.target.value)} value={filter ? filter.value : undefined} >
              <option value={""}>Show All</option>
              {this.state.clients.map((client) => {
                return (
                  <option key={client._id} value={client._id}>{client.full_name}</option>
                )
              })}
            </select>
        },
        {
          Header: 'Place',
          accessor: 'place',
          filterable: true,
        },
        {
          id: 'date',
          Header: 'Date',
          accessor: d => { return Moment(d.date).format('DD-MM-YYYY') },
          filterable: false,
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
    axios.get('http://localhost:3001/api/v1/clients', { headers: { 'Authorization': `Bearer ${jwt}` } })
      .then(response => {
        this.setState({ clients: response.data.result })
      })
  }

  render() {
    return (
      <div className='main-content'>
        <CustomReactTable columns={this.state.columns} modelName={"Events"} user={this.props.user} modes={'pastEvents'} />
      </div >
    )
  }
}

export default withRouter(EventIndexComponent);


