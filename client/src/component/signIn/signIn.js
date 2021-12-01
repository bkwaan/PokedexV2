import { Col, Container, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import pinkBlur from './Assets/pinkBlur.png'
import greenBlur from './Assets/greenBlur.png'
import purpleBlur from './Assets/purpleBlur.png'
import pokeBall from './Assets/pokeBall.png'
import axios from 'axios';



function SignIn() {

    //Functions for state and sending request
    const [pageType, setPageType] = useState('Login');
    const [warning, setWarning] = useState('');
    const initalState = {
        UserName: '',
        Password: '',
        Email: '',
        confirmPassword: ''
    }

    //Prints state in console - only for testing if state updates properly
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

    //Switches between sign in and sign up pages
    const helpTextClick = () => {
        (pageType == 'Login') ? setPageType('SignUp') : setPageType('Login');
        setInputState(initalState);
    }

    //Send login request
    const loginRequest = async () => {
        try {
            const { UserName, Password } = InputState;
            const res = await axios.post('/api/User/Login', { UserName: UserName, Password: Password });
        } catch (e) {
            setWarning(e.response.data.Msg);
        }

    }
    //Send Sign up request
    const SignUpRequest = (e) => {
        const { UserName, Password, Email, ConfirmPassword } = e.target;
    }

    // Functions for Rendering Different content
    const renderLogin = () => {
        return (
            <>
                <Col className='textCenter' xs={{ offset: 1, span: 10 }} sm={{ offset: 2, span: 8 }}>
                    <input name='UserName' value={InputState.UserName} className='signinTextField' placeholder='Username' type='text' onChange={handleInput}></input>
                </Col>
                <Col className='textCenter' xs={{ offset: 1, span: 10 }} sm={{ offset: 2, span: 8 }}>
                    <input name='Password' value={InputState.Password} id='passwordField' className='signinTextField' placeholder='Password' type='text' onChange={handleInput}></input>
                </Col>
            </>
        )
    }

    const renderSignUp = () => {
        return (
            <>
                <Col className='textCenter' xs={{ offset: 1, span: 10 }} sm={{ offset: 2, span: 8 }}>
                    <input name='Email' value={InputState.Email} className='signinTextField' placeholder='Email' type='text' onChange={handleInput}></input>
                </Col>
                {renderLogin()}
                <Col className='textCenter' xs={{ offset: 1, span: 10 }} sm={{ offset: 2, span: 8 }}>
                    <input name='ConfirmPassword' value={InputState.confirmPassword} id='passwordField' className='signinTextField' placeholder='Confirm Password' type='text' onChange={handleInput}></input>
                </Col>
            </>
        )
    }

    const renderForgotPassword = () => {
        if (pageType == 'Login') {
            return (
                <>
                    <Col className='textCenter' xs='12'>
                        <a href='' className='forgotPasswordLink'>Forgot Password</a>
                    </Col>
                    <Col className='textCenter' xs='12'>
                        <label className='warningMessage'>{warning}</label>
                    </Col>
                </>
            )
        }
        return null;
    }

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
        <div className='pageContainer'>

            <Container fluid className='signInContainer'>
                <Row>
                    <Col xs='12' className="textCenter">
                        <h1 className='appTitle'>POKEDEX</h1>
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

            <img src={greenBlur} className='greenBlur' />

            <img src={pinkBlur} className='pinkBlur' />

            <img src={purpleBlur} className='purpleBlur' />

            <img src={pokeBall} className='pokeBall' />

        </div>
    );
}

export default SignIn
