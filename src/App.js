import React, { useState, useEffect } from 'react';
import './App.css';

import Content from './components/Content.js';
import Modal from './components/Modal.js';

const URL = 'https://rickandmortyapi.com/api/';

function App() {
  const [currentPage, setCurrentPage] = useState(`${URL}character/`);
  const [pagination, setPagination] = useState({
    prev: null,
    next: null,
  });
  const [characterData, setCharacterData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const handleKeyup = (e) => e.keyCode === 27 && setShowModal(false);
  const [currentCharacter, setCurrentCharacter] = useState(false);
  const setModalContent = (character) => {
    setCurrentCharacter(character);
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    fetch(currentPage)
      .then((response) => response.json())
      .then((data) => {
        setPagination({
          prev: data.info.prev,
          next: data.info.next,
        });
        setCharacterData(data.results);
      });
  }, [currentPage]);

  useEffect(() => {
    if (showModal) window.addEventListener('keyup', handleKeyup);
    return () => window.removeEventListener('keyup', handleKeyup);
  });

  const nextPage = () => {
    if (pagination.next != null) {
      setCurrentPage(pagination.next);
    }
  };
  const prevPage = () => {
    if (pagination.prev != null) {
      setCurrentPage(pagination.prev);
    }
  };

  return (
    <React.Fragment>
      <header>
        <div className="title-wrapper">
          <h1 className="title">Rick and Morty Character-pedia</h1>
        </div>
      </header>

      <section className="content">
        <div className="card-display-container">
          <div className="card-display-wrapper">
            <Content data={characterData} setModalContent={setModalContent} />
          </div>
        </div>
        <div className="pagination-container">
          <div className="pagination-wrapper">
            <button
              className="pagination-btn left-pagination-btn"
              onClick={(e) => {
                prevPage();
              }}>
              &#8592;
            </button>
            <button
              className="pagination-btn right-pagination-btn"
              onClick={(e) => {
                nextPage();
              }}>
              &#8594;
            </button>
          </div>
        </div>
      </section>

      {showModal && (
        <Modal closeModal={closeModal}>
          <div className="modal-content-container">
            <div className="modal-content-wrapper">
              <div className="modal-image-wrapper">
                <img
                  src={currentCharacter.image}
                  alt={currentCharacter.image}
                />
              </div>
              <div className="modal-description-wrapper">
                <h1>{currentCharacter.name}</h1>
                <ul className="modal-description-attributes">
                  <li>Gender: {currentCharacter.gender}</li>
                  <li>Episodes: {currentCharacter.episode.length}</li>
                  <li>Location: {currentCharacter.location.name}</li>
                  <li>Origin: {currentCharacter.origin.name}</li>
                  <li>Species: {currentCharacter.species}</li>
                  <li>Status: {currentCharacter.status}</li>
                </ul>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </React.Fragment>
  );
}

export default App;
