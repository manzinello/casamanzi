import React, { Component } from 'react';
import update from 'immutability-helper';

import { Row, Col, Button, Select } from 'antd';

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

    componentDidUpdate() {
        console.log("update!");
    }

    checkPunti() {
        var sum = this.state.giocatori.reduce(function (a, b) {
            return a.punti + b.punti;
        }, 0);
        return sum === 0;
    }

    aggiornaPunti(id, aggiungi) {
        let newState = Object.assign({}, this.state);
        newState.giocatori[parseInt(id)].punti += aggiungi;
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

        this.setState({
            storico: update(this.state, { storico: { $push: [this.state.giocatori] } })
        })

        console.log(this.state.storico.length)

        this.win();
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

    handleChangeName = (name, i) => {

        let newState = Object.assign({}, this.state);
        newState.giocatori[i].name = name;
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
                        <h2>{"Punteggio attuale"}</h2>
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
                    this.state.storico.map((giocatori) => <FinePartita giocatori={giocatori} />)
                }
            </div>
        )
    }

}

class FinePartita extends React.Component {

    render() {

        return (
            <Row>
                <Col style={styles.col} xs={24} sm={24} md={4} lg={4} xl={4}>
                    <h2>{(new Date()).getTime()}</h2>
                </Col>
                <Col style={styles.col} xs={24} sm={24} md={4} lg={4} xl={4}>
                    <h2>{this.props.giocatori[0].punti}</h2>
                </Col>
                <Col style={styles.col} xs={24} sm={24} md={4} lg={4} xl={4}>
                    <h2>{this.props.giocatori[1].punti}</h2>
                </Col>
                <Col style={styles.col} xs={24} sm={24} md={4} lg={4} xl={4}>
                    <h2>{this.props.giocatori[2].punti}</h2>
                </Col>
                <Col style={styles.col} xs={24} sm={24} md={4} lg={4} xl={4}>
                    <h2>{this.props.giocatori[3].punti}</h2>
                </Col>
                <Col style={styles.col} xs={24} sm={24} md={4} lg={4} xl={4}>
                    <h2>{this.props.giocatori[4].punti}</h2>
                </Col>
            </Row>
        )

    }
}

const styles = {
    col: {
        //textAlign: 'center'
    }
}

export default Due;