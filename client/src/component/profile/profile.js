import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserAsync } from '../../redux/actions/user';
import { getUser } from '../../redux/Selectors/user';
import Favorites from './favorites';

function Profile() {
  const { FirstName, LastName, UserName, Email, ID } = useSelector(getUser);
  const initalState = {
    FirstName,
    LastName,
    Email,
    UserName,
    Password: '',
    ConfirmPassword: '',
  }
  const [userData, setUserData] = useState(initalState);
  const [warning, setWarning] = useState('');
  const [submitButton, setSubmitButton] = useState('Edit');
  const dispatch = useDispatch();

  const handleEdit = () => {
    if (submitButton === 'Edit') {
      setWarning('')
      setSubmitButton('Save');
      return;
    }
    if (isProfileDataChanged()) {
      submitChangedProfileData();
    }
    setSubmitButton('Edit');
  }

  const handleInput = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    })
  }

  const validateInputFields = () => {
    if (!userData.Email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      setWarning('Email invalid');
      return false;
    } else if (userData.FirstName.length == 0) {
      setWarning('First Name cannot be empty');
      return false;
    } else if (userData.LastName.length == 0) {
      setWarning('Last Name cannot be empty');
      return false;
    } else if (userData.UserName.length == 0) {
      setWarning('User Name cannot be empty');
      return false;
    }
    return true;
  }

  const validatePasswordFields = () => {
    const match = userData.Password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!$^&*-+*@])[A-Za-z\d!$^&*-+*@]{8,}/)
    if (!match) {
      setWarning('Password must be length 8 and have 1 Upper case, 1 lower case, 1 digit and \n 1 of the following charcters: [!$^&*-+*@]');
      return false;
    } else if (userData.Password != userData.ConfirmPassword) {
      setWarning('Confirm Password and Password do no match');
      return false;
    }
    return true;
  }

  const isPasswordChanged = () => {
    if (userData.Password.length === 0 && userData.ConfirmPassword.length == 0) {
      return false;
    }
    return true;
  }

  const submitChangedProfileData = async () => {
    try {
      if (validateInputFields() && (!isPasswordChanged() || validatePasswordFields())) {
        await dispatch(updateUserAsync({ ...userData, ID }))
        setUserData({
          ...userData,
          Password: '',
          ConfirmPassword: ''
        })
        return
      }
      setUserData({
        ...initalState
      })
    } catch (err) {
      setWarning(err.response.data.Msg)
    }
  }
  const isProfileDataChanged = () => {
    const keys = Object.keys(initalState)
    for (let k = 0; k < keys.length; k += 1) {
      if (initalState[keys[k]] !== userData[keys[k]]) {
        return true
      }
    }
    return false
  }
  return (
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
            <input name='UserName' type='text' disabled={submitButton === 'Edit'} value={userData.UserName} onChange={handleInput}></input>
          </Col>
          <Col xs={{ span: 8, offset: 2 }} sm={{ span: 6, offset: 3 }} md={{ span: 4, offset: 2 }} lg={{ span: 3, offset: 2 }} className='inputGroupCol'>
            <label>Email</label>
            <input name='Email' type='text' value={userData.Email} disabled={submitButton === 'Edit'} onChange={handleInput}></input>
          </Col>
          <Col xs={{ span: 8, offset: 2 }} sm={{ span: 6, offset: 3 }} md={{ span: 4, offset: 1 }} lg={{ span: 3, offset: 2 }} className='inputGroupCol'>
            <label>First Name</label>
            <input name='FirstName' type='text' value={userData.FirstName} disabled={submitButton === 'Edit'} onChange={handleInput}></input>
          </Col>
          <Col xs={{ span: 8, offset: 2 }} sm={{ span: 6, offset: 3 }} md={{ span: 4, offset: 2 }} lg={{ span: 3, offset: 2 }} className='inputGroupCol'>
            <label>Last Name</label>
            <input name='LastName' type='text' value={userData.LastName} disabled={submitButton === 'Edit'} onChange={handleInput}></input>
          </Col>
          <Col xs={{ span: 8, offset: 2 }} sm={{ span: 6, offset: 3 }} md={{ span: 4, offset: 1 }} lg={{ span: 3, offset: 2 }} className='inputGroupCol'>
            <label>Password</label>
            <input name='Password' value={userData.Password} type='text' disabled={submitButton === 'Edit'} onChange={handleInput}></input>
          </Col>
          <Col xs={{ span: 8, offset: 2 }} sm={{ span: 6, offset: 3 }} md={{ span: 4, offset: 2 }} lg={{ span: 3, offset: 2 }} className='inputGroupCol'>
            <label>Confirm Password</label>
            <input name='ConfirmPassword' value={userData.ConfirmPassword} type='text' disabled={submitButton === 'Edit'} onChange={handleInput}></input>
          </Col>
          <Col xs={{ span: 6, offset: 3 }} className='warningLabel'>
            <label>{warning}</label>
          </Col>
          <Col xs={{ span: 8, offset: 2 }} sm={{ span: 6, offset: 3 }} md={{ span: 2, offset: 9 }} lg={{ span: 1, offset: 9 }} className='buttonCol'>
            <button className='saveButton' onClick={handleEdit}>{submitButton}</button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default Profile
