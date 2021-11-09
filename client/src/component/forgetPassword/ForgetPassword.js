import { Modal, Row, Col } from "react-bootstrap";
import PokeBall from "../../images/pokeball.png";
import { useState } from "react";

const ForgetPassword = () => {
  const [onHide, setOnHide] = useState(false);
  const [onShow, setOnShow] = useState(true);

  const onClose = () => {
    setOnHide(true);
    setOnShow(false);
  };
  
  return (
    <div>
      <Modal size="lg" show={onShow} onHide={onHide}>
        <div className="forgetPassCont">
          <div className="closeIcon">
            <i class="bi bi-x-lg" onClick={onClose}></i>
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
            <input className="emailInput" placeholder="Email" />
            <button className="resetBtn">
              Submit
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default ForgetPassword;
