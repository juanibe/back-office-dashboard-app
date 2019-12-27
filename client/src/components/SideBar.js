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
      user: {},
      sidebarDocked: mql.matches,
      sidebarOpen: false,
      image: "https://res.cloudinary.com/dfxsoyryz/image/upload/v1576956381/arl7jnlu8a7rtblq9tbv.png"
    }
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  listItems = () => {

    const protectedRoutes = ['f', 'h', 'i']

    let items = [
      { id: 'a', value: 'Home', route: '/' },
      { id: 'b', value: 'Products', route: '/products' },
      { id: 'c', value: 'Categories', route: '/categories' },
      { id: 'd', value: 'Clients', route: '/clients' },
      { id: 'e', value: 'Events', route: '/events' },
      { id: 'f', value: 'Users', route: '/users' },
      { id: 'g', value: 'Profile', route: '/profile' },
      { id: 'h', value: 'Accounts', route: '/accounts' },
      { id: 'i', value: 'Stats', route: '/stats' },
      { id: 'j', value: 'Help', route: '/help' },
      { id: 'k', value: 'Logout', route: '/logout', logout: this.logout }
    ]
    if (this.state.user.role !== 'admin') {
      items = items.filter((item) => {
        return !protectedRoutes.includes(item.id)
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
      .then(() => {
        axios.get(`http://localhost:3001/api/v1/images/${this.state.user.image[0]}`, { headers: { 'Authorization': `Bearer ${jwt}` } })
          .then(response => {
            this.setState({ image: response.data.cloudImage })
          })
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
    if (!this.state.user && !this.state.image) {
      return (
        <div>Loading...</div>
      )
    }
    return (
      <div className="side-bar-general">
        <Sidebar
          sidebar={
            <div>
              <ul className="profile-presentation">
                <img className="profile-pic rounded-circle" src={this.state.image} />
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
              width: '13em',
              navigator: '10em'
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