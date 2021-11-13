import { Col, Container, Row } from 'react-bootstrap';

function Profile() {
  return (
    <Container fluid='md' className='mainContainer'>
      <Row className='profileContainer'>
        <Col>
          <Row className="profileRow">
            <Col>
            <div className='profileImageBackground'>
              <img className='profileImage' src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/122.png"></img>
            </div>
            </Col>
            <Col className='profileUsername' >
              Bkwann
            </Col>
            <Col className='profileColor'>
              <button className="colorButton"></button>
            </Col>
          </Row>
          <Row className='profileInputGroup'>
            <Col xs={{ span: 8, offset: 2 }} sm={{ span: 6, offset: 3 }} md={{ span: 4, offset: 1 }} lg={{ span: 3, offset: 2 }} className='inputGroupCol'>

              <label>Username</label>
              <input type='text'></input>

            </Col>
            <Col xs={{ span: 8, offset: 2 }} sm={{ span: 6, offset: 3 }} md={{ span: 4, offset: 2 }} lg={{ span: 3, offset: 2 }} className='inputGroupCol'>

              <label>Email</label>
              <input type='text'></input>

            </Col>
            <Col xs={{ span: 8, offset: 2 }} sm={{ span: 6, offset: 3 }} md={{ span: 4, offset: 1 }} lg={{ span: 3, offset: 2 }} className='inputGroupCol'>
              <label>Password</label>
              <input type='text'></input>
            </Col>
            <Col xs={{ span: 8, offset: 2 }} sm={{ span: 6, offset: 3 }} md={{ span: 4, offset: 2 }} lg={{ span: 3, offset: 2 }} className='inputGroupCol'>

              <label>Confirm Password</label>
              <input type='text'></input>

            </Col>
            <Col xs={{ span: 8, offset: 2 }} sm={{ span: 6, offset: 3 }} md={{ span: 2, offset: 9 }} lg={{ span: 1, offset: 9 }} className='buttonCol'>
              <button className='saveButton'>Save</button>
            </Col>
          </Row>
        </Col>
      </Row>


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


      <Row className='activityContainer' >
        <Col>
          <Row className='activityContainerHeader'>
            <Col>ACTIVITY</Col>
          </Row>
          <Row>
            <Col>
              <Row className='activityCell'>
                <Col>
                  <Row className='activityCellInfoRow'>
                    <Col xs='8'>
                      <label className='activityCellTitle'>#001 Mr Mime</label>
                    </Col>
                    <Col className='activityCellFollowData' xs='4' >
                      <label>20k</label>
                      <img src='https://www.freeiconspng.com/uploads/heart-icon-14.png'></img>
                    </Col>
                  </Row>
                  <Row className='activityCellInfoRow'>
                    <Col xs='12' sm='9'>
                      <p className='activityCellDescription'> wow this is the bets pokemon eveere skdkasdja dsajkdjasdkjas</p>
                    </Col>
                    <Col xs='12' sm={{ span: 3 }} className='.ms-auto'>
                      <label className='activityDate'>2021-01-03</label>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Profile
