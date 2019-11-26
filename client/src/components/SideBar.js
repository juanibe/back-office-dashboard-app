import React, { Component } from "react";
import { withRouter, Link } from 'react-router-dom'
import Sidebar from "react-sidebar";
import axios from "axios";

import profilePic from '../../src/img/profile4.png'
import home from '../../src/img/home.png'

const mql = window.matchMedia(`(min-width: 800px)`);

class SideBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sidebarDocked: mql.matches,
      sidebarOpen: false
    }
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
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

  logout = () => {
    console.log('test')

    axios.post('http://localhost:3001/api/v1/logout')
      .then(() => {
        localStorage.removeItem('jwt-token')
        this.props.history.push(`/login`)
      })
  }


  render() {
    return (
      <div className="side-bar-general">
        <Sidebar
          sidebar={
            <div>
              <ul>
                <img className="profile-pic" src={profilePic} />
                <li>Juan Ignacio Benito</li>
                <li>Admin</li>
              </ul>
              <ul className="nav-list">
                <li className="nav-item">
                  <Link to="/" className='btn'><img src={home} /> Home</Link>
                </li>
                <li className="nav-item">
                  <Link to="/products" className='btn'>Products</Link>
                </li>
                <li className="nav-item">
                  <Link to="/categories" className='btn'>Categories</Link>
                </li>
                <li className="nav-item">
                  <Link to="/clients" className='btn'>Clients</Link>
                </li>
                <li className="nav-item">
                  <Link to="#" className='btn'>Stats</Link>
                </li>
                <li className="nav-item">
                  <Link to="#" className='btn'>Admin</Link>
                </li>
              </ul>
              <ul className="">
                <li>
                  <button onClick={this.logout} >Logout</button>
                </li>
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