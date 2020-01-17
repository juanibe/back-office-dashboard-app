import React from 'react';
import { Link } from 'react-router-dom'


function HomeCard(props) {

  if (!props) {
    return (
      <div>Loading...</div>
    )
  }
  return (
    < div >
      <div className="card" style={{ width: '18rem' }}>
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">Total: <b>{props.data.data.result}</b></h6>
          <Link to={`${props.name.toLowerCase()}`}><button className="btn-xs btn-card btn-outline-success">Go</button></Link>
          {props.showAdd && (
            <Link to={`${props.name.toLowerCase()}/add`}><button className="btn-xs btn-card btn-outline-success">Add</button></Link>
          )}
        </div>
      </div>
    </div >
  )
}

export default HomeCard;