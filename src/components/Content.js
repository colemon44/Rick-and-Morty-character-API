import React from 'react';
import PropTypes from 'prop-types';

import Card from './Card.js';

import './Content.css';

function Content(props) {
  const cards = props.data.map((character, index) => (
    <Card
      character={character}
      key={index}
      onClick={(e) => {
        props.setModalContent(character);
      }}
    />
  ));

  return <div className="content-wrapper">{cards}</div>;
}

Content.propTypes = {
  data: PropTypes.array,
  setModalContent: PropTypes.func,
};

export default Content;
