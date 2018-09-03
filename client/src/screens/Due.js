import React, { Component } from 'react';

import { Row, Col, Button } from 'antd';

class Due extends Component {

    state = {
        g1: 0,
        g2: 0,
        g3: 0,
        g4: 0,
        g5: 0
    }

    render() {
        return (
            <Row>
                <Col style={styles.col} xs={24} sm={24} md={4} lg={4} xl={4}>
                    <h3>Giocatore 1</h3>
                    {this.state.g1}
                </Col>
                <Col style={styles.col} xs={24} sm={24} md={4} lg={4} xl={4}>
                    <h3>Giocatore 2</h3>
                    {this.state.g2}
                </Col>
                <Col style={styles.col} xs={24} sm={24} md={4} lg={4} xl={4}>
                    <h3>Giocatore 3</h3>
                    {this.state.g3}
                </Col>
                <Col style={styles.col} xs={24} sm={24} md={4} lg={4} xl={4}>
                    <h3>Giocatore 4</h3>
                    {this.state.g4}
                </Col>
                <Col style={styles.col} xs={24} sm={24} md={4} lg={4} xl={4}>
                    <h3>Giocatore 5</h3>
                    {this.state.g5}
                </Col>
            </Row>
        )
    }

}

const styles = {
    col: {
        textAlign: 'center'
    }
}

export default Due;