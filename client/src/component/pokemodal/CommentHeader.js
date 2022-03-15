import { useState } from "react";
import { PropTypes } from "prop-types";
import Form from "react-bootstrap/Form";
import { connect } from "react-redux";
import { addComment, sortComment } from "../../redux/actions/comment";
import { useSelector } from "react-redux";
import { isLoggedIn, getUser } from "../../redux/Selectors/user";

const CommentHeader = ({ Id, addComment, sortComment, PokeName }) => {
  const [comment, setComment] = useState("");

  const loggedIn = useSelector(isLoggedIn);
  const user = useSelector(getUser)

  const pushComment = (e) => {
    e.preventDefault();
    addComment(Id, user.UserName, comment,PokeName, user.ID );
    const textArea = document.getElementsByTagName("textarea")[0];
    textArea.value = "";
  };

  const handleChange = (e) => {
    setComment(e.target.value);
  };

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
        <p className="commTitle">Join The Discussion!</p>
      </div>
      <div className="commText">
        {" "}
        <Form onSubmit={(e) => pushComment(e)}>
          <Form.Control
            as="textarea"
            rows={3}
            onChange={(e) => handleChange(e)}
          />
          <div className="commSubmit">
            <button
              title={"Please login to submit a comment"}
              disabled={!loggedIn}
            >
              Submit
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

CommentHeader.propTypes = {
  Id: PropTypes.number,
  addComment: PropTypes.func,
  sortComment: PropTypes.func,
};

export default connect(null, { addComment, sortComment })(CommentHeader);
