import { BiTrashAlt } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";
import { PropTypes } from "prop-types";
import { delComment, likeComment } from "../../redux/actions/comment";
import { connect, useSelector } from "react-redux";
import { getUser } from "../../redux/Selectors/user";

const PokeComment = ({
  name,
  comment,
  date,
  id,
  pokeID,
  delComment,
  likes,
  likeComment,
}) => {
  const user = useSelector(getUser);
  const deleteComment = (e) => {
    e.preventDefault();
    delComment(pokeID, id);
  };

  return (
    <div className={"pokeComment"} id={id}>
      <div class="commInfo">
        <p>{name}</p>
        <div className="iconsCont">
          <span className="iconPadding">
            <BiTrashAlt
              onClick={(e) => deleteComment(e)}
              style={{ display: name === user.UserName ? "inline" : "none" }}
            />
          </span>
          <span className="iconPadding">
            <AiOutlineHeart
              onClick={() =>
                likeComment(pokeID, id, "621ee24badaa4b5cdbd6a7eb")
              }
            />
            {likes}
          </span>
        </div>
      </div>
      <p className="userComment">{comment}</p>
      <p className="commDate">{date}</p>
      <span class="customBr"></span>
    </div>
  );
};

PokeComment.propTypes = {
  name: PropTypes.string,
  comment: PropTypes.string,
  date: PropTypes.string,
  id: PropTypes.string,
  delComment: PropTypes.func,
  pokeID: PropTypes.number,
  sortComment: PropTypes.func,
  likes: PropTypes.number,
  likeComment: PropTypes.func,
};

export default connect(null, { delComment, likeComment })(PokeComment);
