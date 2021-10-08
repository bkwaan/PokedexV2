import { Modal, Row, Col } from "react-bootstrap";
import PokeBall from "../../images/pokeball.png";

const ForgetPassword = () => {
  return (
    <div>
      <Modal size="lg" show={true}>
        <div className="forgetPassCont">
          <div className="pokeImgCont">
            <img className="pokeBallImg" src={PokeBall} />
          </div>
          <p className="forgotPassText">Forgot your password?</p>
          <p className="forgetPassDialog">
            Enter your registered email to receive instructions on recovering
            your account.
          </p>
          <form>
            <input className="emailInput" />
            <button className="resetBtn">Submit</button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default ForgetPassword;
