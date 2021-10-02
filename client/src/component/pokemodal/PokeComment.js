import { BiTrashAlt } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";

const PokeComment = () => {
  return (
    <div className="pokeComment">
      <div class="commInfo">
        <p>Bkwaan:</p>
        <div className="iconsCont">
          <span className="iconPadding"><BiTrashAlt /></span>
          <span className="iconPadding"><AiOutlineHeart /></span>
        </div>
      </div>
      <p className="userComment">Wow! This is the best pokemon! I Love this pokemon!</p>
      <p className="commDate">2020-08-05</p>
      <span class="customBr"></span>
    </div>
  );
};

export default PokeComment;
