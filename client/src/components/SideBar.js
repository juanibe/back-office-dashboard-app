import React, { Component } from "react";
import { withRouter, Link } from 'react-router-dom'
import Sidebar from "react-sidebar";
import axios from "axios";
import { getJwt } from '../helpers/jwt'

import profilePic from '../../src/img/profile4.png'

const mql = window.matchMedia(`(min-width: 800px)`);

class SideBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      sidebarDocked: mql.matches,
      sidebarOpen: false
    }
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  listItems = () => {

    const protectedRoutes = ['Accounts', 'Admin', 'Stats']

    let items = [
      { id: 'a', value: 'Home', route: '/' },
      { id: 'b', value: 'Products', route: '/products' },
      { id: 'c', value: 'Categories', route: '/categories' },
      { id: 'd', value: 'Clients', route: '/clients' },
      { id: 'e', value: 'Events', route: '/events' },
      { id: 'f', value: 'Accounts', route: '/accounts' },
      { id: 'g', value: 'Admin', route: 'admins' },
      { id: 'h', value: 'Stats', route: '/stats' },
      { id: 'i', value: 'Help', route: '/help' },
      { id: 'j', value: 'Logout', route: '/logout', logout: this.logout }
    ]
    if (this.state.user.role !== 'admin') {
      items = items.filter((item) => {
        return !protectedRoutes.includes(item.value)
      })
    }
    return items.map((item) => {
      return <li className="nav-item" key={item.id}><Link to={item.route} className='btn' onClick={item.logout}>{item.value} </Link></li>
    })
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  mediaQueryChanged() {
    this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
  }

  componentWillMount() {
    mql.addListener(this.mediaQueryChanged);
  }

  componentDidMount() {
    const jwt = getJwt()
    const headers = {
      'Authorization': `Bearer ${jwt}`,
    }
    axios.get('http://localhost:3001/api/v1/get-user', {
      headers: headers,
    }).then(response => {
      this.setState({ user: response.data.user })
    })
  }

  logout = () => {
    axios.post('http://localhost:3001/api/v1/logout')
      .then(() => {
        localStorage.removeItem('jwt-token')
        this.forceUpdate()
        this.props.history.push(`/login`)
      })
  }


  render() {
    if (!this.state.user) {
      return (
        <div>Loading...</div>
      )
    }
    return (
      <div className="side-bar-general">
        <Sidebar
          sidebar={
            <div>
              <ul>
                <img className="profile-pic" src={profilePic} />
                <li>{this.state.user.fullName}</li>
                <li>{this.state.user.role}</li>
              </ul>
              <ul>
                {this.listItems()}
              </ul>
            </div>
          }
          open={this.state.sidebarOpen}
          docked={this.state.sidebarDocked}
          onSetOpen={this.onSetSidebarOpen}
          styles={{
            sidebar: {
              background: '#0292B7',
              width: '10em'
            },

          }}
        >
          {this.props.children}
        </Sidebar>
      </div >
    )
  }
}

export default withRouter(SideBar);