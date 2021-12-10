import { Modal, Row, Col, ProgressBar, Tabs, Tab } from "react-bootstrap";
import Bulbasaur from "../../images/bulbasaur.png";
import Abilities from "./Abilities";
import PokeComment from "./PokeComment";
import CommentHeader from "./CommentHeader";
import { AiOutlineConsoleSql, AiOutlineHeart } from "react-icons/ai";
import PokeEvol from "./PokeEvol";
import React, { useState, useEffect } from "react";

const PokeModal = (props) => {
  const [type, setType] = useState([...props.type]);
  const [abil, setAbil] = useState([]);
  // const [abilities, setAbilities] = useState([...props.abilities]);

  // useEffect(() => {
  //   // setType(...props.types);
  //   // setAbil(...props.abilities)
  //   // getpoke();
  // }, []);

  return (
    <div>
      <Modal size="xl" show={props.show}>
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
                  <ProgressBar className="progressBar" now={props.attack} />
                </Col>
              </Row>
              <Row className="justifyContentMid">
                <Col xs={{ span: 2, offset: 2 }}>
                  <p>HP</p>
                </Col>
                <Col xs={6}>
                  <ProgressBar className="progressBar" now={props.hp} />
                </Col>
              </Row>
              <Row className="justifyContentMid">
                <Col xs={{ span: 2, offset: 2 }}>
                  <p>Defense</p>
                </Col>
                <Col xs={6}>
                  <ProgressBar className="progressBar" now={props.defence} />
                </Col>
              </Row>
              <Row className="justifyContentMid">
                <Col xs={{ span: 2, offset: 2 }}>
                  <p>Speed</p>
                </Col>
                <Col xs={6}>
                  <ProgressBar className="progressBar" now={props.speed} />
                </Col>
              </Row>
            </div>
          </div>
          <div className="descCont">
            <div className="descTab">
              <Tabs defaultActiveKey="description">
                <Tab eventKey="description" title="Description" className="pokeDesc">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Curabitur iaculis quis lacus quis pulvinar. Fusce vehicula
                  tortor ac erat facilisis fermentum. Donec cursus magna eget
                  turpis hendrerit consequat. Class aptent taciti sociosqu ad
                  litora torquent per conubia nostra, per inceptos himenaeos.
                  Sed ex purus, rhoncus eget orci a, luctus viverra lorem.
                  Suspendisse neque nisl, malesuada non cursus a, volutpat ut
                  orci. Fusce vel lectus neque.
                </Tab>
                <Tab eventKey="evolution" title="Evolution">
                  <PokeEvol />
                </Tab>
                <Tab eventKey="ability" title="Abilities">
                  <div className="abilityCont">
                    {/* {abilities.map((item) => (
                      <Abilities name={item} />
                    ))} */}
                  </div>
                </Tab>
              </Tabs>
            </div>
            <span class="customBr"></span>
            <CommentHeader />
            <div className="pokeCommCont">
              <PokeComment />
              <PokeComment />
              <PokeComment />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PokeModal;
