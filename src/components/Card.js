import React from 'react';
import PropTypes from 'prop-types';

import './Card.css';

function Card(props) {
  const { image, name } = props.character;

  return (
    <div className="card" onClick={props.onClick}>
      <div className="image-container">
        <div className="image-wrapper">
          <img src={image} alt={image} />
        </div>
      </div>
      <div className="card-title-container">
        <div className="card-title-wrapper">
          <h2 className="card-title">{name}</h2>
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  character: PropTypes.object,
  onClick: PropTypes.func,
};

export default Card;
