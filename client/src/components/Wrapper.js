import React, { Component } from "react";
import { Route, Redirect } from 'react-router-dom'
import axios from "axios";
import { getJwt } from '../helpers/jwt'

import Home from '../components/Home'
import AuthenticatedComponent from '../components/AuthenticatedComponent'
import SideBar from "../components/SideBar";
import ConfirmationPageComponent from "../components/ConfirmationPageComponent"
import ProfileComponent from "../components/ProfileComponent"
import EditPictureComponent from "../components/EditPictureComponent"
import EditPasswordComponent from "../components/EditPasswordComponent";
import StatsComponent from "../components/StatsComponent";

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

import UserIndexComponent from './users/UserIndexComponent'
import UserShowComponent from './users/UserShowComponent'
import UserAddComponent from './users/UserAddComponent'
import UserEditComponent from './users/UserEditComponent'

import ProviderIndexComponent from './providers/ProviderIndexComponent'
import ProviderShowComponent from './providers/ProviderShowComponent'
import ProviderEditComponent from './providers/ProviderEditComponent'
import ProviderAddComponent from './providers/ProviderAddComponent'


class Wrapper extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null
    }
  }

  componentDidMount() {
    const jwt = getJwt()

    if (!jwt) {
      this.props.history.push('/login')
    }

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

    const protectedRoutes = ['d', 'g', 'i', 'k', 'm', 'r', 's', 't', 'u', 'z']

    let routes = [
      { id: 'a1', path: '/home', component: Home },
      { id: 'b1', path: '/products', component: ProductIndexComponent },
      { id: 'c1', path: '/products/add', component: ProductAddComponent },
      { id: 'd1', path: '/products/:id/edit', component: ProductEditComponent },
      { id: 'e1', path: '/products/:id/show', component: ProductShowComponent },
      { id: 'f1', path: '/categories/', component: CategoryIndexComponent },
      { id: 'g1', path: '/categories/:id/edit', component: CategoryEditComponent },
      { id: 'h1', path: '/categories/:id/show', component: CategoryShowComponent },
      { id: 'i1', path: '/categories/add', component: CategoryAddComponent },
      { id: 'j1', path: '/clients', component: ClientIndexComponent },
      { id: 'k1', path: '/clients/:id/edit', component: ClientEditComponent },
      { id: 'l1', path: '/clients/:id/show', component: ClientShowComponent },
      { id: 'm1', path: '/clients/add', component: ClientAddComponent },
      { id: 'n1', path: '/events', component: EventIndexComponent },
      { id: 'o1', path: '/events/:id/edit', component: EventEditComponent },
      { id: 'p1', path: '/events/:id/show', component: EventShowComponent },
      { id: 'q1', path: '/events/add', component: EventAddComponent },
      { id: 'r1', path: '/users', component: UserIndexComponent },
      { id: 's1', path: '/users/:id/show', component: UserShowComponent },
      { id: 't1', path: '/users/:id/edit', component: UserEditComponent },
      { id: 'u1', path: '/users/add', component: UserAddComponent },
      { id: 'v1', path: '/confirm', component: ConfirmationPageComponent },
      { id: 'w1', path: '/edit-image', component: EditPictureComponent },
      { id: 'x1', path: '/profile', component: ProfileComponent },
      { id: 'y1', path: '/edit-password', component: EditPasswordComponent },
      { id: 'z1', path: '/stats', component: StatsComponent },
      { id: 'a2', path: '/providers', component: ProviderIndexComponent },
      { id: 'b2', path: '/providers/add', component: ProviderAddComponent },
      { id: 'c2', path: '/providers/:id/show', component: ProviderShowComponent }
    ]

    return routes.map((route) => {
      if (this.state.user.role && this.state.user.role !== 'admin') {
        if (protectedRoutes.includes(route.id)) {
          return <Route key={route.id} exact path={route.path} component={() => { return <Home user={this.state.user} /> }} />
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


