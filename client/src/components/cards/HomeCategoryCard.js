import React from 'react';
import { Link } from 'react-router-dom'


function HomeCategoryCard(props) {
  if (!props.categories) {
    return (
      <div>Loading...</div>
    )
  }
  return (
    <div>
      <div className="card" style={{ width: '18rem' }}>
        <div className="card-body">
          <h5 className="card-title">Categories</h5>
          <h6 className="card-subtitle mb-2 text-muted">Total: <b>{props.categories.length}</b></h6>
          <br />
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <Link to={`categories`}><button className="btn-card btn btn-success">Go</button></Link>
          <Link to={`categories/add`}><button className="btn-card btn btn-success">Add</button></Link>
        </div>
      </div>
    </div>
  )
}

export default HomeCategoryCard;