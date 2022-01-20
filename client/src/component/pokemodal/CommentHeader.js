import Form from "react-bootstrap/Form";
import { connect } from "react-redux";
import { addComment } from "../../redux/actions/comment";

const PokeComment = (props) => {

  const addComment = (e) => {
    e.preventDefault();
    props.addComment("233","sklvi", "there my name is costco");

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

export default connect(null,{addComment})(PokeComment);
