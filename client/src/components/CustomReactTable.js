import React, { Component } from "react";
import DeleteComponent from "../components/DeleteComponent"
import ReactTable from 'react-table';
import { Link, withRouter } from 'react-router-dom';
import axios from "axios";
import { getJwt } from '../helpers/jwt'

import eye from '../img/eye.png'
import bin from '../img/bin.png'
import writing from '../img/writing.png'


class CustomReactTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      showDelete: false,
      item: null
    }
  }

  onFetchData = (state, instance) => {
    const jwt = getJwt()
    if (!jwt) {
      this.props.history.push('/login')
    }

    let config = {
      headers: { 'Authorization': `Bearer ${jwt}` },
      params: {
        pages: state.page,
        pageSize: state.pageSize,
        sorted: state.sorted,
        filtered: state.filtered
      }
    }

    this.setState({ loading: true })

    axios.get(`http://localhost:3001/api/v1${this.props.location.pathname}`, config)
      .then(response => {
        this.setState({
          data: response.data.result,
          pages: response.data.pages,
          loading: false
        })
      })
  }

  loadOptions = () => {
    this.props.columns.push({
      Header: "",
      Cell: row => [
        <Link to={`${this.props.location.pathname}/${row.original._id}/show`} params={{ id: row.original._id }}><button className="btn btn-light"><img src={eye} /></button></Link>,
        <Link to={`${this.props.location.pathname}/${row.original._id}/edit`}><button className="btn btn-light"><img src={writing} /></button></Link>,
        <button className="btn btn-light" onClick={() => { this.onClickDeleteButton(row.original._id) }}><img src={bin} /></button>
      ]
    })
  }

  onClickDeleteButton = (id) => {
    this.setState({ showDelete: true, item: id })
  }

  onCancelDeleteClick = () => {
    this.setState({ showDelete: false })
  }

  componentDidMount() {
    const jwt = getJwt()
    axios.get(`http://localhost:3001/api/v1${this.props.location.pathname}`,
      { headers: { 'Authorization': `Bearer ${jwt}` } })
      .then(response => {
        console.log(response.data.result)
        this.setState({ data: response.data.result })
      })
    this.loadOptions()
  }

  render() {
    return (
      <div className='main-content'>
        {this.state.showDelete && (
          <DeleteComponent onCancelDeleteClick={this.onCancelDeleteClick} item={this.state.item} />
        )}
        <ReactTable
          data={this.state.data}
          columns={this.props.columns}
          manual
          onFetchData={this.onFetchData}
        >
        </ReactTable>
      </div >
    )
  }
}

export default withRouter(CustomReactTable);

