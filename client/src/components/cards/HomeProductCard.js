import React from 'react';
import { Link } from 'react-router-dom'


function HomeProductCard(props) {
  if (!props.products) {
    return (
      <div>Loading...</div>
    )
  }
  console.log(props.products)
  return (
    <div>
      <div className="card" style={{ width: '18rem' }}>
        <div className="card-body">
          <h5 className="card-title">Products</h5>
          <h6 className="card-subtitle mb-2 text-muted">Total: <b>{props.products.length}</b></h6>
          <h6 className="card-subtitle mb-2 text-muted">Available: <b>{props.availableProducts}</b></h6>
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <Link to={`products`}><button className="btn-card btn btn-success">Go</button></Link>
          <Link to={`products/add`}><button className="btn-card btn btn-success">Add</button></Link>
        </div>
      </div>
    </div>
  )
}

export default HomeProductCard;