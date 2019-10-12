import React, { Component } from "react";
import HomeProductCard from './cards/HomeProductCard'
import HomeCategoryCard from './cards/HomeCategoryCard'
import { getJwt } from '../helpers/jwt'
import axios from 'axios'



class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      products: null,
      categories: null
    }
  }

  componentDidMount() {
    const jwt = getJwt()
    if (!jwt) {
      this.props.history.push('/login')
    }

    axios.get('http://localhost:3001/api/v1/products', { headers: { 'Authorization': `Bearer ${jwt}` } })
      .then(response => {
        this.setState({
          products: response.data.result
        })
      })

    axios.get('http://localhost:3001/api/v1/categories', { headers: { 'Authorization': `Bearer ${jwt}` } })
      .then(response => {
        this.setState({
          categories: response.data
        })
      })
  }


  render() {
    if (this.state.products === null || this.state.categories === null) {
      return (
        <div>Loading...</div>
      )
    }
    return (
      <div className='main-content home-content'>
        <h1>Home</h1>
        <div>
          <div className='container'>
            <div className='row'>
              <div className='col-3 home-card'>
                <HomeProductCard products={this.state.products} />
              </div>
              <div className='col-3 home-card'>
                <HomeCategoryCard categories={this.state.categories} />
              </div>
              {/* <div className='col-3 home-card'>
                <HomeCard value={'Stats'} />
              </div> */}
            </div>
          </div>
        </div >
      </div>

    )
  }
}

export default Home;