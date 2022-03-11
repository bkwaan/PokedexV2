import { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getUserCommentsAsync } from '../../../redux/actions/user';
import { getUser, getUserComments } from '../../../redux/Selectors/user';
import ActivityTile from './activityTile';

function Activity() {
  const comments = useSelector(getUserComments)
  const { UserName } = useSelector(getUser);
  const dispatch = useDispatch()

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
  useEffect(async () => {
    dispatch(getUserCommentsAsync(UserName))
  }, [])
  return (
    <Row className='activityContainer' >
      <Col>
        <Row className='activityContainerHeader'>
          <Col>ACTIVITY</Col>
        </Row>
        <Row>
          <Col className='activityTileScrollContainer'>
            {comments.map((x) => {
              return x.Comment.map((y) => {
                return <ActivityTile key={x.id} id={checkID(x.pokeID)} pokeName={x.PokeName} likes={checkLikes(y.Likes.length)} originalId={x.pokeID}
                  commentBody={y.CommentBody} commentDate={y.CommentDate.substr(0, y.CommentDate.indexOf('T'))}
                />
              })
            })}
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default Activity
