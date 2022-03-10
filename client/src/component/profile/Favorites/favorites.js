import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getFavoritePokemon } from '../../../redux/Selectors/pokemon'
import FavoriteTile from './favoriteTile';

function Favorites() {
  const pokemon = useSelector(getFavoritePokemon)
  return (
    <Row className='favoritesContainer' >
      <Col>
        <Row className='favoritesContainerHeader'>
          <Col xs={{ span: 6, offset: 3 }}>
            FAVORITES
          </Col>
        </Row>
        <Row>
          <Col className='favoritesScrollBar'>
              {pokemon.map((x,index) => {
                return <FavoriteTile sprite={x.sprites.other['official-artwork'].front_default} colorName={x.types[0].type.name} pokeName={x.name} id={x.id}/>
              })}
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default Favorites
