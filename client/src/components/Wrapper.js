
import React, { Component } from "react";
import { Route } from 'react-router-dom'

import Home from '../components/Home'
import AuthenticatedComponent from '../components/AuthenticatedComponent'
import SideBar from "../components/SideBar";

import ProductIndexComponent from './products/ProductIndexComponent'
import ProductShowComponent from "./products/ProductShowComponent";
import ProductAddComponent from "./products/ProductAddComponent";

import CategoryIndexComponent from './categories/CategoryIndexComponent'
import CategoryShowComponent from './categories/CategoryShowComponent'
import CategoryAddComponent from './categories/CategoryAddComponent'


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
            <Route exact path={'/products/:id/edit'} component={ProductShowComponent} />
            <Route exact path={'/products/:id/delete'} component={ProductShowComponent} />
            <Route exact path={'/categories'} component={CategoryIndexComponent} />
            <Route exact path={'/categories/:id/show'} component={CategoryShowComponent} />
            <Route exact path={'/categories/add'} component={CategoryAddComponent} />
            <Route exact path={'/categpries/:id/edit'} component={CategoryShowComponent} />
            <Route exact path={'/categories/:id/delete'} component={CategoryShowComponent} />
          </SideBar>
        </AuthenticatedComponent>
      </div >
    )
  }
}

export default Wrapper;


