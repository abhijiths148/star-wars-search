import React from "react";
import {
  Container,
  Col,
  Input,
  Row,
  Card,
  CardBody,
  CardTitle,
  CardText,
  InputGroup,
  ListGroup,
  Progress,
  Button,
  InputGroupAddon
} from "reactstrap";
import { getPlanets } from "./../services";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      planets: [],
      totalPopulation: 0,
      planetDetails: "",
      showModal: false
    };
  }
  componentDidMount() {
    this.searchPlanets("", true);
  }

  searchPlanets = async (serch, defaultCall) => {
    const searchKeyword = serch.trim();
    if (searchKeyword || defaultCall) {
      const res = await getPlanets(searchKeyword);
      if (res) {
        this.setState({ planets: res });
        let totalPopulation = 0;
        if (res.length) {
          for (let i = 0; i < res.length; i++) {
            const element = res[i];
            if (element.population && element.population !== "unknown") {
              totalPopulation += parseFloat(element.population);
            }
          }
        }

        this.setState({ totalPopulation: totalPopulation });
        return null;
      }
    } else {
      this.setState({ planets: [] });
      return null;
    }
  };

  toggle = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal
    }));
  };

  renderPlanets = planets => {
    const knownPlanets = planets.filter(
      planet => planet.name !== "unknown" && planet.population !== "unknown"
    );
    const { totalPopulation } = this.state;
    knownPlanets.sort(
      (a, b) => parseFloat(b.population) - parseFloat(a.population)
    );
    return knownPlanets.map((planet, index) => {
      const persentage = ((planet.population * 100) / totalPopulation).toFixed(
        3
      );
      return (
        <Card body outline color="secondary" key={planet.name} className="mt-2">
          <CardBody>
            <CardTitle style={{ marginBottom: 4, fontSize: 24 }}>
              <b>{planet.name}</b>
            </CardTitle>
            <CardText style={{ marginBottom: 2 }}>
              Landscape: <b>{planet.terrain}</b>
              <br />
              Gravity: {"  "}
              <b>
                {planet.gravity && planet.gravity !== "N/A"
                  ? planet.gravity
                  : "1 standard"}
              </b>
              .
            </CardText>
            <CardText style={{ marginBottom: 2 }}>
              Population: <b>{planet.population}</b>
              <br />
              <b>{persentage}%</b> of total population from current list.
            </CardText>
            <Progress value={Math.ceil(persentage)} style={{ marginTop: 4 }} />
          </CardBody>
        </Card>
      );
    });
  };

  render() {
    const { planets } = this.state;
    return (
      <Container>
        <Row>
          <Col></Col>
        </Row>
        <Row>
          <Col xs="0" sm="1"></Col>
          <Col xs="12" sm="10" md="10">
            <InputGroup>
              <Input
                type="text"
                name="searchKeyword"
                placeholder={"Search For Planets"}
                onChange={e => this.searchPlanets(e.target.value)}
              />
              <InputGroupAddon addonType="append">
                <Button color="secondary">Search</Button>
              </InputGroupAddon>
            </InputGroup>
          </Col>
          <Col sm="4"></Col>
        </Row>
        <br />
        <Row>
          <Col xs="0" sm="1" md="1"></Col>
          <Col xs="12" sm="10" md="10">
            <ListGroup>{this.renderPlanets(planets)}</ListGroup>
          </Col>
          <Col xs="0" sm="1" md="1"></Col>
        </Row>
      </Container>
    );
  }
}

export default Search;
