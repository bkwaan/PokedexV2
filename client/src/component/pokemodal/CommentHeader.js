import Form from "react-bootstrap/Form";

const PokeComment = () => {
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
        <Form>
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

export default PokeComment;
