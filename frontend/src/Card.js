import React from 'react';
import './Card.css';

const Card = (props) => {
    return(
      <div className="card" style={{ width: props.width ? props.width: '50%' }} {...props}>
          {props.children}
      </div>
     )
  
}

export default Card




