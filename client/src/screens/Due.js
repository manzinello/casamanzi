import React, { Component } from 'react';
// import update from 'immutability-helper';

import moment from 'moment';

import { Row, Col, Button, Select, Input } from 'antd';

const Option = Select.Option;

class Due extends Component {

    state = {
        giocatori: [{
            id: '0',
            nome: 'Giocatore 1',
            punti: 0
        }, {
            id: '1',
            nome: 'Giocatore 2',
            punti: 0
        }, {
            id: '2',
            nome: 'Giocatore 3',
            punti: 0
        }, {
            id: '3',
            nome: 'Giocatore 4',
            punti: 0
        }, {
            id: '4',
            nome: 'Giocatore 5',
            punti: 0
        }],
        comandante: '',
        socio: '',
        storico: []
    }

    constructor(props) {

        super();

        let newState = Object.assign({}, this.state);
        newState.storico.push(<FinePartita giocatori={this.state.giocatori} />);
        this.setState(newState);

    }

    componentDidUpdate() {
        // console.log("update!");
    }

    checkPunti() {
        var sum = this.state.giocatori.reduce(function (a, b) {
            return a.punti + b.punti;
        }, 0);
        return sum === 0;
    }

    aggiornaPunti(id, aggiungi) {
        let newState = Object.assign({}, this.state);
        newState.giocatori[parseInt(id, 10)].punti += aggiungi;
        this.setState(newState);
    }

    win(moltiplicatore = 1) {

        this.aggiornaPunti(this.state.comandante, 2 * moltiplicatore);
        this.aggiornaPunti(this.state.socio, 1 * moltiplicatore);

        this.state.giocatori.forEach((v, i) => {
            if (v.id !== this.state.comandante && v.id !== this.state.socio) {
                this.aggiornaPunti(this.state.giocatori[i].id, -1 * moltiplicatore);
            }
        })

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

    }

    handleChangeComandante = v => {
        this.setState({
            comandante: v
        })
    }

    handleChangeSocio = v => {
        this.setState({
            socio: v
        })
    }

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
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
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
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                            <Option value="0">{this.state.giocatori[0].nome}</Option>
                            <Option value="1">{this.state.giocatori[1].nome}</Option>
                            <Option value="2">{this.state.giocatori[2].nome}</Option>
                            <Option value="3">{this.state.giocatori[3].nome}</Option>
                            <Option value="4">{this.state.giocatori[4].nome}</Option>
                        </Select>
                        <Button
                            type="primary"
                            onClick={this.fineMano}>
                            {"Segna il punteggio"}
                        </Button>
                    </Row>
                </div>
                <Row>
                    <Col style={styles.col} xs={24} sm={24} md={4} lg={4} xl={4}>
                        <h2> </h2>
                    </Col>
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
                </Row>
                {
                    this.state.storico.map((giocatori) => giocatori)
                }
                <div className="nomi-giocatori">
                    <Row>
                        <Col style={styles.col} xs={24} sm={24} md={4} lg={4} xl={4}>
                            <h4>Nomi</h4>
                        </Col>
                        <Col style={styles.col} xs={24} sm={24} md={4} lg={4} xl={4}>
                            <Input size="small" placeholder="Giocatore 1" onChange={event => { this.handleChangeName(event.target.value, 0) }} />
                        </Col>
                        <Col style={styles.col} xs={24} sm={24} md={4} lg={4} xl={4}>
                            <Input size="small" placeholder="Giocatore 2" onChange={event => { this.handleChangeName(event.target.value, 1) }} />
                        </Col>
                        <Col style={styles.col} xs={24} sm={24} md={4} lg={4} xl={4}>
                            <Input size="small" placeholder="Giocatore 3" onChange={event => { this.handleChangeName(event.target.value, 2) }} />
                        </Col>
                        <Col style={styles.col} xs={24} sm={24} md={4} lg={4} xl={4}>
                            <Input size="small" placeholder="Giocatore 4" onChange={event => { this.handleChangeName(event.target.value, 3) }} />
                        </Col>
                        <Col style={styles.col} xs={24} sm={24} md={4} lg={4} xl={4}>
                            <Input size="small" placeholder="Giocatore 5" onChange={event => { this.handleChangeName(event.target.value, 4) }} />
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }

}

class FinePartita extends React.Component {

    render() {

        return (
            <Row>
                <Col style={styles.col} xs={24} sm={24} md={4} lg={4} xl={4}>
                    <h3>{moment().format("HH:mm:ss")}</h3>
                </Col>
                <Col style={styles.col} xs={24} sm={24} md={4} lg={4} xl={4}>
                    <h3>{this.props.giocatori[0].punti}</h3>
                </Col>
                <Col style={styles.col} xs={24} sm={24} md={4} lg={4} xl={4}>
                    <h3>{this.props.giocatori[1].punti}</h3>
                </Col>
                <Col style={styles.col} xs={24} sm={24} md={4} lg={4} xl={4}>
                    <h3>{this.props.giocatori[2].punti}</h3>
                </Col>
                <Col style={styles.col} xs={24} sm={24} md={4} lg={4} xl={4}>
                    <h3>{this.props.giocatori[3].punti}</h3>
                </Col>
                <Col style={styles.col} xs={24} sm={24} md={4} lg={4} xl={4}>
                    <h3>{this.props.giocatori[4].punti}</h3>
                </Col>
            </Row>
        )

    }
}

const styles = {
    col: {
        paddingRight: 5
    }
}

export default Due;