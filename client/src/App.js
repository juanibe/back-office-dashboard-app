
import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import { getJwt } from './helpers/jwt'
import Login from './components/Login';
import Wrapper from './components/Wrapper'
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {



  }


  render() {
    return (
      <div id='App'>
        <BrowserRouter>
          <Switch>
            <Route exact path={'/login'} component={Login} />
            <Route component={Wrapper} />
          </Switch>
        </BrowserRouter>
      </div >
    )
  }
}

export default App;


