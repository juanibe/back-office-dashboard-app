import React, { Component } from "react";
import DeleteComponent from "../components/DeleteComponent"
import ReactTable from 'react-table';
import { Link, withRouter } from 'react-router-dom';
import DatePicker from "react-datepicker";
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
      item: null,
      pages: null,
      totalItems: null,
      loading: false,
      state: {},
      dateAvailability: ""
    }
  }

  fetchData = (state) => {
    this.setState({ state: state })
    state.dateAvailability = this.state.dateAvailability
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
        dateAvailability: state.dateAvailability
      }
    }
    this.setState({ loading: true })

    axios.get(`http://localhost:3001/api/v1${this.props.location.pathname}`, config)
      .then(response => {
        console.log(response.data.result)
        this.setState({
          data: response.data.result,
          loading: false
        })
      })

    axios.get(`http://localhost:3001/api/v1${this.props.location.pathname}/count-documents`, config)
      .then(response => {
        this.setState({
          totalItems: response.data.result,
          pages: Math.ceil(response.data.result / state.pageSize)
        })
      })
  }

  loadOptions = () => {
    let columnsArray = this.props.columns
    columnsArray = {}
    if (this.props.user.role !== 'admin') {
      columnsArray = {
        Header: "",
        Cell: (row) => [
          // Find a better way to add unique key
          <Link to={`${this.props.location.pathname}/${row.original._id}/show`} key={row.original._id} params={{ id: row.original._id }}><button className="btn-xs btn-outline-light"><img style={{ width: '1em' }} src={eye} /></button></Link>,
          <input key={row.original._id + 'c'} type='checkbox'></input>
        ]
      }
    } else {
      columnsArray = {
        Header: "",
        Cell: (row) => [
          <Link to={`${this.props.location.pathname}/${row.original._id}/show`} key={row.original._id} params={{ id: row.original._id }}><button className="btn-xs btn-outline-light"><img style={{ width: '1em' }} src={eye} /></button></Link>,
          <Link to={`${this.props.location.pathname}/${row.original._id}/edit`} key={row.original._id + 'a'}><button className="btn-xs btn-outline-light"><img style={{ width: '1em' }} src={writing} /></button></Link>,
          <button key={row.original._id + 'b'} className="btn-xs btn-outline-light" onClick={() => { this.onClickDeleteButton(row.original._id) }}><img style={{ width: '1em' }} src={bin} /></button>,
          <input key={row.original._id + 'c'} type='checkbox'></input>
        ]
      }
    }

    this.props.columns.push(columnsArray)
  }

  loadFunctionalities = () => {
    const selectAll = <span className='functionalities-select-all-table'><button onClick={() => { this.refreshTableFilters() }} className="btn-sm btn-outline-info">Select all</button></span>
    const refreshTable = <span className='functionalities-refresh-table'><button onClick={() => { this.refreshTableFilters() }} className="btn-sm btn-outline-dark">Refresh table</button></span>
    const addButton = <span className='functionalities-add-item-table'> <Link to={`${this.props.location.pathname}/add`}><button className="btn-sm btn-outline-success">Add new {this.props.modelName}</button></Link></span>

    if (this.props.showAddButton) {
      return (
        <div className='functionalities-react-table'>
          {addButton}
          {refreshTable}
          {selectAll}
        </div>
      )
    } else {
      return (
        <div className='functionalities-react-table'>
          {refreshTable}
          {selectAll}
        </div>
      )
    }
  }

  handleDateAvailability = (event) => {
    this.setState({ dateAvailability: event })
  }

  checkDate = () => {
    this.fetchData(Object.assign(this.state.state, this.state.dateAvailability))
  }

  onClickDeleteButton = (id) => {
    this.setState({ showDelete: true, item: id })
  }

  onCancelDeleteClick = () => {
    this.setState({ showDelete: false })
  }

  onConfirmDeleteClick = () => {
    this.setState({ showDelete: false })
    this.props.history.push(this.props.location.pathname)
  }

  componentDidMount() {
    this.loadOptions()
  }

  reloadData = () => {
    this.fetchData(this.state.state)
  }

  refreshTableFilters = () => {
    let state = this.state.state
    state.filtered = []
    state.sorted = []
    this.fetchData(state)
  }

  render() {
    return (
      <div className='main-content'>
        {this.state.showDelete && (
          <DeleteComponent
            reloadData={this.reloadData}
            onCancelDeleteClick={this.onCancelDeleteClick}
            onConfirmDeleteClick={this.onConfirmDeleteClick}
            item={this.state.item} />
        )}
        <h3>{`${this.props.modelName} (${this.state.totalItems})`}</h3>
        {this.loadFunctionalities()}
        <div>
          <label>Availability</label>
          <DatePicker
            dateFormat="dd-MM-yyyy"
            onChange={this.handleDateAvailability}
            selected={this.state.dateAvailability}
          />
          <button onClick={() => { this.checkDate() }}>Check</button>
        </div>
        <ReactTable
          data={this.state.data}
          columns={this.props.columns}
          manual
          onFetchData={this.fetchData}
          defaultPageSize={10}
          pages={this.state.pages}
          style={{ fontSize: '0.9em' }}
        >
        </ReactTable>
        <div className="total-records-tag">{this.props.modelName}: {this.state.totalItems}</div>
      </div >
    )
  }
}

export default withRouter(CustomReactTable);

