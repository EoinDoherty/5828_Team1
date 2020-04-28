import React from 'react';
import './Card.css';

const Card = (props) => {
    return(
      <div className="card"  {...props}>
          {props.children}
      </div>
     )
  
}

// style={{ width: props.width ? props.width: '100%' }}

export default Card