import React, { Component } from "react";
// import update from 'immutability-helper';

import moment from "moment";

import { Row, Col, Button, Select, Input, Divider, Tag } from "antd";

const Option = Select.Option;

class Due extends Component {
  state = {
    giocatori: [
      {
        id: "0",
        nome: "Giocatore 1",
        punti: 0
      },
      {
        id: "1",
        nome: "Giocatore 2",
        punti: 0
      },
      {
        id: "2",
        nome: "Giocatore 3",
        punti: 0
      },
      {
        id: "3",
        nome: "Giocatore 4",
        punti: 0
      },
      {
        id: "4",
        nome: "Giocatore 5",
        punti: 0
      }
    ],
    comandante: "",
    socio: "",
    moltiplicatore: 1,
    checkpunti: true,
    storico: []
  };

  constructor(props) {
    super();
  }

  componentDidMount() {
    let newState = Object.assign({}, this.state);
    newState.storico.push(<FinePartita giocatori={this.state.giocatori} />);
    this.setState(newState);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.giocatori[0].punti !== prevState.giocatori[0].punti) {
      this.setState({
        checkpunti: this.checkPunti(this.state)
      });
    }
    return true;
  }

  checkPunti(s) {
    var sum = s.giocatori.reduce(function(a, b) {
      return a.punti + b.punti;
    }, 0);
    return sum === 0;
  }

  aggiornaPunti(id, aggiungi) {
    let newState = Object.assign({}, this.state);
    newState.giocatori[parseInt(id, 10)].punti += aggiungi;
    this.setState(newState);
  }

  win() {
    if (this.state.socio !== this.state.comandante) {
      this.aggiornaPunti(this.state.comandante, 2 * this.state.moltiplicatore);
      this.aggiornaPunti(this.state.socio, 1 * this.state.moltiplicatore);

      this.state.giocatori.forEach((v, i) => {
        if (v.id !== this.state.comandante && v.id !== this.state.socio) {
          this.aggiornaPunti(
            this.state.giocatori[i].id,
            -1 * this.state.moltiplicatore
          );
        }
      });
    } else {
      this.aggiornaPunti(
        this.state.comandante,
        2 * this.state.moltiplicatore + 2
      );

      this.state.giocatori.forEach((v, i) => {
        if (v.id !== this.state.comandante) {
          this.aggiornaPunti(
            this.state.giocatori[i].id,
            -1 * this.state.moltiplicatore
          );
        }
      });
    }
  }

  fineMano = () => {
    /*
        this.setState({
            storico: update(this.state.storico, { $push: [this.state.giocatori[0].id] })
        })
        */

    if (this.state.comandante && this.state.socio) {
      let newState = Object.assign({}, this.state);
      newState.storico.push(<FinePartita giocatori={this.state.giocatori} />);
      this.setState(newState);

      this.win();
    }
  };

  handleChangeComandante = v => {
    this.setState({
      comandante: v
    });
  };

  handleChangeSocio = v => {
    this.setState({
      socio: v
    });
  };

  handledChangeMoltiplicatore = v => {
    this.setState({
      moltiplicatore: v
    });
  };

  handleChangeName(name, i) {
    let newState = Object.assign({}, this.state);
    newState.giocatori[i].nome = name;
    this.setState(newState);
  }

  render() {
    return (
      <div>
        <div className="punteggio-row">
          <Row>
            <Select
              showSearch
              style={{ width: 200, paddingRight: 30 }}
              placeholder="Chi ha chiamato?"
              optionFilterProp="children"
              onChange={this.handleChangeComandante}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="0">{this.state.giocatori[0].nome}</Option>
              <Option value="1">{this.state.giocatori[1].nome}</Option>
              <Option value="2">{this.state.giocatori[2].nome}</Option>
              <Option value="3">{this.state.giocatori[3].nome}</Option>
              <Option value="4">{this.state.giocatori[4].nome}</Option>
            </Select>
            <Select
              showSearch
              style={{ width: 200, paddingRight: 30 }}
              placeholder="Chi era il socio?"
              optionFilterProp="children"
              onChange={this.handleChangeSocio}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="0">{this.state.giocatori[0].nome}</Option>
              <Option value="1">{this.state.giocatori[1].nome}</Option>
              <Option value="2">{this.state.giocatori[2].nome}</Option>
              <Option value="3">{this.state.giocatori[3].nome}</Option>
              <Option value="4">{this.state.giocatori[4].nome}</Option>
            </Select>
            <Select
              showSearch
              style={{ width: 200, paddingRight: 30 }}
              placeholder="Moltiplicatore"
              optionFilterProp="children"
              onChange={this.handledChangeMoltiplicatore}
            >
              <Option value="1">Nessuno</Option>
              <Option value="2">x2</Option>
              <Option value="4">x4</Option>
              <Option value="6">x6</Option>
              <Option value="8">x8</Option>
              <Option value="10">x10</Option>
            </Select>
            <Button type="primary" onClick={this.fineMano}>
              {"Segna il punteggio"}
            </Button>
          </Row>
        </div>
        <Divider />
        <Row>
          <Col style={styles.col} xs={24} sm={24} md={4} lg={4} xl={4}>
            <h3>{this.state.giocatori[0].nome}</h3>
            <h2>{this.state.giocatori[0].punti}</h2>
          </Col>
          <Col style={styles.col} xs={24} sm={24} md={4} lg={4} xl={4}>
            <h3>{this.state.giocatori[1].nome}</h3>
            <h2>{this.state.giocatori[1].punti}</h2>
          </Col>
          <Col style={styles.col} xs={24} sm={24} md={4} lg={4} xl={4}>
            <h3>{this.state.giocatori[2].nome}</h3>
            <h2>{this.state.giocatori[2].punti}</h2>
          </Col>
          <Col style={styles.col} xs={24} sm={24} md={4} lg={4} xl={4}>
            <h3>{this.state.giocatori[3].nome}</h3>
            <h2>{this.state.giocatori[3].punti}</h2>
          </Col>
          <Col style={styles.col} xs={24} sm={24} md={4} lg={4} xl={4}>
            <h3>{this.state.giocatori[4].nome}</h3>
            <h2>{this.state.giocatori[4].punti}</h2>
          </Col>
          <Col style={styles.col} xs={24} sm={24} md={4} lg={4} xl={4}>
            <h3>Punteggio</h3>
            {this.state.checkpunti ? (
              <Tag color="green">OK!</Tag>
            ) : (
              <Tag color="red">NO!</Tag>
            )}
          </Col>
        </Row>
        <Divider dashed>Tutta la partita</Divider>
        {this.state.storico.map(giocatori => giocatori)}
        <Divider />
        <div className="nomi-giocatori">
          <Row>
            <Col style={styles.col} xs={24} sm={24} md={4} lg={4} xl={4}>
              <Input
                size="small"
                placeholder="Giocatore 1"
                onChange={event => {
                  this.handleChangeName(event.target.value, 0);
                }}
              />
            </Col>
            <Col style={styles.col} xs={24} sm={24} md={4} lg={4} xl={4}>
              <Input
                size="small"
                placeholder="Giocatore 2"
                onChange={event => {
                  this.handleChangeName(event.target.value, 1);
                }}
              />
            </Col>
            <Col style={styles.col} xs={24} sm={24} md={4} lg={4} xl={4}>
              <Input
                size="small"
                placeholder="Giocatore 3"
                onChange={event => {
                  this.handleChangeName(event.target.value, 2);
                }}
              />
            </Col>
            <Col style={styles.col} xs={24} sm={24} md={4} lg={4} xl={4}>
              <Input
                size="small"
                placeholder="Giocatore 4"
                onChange={event => {
                  this.handleChangeName(event.target.value, 3);
                }}
              />
            </Col>
            <Col style={styles.col} xs={24} sm={24} md={4} lg={4} xl={4}>
              <Input
                size="small"
                placeholder="Giocatore 5"
                onChange={event => {
                  this.handleChangeName(event.target.value, 4);
                }}
              />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

class FinePartita extends React.Component {
  render() {
    return (
      <Row>
        <Col style={styles.col} xs={24} sm={24} md={4} lg={4} xl={4}>
          <h4>{this.props.giocatori[0].nome}</h4>
          <h3>{this.props.giocatori[0].punti}</h3>
        </Col>
        <Col style={styles.col} xs={24} sm={24} md={4} lg={4} xl={4}>
          <h4>{this.props.giocatori[1].nome}</h4>
          <h3>{this.props.giocatori[1].punti}</h3>
        </Col>
        <Col style={styles.col} xs={24} sm={24} md={4} lg={4} xl={4}>
          <h4>{this.props.giocatori[2].nome}</h4>
          <h3>{this.props.giocatori[2].punti}</h3>
        </Col>
        <Col style={styles.col} xs={24} sm={24} md={4} lg={4} xl={4}>
          <h4>{this.props.giocatori[3].nome}</h4>
          <h3>{this.props.giocatori[3].punti}</h3>
        </Col>
        <Col style={styles.col} xs={24} sm={24} md={4} lg={4} xl={4}>
          <h4>{this.props.giocatori[4].nome}</h4>
          <h3>{this.props.giocatori[4].punti}</h3>
        </Col>
        <Col style={styles.col} xs={24} sm={24} md={4} lg={4} xl={4}>
          <h4>{"O"}</h4>
          <h3>{moment().format("HH:mm:ss")}</h3>
        </Col>
      </Row>
    );
  }
}

const styles = {
  col: {
    paddingRight: 2,
    paddingLeft: 2,
    textAlign: "center"
  }
};

export default Due;
