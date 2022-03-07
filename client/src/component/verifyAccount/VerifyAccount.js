import { useEffect, useState } from "react";
import { Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { requestNewVerificationLinkAsync, verifyUserAccountAsync } from "../../redux/actions/user";
import { isVerifiedUser } from "../../redux/Selectors/user";
import Background from "../signIn/background";

const VerifyAccount = (props) => {
  const { Token } = useParams();
  const { UserName } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [accountStatus, setAccountStatus] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [displayButton, setDisplayButton] = useState(false)

  const isVerified = useSelector(isVerifiedUser)

  useEffect(async () => {
    verifyAccountToken()
  }, [Token])


  const delayedNavigateToLogin = async ()=>{
    setTimeout(() => {
      navigate('/', { replace: true })
    }, 3000)
  }


  const verifyAccountToken = async () => {
    try {
      resetStatus()
      await dispatch(verifyUserAccountAsync(UserName, Token))
      setAccountStatus('Account has Been verified')
      setSubtitle('Redirecting to login page...')
      await delayedNavigateToLogin()
    } catch (err) {
      const msg = err.response.data.Msg
      setAccountStatus(msg)
      if (msg === 'Token has expired') {
        setSubtitle('Request a new verification link below')
        setDisplayButton(true)
      }
      else{
        setSubtitle('Redirecting to login page...')
        await delayedNavigateToLogin()
      }
    }
  }

  const requestNewLink = async (e) =>{
    e.preventDefault()
    resetStatus()
    try{
      await dispatch(requestNewVerificationLinkAsync(UserName))
      setAccountStatus('Email Sent!')
      setSubtitle('Please check your email for a new verification link')
    } catch(err){
      const msg = err.response.data.Message
      setAccountStatus(msg)
      if (msg === 'User has aready been verified'){
        delayedNavigateToLogin()
        setSubtitle('Redirecting to login page...')
      }
    }
  }

  const resetStatus = () => {
    setAccountStatus('')
    setSubtitle('')
    setDisplayButton(false)
  }

  return (
    <div>
      <Container className='verifyAccountContainer'>
        <form className='row' noValidate>
          <Col xs='12' className="textCenter">
            <p className='title'>Account Verification</p>
          </Col>
          <Col xs='12' className="textCenter" >
            <p className="subtitle">{accountStatus}</p>
          </Col>
          <Col xs='12' className="textCenter" >
            <p className="subtitle">{subtitle}</p>
          </Col>
          <Col xs='12'>
            {displayButton
              ? <button className="reset" onClick={requestNewLink}>New Code</button>
              : null
            }
          </Col>
        </form>
      </Container>
      <Background />
    </div>
  );
};

export default VerifyAccount;
