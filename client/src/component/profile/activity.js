import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';

function Activity() {
  return (
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
  );
}

export default Activity
