import { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getUserCommentsAsync } from '../../../redux/actions/user';
import { getUser, getUserComments } from '../../../redux/Selectors/user';
import ActivityTile from './activityTile';

function Activity() {
  const comments = useSelector(getUserComments)
  const { ID } = useSelector(getUser);
  const dispatch = useDispatch()

  useEffect(async () => {
    dispatch(getUserCommentsAsync(ID))
  }, [])

  const checkID = (id) => {
    let newId
    if (id <= 9) {
      newId = `00${id}`
    } else if (id < 100 && id > 9) {
      newId = `0${id}`
    } else {
      newId = id
    }
    return newId
  };

  const checkLikes = (likes) => {
    const likesString = likes.toString()
    let newLikes = likesString
    if (likesString.length > 3 && likesString.length <= 6) {
      newLikes = `${likesString.substring(0, likesString.length - 3)}K`
    }
    else if (likesString.length > 6) {
      newLikes = `${likesString.substring(0, likesString.length - 6)}M`
    }
    else {
      newLikes = likesString
    }
    return newLikes
  }

  return (
    <Row className='activityContainer' >
      <Col>
        <Row className='activityContainerHeader'>
          <Col>ACTIVITY</Col>
        </Row>
        <Row>
          <Col className={'activityTileScrollContainer'}>
            {comments && comments.length > 0
              ? comments.map((x, index) => {
                return <ActivityTile key={x.pokeID + index} id={checkID(x.pokeID)} pokeName={x.pokeName} likes={checkLikes(x.Likes.length)} originalId={x.pokeID}
                  commentBody={x.CommentBody} commentDate={x.CommentDate.substr(0, x.CommentDate.indexOf('T'))} />
              })
              :<div className='emptyCell'>
                <p className='emptyActivityTitle'>No Activity yet</p>
                <p className='emptyActivitySubtitle'>Any comments you make will be displayed here!</p>
          </div>
            }
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default Activity
