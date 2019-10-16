import React, { Component } from "react";
import { withRouter, Link } from 'react-router-dom'
import Sidebar from "react-sidebar";
import axios from "axios";

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
      <div>
        <Sidebar
          sidebar={
            <div>
              <img src="" />
              <ul className="nav-list">
                <li className="nav-item">
                  <Link to="/" className='btn'>Home</Link>
                </li>
                <li className="nav-item">
                  <Link to="/products" className='btn'>Products</Link>
                </li>
                <li className="nav-item">
                  <Link to="/categories" className='btn'>Categories</Link>
                </li>
                <li className="nav-item">
                  <Link to="#" className='btn'>Clients</Link>
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
                  <button onClick={this.logout} className='btn btn-logout btn-light'>Logout</button>
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
              width: '12em'
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