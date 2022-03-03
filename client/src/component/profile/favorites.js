import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';

function Favorites() {
 
  return (
    <Row className='favoritesContainer' >
      <Col>
        <Row className='favoritesContainerHeader'>
          <Col xs={{ span: 6, offset: 3 }}>
            FAVORITES
          </Col>
        </Row>
        <Row>
          <Col>
            <div className='favoritesScrollBar'>
              <div className='pokemonTile'>
                <img className='heartIcon' src='https://www.freeiconspng.com/uploads/heart-icon-14.png'></img>
                <img className='pokemonImage' src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/122.png"></img>
                <label className='pokemonLabel'>Mr Mime</label>
              </div>
              <div className='pokemonTile'>
                <img className='heartIcon' src='https://www.freeiconspng.com/uploads/heart-icon-14.png'></img>
                <img className='pokemonImage' src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/122.png"></img>
                <label className='pokemonLabel'>Mr Mime</label>
              </div>
              <div className='pokemonTile'>
                <img className='heartIcon' src='https://www.freeiconspng.com/uploads/heart-icon-14.png'></img>
                <img className='pokemonImage' src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/122.png"></img>
                <label className='pokemonLabel'>Mr Mime</label>
              </div>
              <div className='pokemonTile'>
                <img className='heartIcon' src='https://www.freeiconspng.com/uploads/heart-icon-14.png'></img>
                <img className='pokemonImage' src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/122.png"></img>
                <label className='pokemonLabel'>Mr Mime</label>
              </div>
              <div className='pokemonTile'>
                <img className='heartIcon' src='https://www.freeiconspng.com/uploads/heart-icon-14.png'></img>
                <img className='pokemonImage' src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/122.png"></img>
                <label className='pokemonLabel'>Mr Mime</label>
              </div>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default Favorites
