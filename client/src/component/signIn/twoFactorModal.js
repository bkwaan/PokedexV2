import { Modal, Button, Row } from 'react-bootstrap';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { verifyOtpCode } from '../../redux/actions/user';
import { useNavigate } from 'react-router-dom';


function TwoFactorModal(props) {

  const [verifyTokenText, setVerifyTokenText] = useState('');
  const [token, setToken] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const VerifyOtpRequest = async (e) => {
    e.preventDefault();
    try {
      const x = await dispatch(verifyOtpCode(props.username, token));
      if(!props.location.state){
        navigate('/homepage', { replace: true })
      }
      else{
        navigate(props.location.state.prev, { replace: true })
      }
    } catch (e) {
      setVerifyTokenText(e.response.data.Msg);
    }
  }

  const handleInput = (e) => {
    setToken(e.target.value);
  }

  const hideModal = () => {
    setVerifyTokenText('');
    props.onHide();
  }

  return (
    <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered onHide={hideModal} >
      <form onSubmit={VerifyOtpRequest}>
        <div className='header'>
          <div className='modalTitle'>
            Verify OTP.
          </div>
          <button type="button" class="btn-close" aria-label="Close" onClick={hideModal}></button>
        </div>
        <div className="modalBody">
          <h6>We have sent a one time password to your email.</h6>
          <label>Please enter the OTP code sent to your Email below</label>
          <input className='verificationCodeInput' placeholder='Verification Code' onChange={handleInput}></input>
          <p className='modalWarning'>{verifyTokenText}</p>
        </div>
        <div className='footer'>
          <Button type='submit'>Verify</Button>
        </div>
      </form>
    </Modal>
  );
}

export default TwoFactorModal;
