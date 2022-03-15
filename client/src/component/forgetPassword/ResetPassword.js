import { useEffect, useState } from "react";
import { Modal, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { resetPasswordAsync } from "../../redux/actions/resetPassword";
import { ResetPasswordStatus } from "../../redux/Selectors/resetPassword";
import Background from "../background";

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
        const { isValid, Msg } = validateInputFields()
        if (!isValid) {
            setWarning(Msg)
            return;
        }
        dispatch(resetPasswordAsync(email, password, Token))
    }

    const validateInputFields = () => {
        if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
            return { isValid: false, Msg: 'Email Invalid' }
        } else if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!$^&*-+*@])[A-Za-z\d!$^&*-+*@]{8,}/)) {
            return { isValid: false, Msg: 'Password must be length 8 and have 1 Upper case, 1 lower case, 1 digit and \n 1 of the following charcters: [!$^&*-+*@]' }
        } else if (password != confirmPassword) {
            return { isValid: false, Msg: 'Confirm Password and Password do no match' }
        }
        return {isValid: true}
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
                        <input className="textInput" placeholder="Email" onChange={onEmailChange}></input>
                    </Col>
                    <Col xs={{ offset: 1, span: 10 }} sm={{ offset: 2, span: 8 }}>
                        <input className="textInput" placeholder="Password" onChange={onPasswordChange} type='password'></input>
                    </Col>
                    <Col xs={{ offset: 1, span: 10 }} sm={{ offset: 2, span: 8 }}>
                        <input className="textInput" placeholder="Confirm Password" onChange={onConfirmPasswordChange} type='password'></input>
                    </Col>
                    <Col xs='12'>
                        <div className={`message ${resetPasswordStatus.Success ? 'success' : 'warning'}`}>{warning}</div>
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
