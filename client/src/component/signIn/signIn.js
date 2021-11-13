import { Col, Container, Row } from 'react-bootstrap';
import { useState } from 'react';
import pinkBlur from './Assets/pinkBlur.png'
import greenBlur from './Assets/greenBlur.png'
import purpleBlur from './Assets/purpleBlur.png'
import pokeBall from './Assets/pokeBall.png'



function SignIn() {
    const [pageType, setPageType] = useState('Login');


    const renderLogin = () => {
        return (
            <>
                <Col className='textCenter' xs={{ offset: 1, span: 10 }} sm={{offset: 2 , span:8}}>
                    <input className='signinTextField' placeholder='Username' type='text'></input>
                </Col>
                <Col className='textCenter' xs={{ offset: 1, span: 10 }} sm={{offset: 2 , span:8}}>
                    <input id='passwordField' className='signinTextField' placeholder='Password' type='text'></input>
                </Col>
            </>
        )
    }

    const renderSignUp = () => {
        return (
            <>
                <Col className='textCenter' xs={{ offset: 1, span: 10 }} sm={{offset: 2 , span:8}}>
                    <input className='signinTextField' placeholder='Email' type='text'></input>
                </Col>
                {renderLogin()}
                <Col className='textCenter' xs={{ offset: 1, span: 10 }} sm={{offset: 2 , span:8}}>
                    <input id='passwordField' className='signinTextField' placeholder='Confirm Password' type='text'></input>
                </Col>
            </>
        )
    }

    const renderForgotPassword=()=>{
        if(pageType=='Login'){
            return(
                <Col className='textCenter' xs='12'>
                    <a href='' className='forgotPasswordLink'>Forgot Password</a>
                 </Col>
            )
        }
        return null;
    }

    const renderHelpText=()=>{
        if (pageType=='Login') {
            return(
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


    const helpTextClick=()=>{
        (pageType=='Login')? setPageType('SignUp'):setPageType('Login');
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
                    {(pageType=='Login')? renderLogin():renderSignUp()}
                    {renderForgotPassword()}
                    <Col xs='12' className='textCenter'>
                        <button className='signInButton' signInButton>{pageType}</button>
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
