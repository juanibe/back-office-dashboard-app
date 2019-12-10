
import React, { Component } from "react";
import { Route } from 'react-router-dom'

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


class Wrapper extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div>
        <AuthenticatedComponent>
          <SideBar>
            <Route exact path={'/'} component={Home} />
            <Route exact path={'/products'} component={ProductIndexComponent} />
            <Route exact path={'/products/:id/show'} component={ProductShowComponent} />
            <Route exact path={'/products/add'} component={ProductAddComponent} />
            <Route exact path={'/products/:id/edit'} component={ProductEditComponent} />
            <Route exact path={'/categories'} component={CategoryIndexComponent} />
            <Route exact path={'/categories/:id/show'} component={CategoryShowComponent} />
            <Route exact path={'/categories/add'} component={CategoryAddComponent} />
            <Route exact path={'/categories/:id/edit'} component={CategoryEditComponent} />
            <Route exact path={'/clients'} component={ClientIndexComponent} />
            <Route exact path={'/clients/:id/show'} component={ClientShowComponent} />
            <Route exact path={'/clients/add'} component={ClientAddComponent} />
            <Route exact path={'/clients/:id/edit'} component={ClientEditComponent} />
            <Route exact path={'/events'} component={EventIndexComponent} />
            <Route exact path={'/events/add'} component={EventAddComponent} />
          </SideBar>
        </AuthenticatedComponent>
      </div >
    )
  }
}

export default Wrapper;


