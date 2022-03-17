import { PropTypes } from "prop-types";

const Abilities = ({ name }) => {
  return (
    <div>
      <p className="ability">{name}</p>
    </div>
  );
};

Abilities.propTypes = {
  name: PropTypes.string,
};


export default Abilities;

