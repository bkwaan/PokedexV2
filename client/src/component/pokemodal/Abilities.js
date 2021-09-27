import { OverlayTrigger, Tooltip } from "react-bootstrap";
// import Overlay from "react-bootstrap/Overlay";

const Abilities = () => {
  return (
    <div>
      <OverlayTrigger
        placement="top"
        overlay={
          <Tooltip id="button-tooltip-2">
            When this Pokémon has 1/3 or less of its HP remaining, its
            grass-type moves inflict 1.5× as much regular damage.
          </Tooltip>
        }
      >
        <p className="ability">Ability 1</p>
      </OverlayTrigger>
    </div>
  );
};

export default Abilities;
