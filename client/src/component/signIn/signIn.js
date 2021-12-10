import { Col, Container, Row } from 'react-bootstrap';
import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import TwoFactorModal from './twoFactorModal';
import Backgroud from './background';
import ForgetPassword from '../forgetPassword/ForgetPassword';

function SignIn() {

    //Handling state
    const [pageType, setPageType] = useState('Login');
    const [warning, setWarning] = useState('');
    const [otpShow, setOtpShow] = useState(false);
    const [forgotShow, setForgotShow] = useState(false);

    // Input fields
    const initalState = {
        UserName: '',
        Password: '',
        Email: '',
        ConfirmPassword: '',
        FirstName: '',
        LastName: '',
    }
    const [InputState, setInputState] = useState(initalState);


    useEffect(() => {
        console.log(InputState);
    });

    //Function for handling any changes to all input fields
    const handleInput = (e) => {
        const { name, value } = e.target;
        setInputState({
            ...InputState,
            [name]: value,
        })
    }

    //Handle hiding OTP modal
    const hideOtpModal = () => {
        resetInput();
        setOtpShow(false);
    }

    //Switches between sign in and sign up pages
    const helpTextClick = () => {
        (pageType == 'Login') ? setPageType('SignUp') : setPageType('Login');
        resetInput()
        setWarning('');
    }

    //Resets input fields
    const resetInput = () => {
        setInputState(initalState);
    }


    const validateInutFields = () => {
        if (!InputState.Email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
            setWarning('Email invalid')
            return false;
        } else if (InputState.FirstName.length == 0) {
            setWarning('First Name cannot be empty')
            return false;
        } else if (InputState.LastName.length == 0) {
            setWarning('Last Name cannot be empty')
            return false;
        } else if (InputState.UserName.length == 0) {
            setWarning('User Name cannot be empty')
            return false;
        } else if (!InputState.Password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)) {
            setWarning('Password must be length 8 and have 1 Upper case, 1 lower case, 1 digit')
            return false;
        } else if (InputState.Password != InputState.ConfirmPassword) {
            setWarning('Confirm Password and Password do no match')
            return false;
        }

        return true;
    }

    //Send login request
    const loginRequest = async () => {
        try {
            setWarning('')
            const { UserName, Password } = InputState;
            const res = await axios.post('/api/User/Login', { UserName: UserName, Password: Password });
            //displays otp verification modal -- validate token is in twoFactorModal.js
            setOtpShow(true);
        } catch (e) {
            setWarning(e.response.data.Msg);
        }

    }

    //Send Sign up request
    const SignUpRequest = async () => {
        try {
            setWarning('')
            if (!(validateInutFields())) return;
            const res = await axios.post('/api/User/SignUp', InputState);
            //Email sent to user
        } catch (e) {
            setWarning(e.response.data.Msg);
        }
    }

    // Returns login text fields
    const renderLogin = () => {
        return (
            <>
                <Col className='textCenter' xs={{ offset: 1, span: 10 }} sm={{ offset: 2, span: 8 }}>
                    <input name='UserName' value={InputState.UserName} className='signinTextField' placeholder='Username' type='text' onChange={handleInput}></input>
                </Col>
                <Col className='textCenter' xs={{ offset: 1, span: 10 }} sm={{ offset: 2, span: 8 }}>
                    <input name='Password' value={InputState.Password} id='passwordField' className='signinTextField' placeholder='Password' type='password' minlength="8" required onChange={handleInput}></input>
                </Col>
            </>
        )
    }

    //Returns input fields for signup
    const renderSignUp = () => {
        return (
            <>
                <Col className='textCenter' xs={{ offset: 1, span: 10 }} sm={{ offset: 2, span: 8 }}>
                    <input name='Email' type='email' value={InputState.Email} className='signinTextField' placeholder='Email' type='text' onChange={handleInput}></input>
                </Col>
                <Col className='textCenter' xs={{ offset: 1, span: 10 }} sm={{ offset: 2, span: 8 }}>
                    <input name='FirstName' value={InputState.FirstName} className='signinTextField' placeholder='FirstName' type='text' onChange={handleInput}></input>
                </Col>
                <Col className='textCenter' xs={{ offset: 1, span: 10 }} sm={{ offset: 2, span: 8 }}>
                    <input name='LastName' value={InputState.LastName} className='signinTextField' placeholder='LastName' type='text' onChange={handleInput}></input>
                </Col>
                {renderLogin()}
                <Col className='textCenter' xs={{ offset: 1, span: 10 }} sm={{ offset: 2, span: 8 }}>
                    <input name='ConfirmPassword' type='password' minlength="8" required value={InputState.ConfirmPassword} id='passwordField' className='signinTextField' placeholder='Confirm Password' onChange={handleInput}></input>
                </Col>
            </>
        )
    }

    //Returns forgot password when page is set to login
    const renderForgotPassword = () => {
        if (pageType == 'Login') {
            return (
                <>
                    <Col className='textCenter' xs='12'>
                        <div onClick={() => setForgotShow(true)} className='forgotPasswordLink'>Forgot Password</div>
                    </Col>
                    <Col className='textCenter' xs='12'>
                        <label className='warningMessage'>{warning}</label>
                    </Col>
                </>
            )
        }
        return <Col className='textCenter' xs='12'>
            <label className='warningMessage'>{warning}</label>
        </Col>
    }

    //Returns help text baseed on the pagetype
    const renderHelpText = () => {
        if (pageType == 'Login') {
            return (
                <Col xs='12'>
                    <div className='textCenter'>Dont have an Account? <div className='helpText' onClick={helpTextClick}> Sign Up </div> here</div>
                </Col>
            )
        }
        return (
            <Col xs='12'>
                <div className='textCenter'>Already have an account? <div className='helpText' onClick={helpTextClick}> Login</div> here</div>
            </Col>
        )
    }

    return (
        <div className={(forgotShow || otpShow) ? 'pageContainer wrapper' : 'pageContainer'}>
            <Container fluid className='signInContainer'>
                <Row>
                    <Col xs='12' className="textCenter">
                        <h1 className={pageType == 'SignUp' ? 'appTitle SignUp' : 'appTitle'}>POKEDEX</h1>
                    </Col>
                    <Col xs='12' className="textCenter" >
                        <h1 className='signInTitle'>{pageType}</h1>
                    </Col>
                    {(pageType == 'Login') ? renderLogin() : renderSignUp()}
                    {renderForgotPassword()}
                    <Col xs='12' className='textCenter'>
                        <button className='signInButton' onClick={(pageType == 'Login') ? loginRequest : SignUpRequest}>{pageType}</button>
                    </Col>
                    {renderHelpText()}
                </Row>
            </Container>
            <Backgroud />
            <TwoFactorModal show={otpShow} onHide={hideOtpModal} username={InputState.UserName} />
            <ForgetPassword show={forgotShow} onHide={() => setForgotShow(false)} />
        </div>
    );
}

export default SignIn
