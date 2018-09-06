import React, { Component } from 'react';

import { Row, Col, Button, Select } from 'antd';

const Option = Select.Option;

class Due extends Component {

    due;

    state = {
        giocatori: {
            g1: {
                nome: 'Giocatore 1',
                punti: 0
            },
            g2: {
                nome: 'Giocatore 2',
                punti: 0
            },
            g3: {
                nome: 'Giocatore 3',
                punti: 0
            },
            g4: {
                nome: 'Giocatore 4',
                punti: 0
            },
            g5: {
                nome: 'Giocatore 5',
                punti: 0
            }
        },
        actualComandante: '',
        actualSocio: ''
    }

    componentDidUpdate() {
        console.log("update!");
    }

    checkPunti() {
        return this.state.giocatori.g1.punti + this.state.giocatori.g2.punti + this.state.giocatori.g3.punti + this.state.giocatori.g4.punti + this.state.giocatori.g5.punti === 0
    }

    aggiornaPunti(nome, aggiungi) {

        this.due.giocatori[nome].punti += aggiungi;
        this.setState(this.due);

    }

    win(moltiplicatore = 1) {

        this.aggiornaPunti(this.state.actualComandante, 2 * moltiplicatore);
        this.aggiornaPunti(this.state.actualSocio, 1 * moltiplicatore);

        for (var g in this.due.giocatori) {
            console.log(g);
            if (this.due.giocatori[g] !== this.state.actualComandante && this.due.giocatori[g] !== this.state.actualSocio) {
                this.aggiornaPunti(this.due.giocatori[g], -1 * moltiplicatore)
            }
        }

    }

    aggiornaPunteggio = () => {
        this.win();
    }

    handleChangeComandante = v => {
        this.setState({
            actualComandante: v
        })
    }

    handleChangeSocio = v => {
        this.setState({
            actualSocio: v
        })
    }

    render() {

        this.due = this.state;

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
                            //onFocus={handleFocus}
                            //onBlur={handleBlur}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                            <Option value="g1">{this.state.giocatori.g1.nome}</Option>
                            <Option value="g2">{this.state.giocatori.g2.nome}</Option>
                            <Option value="g3">{this.state.giocatori.g3.nome}</Option>
                            <Option value="g4">{this.state.giocatori.g4.nome}</Option>
                            <Option value="g5">{this.state.giocatori.g5.nome}</Option>
                        </Select>
                        <Select
                            showSearch
                            style={{ width: 200, paddingRight: 30 }}
                            placeholder="Chi era il socio?"
                            optionFilterProp="children"
                            onChange={this.handleChangeSocio}
                            //onFocus={handleFocus}
                            //onBlur={handleBlur}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                            <Option value="g1">{this.state.giocatori.g1.nome}</Option>
                            <Option value="g2">{this.state.giocatori.g2.nome}</Option>
                            <Option value="g3">{this.state.giocatori.g3.nome}</Option>
                            <Option value="g4">{this.state.giocatori.g4.nome}</Option>
                            <Option value="g5">{this.state.giocatori.g5.nome}</Option>
                        </Select>
                        <Button
                            type="primary"
                            onClick={this.aggiornaPunteggio}>
                            Segna il punteggio
                        </Button>
                    </Row>
                </div>
                <Row>
                    <Col style={styles.col} xs={24} sm={24} md={4} lg={4} xl={4}>
                        <h3>{this.state.giocatori.g1.nome}</h3>
                        <h2>{this.state.giocatori.g1.punti}</h2>
                    </Col>
                    <Col style={styles.col} xs={24} sm={24} md={4} lg={4} xl={4}>
                        <h3>{this.state.giocatori.g2.nome}</h3>
                        <h2>{this.state.giocatori.g2.punti}</h2>
                    </Col>
                    <Col style={styles.col} xs={24} sm={24} md={4} lg={4} xl={4}>
                        <h3>{this.state.giocatori.g3.nome}</h3>
                        <h2>{this.state.giocatori.g3.punti}</h2>
                    </Col>
                    <Col style={styles.col} xs={24} sm={24} md={4} lg={4} xl={4}>
                        <h3>{this.state.giocatori.g4.nome}</h3>
                        <h2>{this.state.giocatori.g4.punti}</h2>
                    </Col>
                    <Col style={styles.col} xs={24} sm={24} md={4} lg={4} xl={4}>
                        <h3>{this.state.giocatori.g5.nome}</h3>
                        <h2>{this.state.giocatori.g5.punti}</h2>
                    </Col>
                </Row>
            </div>
        )
    }

}

const styles = {
    col: {
        //textAlign: 'center'
    }
}

export default Due;