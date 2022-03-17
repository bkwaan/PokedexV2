import { BiTrashAlt } from "react-icons/bi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { PropTypes } from "prop-types";
import { delComment, likeComment } from "../../redux/actions/comment";
import { connect, useSelector } from "react-redux";
import { getUser, isLoggedIn } from "../../redux/Selectors/user";
const PokeComment = ({
  name,
  comment,
  date,
  id,
  pokeID,
  delComment,
  likes,
  likeComment,
  likesLength,
}) => {
  const user = useSelector(getUser);
  const isLogged = useSelector(isLoggedIn);

  let likeAction = likes.includes(user.ID) ? "unlike" : "like";
  const deleteComment = (e) => {
    e.preventDefault();
    delComment(pokeID, id);
  };

  var liked = likes.length > 0 ? <AiFillHeart /> : <AiOutlineHeart />;

  return (
    <div className={"pokeComment"} id={id}>
      <span class="customBr"></span>

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
            <span
              style={{ display: "inline" }}
              onClick={() =>
                !isLogged ? null : likeComment(pokeID, id, user.ID, likeAction)
              }
            >
              {liked}
            </span>
          </span>
          {likesLength}
        </div>
      </div>
      <p className="userComment">{comment}</p>
      <p className="commDate">{date}</p>
      {/* <span class="customBr"></span> */}
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
  likes: PropTypes.array,
  likeComment: PropTypes.func,
  likesLength: PropTypes.number,
};

export default connect(null, { delComment, likeComment })(PokeComment);
