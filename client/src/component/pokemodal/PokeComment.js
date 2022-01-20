import { BiTrashAlt } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";
import { connect } from "react-redux";

const PokeComment = (props) => {
  return (
    <div className="pokeComment">
      <div class="commInfo">
        <p>Bkwaan:</p>
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
        Wow! This is the best pokemon! I Love this pokemon!
      </p>
      <p className="commDate">2020-08-05</p>
      <span class="customBr"></span>
    </div>
  );
};

const mapStateToProps = (state) => ({
  comment: state.comment,
});

export default connect(mapStateToProps)(PokeComment);
