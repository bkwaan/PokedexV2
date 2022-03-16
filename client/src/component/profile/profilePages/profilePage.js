import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Background from '../../background';
import Activity from '../Activity/activity'
import Favorites from '../Favorites/favorites'
import Profile from './profile';


function ProfilePage() {
  return (
    <div className='profilePageContainer'>
      <Container fluid='md' className='mainContainer'>
        <Profile />
        <Favorites />
        <Activity />
      </Container>
      <Background />
    </div>
  );
}

export default ProfilePage
