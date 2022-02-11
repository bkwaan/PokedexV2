import { useState } from "react";
import { PropTypes } from "prop-types";
import Form from "react-bootstrap/Form";
import { connect } from "react-redux";
import { addComment } from "../../redux/actions/comment";

const CommentHeader = ({Id, addComment}) => {
  const [comment, setComment] = useState("");
  const [id, setId] = useState(Id);

  const pushComment = (e) => {
    e.preventDefault();
    addComment(id, "bosco", comment);
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
          <label>Show: </label>
          <select>
            <option>Newest</option>
            <option>Oldest</option>
          </select>
        </div>
        <p className="commTitle">Join The Discussion!</p>
      </div>
      <div className="commText">
        <Form onSubmit={(e) => pushComment(e)}>
          <Form.Control
            as="textarea"
            rows={3}
            onChange={(e) => handleChange(e)}
          />
          <div className="commSubmit">
            <button>Submit</button>
          </div>
        </Form>
      </div>
    </div>
  );
};

CommentHeader.propTypes = {
  Id: PropTypes.number,
  addComment: PropTypes.func
}

export default connect(null, { addComment })(CommentHeader);
