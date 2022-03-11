import { Col, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { profilePokeClicked } from '../../../redux/actions/user';

function ActivityTile({ id, pokeName, commentBody, commentDate, likes, originalId }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const goToHomePage = () => {
    dispatch(profilePokeClicked(originalId))
    navigate('/homepage', { replace: false })
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
          <Col xs='12' sm='9'>
            <p className='activityCellDescription'>{commentBody}</p>
          </Col>
          <Col xs='12' sm={{ span: 3 }} className='.ms-auto'>
            <label className='activityDate'>{commentDate}</label>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default ActivityTile
