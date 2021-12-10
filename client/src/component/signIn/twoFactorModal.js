import { Modal, Button, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';




function TwoFactorModal(props) {

    const [verifyTokenText, setVerifyTokenText] = useState('')
    const [token, setToken] = useState('')

    const VerifyOtpRequest = async () => {
        try {
            const res = await axios.post('/api/User/VerifyOTP', { UserName: props.username, Token: token, });
            props.onHide()
            //Redirect to home page if success
        } catch (e) {
            console.log(e.response.data.Msg)
            setVerifyTokenText(e.response.data.Msg);
        }
    }

    const handleInput = (e) => {
        setToken(e.target.value)
        console.log(token);
    }

    const hideModal = () => {
        setVerifyTokenText('')
        props.onHide();
    }

    return (
        <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
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
                <Button onClick={VerifyOtpRequest}>Verify</Button>
            </div>
        </Modal>
    );
}

export default TwoFactorModal;
