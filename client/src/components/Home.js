import React, { Component } from "react";
import { getJwt } from '../helpers/jwt'
import axios from 'axios'
import HomeProductCard from './cards/HomeProductCard'
import HomeCategoryCard from './cards/HomeCategoryCard'
import HomeClientCard from './cards/HomeClientCard'



class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      products: null,
      availableProducts: 0,
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
        let counter = 0
        response.data.result.map((product) => {
          if (product.available === true) {
            counter++
          }
          return counter;
        })
        this.setState({
          products: response.data.result,
          availableProducts: counter
        })
      })

    axios.get('http://localhost:3001/api/v1/categories', { headers: { 'Authorization': `Bearer ${jwt}` } })
      .then(response => {
        this.setState({
          categories: response.data.result
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
        <h1 className='home-title'>Home</h1>
        <div>
          <div className='container'>
            <div className='row'>
              <div className='col home-card'>
                <HomeProductCard products={this.state.products} availableProducts={this.state.availableProducts} />
              </div>
              <div className='col home-card'>
                <HomeCategoryCard categories={this.state.categories} />
              </div>
              <div className='col home-card'>
                <HomeClientCard />
              </div>
            </div>
          </div>
        </div >
      </div>

    )
  }
}

export default Home;