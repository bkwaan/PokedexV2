import { useState } from "react";
import { PropTypes } from "prop-types";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { addComment, sortComment } from "../../redux/actions/comment";
import { useSelector } from "react-redux";
import { isLoggedIn, getUser } from "../../redux/Selectors/user";

const CommentHeader = ({ Id, addComment, sortComment, PokeName }) => {
  const [comment, setComment] = useState("");

  const loggedIn = useSelector(isLoggedIn);
  const user = useSelector(getUser);
  const navigate = useNavigate();

  const homeRedirect = () => {
    navigate("/login", { replace: false });
  };
  const pushComment = (e) => {
    e.preventDefault();
    addComment(Id, user.UserName, comment, PokeName, user.ID);
    const textArea = document.getElementsByTagName("textarea")[0];
    textArea.value = "";
  };

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  let pokeForm = loggedIn ? (
    <Form onSubmit={(e) => pushComment(e)}>
      <Form.Control as="textarea" rows={3} onChange={(e) => handleChange(e)} />
      <div className="commSubmit">
        <button>Submit</button>
      </div>
    </Form>
  ) : (
    <h4 className="loginText">
      Please <span className="logText" onClick={() => homeRedirect()}>Login </span>to leave a
      comment
    </h4>
  );

  return (
    <div className="commentSection">
      <div className="commentHeader">
        <div className="commFilter">
          <label>Sort: </label>
          <select onChange={(e) => sortComment(Id, e.target.value)}>
            <option>Oldest</option>
            <option>Newest</option>
          </select>
        </div>
        {loggedIn ? <p className="commTitle">Join The Discussion!</p> : ""}
      </div>
      <div className="commText"> {pokeForm} </div>
    </div>
  );
};

CommentHeader.propTypes = {
  Id: PropTypes.number,
  addComment: PropTypes.func,
  sortComment: PropTypes.func,
};

export default connect(null, { addComment, sortComment })(CommentHeader);
