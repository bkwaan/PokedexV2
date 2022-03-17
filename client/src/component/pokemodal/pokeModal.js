import { Modal, Row, Col, ProgressBar, Tabs, Tab } from "react-bootstrap";
import Abilities from "./Abilities";
import PokeComment from "./PokeComment";
import CommentHeader from "./CommentHeader";
import { BsHeart, BsFillHeartFill } from "react-icons/bs";
import PokeEvol from "./PokeEvol";
import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { updatePokeLikeAsync } from "../../redux/actions/user";
import { isLoggedIn, getUser } from "../../redux/Selectors/user";

const PokeModal = (props) => {
  const [type, setType] = useState([...props.types]);
  const idz = props.pokeID;
  const abil = props.pokemon[idz - 1].abilities;
  const loggedIn = useSelector(isLoggedIn);
  const user = useSelector(getUser);
  var likedPoke = user.FavouritePokemon.includes(idz);
  var likePoke = likedPoke ? "unlike" : "like";
  var heart = likedPoke ? <BsFillHeartFill /> : <BsHeart />;

  let pokeCommentz =
    props.comment.comments[idz].length != 0 &&
    props.comment.comments[idz][0].length != 0 ? (
      props.comment.comments[idz][0].map((comment) => (
        <PokeComment
          name={comment.UserName}
          date={comment.CommentDate.split("T")[0]}
          comment={comment.CommentBody}
          key={comment._id}
          id={comment._id}
          pokeID={idz}
          likes={comment.Likes}
          likesLength={comment.Likes.length}
        />
      ))
    ) : (
      <div className="commentLoginHead">
        <h3>No comments yet!</h3>
        <p>Be the first one to leave a comment!</p>
      </div>
    );

  return (
    <div>
      <Modal size="xl" show={props.show} onHide={props.handleClose}>
        <div className="pokeModal">
          <div className={"infoCont " + type[0]}>
            <Row>
              <Col xs={{ span: 8, offset: 2 }}>
                <span className="modalTitleCont">
                  <Modal.Title className="modalTitle">
                    {"#" + props.id}
                  </Modal.Title>
                </span>
              </Col>
              <Col xs={2}>
                <div
                  className="likeCont"
                  onClick={() =>
                    loggedIn
                      ? props.updatePokeLikeAsync(idz, user.ID, likePoke)
                      : null
                  }
                >
                  {heart}
                </div>
              </Col>
            </Row>
            <Row className="justifyContentMid">
              <Col lg={12}>
                <img className="pokeImg" src={props.image} />
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <p className="pokeName">{props.name}</p>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <div className="pokeTypeCont">
                  {type.map((type, index) => {
                    return (
                      <p key={index} className={"pokeType " + type}>
                        {type}
                      </p>
                    );
                  })}
                </div>
              </Col>
            </Row>
            <div className="pokeAttCont">
              <Row className="justifyContentMid">
                <Col xs={{ span: 2, offset: 2 }}>
                  <p>Attack</p>
                </Col>
                <Col xs={6}>
                  <ProgressBar
                    className="progressBar"
                    now={props.pokemon[idz - 1].stats[1].base_stat}
                  />
                </Col>
              </Row>
              <Row className="justifyContentMid">
                <Col xs={{ span: 2, offset: 2 }}>
                  <p>HP</p>
                </Col>
                <Col xs={6}>
                  <ProgressBar
                    className="progressBar"
                    now={props.pokemon[idz - 1].stats[0].base_stat}
                  />
                </Col>
              </Row>
              <Row className="justifyContentMid">
                <Col xs={{ span: 2, offset: 2 }}>
                  <p>Defense</p>
                </Col>
                <Col xs={6}>
                  <ProgressBar
                    className="progressBar"
                    now={props.pokemon[idz - 1].stats[2].base_stat}
                  />
                </Col>
              </Row>
              <Row className="justifyContentMid">
                <Col xs={{ span: 2, offset: 2 }}>
                  <p>Speed</p>
                </Col>
                <Col xs={6}>
                  <ProgressBar
                    className="progressBar"
                    now={props.pokemon[idz - 1].stats[5].base_stat}
                  />
                </Col>
              </Row>
            </div>
          </div>
          <div className="descCont">
            <div className="descTab">
              <Tabs defaultActiveKey="sprites">
                <Tab
                  eventKey="description"
                  title="Description"
                  className="pokeDesc"
                >
                  {props.pokemon[idz - 1].flavor_text_entries[0].flavor_text}
                </Tab>
                <Tab eventKey="sprites" title="Sprites">
                  <PokeEvol
                    image={props.pokemon[idz - 1].sprites.front_default}
                    image2={props.pokemon[idz - 1].sprites.back_default}
                    image3={props.pokemon[idz - 1].sprites.front_shiny}
                    image4={props.pokemon[idz - 1].sprites.back_shiny}
                  />
                </Tab>
                <Tab eventKey="ability" title="Abilities">
                  <div className="abilityCont">
                    {abil.map((item, index) => (
                      <Abilities name={item.ability.name} key={index} />
                    ))}
                  </div>
                </Tab>
              </Tabs>
            </div>
            <span class="customBr"></span>
            <CommentHeader Id={idz} PokeName={props.name} />
            <div className="pokeCommCont">{pokeCommentz}</div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  pokemon: state.pokemon,
  comment: state.comment,
});

export default connect(mapStateToProps, { updatePokeLikeAsync })(PokeModal);
