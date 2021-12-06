import { Modal, Row, Col } from "react-bootstrap";
import PokeBall from "../../images/pokeball.png";
import { useState } from "react";

const ForgetPassword = (props) => {
  
  return (
    <div>
      <Modal size="lg" {...props} centered>
        <div className="forgetPassCont">
          <div className="closeIcon">
            <i class="bi bi-x-lg" onClick={props.onHide}></i>
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
