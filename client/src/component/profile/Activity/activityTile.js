import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { profilePokeClicked } from '../../../redux/actions/user';

function ActivityTile({ id, pokeName, commentBody, commentDate, likes, originalId }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [readMore, setReadMore] = useState('activityCellCollapsed')

  const goToHomePage = () => {
    dispatch(profilePokeClicked(originalId))
    navigate('/', { replace: false })
  }

  const handleReadButton = () =>{
    readMore? setReadMore(''): setReadMore('activityCellCollapsed')
  }
  return (
    <Row className='activityCell'>
      <Col>
        <Row className='activityCellInfoRow'>
          <Col xs='8'>
            <label className='activityCellTitle' onClick={goToHomePage}>{`#${id} ${pokeName} `}</label>
          </Col>
          <Col className='activityCellFollowData' xs='4' >
            <label>{likes}</label>
            <img src='https://www.freeiconspng.com/uploads/heart-icon-14.png'></img>
          </Col>
        </Row>
        <Row className='activityCellInfoRow'>
          {commentBody.length > 100
            ? <Col xs='12'>
              <p className={`activityCellDescription ${readMore}`}>{commentBody}</p>
              <div className='readMoreButton'onClick={handleReadButton}>{readMore? 'Read More': 'Read Less'}</div>
            </Col>
            : <Col xs='12'>
              <p className='activityCellDescription'>{commentBody}</p>
            </Col>
          }
          <Col xs='12' className='.ms-auto'>
            <label className='activityDate'>{commentDate}</label>
          </Col>
        </Row>
      </Col >
    </Row >
  );
}

export default ActivityTile
