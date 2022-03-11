import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Activity from './Activity/activity'
import Favorites from './Favorites/favorites'
import Profile from './profile';


function ProfilePage() {
  return (
    <Container fluid='md' className='mainContainer'>
        <Profile/>
        <Favorites/>
        <Activity/>
    </Container>
  );
}

export default ProfilePage
