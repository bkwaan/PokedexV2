import { Modal, Row, Col, ProgressBar, Tabs, Tab } from "react-bootstrap";
import Bulbasaur from "../../images/bulbasaur.png";
import Abilities from "./Abilities";

const PokeModal = () => {
  return (
    <div>
      <Modal size="xl" show={true}>
        <div className="infoCont">
          <Row>
            <Col xs={{ span: 8, offset: 2 }}>
              <span className="modalTitleCont">
                <Modal.Title className="modalTitle">#001</Modal.Title>
              </span>
            </Col>
            <Col xs={2}>
              <div className="likeCont">
                <p>Heart</p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={{ span: 9, offset: 3 }}>
              <img className="pokeImg" src={Bulbasaur} />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <p className="pokeName">Bulbasaur</p>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <div className="pokeTypeCont">
                <p className="pokeType">Type1</p>
                <p className="pokeType">Type2</p>
              </div>
            </Col>
          </Row>
          <Row className="justifyContentMid">
            <Col xs={{ span: 2, offset: 2 }}>
              <p>Attack</p>
            </Col>
            <Col xs={6}>
              <ProgressBar className="progressBar" now={60} />
            </Col>
          </Row>
          <Row className="justifyContentMid">
            <Col xs={{ span: 2, offset: 2 }}>
              <p>HP</p>
            </Col>
            <Col xs={6}>
              <ProgressBar className="progressBar" now={60} />
            </Col>
          </Row>
          <Row className="justifyContentMid">
            <Col xs={{ span: 2, offset: 2 }}>
              <p>Defense</p>
            </Col>
            <Col xs={6}>
              <ProgressBar className="progressBar" now={60} />
            </Col>
          </Row>
          <Row className="justifyContentMid">
            <Col xs={{ span: 2, offset: 2 }}>
              <p>Speed</p>
            </Col>
            <Col xs={6}>
              <ProgressBar className="progressBar" now={60} />
            </Col>
          </Row>
        </div>
        <div className="descCont">
          <div className="descTab">
            <Tabs defaultActiveKey="description">
              <Tab eventKey="description" title="Description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Curabitur iaculis quis lacus quis pulvinar. Fusce vehicula
                tortor ac erat facilisis fermentum. Donec cursus magna eget
                turpis hendrerit consequat. Class aptent taciti sociosqu ad
                litora torquent per conubia nostra, per inceptos himenaeos. Sed
                ex purus, rhoncus eget orci a, luctus viverra lorem. Suspendisse
                neque nisl, malesuada non cursus a, volutpat ut orci. Fusce vel
                lectus neque.
              </Tab>
              <Tab eventKey="evolution" title="Evolution"></Tab>
              <Tab eventKey="ability" title="Abilities">
                <Abilities/>
                <Abilities/>
                <Abilities/>
              </Tab>
            </Tabs>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PokeModal;
