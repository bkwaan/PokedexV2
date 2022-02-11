import { Modal, Row, Col } from "react-bootstrap";
import PokeBall from "../../images/pokeball.png";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearForgotPassword, forgotPassword, forgotPasswordAsync } from "../../redux/actions/forgotPassword";
import { forgotPasswordStatus } from "../../redux/Selectors/forgotPassword";

const ForgotPassword = (props) => {
  const [email, setEmail] = useState('')
  const forgotPassText = useSelector(forgotPasswordStatus);
  const dispatch = useDispatch();


  const handleForgotPassword = async (e) => {
    e.preventDefault();
    dispatch(clearForgotPassword());
    try {
      const x = await dispatch(forgotPasswordAsync(email));
    } catch (err) {
      const { Msg, Status } = err.response.data;
      dispatch(forgotPassword({ Msg, Status }));
    }
  }

  const handleClose = () => {
    props.onHide();
    dispatch(clearForgotPassword());
  }

  return (
    <div>
      <Modal size="lg" {...props} centered onHide={handleClose}>
        <div className="forgetPassCont">
          <div className="closeIcon">
            <i class="bi bi-x-lg" onClick={handleClose}></i>
          </div>
          <div className="pokeImgCont">
            <img className="pokeBallImg" src={PokeBall} />
          </div>
          <p className="forgotPassText">Forgot your password?</p>
          <p className="forgetPassDialog">
            Enter your registered email to receive <br /> instructions on
            recovering your account.
          </p>
          <form>
            <input className="emailInput" placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} />
            <button className="resetBtn" onClick={handleForgotPassword}>
              Submit
            </button>
          </form>
          <p className='forgotPassWarning'>{forgotPassText.Msg}</p>
        </div>
      </Modal>
    </div>
  );
};

export default ForgotPassword;
