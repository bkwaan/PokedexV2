import { BiTrashAlt } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";
import { PropTypes } from "prop-types";

const PokeComment = ({ name, comment, date }) => {
  return (
    <div className="pokeComment">
      <div class="commInfo">
        <p>{name}</p>
        <div className="iconsCont">
          <span className="iconPadding">
            <BiTrashAlt />
          </span>
          <span className="iconPadding">
            <AiOutlineHeart />
          </span>
        </div>
      </div>
      <p className="userComment">
        {comment}
      </p>
      <p className="commDate">{date}</p>
      <span class="customBr"></span>
    </div>
  );
};

PokeComment.propTypes = {
  name: PropTypes.string,
  comment: PropTypes.string,
  date: PropTypes.string,
};

export default PokeComment;
