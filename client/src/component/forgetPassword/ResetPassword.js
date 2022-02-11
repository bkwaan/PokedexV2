import { useEffect, useState } from "react";
import { Modal, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { resetPasswordAsync } from "../../redux/actions/resetPassword";
import { ResetPasswordStatus } from "../../redux/Selectors/resetPassword";
import Background from "../signIn/background";

const ResetPassword = (props) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [warning, setWarning] = useState('');
    const { Token } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const resetPasswordStatus = useSelector(ResetPasswordStatus)

    useEffect(() => {
        setWarning(resetPasswordStatus.Msg)
        if (resetPasswordStatus.Success) {
            console.log(resetPasswordStatus)
            setTimeout(() => {
                navigate('/', { replace: true })
            }, 3000)
        }
    }, [resetPasswordStatus])


    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const onConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    }

    const onEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handleReset = async (e) => {
        e.preventDefault();
        setWarning('')
        if (password !== confirmPassword) {

            setWarning('Passwords do no match')
            return;
        }
        dispatch(resetPasswordAsync(email, password, Token))
    }

    return (
        <div>
            <Container className='forgotPasswordContainer'>
                <form className='row' noValidate>
                    <Col xs='12' className="textCenter">
                        <p className='title'>POKEDEX</p>
                    </Col>
                    <Col xs='12' className="textCenter" >
                        <p className="subtitle">Reset Password</p>
                    </Col>
                    <Col xs={{ offset: 1, span: 10 }} sm={{ offset: 2, span: 8 }}>
                        <input className="textInput" placeholder="UserName" onChange={onEmailChange}></input>
                    </Col>
                    <Col xs={{ offset: 1, span: 10 }} sm={{ offset: 2, span: 8 }}>
                        <input className="textInput" placeholder="Password" onChange={onPasswordChange} type='password'></input>
                    </Col>
                    <Col xs={{ offset: 1, span: 10 }} sm={{ offset: 2, span: 8 }}>
                        <input className="textInput" placeholder="Confirm Password" onChange={onConfirmPasswordChange} type='password'></input>
                    </Col>
                    <Col xs='12'>
                        <div className={`message ${resetPasswordStatus.Success? 'success':'warning'}`}>{warning}</div>
                    </Col>
                    <Col xs='12'>
                        <button className="reset" onClick={handleReset}>Reset</button>
                    </Col>
                </form>
            </Container>
            <Background />
        </div>
    );
};

export default ResetPassword;
