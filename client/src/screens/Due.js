import React, { Component } from 'react';

import { Row, Col, Button, Select } from 'antd';

const Option = Select.Option;

class Due extends Component {

    state = {
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
        },
    }

    checkPunti() {
        return this.state.g1.punti + this.state.g2.punti + this.state.g3.punti + this.state.g4.punti + this.state.g5.punti === 0
    }

    aggiornaPunti(nome, aggiungi) {
        for (var giocatore in this.state) {
            if (nome === this.state[giocatore].nome) {
                this.state[giocatore].punti += aggiungi
            }
        }
    }

    win(comandante, socio, moltiplicatore = 1) {

        this.aggiornaPunti(comandante, 2 * moltiplicatore);
        this.aggiornaPunti(socio, 1 * moltiplicatore);

        for (var giocatore in this.state) {
            if (this.state[giocatore].nome !== comandante && this.state[giocatore].nome !== socio) {
                this.aggiornaPunti(this.state[giocatore].nome, -1 * moltiplicatore);
            }
        }

    }

    render() {

        return (
            <div>
                <Row>
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="Select a person"
                        optionFilterProp="children"
                        //onChange={handleChange}
                        //onFocus={handleFocus}
                        //onBlur={handleBlur}
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                        <Option value="g1">{this.state.g1.nome}</Option>
                        <Option value="g2">{this.state.g2.nome}</Option>
                        <Option value="g3">{this.state.g3.nome}</Option>
                        <Option value="g4">{this.state.g4.nome}</Option>
                        <Option value="g5">{this.state.g5.nome}</Option>
                    </Select>
                </Row>
                <Row>
                    <Col style={styles.col} xs={24} sm={24} md={4} lg={4} xl={4}>
                        <h3>{this.state.g1.nome}</h3>
                        <h2>{this.state.g1.punti}</h2>
                    </Col>
                    <Col style={styles.col} xs={24} sm={24} md={4} lg={4} xl={4}>
                        <h3>{this.state.g2.nome}</h3>
                        {this.state.g2.punti}
                    </Col>
                    <Col style={styles.col} xs={24} sm={24} md={4} lg={4} xl={4}>
                        <h3>{this.state.g3.nome}</h3>
                        {this.state.g3.punti}
                    </Col>
                    <Col style={styles.col} xs={24} sm={24} md={4} lg={4} xl={4}>
                        <h3>{this.state.g4.nome}</h3>
                        {this.state.g4.punti}
                    </Col>
                    <Col style={styles.col} xs={24} sm={24} md={4} lg={4} xl={4}>
                        <h3>{this.state.g5.nome}</h3>
                        {this.state.g5.punti}
                    </Col>
                </Row>
            </div>
        )
    }

}

const styles = {
    col: {
        textAlign: 'center'
    }
}

export default Due;