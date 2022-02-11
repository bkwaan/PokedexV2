import { Modal, Row, Col, ProgressBar, Tabs, Tab } from "react-bootstrap";
import Abilities from "./Abilities";
import PokeComment from "./PokeComment";
import CommentHeader from "./CommentHeader";
import { AiOutlineHeart } from "react-icons/ai";
import PokeEvol from "./PokeEvol";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getComment } from "../../redux/actions/comment";

const PokeModal = (props) => {
  const [type, setType] = useState([...props.types]);
  const idz = props.pokeID;
  const abil = props.pokemon[idz - 1].abilities;
  const [pokeComments, setPokeComments] = useState([]);
  const setComments = () => {
    if (props.comment.comments[idz] != undefined) {
      setPokeComments(props.comment.comments[idz][0]);
    }
  };

  useEffect(() => {
    // props.getComment(idz);
    setComments();
  },[]);

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
                <div className="likeCont">
                  <AiOutlineHeart />
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
                  {type.map((type) => {
                    return <p className={"pokeType " + type}>{type}</p>;
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
                    {abil.map((item) => (
                      <Abilities name={item.ability.name} />
                    ))}
                  </div>
                </Tab>
              </Tabs>
            </div>
            <span class="customBr"></span>
            <CommentHeader Id={idz} />
            <div className="pokeCommCont">
              {pokeComments.map((comment) => (
                <PokeComment
                  name={comment.UserName}
                  date={comment.CommentDate}
                  comment={comment.CommentBody}
                />
              ))}
            </div>
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

export default connect(mapStateToProps, { getComment })(PokeModal);
