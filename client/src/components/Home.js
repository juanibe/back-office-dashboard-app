import React, { Component } from "react";
import { getJwt } from '../helpers/jwt'
import axios from 'axios'
import HomeCard from './cards/HomeCard'
import { Link } from "react-router-dom";
const Moment = require('moment');


class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showAdd: false,
      eventList: null,
      products: null,
      availableProducts: 0,
      categories: null,
      events: null,
      clients: null,
      users: null,
    }
  }

  componentDidMount() {
    const jwt = getJwt()
    if (!jwt) {
      this.props.history.push('/login')
    }

    axios.all([
      axios.get('http://localhost:3001/api/v1/general/events-day', { headers: { 'Authorization': `Bearer ${jwt}` } }),
      axios.get('http://localhost:3001/api/v1/products/count-total', { headers: { 'Authorization': `Bearer ${jwt}` } }),
      axios.get('http://localhost:3001/api/v1/categories/count-total', { headers: { 'Authorization': `Bearer ${jwt}` } }),
      axios.get('http://localhost:3001/api/v1/events/count-total', { headers: { 'Authorization': `Bearer ${jwt}` } }),
      axios.get('http://localhost:3001/api/v1/clients/count-total', { headers: { 'Authorization': `Bearer ${jwt}` } }),
      axios.get('http://localhost:3001/api/v1/users/count-total', { headers: { 'Authorization': `Bearer ${jwt}` } })
    ])
      .then(axios.spread((eventList, products, categories, events, clients, users) => {
        this.setState({
          eventList: eventList.data,
          products: products,
          categories: categories,
          events: events,
          clients: clients,
          users: users,
        })
      }))

    if (this.props.user.role === "admin") {
      this.setState({ showAdd: true })
    }

  }


  render() {
    console.log(this.state.eventList)
    if (
      this.state.events === null ||
      this.state.products === null ||
      this.state.categories === null ||
      this.state.events === null ||
      this.state.clients === null ||
      this.state.users === null
    ) {
      return (
        <div>Loading...</div>
      )
    }
    return (

      <div className='main-content home-content'>
        <div className="events-general">
          {this.state.eventList.length !== 0 ? <h5>Upcoming events</h5> : <h5>No upcoming events</h5>}
          {this.state.eventList.map((result) => {
            return (
              <div key={result._id} className="event-list">
                <strong className="info-date-title">{Moment(result._id).format('DD-MM-YYYY')}</strong>
                {result.info.map(info => {
                  return (
                    <div key={info._id}>
                      <p className="info">{info.client[0].last_name}, {info.client[0].first_name}</p>
                      <p className="info">{info.place}</p>
                      <p className="info info-link-to-detail"><Link to={`/events/${info._id}/show`}>See details</Link></p>
                      <div className="info-divisory-line"></div>
                    </div>
                  )
                })}
              </div>

            )
            // return <p key={result._id}><Link to={`events/${result._id}/show`} >{result.info.client}</Link></p>
          })
          }
        </div>

        <hr></hr>
        <div>
          <div className='container'>
            <div className='row'>
              <div className='col-4 home-card'>
                <HomeCard showAdd={true} data={this.state.products} name={'Products'} />
              </div>
              <div className='col-4 home-card'>
                <HomeCard showAdd={this.state.showAdd} data={this.state.categories} name={'Categories'} />
              </div>
              <div className='col-4 home-card'>
                <HomeCard showAdd={true} data={this.state.events} name={'Events'} />
              </div>
              <div className='col-4 home-card'>
                <HomeCard showAdd={this.state.showAdd} data={this.state.clients} name={'Clients'} />
              </div>
              {this.props.user.role === 'admin' && (
                <div className='col-4 home-card'>
                  <HomeCard showAdd={this.state.showAdd} data={this.state.users} name={'Users'} />
                </div>
              )}
            </div>
          </div>
        </div >
      </div>

    )
  }
}

export default Home;