import React, { Component } from "react";
import ReactTable from 'react-table';
import ReactChart from "./ReactChart";
import check from '../img/check.png'
import { withRouter } from 'react-router-dom';
import axios from "axios";
import { getJwt } from '../helpers/jwt'


class StatsComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      columns: [
        {
          id: "_id",
          Header: "Date",
          accessor: d => typeof d._id === 'object' ? `${d._id.year}-${d._id.month}` : d._id,
        },
        {
          Header: "Events",
          accessor: "count"
        },
        {
          Header: "Earnings ($)",
          accessor: "price",
        },
        {
          Header: 'Products',
          id: 'name',
          accessor: data => {
            let output = []
            return data.result.name.join(', ')
          },
        },
      ],
      groupByDate: "day",
      state: {},
      data: [],
      pages: ""
    }
  }

  fetchData = (state) => {
    this.setState({ state: state })
    state.groupByDate = this.state.groupByDate
    const jwt = getJwt()
    if (!jwt) {
      this.props.history.push('/login')
    }

    let config = {
      headers: { 'Authorization': `Bearer ${jwt}` },
      params: {
        page: state.page,
        pageSize: state.pageSize,
        sorted: state.sorted,
        filtered: state.filtered,
        groupByDate: state.groupByDate
      }
    }
    this.setState({ loading: true })

    axios.get(`http://localhost:3001/api/v1/general/group-date`, config)
      .then(response => {
        console.log("DEBUG", response)
        this.setState({
          data: response.data,
          loading: false
        })
      })
  }


  handleGroupByDate = event => {
    this.setState({ groupByDate: event.target.value })
  }

  checkDate = () => {
    this.fetchData(Object.assign(this.state.state, this.state.groupByDate))

  }

  componentDidMount() {
    // const jwt = getJwt()
    // if (!jwt) {
    //   this.props.history.push('/login')
    // }
    // axios.get('http://localhost:3001/api/v1/categories', { headers: { 'Authorization': `Bearer ${jwt}` } })
    //   .then(response => {
    //     this.setState({ categories: response.data.result })
    //   })
  }

  render() {
    console.log(this.state.data)
    return (
      <div className='main-content'>
        <div>
          <label>Group by</label>
          <select style={{ fontSize: "0.8em", backgroundColor: "white" }} className="form-control-xs" onChange={this.handleGroupByDate}>
            <option value="day">Day</option>
            <option value="month">Month</option>
            <option value="year">Year</option>
            <option value="year-month">Year-Month</option>
          </select>
          <button style={{ fontSize: "0.7em" }} className="btn-xs btn-outline-success" onClick={() => { this.checkDate() }}><img style={{ width: "8px" }} src={check} /></button>
        </div>
        {this.state.data && (
          <div className="container">
            <div className="row">
              <span className="col-6"> <ReactChart data={this.state.data} title={"Events"} /></span>
              <span className="col-6"> <ReactChart data={this.state.data} title={"Earnings"} /></span>
            </div>
          </div>
        )}

        <ReactTable
          data={this.state.data}
          columns={this.state.columns}
          manual
          onFetchData={this.fetchData}
          defaultPageSize={10}
          pages={this.state.pages}
          style={{ fontSize: '0.9em' }}
        >
        </ReactTable>
      </div >
    )
  }
}

export default withRouter(StatsComponent);


