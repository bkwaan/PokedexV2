import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { profilePokeClicked, updatePokeLikeAsync } from '../../../redux/actions/user';
import { getUser } from '../../../redux/Selectors/user';

function FavoriteTile({id, sprite, pokeName, colorName }) {
    const user = useSelector(getUser)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const unLikePokemon = async(e) => {
        e.stopPropagation();
        dispatch( updatePokeLikeAsync(id, user.ID, 'unlike'))
    }
  
    const goToHomePage = () =>{
        dispatch(profilePokeClicked(id))
      navigate('/homepage', { replace: false})
    }
  
    return (
        <div className={`pokemonTile ${colorName}`} onClick={goToHomePage}>
            <img onClick={unLikePokemon} className='heartIcon' src='https://www.freeiconspng.com/uploads/heart-icon-14.png'></img>
            <div className='pokemonImageBackground'>
                <img className='pokemonImage' src={sprite}></img>
            </div>
            <label className='pokemonLabel'>{pokeName}</label>
        </div>
    );
}

export default FavoriteTile
