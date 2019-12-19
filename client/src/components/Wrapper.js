
import React, { Component } from "react";
import { Route } from 'react-router-dom'
import axios from "axios";
import { getJwt } from '../helpers/jwt'

import Home from '../components/Home'
import AuthenticatedComponent from '../components/AuthenticatedComponent'
import SideBar from "../components/SideBar";

import ProductIndexComponent from './products/ProductIndexComponent'
import ProductShowComponent from "./products/ProductShowComponent";
import ProductAddComponent from "./products/ProductAddComponent";
import ProductEditComponent from "./products/ProductEditComponent";

import CategoryIndexComponent from './categories/CategoryIndexComponent'
import CategoryShowComponent from './categories/CategoryShowComponent'
import CategoryAddComponent from './categories/CategoryAddComponent'
import CategoryEditComponent from './categories/CategoryEditComponent'

import ClientIndexComponent from './clients/ClientIndexComponent'
import ClientShowComponent from './clients/ClientShowComponent'
import ClientAddComponent from './clients/ClientAddComponent'
import ClientEditComponent from './clients/ClientEditComponent'

import EventIndexComponent from './events/EventIndexComponent'
import EventAddComponent from './events/EventAddComponent'
import EventEditComponent from './events/EventEditComponent'
import EventShowComponent from './events/EventShowComponent'

import AdminIndexComponent from './admins/AdminIndexComponent'


class Wrapper extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null
    }
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

  loadRoutes = () => {

    const protectedRoutes = ['c', 'd', 'g', 'i', 'k', 'm', 'o', 'q', 'r']

    let routes = [
      { id: 'a', path: '/', component: Home },
      { id: 'b', path: '/products', component: ProductIndexComponent },
      { id: 'c', path: '/products/add', component: ProductAddComponent },
      { id: 'd', path: '/products/:id/edit', component: ProductEditComponent },
      { id: 'e', path: '/products/:id/show', component: ProductShowComponent },
      { id: 'f', path: '/categories/', component: CategoryIndexComponent },
      { id: 'g', path: '/categories/:id/edit', component: CategoryEditComponent },
      { id: 'h', path: '/categories/:id/show', component: CategoryShowComponent },
      { id: 'i', path: '/categories/add', component: CategoryAddComponent },
      { id: 'j', path: '/clients', component: ClientIndexComponent },
      { id: 'k', path: '/clients/:id/edit', component: ClientEditComponent },
      { id: 'l', path: '/clients/:id/show', component: ClientShowComponent },
      { id: 'm', path: '/clients/add', component: ClientAddComponent },
      { id: 'n', path: '/events', component: EventIndexComponent },
      { id: 'o', path: '/events/:id/edit', component: EventEditComponent },
      { id: 'p', path: '/events/:id/show', component: EventShowComponent },
      { id: 'q', path: '/events/add', component: EventAddComponent },
      { id: 'r', path: '/admins', component: AdminIndexComponent }
    ]

    return routes.map((route) => {
      if (this.state.user.role !== 'admin') {
        if (protectedRoutes.includes(route.id)) {
          return <Route key={route.id} exact path={route.path} component={Home} />
        }
      }
      return <Route key={route.id} exact path={route.path} component={() => { return <route.component user={this.state.user} /> }} />
    })

  }

  render() {
    if (!this.state.user) {
      return (
        <div>Loading...</div>
      )
    }
    return (
      <div>
        <AuthenticatedComponent>
          <SideBar>
            {this.loadRoutes()}
          </SideBar>
        </AuthenticatedComponent>
      </div >
    )
  }
}

export default Wrapper;


