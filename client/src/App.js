
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
      token: null,
      user: null
    }
  }

  componentDidMount() {
    const jwt = getJwt()
    this.setState({ token: jwt })
    const headers = {
      'Authorization': `Bearer ${jwt}`,
    }
    axios.get('http://localhost:3001/api/v1/get-user', {
      headers: headers,
    }).then(response => {
      this.setState({ user: response.data.user })
    })

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


