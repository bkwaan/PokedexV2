import Form from "react-bootstrap/Form";
import { connect } from "react-redux";
import { editComment } from "../../redux/actions/comment";

const PokeComment = (props) => {

  const addComment = (e) => {
    e.preventDefault();
    props.editComment("222","61e78c467f754881b0076093", "there my name is test");

  }

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
        <Form onSubmit={(e)=>addComment(e)}>
          <Form.Control
            as="textarea"
            rows={3}
          />
          <div className="commSubmit">
          <button>Submit</button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default connect(null,{editComment})(PokeComment);
