import React from 'react';

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
          <h6 className="card-subtitle mb-2 text-muted">Available: <b>12</b></h6>
          <h6 className="card-subtitle mb-2 text-muted">Not usable: <b>10</b></h6>
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="#" className="card-link">Card link</a>
          <a href="#" className="card-link">Another link</a>
        </div>
      </div>
    </div>
  )
}

export default HomeCategoryCard;